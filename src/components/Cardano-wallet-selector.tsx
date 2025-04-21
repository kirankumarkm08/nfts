"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCardano } from "@/provider/CardenoProvider";
import { WalletIcon } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CardanoWalletSelector() {
  const {
    availableWallets,
    connectWallet,
    connecting,
    connected,
    disconnectWallet,
    stakeAddress,
  } = useCardano();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (walletName: string) => {
    setError(null);
    const success = await connectWallet(walletName);
    if (success) {
      setOpen(false);
    } else {
      setError(`Failed to connect to ${walletName}. Please try again.`);
    }
  };

  // If connected, show the disconnect button with address
  if (connected && stakeAddress) {
    return (
      <Button
        variant="outline"
        onClick={disconnectWallet}
        className="ml-2 flex items-center gap-2"
      >
        <WalletIcon className="h-4 w-4" />
        <span className="hidden md:inline">
          {stakeAddress.substring(0, 6)}...
          {stakeAddress.substring(stakeAddress.length - 4)}
        </span>
        <span className="md:hidden">Disconnect</span>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">
          <WalletIcon className="mr-2 h-4 w-4" />
          Connect Cardano
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Cardano Wallet</DialogTitle>
          <DialogDescription>
            Select a wallet to connect to the Cardano blockchain.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="grid gap-4 py-4">
          {availableWallets.length === 0 ? (
            <div className="text-center p-4">
              <p className="mb-4">No Cardano wallets detected.</p>
              <p className="text-sm text-muted-foreground">
                Please install one of the following wallets:
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a
                  href="https://namiwallet.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <span className="text-lg font-bold">N</span>
                  </div>
                  <span className="text-sm">Nami</span>
                </a>
                <a
                  href="https://eternl.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <span className="text-lg font-bold">E</span>
                  </div>
                  <span className="text-sm">Eternl</span>
                </a>
                <a
                  href="https://flint-wallet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <span className="text-lg font-bold">F</span>
                  </div>
                  <span className="text-sm">Flint</span>
                </a>
              </div>
            </div>
          ) : (
            availableWallets.map((wallet) => (
              <Button
                key={wallet.name}
                variant="outline"
                className="flex justify-start items-center gap-3 p-4 h-auto"
                onClick={() => handleConnect(wallet.name)}
                disabled={connecting}
              >
                {wallet.icon ? (
                  <Image
                    src={wallet.icon || "/placeholder.svg"}
                    alt={wallet.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                    onError={(e) => {
                      // If image fails to load, replace with a fallback
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {wallet.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex flex-col items-start">
                  <span>{wallet.name}</span>
                  <span className="text-xs text-muted-foreground">
                    v{wallet.apiVersion}
                  </span>
                </div>
              </Button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
