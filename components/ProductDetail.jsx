import { X } from 'lucide-react';

// ---- 1. TAG CONFIG ----
const TAG_STYLES = {
  bestseller: { label: 'Best Seller', className: 'bg-blue-600 text-white' },
  new: { label: 'New Arrival', className: 'bg-green-600 text-white' },
  sale: { label: 'On Sale', className: 'bg-red-600 text-white' },
  default: { label: 'Tag', className: 'bg-neutral-900 text-white' },
};

// ---- 2. COMPONENT ----
export function ProductDetail({ product, onClose, onAddToCart }) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  const renderTag = (tag) => {
    const config = TAG_STYLES[tag] || { ...TAG_STYLES.default, label: tag };
    return (
      <span
        key={tag}
        className={`text-sm px-3 py-1.5 rounded-lg shadow-lg ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-neutral-200 p-4 flex justify-between items-center z-10">
          <h2 className="text-neutral-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Image & Tags */}
          <div className="aspect-square w-full bg-neutral-100 rounded-2xl overflow-hidden mb-6 relative shadow-inner">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tags?.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.tags.map(renderTag)}
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="text-neutral-900 mb-3">{product.name}</h1>

          {/* Price & Discount */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-neutral-900">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <>
                <p className="text-neutral-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
                <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
                  Save {discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-neutral-700 mb-6 leading-relaxed">{product.description}</p>

          {/* Stock Status */}
          <div className="mb-6">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm shadow-sm ${
                product.inStock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {product.inStock ? 'In Stock - Ready to Ship' : 'Currently Out of Stock'}
            </span>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
