"use client"
import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOrderNowOpen, setIsOrderNowOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [infoPage, setInfoPage] = useState(null);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) =>
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));

  const updateQuantity = (productId, qty) =>
    setCartItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i
      )
    );

  return (
    <AppContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,

        selectedProduct,
        setSelectedProduct,

        searchQuery,
        setSearchQuery,

        selectedFilters,
        setSelectedFilters,

        infoPage,
        setInfoPage,

        isCartOpen,
        setIsCartOpen,

        isOrderNowOpen,
        setIsOrderNowOpen,

        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
