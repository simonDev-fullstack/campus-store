import { useState } from "react";
import { ShoppingCart } from "lucide-react";

// TAG CONFIG
const TAG_STYLES = {
  bestseller: { label: "Best Seller", className: "bg-blue-500 text-white" },
  new: { label: "New", className: "bg-green-500 text-white" },
  sale: { label: "Sale", className: "bg-red-500 text-white" },
  default: { label: "Tag", className: "bg-neutral-900 text-white" },
};

export function ProductGrid({ products, onProductClick, onAddToCart }) {
  const [addingItem, setAddingItem] = useState(null);

  const renderTag = (tag) => {
    const config = TAG_STYLES[tag] || { label: tag, className: TAG_STYLES.default.className };
    return (
      <span
        key={tag}
        className={`text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  const handleAddToCart = (product) => {
    setAddingItem(product.id);
    onAddToCart(product);

  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onProductClick(product)}
          className="relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                     hover:shadow-2xl hover:scale-[1.02] border border-neutral-100 hover:border-neutral-200 group touch-manipulation"
        >
          {/* Image */}
          <div className="relative w-full aspect-4/5 bg-neutral-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.tags.map(renderTag)}
              </div>
            )}

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm rounded-2xl">
                <span className="text-white text-sm px-3 py-1.5 bg-red-600 rounded-lg font-medium shadow-md">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 sm:p-5 flex flex-col gap-3">
            <h3 className="text-neutral-900 font-semibold text-sm sm:text-base line-clamp-2">
              {product.name}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-neutral-900 font-bold text-base sm:text-lg">
                  ${product.price.toFixed(2)}
                </p>
                {product.originalPrice && (
                  <p className="text-neutral-400 line-through text-sm sm:text-base">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Add to Cart Button */}
              {product.inStock && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    handleAddToCart(product);
                  }}
                  className={`
                    p-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-all
                    flex items-center justify-center relative
                  `}
                >
                  <ShoppingCart
                    className={`w-4 h-4 transition-transform duration-300 ${
                      addingItem === product.id ? "animate-bounce" : ""
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
