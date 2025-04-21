"use client";

import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] text-sm font-medium"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-[var(--background)] p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Rare Evo 2025</h2>
              <nav className="mt-6 flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/privacy"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Terms
                </Link>
                <Link
                  href="/support"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Support
                </Link>
                <ConnectButton />
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
