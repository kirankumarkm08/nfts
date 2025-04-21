import { type NextRequest, NextResponse } from "next/server";

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

    // Process data and return as JSON
    const data = await response.json();
    const nfts = data.nfts.map(/* mapping logic */);

    // This is the data structure returned to your client
    return NextResponse.json({ nfts });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch NFTs, ${error}` },
      { status: 500 }
    );
  }
}
