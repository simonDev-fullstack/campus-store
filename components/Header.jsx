import { Store, Search, ShoppingCart } from "lucide-react";

export default function Header({ cartCount, onCartClick, searchQuery, onSearchChange }) {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">

          {/* Logo + Brand */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm 
                            hover:shadow-md hover:bg-blue-600 transition-all cursor-pointer">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-neutral-900 font-medium tracking-tight hidden sm:block">
              Campus Store
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         text-sm transition-all"
            />
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors shrink-0"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-6 h-6 text-neutral-900" />

            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full
                           w-5 h-5 flex items-center justify-center animate-in fade-in zoom-in duration-200"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
