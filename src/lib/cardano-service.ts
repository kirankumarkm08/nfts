export type NFT = {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  contract: string;
  link: string;
};

export async function fetchNFTs(address: string): Promise<NFT[]> {
  try {
    const response = await fetch(`/api/nft/base/address=${address}`);

    if (!response.ok) {
      throw new Error("Failed to fetch NFTs");
    }

    const data = await response.json();
    return data.nfts || [];
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}
