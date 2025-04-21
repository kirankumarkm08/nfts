import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-[var(--border)] py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} Rare Evo 2025. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-sm text-[var(--primary)] font-medium"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
