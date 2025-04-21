export interface NFTBase {
  identifier: string;
  name?: string;
  description?: string;
  image_url?: string;
  collection: {
    name: string;
  };
  contract: {
    address: string;
  };
}

export interface NFTDisplay {
  name: string;
  description?: string;
  image: string;
  tokenId: string;
  collectionName: string;
  link: string;
}

export interface NFTResponse {
  nfts: NFTDisplay[];
}
