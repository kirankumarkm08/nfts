export function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#1a1a30] to-[#0f0f20] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About RARE EVO 2025
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-emerald-400 mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Experience the future of event ticketing with our NFT-powered
            ticketing system. Enjoy enhanced security, verified ownership, and a
            seamless experience from purchase to event entry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* NFT Tickets Card */}
          <div
            className="bg-gradient-to-br from-[#2d2a4a]/80 to-[#1a1a30]/80 p-8 rounded-lg transform relative"
            style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}
          >
            <div className="w-16 h-16 rounded-full bg-yellow-900/30 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="4" y="8" width="16" height="8" rx="1" />
                <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                <path d="M6 16v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" />
                <path d="M10 8v8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">NFT Tickets</h3>
            <div className="w-12 h-0.5 bg-yellow-500 mb-4"></div>
            <p className="text-gray-300">
              Securely mint your ticket as an NFT on the Base network. Each
              ticket is a unique digital asset that provides verified access to
              RARE EVO 2025.
            </p>
          </div>

          {/* Blockchain Security Card */}
          <div
            className="bg-gradient-to-br from-[#2d2a4a]/80 to-[#1a1a30]/80 p-8 rounded-lg transform relative"
            style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-emerald-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">
              Blockchain Security
            </h3>
            <div className="w-12 h-0.5 bg-emerald-500 mb-4"></div>
            <p className="text-gray-300">
              Prevent counterfeiting and unauthorized transfers with blockchain
              verification. Your ticket ownership is securely recorded on the
              Base network.
            </p>
          </div>

          {/* Easy Registration Card */}
          <div
            className="bg-gradient-to-br from-[#2d2a4a]/80 to-[#1a1a30]/80 p-8 rounded-lg transform relative"
            style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-emerald-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">
              Easy Registration
            </h3>
            <div className="w-12 h-0.5 bg-emerald-500 mb-4"></div>
            <p className="text-gray-300">
              Register your information securely to link your identity to your
              NFT ticket, ensuring a smooth check-in process at the event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
