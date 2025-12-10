import { useState } from 'react';
import { Star, GripVertical, Image as ImageIcon } from 'lucide-react';

export function FeaturedProductsManager({
  products,
  featuredProducts,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const nonFeaturedProducts = products.filter(p => !featuredProducts.some(fp => fp.product_id === p.id));

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newFeatured = [...featuredProducts];
    const draggedItem = newFeatured[draggedIndex];
    newFeatured.splice(draggedIndex, 1);
    newFeatured.splice(index, 0, draggedItem);

    // Update positions for all featured products
    newFeatured.forEach((fp, idx) => {
      onUpdate(fp.id, { position: idx + 1 });
    });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-gray-900">Featured Products</h2>
        <p className="text-gray-600">
          Manage which products are featured on your homepage
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Featured Products */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-600" />
            <h3 className="text-gray-900">Featured ({featuredProducts.length})</h3>
          </div>
          
          {featuredProducts.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No featured products yet</p>
              <p className="text-gray-500 text-sm mt-1">
                Click the star icon on products to feature them
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {featuredProducts.map((fp, index) => (
                  <div
                    key={fp.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 p-4 cursor-move hover:bg-gray-50 ${
                      draggedIndex === index ? 'opacity-50' : ''
                    }`}
                  >
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    {fp.product?.images?.length > 0 ? (
                      <img
                        src={fp.product.images[0].url}
                        alt={fp.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-gray-900">{fp.product?.name}</div>
                      <div className="text-gray-600 text-sm">
                        ${fp.product?.default_price?.toFixed(2) || 'N/A'}
                      </div>
                    </div>
                    <button
                      onClick={() => onDelete(fp.id)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      title="Remove from featured"
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="text-gray-500 text-sm mt-3">
            Drag and drop to reorder featured products
          </p>
        </div>

        {/* Available Products */}
        <div>
          <h3 className="text-gray-900 mb-4">
            Available Products ({nonFeaturedProducts.length})
          </h3>
          
          {nonFeaturedProducts.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">All products are featured!</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-h-[600px] overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {nonFeaturedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50"
                  >
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-gray-900">{product.name}</div>
                      <div className="text-gray-600 text-sm">
                        ${product.default_price?.toFixed(2) || 'N/A'}
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleFeatured(product.id)}
                      className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      title="Add to featured"
                    >
                      <Star className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
