import { Filter, X } from 'lucide-react';
import { useState } from 'react';

const filterOptions = [
  { id: 'bestseller', name: 'Best Sellers' },
  { id: 'new', name: 'New Arrivals' },
  { id: 'sale', name: 'On Sale' },
];

export function FilterBar({ selectedFilters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (filterId) => {
    if (selectedFilters.includes(filterId)) {
      onFilterChange(selectedFilters.filter(f => f !== filterId));
    } else {
      onFilterChange([...selectedFilters, filterId]);
    }
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all shadow-sm"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {selectedFilters.length > 0 && (
            <span className="bg-neutral-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedFilters.length}
            </span>
          )}
        </button>

        {/* Desktop filters */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          {filterOptions.map(filter => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`px-5 py-2.5 rounded-lg transition-all duration-200 ${
                selectedFilters.includes(filter.id)
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {filter.name}
            </button>
          ))}

          {selectedFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-neutral-600 hover:text-neutral-900 text-sm ml-2 underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Mobile filter dropdown */}
      {isOpen && (
        <div className="sm:hidden mt-3 p-4 bg-white border border-neutral-200 rounded-lg shadow-lg space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {filterOptions.map(filter => (
            <label key={filter.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedFilters.includes(filter.id)}
                onChange={() => toggleFilter(filter.id)}
                className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              <span className="text-neutral-900 group-hover:text-neutral-600 transition-colors">
                {filter.name}
              </span>
            </label>
          ))}

          {selectedFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="w-full mt-3 px-4 py-2 text-neutral-600 hover:text-neutral-900 text-sm underline-offset-2 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
