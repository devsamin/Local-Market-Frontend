import React, { useState } from "react";
import { FiShoppingCart, FiFilter, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const CategoryProductSection = ({ products, category = "সব" }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(20000);
  const [rating, setRating] = useState(0);

  // Filter products by category
  const filteredProducts =
    category === "সব"
      ? products
      : products.filter((p) => p.category === category);

  // Apply additional filters
  const finalProducts = filteredProducts.filter(
    (p) => p.price <= priceRange && p.rating >= rating
  );

  return (
    <div className="relative p-4">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{category}</h2>
          <p className="text-gray-800 font-semibold">
            মোট: {finalProducts.length} টি পণ্য
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-gray-100 border px-4 py-2 rounded hover:bg-[#b5ee08] transition"
          >
            <FiFilter /> ফিল্টার
          </button>
          <Link to={'/cart'} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            <FiShoppingCart /> কার্ট
          </Link>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {finalProducts.length > 0 ? (
          finalProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded shadow p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded"
              />
              <h3 className="font-semibold mt-2">{product.name}</h3>
              <p className="text-yellow-500 mt-1">⭐ {product.rating}</p>
              <p className="font-bold mt-1">৳{product.price}</p>
              <button className="flex gap-2 items-center bg-black text-white py-2 px-4 rounded mt-3 w-full justify-center hover:bg-gray-800 transition-colors duration-300">
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500">
            এই ক্যাটেগরিতে কোনো পণ্য পাওয়া যায়নি 😔
          </p>
        )}
      </div>

      {/* Filter Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-bold">ফিল্টার অপশন</h3>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-5 space-y-6 overflow-y-auto h-[calc(100%-60px)]">
          {/* Price Filter */}
          <div>
            <h4 className="font-semibold mb-2">মূল্য পরিসীমা</h4>
            <input
              type="range"
              min="0"
              max="20000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-black"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>৳0</span>
              <span>৳{priceRange}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="font-semibold mb-2">ন্যূনতম রেটিং</h4>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full accent-black"
            />
            <p className="text-sm text-gray-600">⭐ {rating} এবং তার বেশি</p>
          </div>

          {/* Sort Filter */}
          <div>
            <h4 className="font-semibold mb-2">সাজান</h4>
            <select className="w-full border rounded px-3 py-2">
              <option>জনপ্রিয়তা অনুযায়ী</option>
              <option>মূল্য (কম থেকে বেশি)</option>
              <option>মূল্য (বেশি থেকে কম)</option>
              <option>রেটিং</option>
            </select>
          </div>

          {/* Apply Filter Button */}
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            সব ফিল্টার প্রয়োগ করুন
          </button>
        </div>
      </div>

      {/* Overlay (Background blur when open) */}
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}
    </div>
  );
};

export default CategoryProductSection;
