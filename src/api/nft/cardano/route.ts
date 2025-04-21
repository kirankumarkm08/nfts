import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define interfaces for Cardano data structures
interface CardanoAsset {
  unit: string;
  quantity: string;
}

interface CardanoAssetData {
  asset: string;
  policy_id: string;
  quantity: string;
  onchain_metadata?: {
    name?: string;
    description?: string;
  };
}

interface CardanoMetadata {
  name?: string;
  description?: string;
  image?: string;
}

interface NFTOutput {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  contract: string;
  link: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get the stake address from the URL
    const { searchParams } = new URL(request.url);
    const stakeAddress = searchParams.get("stakeAddress");

    // Validate stake address
    if (!stakeAddress) {
      console.log("No stake address provided in request");
      return NextResponse.json(
        { error: "Stake address is required" },
        { status: 400 }
      );
    }

    console.log(
      `API: Fetching Cardano NFTs for stake address: ${stakeAddress}`
    );

    // Check if API key is available
    if (!process.env.BLOCKFROST_API_KEY) {
      console.error("Blockfrost API key is missing");
      return NextResponse.json(
        { error: "API configuration error", nfts: [] },
        { status: 200 }
      );
    }

    // For testing, you can return mock data if needed
    // return NextResponse.json({
    //   nfts: [
    //     {
    //       id: "asset1xyznft123",
    //       name: "Test Cardano NFT",
    //       description: "This is a test NFT on Cardano",
    //       image: "/abstract-cardano-nft.png",
    //       collection: "Test Collection",
    //       contract: "policy123456",
    //       link: "https://cardanoscan.io/token/asset1xyznft123"
    //     }
    //   ]
    // })

    // Fetch assets for the address using Blockfrost API
    console.log(
      `API: Calling Blockfrost API for stake address: ${stakeAddress}`
    );
    const response = await fetch(
      `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${stakeAddress}/addresses/assets`,
      {
        headers: {
          project_id: process.env.BLOCKFROST_API_KEY as string,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Blockfrost API error (${response.status}):`, errorText);

      // Return more specific error messages based on status code
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Stake address not found", nfts: [] },
          { status: 200 }
        );
      } else if (response.status === 403 || response.status === 401) {
        return NextResponse.json(
          { error: "API authentication error", nfts: [] },
          { status: 200 }
        );
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: "API rate limit exceeded", nfts: [] },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          error: `Failed to fetch NFTs from Blockfrost: ${response.status}`,
          nfts: [],
        },
        { status: 200 }
      );
    }

    const assets = (await response.json()) as CardanoAsset[];

    // If no assets are found, return empty array
    if (!assets || assets.length === 0) {
      console.log("No assets found for this stake address");
      return NextResponse.json({ nfts: [] });
    }

    console.log(
      `API: Found ${assets.length} assets, fetching metadata for first 10`
    );

    // For each asset, fetch metadata
    const nftsPromises = assets
      .slice(0, 10)
      .map(async (asset: CardanoAsset) => {
        try {
          console.log(`API: Fetching asset data for ${asset.unit}`);
          const assetResponse = await fetch(
            `https://cardano-mainnet.blockfrost.io/api/v0/assets/${asset.unit}`,
            {
              headers: {
                project_id: process.env.BLOCKFROST_API_KEY || "",
                "Content-Type": "application/json",
              },
            }
          );

          if (!assetResponse.ok) {
            console.log(
              `Failed to fetch asset data for ${asset.unit}: ${assetResponse.status}`
            );
            return null;
          }

          const assetData = (await assetResponse.json()) as CardanoAssetData;

          // Check if this is an NFT (quantity = 1)
          if (assetData.quantity !== "1") {
            console.log(
              `Asset ${asset.unit} is not an NFT (quantity = ${assetData.quantity})`
            );
            return null;
          }

          // Fetch metadata
          console.log(`API: Fetching metadata for ${asset.unit}`);
          const metadataResponse = await fetch(
            `https://cardano-mainnet.blockfrost.io/api/v0/assets/${asset.unit}/metadata`,
            {
              headers: {
                project_id: process.env.BLOCKFROST_API_KEY || "",
                "Content-Type": "application/json",
              },
            }
          );

          if (!metadataResponse.ok) {
            console.log(
              `Failed to fetch metadata for ${asset.unit}: ${metadataResponse.status}`
            );
            return null;
          }

          const metadata = (await metadataResponse.json()) as CardanoMetadata;

          // Get IPFS image if available
          let imageUrl = "";
          if (metadata.image) {
            // Convert IPFS URL to gateway URL if needed
            imageUrl =
              typeof metadata.image === "string" &&
              metadata.image.startsWith("ipfs://")
                ? `https://ipfs.io/ipfs/${metadata.image.replace(
                    "ipfs://",
                    ""
                  )}`
                : String(metadata.image || "");
          }

          const nft: NFTOutput = {
            id: assetData.asset,
            name: (metadata.name ||
              assetData.onchain_metadata?.name ||
              assetData.asset) as string,
            description: (metadata.description ||
              assetData.onchain_metadata?.description ||
              "") as string,
            image: imageUrl || "/abstract-cardano-nft.png",
            collection: assetData.policy_id,
            contract: assetData.policy_id,
            link: `https://cardanoscan.io/token/${assetData.asset}`,
          };

          return nft;
        } catch (error) {
          console.error(`Error processing asset ${asset.unit}:`, error);
          return null;
        }
      });

    const nftsWithNull = await Promise.all(nftsPromises);
    const nfts = nftsWithNull.filter((nft): nft is NFTOutput => nft !== null);

    console.log(`API: Successfully fetched ${nfts.length} NFTs`);
    return NextResponse.json({ nfts });
  } catch (error) {
    console.error("API: Error fetching Cardano NFTs:", error);
    return NextResponse.json(
      { error: "Failed to fetch NFTs", nfts: [] },
      { status: 200 }
    );
  }
}
