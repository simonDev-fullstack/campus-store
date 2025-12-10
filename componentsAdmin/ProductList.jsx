import { Edit2, Trash2, Image as ImageIcon, Package, X } from 'lucide-react';
import { useState } from 'react';

export function ProductList({
  products,
  categories,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  onEdit,
  onDelete,
}) {
  const [previewImage, setPreviewImage] = useState(null);
  
  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-gray-900 mb-2">No products yet</h3>
        <p className="text-gray-600">Get started by adding your first product</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-gray-700">Product</th>
              <th className="px-6 py-3 text-left text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-gray-700">Tags</th>
              <th className="px-6 py-3 text-left text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => onSelectProduct(product.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.images.length > 0 ? (
                      <button
                        onClick={() => setPreviewImage(product.images[0])}
                        className="relative group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
                        />
                        {product.images.length > 1 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                            {product.images.length}
                          </div>
                        )}
                      </button>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-gray-900 truncate">{product.name}</div>
                      <div className="text-gray-500 text-sm truncate">{product.description.substring(0, 40)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-sm">
                    {getCategoryName(product.category_id)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900">
                  ${product.default_price?.toFixed(2) || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {product.variants.slice(0, 2).map((variant, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs"
                      >
                        {variant.color || variant.size || 'Variant'}
                      </span>
                    ))}
                    {product.variants.length > 2 && (
                      <span className="text-gray-500 text-xs">
                        +{product.variants.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    {product.in_stock ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-sm w-fit">
                        <Package className="w-3.5 h-3.5" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-sm w-fit">
                        <Package className="w-3.5 h-3.5" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this product?')) {
                          onDelete(product.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
