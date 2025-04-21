export interface NFTMetadata {
  asset: string;
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  quantity: string;
  initial_mint_tx_hash: string;
  mint_or_burn_count: number;
  onchain_metadata?: {
    name?: string;
    image?: string;
    description?: string;
  };
  metadata?: {
    name?: string;
    description?: string;
  };
}

export interface NFTTransaction {
  tx_hash: string;
  tx_index: number;
  block_height: number;
  block_time: number;
}

export interface WalletState {
  connected: boolean;
  loading: boolean;
  error: string | null;
  address: string | null;
}

export interface NFTsState {
  items: NFTMetadata[];
  loading: boolean;
  error: string | null;
}

export interface CardanoAsset {
  unit: string;
  quantity: string;
  policy_id: string;
  asset_name: string;
  fingerprint: string;
}

export interface CardanoAssetDetails {
  asset: string;
  policy_id: string;
  asset_name: string | null;
  fingerprint: string;
  quantity: string;
  initial_mint_tx_hash: string;
  mint_or_burn_count: number;
  onchain_metadata: {
    name?: string;
    image?: string;
    description?: string;
    [key: string]: unknown;
  } | null;
  metadata: {
    name: string;
    description: string;
    ticker: string | null;
    url: string | null;
    logo: string | null;
    decimals: number | null;
  } | null;
  onchain_metadata_standard?:
    | "CIP25v1"
    | "CIP25v2"
    | "CIP68v1"
    | "CIP68v2"
    | "CIP68v3"
    | null;
  onchain_metadata_extra?: string;
}
