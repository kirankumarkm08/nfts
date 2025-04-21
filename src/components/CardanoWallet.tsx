"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCardano } from "../provider/CardenoProvider";
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
  const { availableWallets, connectWallet, connecting, connected } =
    useCardano();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (walletName: string) => {
    try {
      setError(null);
      await connectWallet(walletName);
      setOpen(false);
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    }
  };

  if (connected) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <WalletIcon className="mr-2 h-4 w-4" />
          Connect Cardano Wallet
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
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
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
            availableWallets.map(
              (wallet: { name: string; icon?: string; apiVersion: string }) => (
                <Button
                  key={wallet.name}
                  variant="outline"
                  className="flex justify-start items-center gap-3 p-4 h-auto"
                  onClick={() => handleConnect(wallet.name)}
                  disabled={connecting}
                >
                  {wallet.icon ? (
                    <Image
                      src={wallet.icon}
                      alt={wallet.name}
                      width={24}
                      height={24}
                      className="rounded-full"
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
              )
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
