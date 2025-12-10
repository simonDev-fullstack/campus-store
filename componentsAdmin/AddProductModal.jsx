import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { ImageUploadZone } from './ImageUploadZone';

export function AddProductModal({ categories, onAdd, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: categories[0]?.id || '',
    isFeatured: false,
    inStock: true,
  });
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [variants, setVariants] = useState([]);
  const [showVariantForm, setShowVariantForm] = useState(false);

  const handleAddImage = (url) => {
    setImages([...images, url]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleAddVariant = (variant) => {
    setVariants([...variants, variant]);
    setShowVariantForm(false);
  };

  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.categoryId) {
      alert('Please fill in all required fields');
      return;
    }

    onAdd({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      images,
      categoryId: formData.categoryId,
      tags,
      variants,
      isFeatured: formData.isFeatured,
      inStock: formData.inStock,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full my-8 shadow-2xl transition-all ease-in-out">
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-white font-semibold">Add New Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gray-50/50 rounded-b-xl shadow-lg">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Describe your product..."
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Price *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Category *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                required
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700 group-hover:text-gray-900">In Stock</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <span className="text-gray-700 group-hover:text-gray-900">Featured Product</span>
              </label>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-700 mb-3">Product Images</label>
            <ImageUploadZone
              images={images}
              onAddImage={handleAddImage}
              onRemoveImage={handleRemoveImage}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 mb-2">Tags</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="e.g., summer, bestseller, new"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full border border-blue-200"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => setTags(tags.filter((_, i) => i !== index))}
                        className="hover:text-blue-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Variants */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-gray-700">Product Variants (Optional)</label>
              <button
                type="button"
                onClick={() => setShowVariantForm(true)}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Variant
              </button>
            </div>
            
            {variants.length > 0 && (
              <div className="space-y-2 mb-3">
                {variants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                  >
                    <div>
                      <div className="text-gray-900">{variant.name}</div>
                      <div className="text-sm text-gray-600">
                        {variant.options.join(', ')}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {showVariantForm && (
              <VariantForm
                onAdd={handleAddVariant}
                onCancel={() => setShowVariantForm(false)}
              />
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function VariantForm({
  onAdd,
  onCancel,
}) {
  const [name, setName] = useState('');
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState('');

  const handleAddOption = () => {
    if (optionInput.trim() && !options.includes(optionInput.trim())) {
      setOptions([...options, optionInput.trim()]);
      setOptionInput('');
    }
  };

  const handleSubmit = () => {
    if (name && options.length > 0) {
      onAdd({
        id: Date.now().toString(),
        name,
        options,
      });
    }
  };

  return (
    <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50/50 space-y-4">
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          Variant Name (e.g., Size, Color)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          placeholder="Size"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm mb-2">
          Options
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={optionInput}
            onChange={(e) => setOptionInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddOption();
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="e.g., Small, Medium, Large"
          />
          <button
            type="button"
            onClick={handleAddOption}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            Add
          </button>
        </div>
        {options.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {options.map((option, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white text-gray-800 rounded-full border border-gray-300 text-sm"
              >
                {option}
                <button
                  type="button"
                  onClick={() => setOptions(options.filter((_, i) => i !== index))}
                  className="hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white text-sm"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          Add Variant
        </button>
      </div>
    </div>
  );
}
