export function CategoryNav({ categories, selectedCategory, onSelectCategory }) {
  return (
    <nav className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-neutral-900 text-white shadow-md scale-105'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
