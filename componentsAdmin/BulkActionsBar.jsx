import { useState } from 'react';
import { X, Trash2, FolderTree } from 'lucide-react';

export function BulkActionsBar({
  selectedCount,
  categories,
  onBulkDelete,
  onBulkUpdateCategory,
  onClearSelection,
}) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState('');



  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-blue-900">
            {selectedCount} product{selectedCount !== 1 ? 's' : ''} selected
          </span>
          
          <div className="flex items-center gap-2">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <FolderTree className="w-4 h-4" />
                Set Category
              </button>
              {showCategoryDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowCategoryDropdown(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          onBulkUpdateCategory(category.id);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-900"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>



            {/* Bulk Delete */}
            <button
              onClick={() => {
                if (confirm(`Delete ${selectedCount} product${selectedCount !== 1 ? 's' : ''}?`)) {
                  onBulkDelete();
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        <button
          onClick={onClearSelection}
          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
          title="Clear selection"
        >
          <X className="w-5 h-5 text-blue-900" />
        </button>
      </div>
    </div>
  );
}
