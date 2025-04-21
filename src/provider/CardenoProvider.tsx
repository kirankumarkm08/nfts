"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from "react";

// Define the wallet API interface based on CIP-30 standard
interface CardanoWallet {
  name: string;
  icon: string;
  apiVersion: string;
  enable: () => Promise<CardanoAPI>;
  isEnabled: () => Promise<boolean>;
}

interface CardanoAPI {
  getNetworkId: () => Promise<number>;
  getUtxos: () => Promise<string[] | undefined>;
  getBalance: () => Promise<string>;
  getUsedAddresses: () => Promise<string[]>;
  getUnusedAddresses: () => Promise<string[]>;
  getChangeAddress: () => Promise<string>;
  getRewardAddresses: () => Promise<string[]>;
  signTx: (tx: string, partialSign: boolean) => Promise<string>;
  submitTx: (tx: string) => Promise<string>;
  getCollateral: () => Promise<string[] | undefined>;
}

// Export the types
export type { CardanoWallet, CardanoAPI };

// Define the context interface
interface CardanoContextType {
  availableWallets: CardanoWallet[];
  connectedWallet: CardanoWallet | null;
  api: CardanoAPI | null;
  connecting: boolean;
  connected: boolean;
  address: string;
  stakeAddress: string;
  balance: string;
  connectWallet: (walletName: string) => Promise<boolean>;
  disconnectWallet: () => void;
}

// Create the context with default values
const CardanoContext = createContext<CardanoContextType>({
  availableWallets: [],
  connectedWallet: null,
  api: null,
  connecting: false,
  connected: false,
  address: "",
  stakeAddress: "",
  balance: "",
  connectWallet: async () => false,
  disconnectWallet: () => {},
});

