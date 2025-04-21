"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Hero = () => {
  const router = useRouter();
  const { address } = useAccount();

  function handleClick(destination: string) {
    router.push(destination);
  }

  return (
    <main className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="w-full max-w-6xl bg-gradient-to-b from-[#2d2a4a] to-[#1a1a30] relative overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
            minHeight: "calc(100vh - 200px)",
          }}
        >
          {/* Background stars */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-30"
                // style={{
                //   width: Math.random() * 2 + 1 + "px",
                //   height: Math.random() * 2 + 1 + "px",
                //   top: Math.random() * 100 + "%",
                //   left: Math.random() * 100 + "%",
                // }}
                aria-hidden="true"
              ></div>
            ))}
          </div>

          {/* Gauge element */}
          <div className="absolute top-1/4 left-[10%] opacity-80 transform -translate-y-1/2">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-500 flex items-center justify-center relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#1a1a30] flex items-center justify-center">
                <div
                  className="w-2 h-8 md:h-10 bg-yellow-500 absolute transform rotate-45 origin-bottom rounded-full"
                  style={{ transformOrigin: "center 75%" }}
                ></div>
              </div>
              <div className="w-full h-full rounded-full absolute">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1.5 h-1.5 rounded-full ${
                      i < 8 ? "bg-emerald-400" : "bg-transparent"
                    }`}
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${
                        i * 15
                      }deg) translate(18px, 0) rotate(-${i * 15}deg)`,
                      transformOrigin: "center",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Ethereum logo */}
          <div className="absolute top-1/2 right-[10%] opacity-70">
            <div className="w-20 h-20 md:w-28 md:h-28">
              <svg
                viewBox="0 0 320 512"
                className="w-full h-full text-blue-500 fill-current"
                aria-label="Ethereum Logo"
              >
                <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
              </svg>
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 py-16 px-8 md:px-16 flex flex-col items-center text-center h-full justify-center">
            <div className="mb-2">
              <div className="w-12 h-12 mx-auto mb-2">
                <svg
                  viewBox="0 0 50 50"
                  className="w-full h-full text-yellow-500 fill-current"
                  aria-label="RARE EVO Icon"
                >
                  <path d="M25 2L37.5 15H12.5L25 2Z M5 20H45V45H5V20Z" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-300 to-emerald-400">
                  RARE EVO 2025
                </span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-green-300 to-emerald-400 mx-auto mb-4"></div>
            </div>

            <h2 className="text-2xl md:text-3xl text-white font-light mb-6">
              NFT Ticket Management System
            </h2>

            <p className="text-white/80 max-w-2xl mb-10 text-center">
              Welcome to the official ticket platform for RARE EVO 2025 — the
              premier web3 and NFT event taking place August 6-10, 2025 at
              Caesar&apos;s Palace in Las Vegas, NV.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!address ? "" : <ConnectButton />}

              {/* {address && router.push("/Dashboard")} */}

              <button
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors"
                onClick={() => handleClick("/support")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
