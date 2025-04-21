import { CardanoWallet } from "../provider/CardenoProvider";

declare global {
  interface Window {
    cardano?: {
      [key: string]: CardanoWallet | undefined;
    };
  }
}