// Provider component
export function CardanoProvider({ children }: { children: ReactNode }) {
  const [availableWallets, setAvailableWallets] = useState<CardanoWallet[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<CardanoWallet | null>(
    null
  );
  const [api, setApi] = useState<CardanoAPI | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [stakeAddress, setStakeAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [walletCheckAttempts, setWalletCheckAttempts] = useState(0);

  // Check for available Cardano wallets with retry mechanism
  useEffect(() => {
    const checkWallets = () => {
      if (typeof window === "undefined" || !window.cardano) {
        // If we haven't tried too many times, schedule another check
        if (walletCheckAttempts < 5) {
          setTimeout(() => {
            setWalletCheckAttempts((prev) => prev + 1);
          }, 1000);
        }
        return;
      }

      const wallets: CardanoWallet[] = [];

      // Check for Nami
      if (window.cardano?.nami) {
        wallets.push({
          name: "Nami",
          icon: "https://namiwallet.io/favicon.ico",
          apiVersion: window.cardano.nami.apiVersion,
          enable: window.cardano.nami.enable,
          isEnabled: window.cardano.nami.isEnabled,
        });
      }

      // Check for Eternl (CCVault)
      if (window.cardano?.eternl) {
        wallets.push({
          name: "Eternl",
          icon: "https://eternl.io/favicon.ico",
          apiVersion: window.cardano.eternl.apiVersion,
          enable: window.cardano.eternl.enable,
          isEnabled: window.cardano.eternl.isEnabled,
        });
      }

      // Check for Flint
      if (window.cardano?.flint) {
        wallets.push({
          name: "Flint",
          icon: "https://flint-wallet.com/favicon.ico",
          apiVersion: window.cardano.flint.apiVersion,
          enable: window.cardano.flint.enable,
          isEnabled: window.cardano.flint.isEnabled,
        });
      }

      // Check for Yoroi
      if (window.cardano?.yoroi) {
        wallets.push({
          name: "Yoroi",
          icon: "https://yoroi-wallet.com/favicon.ico",
          apiVersion: window.cardano.yoroi.apiVersion,
          enable: window.cardano.yoroi.enable,
          isEnabled: window.cardano.yoroi.isEnabled,
        });
      }

      // Check for Lace
      if (window.cardano?.lace) {
        wallets.push({
          name: "Lace",
          icon: "https://www.lace.io/favicon.ico",
          apiVersion: window.cardano.lace.apiVersion,
          enable: window.cardano.lace.enable,
          isEnabled: window.cardano.lace.isEnabled,
        });
      }

      // Check for Typhon
      if (window.cardano?.typhon) {
        wallets.push({
          name: "Typhon",
          icon: "https://typhonwallet.io/favicon.ico",
          apiVersion: window.cardano.typhon.apiVersion,
          enable: window.cardano.typhon.enable,
          isEnabled: window.cardano.typhon.isEnabled,
        });
      }

      // Check for GeroWallet
      if (window.cardano?.gerowallet) {
        wallets.push({
          name: "GeroWallet",
          icon: "https://gerowallet.io/favicon.ico",
          apiVersion: window.cardano.gerowallet.apiVersion,
          enable: window.cardano.gerowallet.enable,
          isEnabled: window.cardano.gerowallet.isEnabled,
        });
      }

      setAvailableWallets(wallets);
    };

    checkWallets();
  }, [walletCheckAttempts]);

  // Connect to a wallet - use useCallback to memoize the function
  const connectWallet = useCallback(
    async (walletName: string) => {
      try {
        setConnecting(true);

        const wallet = availableWallets.find(
          (w) => w.name.toLowerCase() === walletName.toLowerCase()
        );

        if (!wallet) {
          throw new Error(`Wallet ${walletName} not found. Please install it.`);
        }

        // Check if already enabled
        const isEnabled = await wallet.isEnabled().catch(() => false);

        // Enable the wallet
        const walletApi = isEnabled
          ? await wallet.enable()
          : await wallet.enable();

        // Get wallet data
        const addresses = await walletApi.getUsedAddresses().catch(() => []);
        const rewardAddresses = await walletApi
          .getRewardAddresses()
          .catch(() => []);
        const walletBalance = await walletApi.getBalance().catch(() => "0");

        // Convert hex addresses to readable format if needed
        const primaryAddress = addresses[0] || "";
        const primaryStakeAddress = rewardAddresses[0] || "";

        // Format balance (convert from lovelace to ADA)
        const formattedBalance = (
          Number.parseInt(walletBalance) / 1000000
        ).toFixed(6);

        // Set state
        setConnectedWallet(wallet);
        setApi(walletApi);
        setConnected(true);
        setAddress(primaryAddress);
        setStakeAddress(primaryStakeAddress);
        setBalance(formattedBalance);

        // Store connection in local storage
        localStorage.setItem("cardanoWallet", walletName);

        console.log("Connected to Cardano wallet:", {
          wallet: walletName,
          address: primaryAddress,
          stakeAddress: primaryStakeAddress,
          balance: formattedBalance,
        });

        return true;
      } catch (error) {
        console.error("Error connecting to Cardano wallet:", error);
        return false;
      } finally {
        setConnecting(false);
      }
    },
    [availableWallets]
  );

  // Disconnect wallet - use useCallback to memoize the function
  const disconnectWallet = useCallback(() => {
    setConnectedWallet(null);
    setApi(null);
    setConnected(false);
    setAddress("");
    setStakeAddress("");
    setBalance("");

    // Remove from local storage
    localStorage.removeItem("cardanoWallet");
  }, []);

  // Auto-connect on startup if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      const savedWallet = localStorage.getItem("cardanoWallet");

      if (savedWallet && availableWallets.length > 0) {
        await connectWallet(savedWallet);
      }
    };

    if (availableWallets.length > 0 && !connected && !connecting) {
      autoConnect();
    }
  }, [availableWallets, connected, connecting, connectWallet]);
  // Added connectWallet to dependency array

  const value = {
    availableWallets,
    connectedWallet,
    api,
    connecting,
    connected,
    address,
    stakeAddress,
    balance,
    connectWallet,
    disconnectWallet,
  };

  return (
    <CardanoContext.Provider value={value}>{children}</CardanoContext.Provider>
  );
}

// Custom hook to use the Cardano context
export function useCardano() {
  const context = useContext(CardanoContext);
  if (context === undefined) {
    throw new Error("useCardano must be used within a CardanoProvider");
  }
  return context;
}

// Add TypeScript declarations for window.cardano
declare global {
  interface Window {
    cardano?: {
      nami?: CardanoWallet;
      eternl?: CardanoWallet;
      flint?: CardanoWallet;
      yoroi?: CardanoWallet;
      lace?: CardanoWallet;
      typhon?: CardanoWallet;
      gerowallet?: CardanoWallet;
      [key: string]: CardanoWallet | undefined;
    };
  }
}
