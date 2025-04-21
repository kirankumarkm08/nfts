"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar as NavbarData } from "@/constants";
import MobileMenu from "./MobileView";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useCardano } from "@/provider/CardenoProvider";
import { CardanoWalletSelector } from "@/components/Cardano-wallet-selector";

export default function Navbar() {
  const router = useRouter();
  const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
  const { connected: isCardanoConnected, stakeAddress } = useCardano();

  // Navigate to dashboard when connected to either wallet
  useEffect(() => {
    if (
      (isEvmConnected && evmAddress) ||
      (isCardanoConnected && stakeAddress)
    ) {
      router.push("/dashboard");
    }
  }, [isEvmConnected, evmAddress, isCardanoConnected, stakeAddress, router]);

  return (
    <nav className="flex justify-between px-4 sm:px-8 md:px-20 py-4 fixed w-full bg-white z-50 border-b">
      <div className="flex gap-10">
        <Link href="/" className="font-bold">
          Rare evo 2025
        </Link>

        <div className="md:flex gap-5 hidden">
          {NavbarData.map((item) => (
            <Link
              href={item.link}
              key={item.label}
              className="hover:text-gray-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex items-center">
        <ConnectButton />
        <CardanoWalletSelector />
      </div>

      <div className="lg:hidden">
        <MobileMenu />
      </div>
    </nav>
  );
}
