import { bech32 } from "bech32";

// Helper function to convert hex to bech32 if needed
function hexToBech32(hexString: string, prefix: string) {
  // Remove '0x' if present
  if (hexString.startsWith("0x")) {
    hexString = hexString.slice(2);
  }

  // Convert hex to bytes
  const bytes = [];
  for (let i = 0; i < hexString.length; i += 2) {
    bytes.push(Number.parseInt(hexString.substr(i, 2), 16));
  }

  // Encode to bech32
  return bech32.encode(prefix, bech32.toWords(new Uint8Array(bytes)));
}

async function fetchCardanoNFTs(stakeAddress?: string) {
  try {
    if (!stakeAddress) {
      console.log("No Cardano stake address provided");
      return [];
    }

    // Ensure stake address is in the correct format (stake1...)
    let formattedStakeAddress = stakeAddress;
    if (!stakeAddress.startsWith("stake")) {
      try {
        // Try to convert from hex to bech32 if needed
        formattedStakeAddress = hexToBech32(stakeAddress, "stake");
      } catch (error) {
        console.error("Error converting stake address format:", error);
        // Use original if conversion fails
        formattedStakeAddress = stakeAddress;
      }
    }

    console.log(
      `Fetching Cardano NFTs for stake address: ${formattedStakeAddress}`
    );

    // Call our API route
    const response = await fetch(
      `/api/nfts/cardano?stakeAddress=${encodeURIComponent(
        formattedStakeAddress
      )}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API error: ${response.status} - ${errorData.error || "Unknown error"}`
      );
    }

    const data = await response.json();

    // Log the response for debugging
    console.log("Cardano NFTs response:", data);

    return data.nfts || [];
  } catch (error) {
    console.error("Error fetching Cardano NFTs:", error);
    return [];
  }
}

export default fetchCardanoNFTs;
