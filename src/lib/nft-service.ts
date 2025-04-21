export type NFT = {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  contract: string;
  link: string;
};

type RawNFT = {
  id?: string;
  identifier?: string;
  name?: string;
  description?: string;
  image?: string;
  collection?: string;
  contract?: string;
  link?: string;
};

type NFTApiResponse = {
  nfts?: RawNFT[];
};

export async function fetchNFTs(address: string): Promise<NFT[]> {
  try {
    if (!address) {
      console.error("No address provided to fetchNFTs");
      return [];
    }

    const response = await fetch(`/api/nft/base?address=${address}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch NFTs: ${response.status} ${response.statusText}`
      );
    }

    const data: NFTApiResponse = await response.json();

    if (!Array.isArray(data.nfts)) {
      console.error("Invalid response format from NFT API", data);
      return [];
    }

    const nfts: NFT[] = data.nfts.map((nft) => ({
      id: nft.id || nft.identifier || "",
      name: nft.name || `NFT #${nft.id || nft.identifier || "Unknown"}`,
      description: nft.description || "",
      image: nft.image || "",
      collection: nft.collection || "",
      contract: nft.contract || "",
      link: nft.link || "",
    }));

    return nfts;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}
