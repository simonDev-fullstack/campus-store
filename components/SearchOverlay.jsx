"use client";

import { X, Search } from "lucide-react";

export function SearchOverlay({
  isOpen,
  onClose,
  query,
  setQuery,
  results = [],
  onResultClick,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4"
      onClick={onClose}
    >
      {/* Search Modal */}
      <div
        className="
          bg-white w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden
          max-h-[85vh] flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-500 px-4 py-3 flex items-center gap-3">
          <Search className="text-white w-5 h-5" />

          <input
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-white/20 text-white placeholder-white/70 rounded-lg px-3 py-2 focus:outline-none"
            autoFocus
          />

          <button onClick={onClose}>
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Scrollable results */}
        <div className="overflow-y-auto flex-1 px-4 py-4">
          {results.length === 0 && query.trim() !== "" ? (
            <p className="text-neutral-500 text-center py-10">
              No results for “{query}”
            </p>
          ) : (
            <ul className="space-y-3">
              {results.map((p) => (
                <li
                  key={p.id}
                  onClick={() => onResultClick(p)}
                  className="
                    flex items-center gap-4 p-3 border border-neutral-200 
                    rounded-xl hover:bg-neutral-100 cursor-pointer transition
                  "
                >
                  {/* Product Image */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 bg-neutral-100"
                  />

                  {/* Product text */}
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">{p.name}</p>
                    <p className="text-sm text-neutral-500 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
