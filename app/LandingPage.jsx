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

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => p.tags?.includes(filter));
    return matchesCategory && matchesSearch && matchesFilters;
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Header
        cartCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero */}
      <Hero />

      {/* Main content */}
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
          />
        )}
      </main>

      {/* Footer opens InfoPages */}
      <Footer onInfoClick={setInfoPage} />

      {/* Product detail modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart drawer */}
      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      )}

      {/* Info pages */}
      {infoPage && (
        <InfoPages page={infoPage} onClose={() => setInfoPage(null)} />
      )}
    </div>
  );
}
