export function CategoryNav({ categories, selectedCategory, onSelectCategory }) {
  return (
    <nav className="mb-6">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

        {categories.map((category) => {
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium 
                transition-all duration-200 border
                ${isActive 
                  ? "bg-blue-500 border-blue-500 text-white shadow-sm scale-[1.06]"
                  : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                }
              `}
            >
              {category.name}
            </button>
          );
        })}

      </div>
    </nav>
  );
}
