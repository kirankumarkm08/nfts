// This is your API route that fetches data from OpenSea and returns it
export async function GET(request: NextRequest) {
  try {
    // Get address from query params
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    // Fetch from OpenSea
    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/base/account/${address}/nfts?limit=50`,
      {
        headers: {
          "X-API-KEY": process.env.OPENSEA_API_KEY || "",
          Accept: "application/json",
        },
      }
    );

    // Process data
    const data = await response.json();

    const nfts = data.nfts.map((nft: any) => ({
      id: nft.identifier || nft.id || "",
      name: nft.name || `NFT #${nft.identifier || nft.id || "Unknown"}`,
      description: nft.description || "",
      image: nft.image_url || nft.image || "",
      collection: nft.collection?.name || "",
      contract: nft.contract || nft.contract_address || "",
      link: nft.permalink || "",
    }));

    // Log the mapped NFT list
    console.log("Fetched NFTs:", nfts);

    // Return JSON response
    return NextResponse.json({ nfts });
  } catch (error) {
    console.error("Error in GET /api/nft/base:", error);
    return NextResponse.json(
      { error: `Failed to fetch NFTs, ${error}` },
      { status: 500 }
    );
  }
}
