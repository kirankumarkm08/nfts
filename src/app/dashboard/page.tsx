"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, useChainId } from "wagmi";
import { fetchNFTs, type NFT } from "@/lib/nft-service";
import fetchCardanoNFTs from "@/services/cardano-service";
import NFTCard from "@/components/nft-card";
import WalletInfo from "@/components/Wallet-Info";
import { base } from "wagmi/chains";
import { useCardano } from "@/provider/CardenoProvider";
import { CardanoWalletSelector } from "@/components/Cardano-wallet-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const router = useRouter();
  const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({ address: evmAddress });
  const {
    connected: isCardanoConnected,
    stakeAddress,
    balance: cardanoBalance,
  } = useCardano();

  const [baseNfts, setBaseNfts] = useState<NFT[]>([]);
  const [cardanoNfts, setCardanoNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("base");

  // Get network name based on chain ID
  const networkName = chainId === base.id ? "Base" : "optimism";

  // Redirect if not connected to any wallet
  useEffect(() => {
    if (!isEvmConnected && !isCardanoConnected) {
      router.push("/");
    }
  }, [isEvmConnected, isCardanoConnected, router]);

  // Set active tab based on which wallet is connected
  useEffect(() => {
    if (isEvmConnected && !isCardanoConnected) {
      setActiveTab("base");
    } else if (!isEvmConnected && isCardanoConnected) {
      setActiveTab("cardano");
    }
  }, [isEvmConnected, isCardanoConnected]);

  // Fetch Base NFTs
  useEffect(() => {
    async function getBaseNFTs() {
      if (!isEvmConnected || !evmAddress) return;

      setLoading(true);
      setError(null);

      try {
        console.log("Fetching Base NFTs for address:", evmAddress);
        const data = await fetchNFTs(evmAddress);
        console.log("Received Base NFTs:", data);
        setBaseNfts(data);
      } catch (err) {
        console.error("Error fetching Base NFTs:", err);
        setError("Failed to fetch Base NFTs. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (activeTab === "base" && isEvmConnected) {
      getBaseNFTs();
    }
  }, [evmAddress, isEvmConnected, activeTab]);

  // Fetch Cardano NFTs
  useEffect(() => {
    async function getCardanoNFTs() {
      if (!isCardanoConnected || !stakeAddress) return;

      setLoading(true);
      setError(null);

      try {
        console.log("Fetching Cardano NFTs for stake address:", stakeAddress);
        const data = await fetchCardanoNFTs(stakeAddress);
        console.log("Received Cardano NFTs:", data);
        setCardanoNfts(data);
      } catch (err) {
        console.error("Error fetching Cardano NFTs:", err);
        setError("Failed to fetch Cardano NFTs. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (activeTab === "cardano" && isCardanoConnected) {
      getCardanoNFTs();
    }
  }, [stakeAddress, isCardanoConnected, activeTab]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Clear any previous errors
    setError(null);
  };

  if (!isEvmConnected && !isCardanoConnected) return null;

  const nfts = activeTab === "base" ? baseNfts : cardanoNfts;
  // const isConnected =
  //   activeTab === "base" ? isEvmConnected : isCardanoConnected;

  return (
    <main className="container mx-auto py-20 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">NFT Dashboard</h1>
        <div className="flex items-center">
          <ConnectButton showBalance={false} />
          <CardanoWalletSelector />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="base" disabled={!isEvmConnected}>
            Base Network {!isEvmConnected && "(Not Connected)"}
          </TabsTrigger>
          <TabsTrigger value="cardano">
            Cardano Network {!isCardanoConnected && "(Not Connected)"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="base">
          {isEvmConnected && evmAddress && (
            <WalletInfo
              address={evmAddress}
              networkName={networkName}
              balance={balanceData?.formatted || "0"}
              getExplorerUrl={(addr) => `https://basescan.org/address/${addr}`}
            />
          )}
        </TabsContent>

        <TabsContent value="cardano">
          {isCardanoConnected && stakeAddress && (
            <WalletInfo
              address={stakeAddress}
              networkName="Cardano"
              balance={cardanoBalance}
              getExplorerUrl={(addr) =>
                `https://cardanoscan.io/address/${addr}`
              }
            />
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Your NFTs on {activeTab === "base" ? "Base" : "Cardano"} Network
        </h2>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <Skeleton className="h-[300px] w-full rounded-t-md" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : nfts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Image
              src={
                activeTab === "base"
                  ? "/abstract-nft-concept.png"
                  : "/abstract-cardano-nft.png"
              }
              alt="No NFTs"
              width={100}
              height={100}
            />
            <p className="mt-4 text-center text-muted-foreground">
              No NFTs found in your {activeTab === "base" ? "Base" : "Cardano"}{" "}
              wallet
            </p>
            <p className="text-sm text-center text-muted-foreground mt-2">
              Try getting some NFTs on the{" "}
              {activeTab === "base" ? "Base" : "Cardano"} network
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
