const Category = ({ categories, selectedCategory, setSelectedCategory }) => (
  <nav className="sticky top-[76px] z-30 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl" aria-label="Product categories">
    <div className="page-shell flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
      <button className={`category-pill ${selectedCategory === null ? "category-pill-active" : ""}`} onClick={() => setSelectedCategory(null)}>All products</button>
      {categories.map((category) => (
        <button key={category.id} className={`category-pill ${selectedCategory === category.id ? "category-pill-active" : ""}`} onClick={() => setSelectedCategory(category.id)}>{category.name}</button>
      ))}
    </div>
  </nav>
);

export default Category;
