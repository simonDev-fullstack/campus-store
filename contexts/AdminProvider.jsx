"use client";

import { createContext, useContext, useState, useEffect } from "react";

// ----------------------------------------------
// CONTEXT SETUP
// ----------------------------------------------
const AdminContext = createContext(null);
export const useAdmin = () => useContext(AdminContext);

// ----------------------------------------------
// CONFIG
// ----------------------------------------------
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5555/api";

const API = {
  products: "/admin/products",
  product: "/admin/product",

  categories: "/admin/categories",
  category: "/admin/category",

  productVariants: "/admin/productvariants",
  productVariant: "/admin/productvariant",

  productImages: "/admin/productimages",
  productImage: "/admin/productimage",

  flashSales: "/admin/flashsale",
  flashSale: "/admin/flashsale",

  featured: "/admin/featured",
  featuredProducts: "/admin/featured",

  upload: "/admin/upload",
  bulkProducts: "/admin/products/bulk",
};

// ----------------------------------------------
// API WRAPPERS
// ----------------------------------------------
async function apiRequest(path, method = "GET", body = null) {
  let token = "";
  try {
    token = localStorage.getItem("access_token");
  } catch {}

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(method !== "GET" && body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    let e = await res.json().catch(() => ({}));
    throw new Error(e?.msg || `API Error: ${res.status}`);
  }

  return res.json().catch(() => ({}));
}

// For uploads
async function uploadFile(path, file) {
  const form = new FormData();
  form.append("file", file);

  const token = localStorage.getItem("access_token");

  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
    credentials: "include",
  });

  if (!res.ok) {
    let e = await res.json().catch(() => ({}));
    throw new Error(e?.msg || "Upload failed");
  }

  return res.json();
}

// ----------------------------------------------
// PROVIDER
// ----------------------------------------------
export function AdminProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // ----------------------------------------------
  // FETCH EVERYTHING
  // ----------------------------------------------
  async function fetchAll() {
    setLoading(true);

    try {
      const [
        prodRes,
        catRes,
        saleRes,
        varRes,
        imgRes,
        featRes,
      ] = await Promise.all([
        apiRequest(API.products),
        apiRequest(API.categories),
        apiRequest(API.flashSales),
        apiRequest(API.productVariants),
        apiRequest(API.productImages),
        apiRequest(API.featuredProducts),
      ]);

      setProducts(Array.isArray(prodRes) ? prodRes : prodRes?.products || []);
      setCategories(Array.isArray(catRes) ? catRes : catRes?.categories || []);
      setFlashSales(Array.isArray(saleRes) ? saleRes : saleRes?.flashSales || []);
      setProductVariants(Array.isArray(varRes) ? varRes : varRes?.productVariants || []);
      setProductImages(Array.isArray(imgRes) ? imgRes : imgRes?.productImages || []);
      setFeaturedProducts(Array.isArray(featRes) ? featRes : featRes?.featuredProducts || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  // ----------------------------------------------
  // CRUD HELPERS (unified)
  // ----------------------------------------------
  async function saveItem(endpoint, data, id = null, method = "POST") {
    const path = id ? `${endpoint}/${id}` : endpoint;
    const res = await apiRequest(path, method, data);
    await fetchAll();
    return res;
  }

  async function removeItem(endpoint, id) {
    await apiRequest(`${endpoint}/${id}`, "DELETE");

    // Optimistic updates
    if (endpoint === API.products)
      setProducts((prev) => prev.filter((p) => p.id !== id));

    if (endpoint === API.categories)
      setCategories((prev) => prev.filter((c) => c.id !== id));

    if (endpoint === API.flashSales)
      setFlashSales((prev) => prev.filter((s) => s.id !== id));
  }

  // ----------------------------------------------
  // VALUE EXPOSED TO APP
  // ----------------------------------------------
  const value = {
    loading,
    products,
    categories,
    flashSales,
    productVariants,
    productImages,
    featuredProducts,

    fetchAll,

    // Upload
    uploadImage: (file) => uploadFile(API.upload, file),

    // Categories
    addCategory: (d) => saveItem(API.category, d),
    updateCategory: (id, d) => saveItem(API.category, d, id, "PUT"),
    deleteCategory: (id) => removeItem(API.categories, id),

    // Products
    addProduct: (d) => saveItem(API.product, d),
    updateProduct: (id, d) => saveItem(API.product, d, id, "PUT"),
    deleteProduct: (id) => removeItem(API.products, id),

    // Product Variants
    addProductVariant: (d) => saveItem(API.productVariant, d),
    updateProductVariant: (id, d) => saveItem(API.productVariant, d, id, "PUT"),
    deleteProductVariant: (id) => removeItem(API.productVariants, id),

    // Product Images
    addProductImage: (d) => saveItem(API.productImage, d),
    updateProductImage: (id, d) => saveItem(API.productImage, d, id, "PUT"),
    deleteProductImage: (id) => removeItem(API.productImages, id),

    // Flash Sales
    addFlashSale: (d) => saveItem(API.flashSale, d),
    updateFlashSale: (id, d) => saveItem(API.flashSale, d, id, "PUT"),
    deleteFlashSale: (id) => removeItem(API.flashSales, id),

    // Flash Sale Products Management
    addProductToFlashSale: (flashSaleId, data) =>
      apiRequest(`/admin/flashsale/${flashSaleId}/products`, "POST", data).then(() => fetchAll()),
    updateFlashSaleProduct: (flashSaleId, productId, data) =>
      apiRequest(`/admin/flashsale/${flashSaleId}/products/${productId}`, "PUT", data).then(() => fetchAll()),
    removeProductFromFlashSale: (flashSaleId, productId) =>
      apiRequest(`/admin/flashsale/${flashSaleId}/products/${productId}`, "DELETE").then(() => fetchAll()),

    // Category Products Management
    getCategoryProducts: (categoryId) =>
      apiRequest(`/admin/category/${categoryId}/products`),
    removeProductFromCategory: (categoryId, productId) =>
      apiRequest(`/admin/category/${categoryId}/products/${productId}`, "DELETE").then(() => fetchAll()),

    // Featured Products
    addFeaturedProduct: (d) => saveItem(API.featured, d),
    updateFeaturedProduct: (id, d) => saveItem(API.featured, d, id, "PUT"),
    deleteFeaturedProduct: (id) => removeItem(API.featuredProducts, id),

    // Featured toggle
    toggleFeatured: (product_id) =>
      apiRequest(API.featured, "POST", { product_id }),

    // Bulk operations
    bulkDelete: (ids) =>
      apiRequest(API.bulkProducts, "POST", { action: "delete", ids }),
    bulkUpdateCategory: (ids, category_id) =>
      apiRequest(API.bulkProducts, "POST", {
        action: "update_category",
        ids,
        category_id,
      }),
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
