import { type NextRequest, NextResponse } from "next/server";
import { NFTBase } from "@/types/nft";

export async function GET(request: NextRequest) {
  try {
    // Get the wallet address from the URL
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    // Validate address
    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    console.log(`Fetching Base NFTs for address: ${address}`);

    // Call the OpenSea API to get NFTs on Base network
    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/base/account/0x5DadB2e88cF9cC2B6f53b5e7413ebFa1a7D740a1/nfts?limit=50`,
      {
        headers: {
          "X-API-KEY": process.env.OPENSEA_API_KEY || "",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenSea API error: ${response.status}`, errorText);
      return NextResponse.json(
        { error: `Failed to fetch NFTs from OpenSea: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // If no NFTs are found, return empty array
    if (!data.nfts || data.nfts.length === 0) {
      return NextResponse.json({ nfts: [] });
    }

    // Map the OpenSea API response to our NFT format
    const nfts = data.nfts.map((nft: NFTBase) => ({
      name: nft.name || `NFT #${nft.identifier}`,
      description: nft.description,
      image: nft.image_url || "/chromatic-whirlwind.png",
      tokenId: nft.identifier,
      collectionName: nft.collection,
      link: `https://opensea.io/assets/base/${nft.contract}/${nft.identifier}`,
    }));

    return NextResponse.json({ nfts });
  } catch (error) {
    console.error("Error fetching Base NFTs:", error);
    return NextResponse.json(
      { error: "Failed to fetch NFTs" },
      { status: 500 }
    );
  }
}
