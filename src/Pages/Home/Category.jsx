import React from "react";

const Category = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-full bg-base-100 border-t border-gray-200 py-3 shadow-sm mt-3">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-4 md:px-10">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat.name)} // Handel Click 
            className={`flex items-center gap-2 whitespace-nowrap border px-4 py-2 rounded-full font-semibold text-gray-700 hover:bg-[#b5ee08] hover:text-black transition-all duration-300 ${
              selectedCategory === cat.name
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            <span className="text-lg">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
