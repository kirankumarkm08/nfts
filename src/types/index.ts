export interface navbar {
  label: string;
  link: string;
}

export type NFT = {
  token_address: string;
  token_id: string;
  amount: string;
  owner_of: string;
  token_hash: string;
  block_number_minted: string;
  block_number: string;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  last_token_uri_sync: string;
  last_metadata_sync: string;
  minter_address: string;
  normalized_metadata?: {
    name: string;
    description: string;
    image: string;
    external_link: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
  };
};
