export function FeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#0f0f20] to-[#1a1a30] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Features & Benefits
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-emerald-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Demo Mode Card */}
          <div className="bg-gradient-to-br from-[#2d2a4a]/80 to-[#1a1a30]/80 p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 7h-3V5.5A2.5 2.5 0 0 0 13.5 3h-3A2.5 2.5 0 0 0 8 5.5V7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9-1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V7h-4V5.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">
                Demo Mode For First-time Users
                <div className="w-12 h-0.5 bg-yellow-500 mt-1"></div>
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              Try our system without any ETH! Our Demo Mode allows you to
              experience the full ticketing process with no blockchain
              transaction costs.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Mint a demo ticket without ETH</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Experience the registration process</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>View and test the QR code display</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Perfect for first-time users and testing</span>
              </li>
            </ul>
          </div>

          {/* Enhanced Ticket Display Card */}
          <div className="bg-gradient-to-br from-[#2d2a4a]/80 to-[#1a1a30]/80 p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-900/30 flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm-10-8h12v2H6V6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">
                Enhanced Ticket Display
                <div className="w-12 h-0.5 bg-emerald-500 mt-1"></div>
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              Our ticket view features a large, prominent QR code for easy
              scanning at the event entrance, along with all your essential
              attendee information.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Large, easy-to-scan QR code</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Clear status indicators (Claimed/Unclaimed)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Important attendee details</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Truncated wallet address for security</span>
              </li>
            </ul>
          </div>

          {/* Responsive Design Card */}
          <div className="bg-gradient-to-br from-[#2d2a4a]/80 to-[#1a1a30]/80 p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v2H5v-2zm0-8h14v2H5V7zm0 4h14v2H5v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">
                Responsive Design
                <div className="w-12 h-0.5 bg-yellow-500 mt-1"></div>
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              Access your tickets from any device with our fully responsive
              design that looks great on desktops, tablets, and mobile phones.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Optimized for all screen sizes</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Consistent experience across devices</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Smooth animations and transitions</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Accessible and user-friendly interface</span>
              </li>
            </ul>
          </div>

          {/* Privacy & Security Card */}
          <div className="bg-gradient-to-br from-[#2d2a4a]/80 to-[#1a1a30]/80 p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-900/30 flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">
                Privacy & Security
                <div className="w-12 h-0.5 bg-emerald-500 mt-1"></div>
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              Your data security is our priority. We use blockchain technology
              to ensure ticket authenticity while protecting your personal
              information.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Comprehensive privacy policy</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Secure registration process</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Verified ticket ownership</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Transparent terms and conditions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
