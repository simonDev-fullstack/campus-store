"use client";
import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { LayoutGrid, Tag, Star, Zap, Plus } from "lucide-react";

import { BulkActionsBar } from "@/componentsAdmin/BulkActionsBar";
import { ProductList } from "@/componentsAdmin/ProductList";
import { CategoryManager } from "@/componentsAdmin/CategoryManager";
import { FeaturedProductsManager } from "@/componentsAdmin/FeaturedProductsManager";
import { FlashSaleManager } from "@/componentsAdmin/FlashSaleManager";
import { AddProductModal } from "@/componentsAdmin/AddProductModal";
import { EditProductModal } from "@/componentsAdmin/EditProductModal";
import { useAdmin } from "@/contexts/AdminProvider";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);

  // 🟢 FIX: use string tabs for consistency
  const [activeTab, setActiveTab] = useState("1");

  // 🟢 FIX: selection state
  const [selectedProducts, setSelectedProducts] = useState([]);

  // 🟢 FIX: modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    products,
    categories,
    flashSales,
    featuredProducts,

    addProduct,
    updateProduct,
    deleteProduct,

    bulkDelete,
    bulkUpdateCategory,

    addCategory,
    updateCategory,
    deleteCategory,

    addFeaturedProduct,
    updateFeaturedProduct,
    deleteFeaturedProduct,

    addFlashSale,
    updateFlashSale,
    deleteFlashSale,
  } = useAdmin()


  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      setShowLoginModal(false);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  if (!isAuthenticated) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  // 🟢 FIX: tabs use string IDs
  const tabs = [
    { id: "1", label: "Products", icon: LayoutGrid },
    { id: "2", label: "Categories", icon: Tag },
    { id: "3", label: "Featured", icon: Star },
    { id: "4", label: "Flash Sales", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your products, categories, and sales</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PRODUCTS */}
        {activeTab === "1" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900">Products</h2>
                <p className="text-gray-600">{products.length} total products</p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            {selectedProducts.length > 0 && (
              <BulkActionsBar
                selectedCount={selectedProducts.length}
                categories={categories}
                onBulkDelete={bulkDelete}
                onBulkUpdateCategory={bulkUpdateCategory}
                onClearSelection={() => setSelectedProducts([])}
              />
            )}

            <ProductList
              products={products}
              categories={categories}
              selectedProducts={selectedProducts}
              onSelectProduct={(id) =>
                selectedProducts.includes(id)
                  ? setSelectedProducts(selectedProducts.filter((pid) => pid !== id))
                  : setSelectedProducts([...selectedProducts, id])
              }
              onSelectAll={() =>
                selectedProducts.length === products.length
                  ? setSelectedProducts([])
                  : setSelectedProducts(products.map((p) => p.id))
              }
              onEdit={(product) => setEditingProduct(product)}
              onDelete={deleteProduct}
            />
          </div>
        )}

        {/* CATEGORIES */}
        {activeTab === "2" && (
          <CategoryManager
            categories={categories}
            onAdd={addCategory}
            onUpdate={updateCategory}
            onDelete={deleteCategory}
          />
        )}

        {/* FEATURED */}
        {activeTab === "3" && (
          <FeaturedProductsManager
            products={products}
            featuredProducts={featuredProducts}
            onAdd={addFeaturedProduct}
            onUpdate={updateFeaturedProduct}
            onDelete={deleteFeaturedProduct}
          />
        )}

        {/* FLASH SALES */}
        {activeTab === "4" && (
          <FlashSaleManager
            products={products}
            flashSales={flashSales}
            onAdd={addFlashSale}
            onUpdate={updateFlashSale}
            onDelete={deleteFlashSale}
          />
        )}
      </main>

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <AddProductModal
          categories={categories}
          onAdd={(product) => {
            addProduct(product);
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          categories={categories}
          onUpdate={(updates) => {
            updateProduct(editingProduct.id, updates);
            setEditingProduct(null);
          }}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default AdminPage;
