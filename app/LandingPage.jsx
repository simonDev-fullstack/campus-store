"use client";

import React from "react";
import { useApp } from "@/contexts/AppContext";
import Header from "@/components/Header";
import { Hero } from "@/components/Hero";
import Footer from "@/components/Footer";
import { CategoryNav } from "@/components/CategoryNav";
import { FilterBar } from "@/components/FilterBar";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductDetail } from "@/components/ProductDetail";
import { Cart } from "@/components/Cart";
import { InfoPages } from "@/components/infoPages";
import { Search } from "lucide-react";
import { SearchOverlay } from "@/components/SearchOverlay";

export default function LandingPage({ products, categories }) {
  const {
    selectedCategory,
    setSelectedCategory,
    cartItems,
    setIsCartOpen,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    searchQuery,
    setSearchQuery,
    selectedFilters,
    setSelectedFilters,
    selectedProduct,
    setSelectedProduct,
    infoPage,
    setInfoPage
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  /** Filter logic */
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((f) => p.tags?.includes(f));

    return matchesCategory && matchesSearch && matchesFilters;
  });

  /** Results for overlay (lighter filter) */
  const filteredResults = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* HEADER */}
      <Header
        cartCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(v) => {
          setSearchQuery(v);
          if (!isSearchOpen) setIsSearchOpen(true);  // Open overlay on input focus
        }}
        onSearchFocus={() => setIsSearchOpen(true)}
      />

      {/* HERO */}
<Hero flashProducts={products} />

      {/* SEARCH OVERLAY — Option C */}
      <SearchOverlay
        isOpen={isSearchOpen}
        query={searchQuery}
        setQuery={setSearchQuery}
        results={filteredResults}
        onClose={() => {
          setIsSearchOpen(false);
          setSearchQuery("");
        }}
        onResultClick={(product) => {
          setSelectedProduct(product);
          setIsSearchOpen(false);
        }}
      />

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <FilterBar
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <p className="text-neutral-500 mb-4 text-lg">
              {searchQuery
                ? `No products found matching "${searchQuery}"`
                : "No products match your filters"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilters([]);
              }}
              className="text-neutral-900 hover:underline underline-offset-2"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onProductClick={setSelectedProduct}
           onAddToCart={addToCart}

          />
        )}
      </main>

      {/* FOOTER */}
      <Footer onInfoClick={setInfoPage} />

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* CART */}
      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      )}

      {/* INFO PAGES */}
      {infoPage && (
        <InfoPages page={infoPage} onClose={() => setInfoPage(null)} />
      )}
    </div>
  );
}
