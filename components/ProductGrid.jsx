// ---- 1. TAG CONFIG (Dynamic, Simple to Extend) ----
const TAG_STYLES = {
  bestseller: {
    label: "Best Seller",
    className: "bg-blue-600 text-white",
  },
  new: {
    label: "New",
    className: "bg-green-600 text-white",
  },
  sale: {
    label: "Sale",
    className: "bg-red-600 text-white",
  },
  default: {
    label: "Tag",
    className: "bg-neutral-900 text-white",
  },
};

// ---- 2. MAIN COMPONENT ----
export function ProductGrid({ products, onProductClick }) {
  const renderTag = (tag) => {
    const config = TAG_STYLES[tag] || {
      label: tag,
      className: TAG_STYLES.default.className,
    };

    return (
      <span
        key={tag}
        className={`text-xs px-2.5 py-1 rounded-md shadow-sm ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onProductClick(product)}
          className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:border-neutral-200 group"
        >
          <div className="aspect-square relative bg-neutral-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-sm px-4 py-2 bg-neutral-900 rounded-lg">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                {product.tags.map(renderTag)}
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4">
            <h3 className="text-neutral-900 mb-2 line-clamp-1">
              {product.name}
            </h3>

            <div className="flex items-center gap-2">
              <p className="text-neutral-900">${product.price.toFixed(2)}</p>

              {product.originalPrice && (
                <p className="text-neutral-400 line-through text-sm">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
