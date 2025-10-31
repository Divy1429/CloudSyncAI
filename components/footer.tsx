import { LeLoLogo } from "./lelo-logo"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-8 sm:py-10 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <LeLoLogo className="mb-3 sm:mb-4" />
            <p className="text-xs sm:text-sm text-white/70 mb-2 sm:mb-4 max-w-md">
              The AI-powered data sync platform for modern enterprises. Automate your data workflows and scale with
              confidence.
            </p>
            <p className="text-xs text-white/50 italic">"Intelligent data synchronization made simple"</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm md:text-base">Product</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm md:text-base">Company</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-white/50">
          <p>&copy; 2025 CloudSync AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
