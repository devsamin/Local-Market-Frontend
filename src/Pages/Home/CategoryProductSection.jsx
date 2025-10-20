import React, { useState } from "react";
import {
  FiShoppingCart,
  FiFilter,
  FiX,
  FiMapPin,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const CategoryProductSection = ({ products, category = "সব" }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(50000);
  const [rating, setRating] = useState(0);

  const filteredProducts =
    category === "সব"
      ? products
      : products.filter((p) => p.category === category);

  const finalProducts = filteredProducts.filter(
    (p) => p.price <= priceRange && p.rating >= rating
  );

  return (
    <div className="relative p-3 sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">{category}</h2>
          <p className="text-gray-800 font-semibold text-sm sm:text-base">
            মোট: {finalProducts.length} টি পণ্য
          </p>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-1 sm:gap-2 bg-gray-100 border px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-[#b5ee08] transition text-sm sm:text-base"
          >
            <FiFilter /> ফিল্টার
          </button>
          <Link
            to={"/cart"}
            className="flex items-center gap-1 sm:gap-2 bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base"
          >
            <FiShoppingCart /> কার্ট
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {finalProducts.length > 0 ? (
          finalProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />

                {/* 🔴 Discount Badge */}
                {product.discount && (
                  <span className="absolute top-2 right-2 inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition overflow-hidden border-transparent text-white bg-red-500 hover:bg-red-600">
                    {product.discount}% ছাড়
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-3 space-y-2">
                <div>
                  <h3 className="font-medium text-sm sm:text-base line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                    {product.shortDesc || "৫জি স্মার্টফোন, ১২৮জিবি স্টোরেজ"}
                  </p>
                </div>

                {/* Price & Rating */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-base sm:text-lg">
                        ৳{product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          ৳{product.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <FiStar className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400">
                      ({product.reviews || 0})
                    </span>
                  </div>
                </div>

                {/* Location + Verified */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-gray-500">
                      <FiMapPin className="w-3 h-3" />
                      <span>{product.location || "ঢাকা"}</span>
                    </div>
                    {product.verified && (
                      <FiCheckCircle
                        className="w-4 h-4 text-blue-500"
                        title="যাচাইকৃত বিক্রেতা"
                      />
                    )}
                  </div>
                </div>

                {/* Seller + Add to Cart */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs sm:text-sm text-gray-600 flex-1">
                    {product.seller || "অজানা বিক্রেতা"}
                  </span>
                  <button className="justify-center whitespace-nowrap text-xs sm:text-sm font-medium bg-black text-white hover:bg-gray-800 h-7 sm:h-8 rounded-md px-2.5 sm:px-3 flex items-center gap-1 transition">
                    <FiShoppingCart className="w-3.5 h-3.5" /> কার্টে যোগ করুন
                  </button>
                </div>
              </div>
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
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-bold">ফিল্টার অপশন</h3>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4 space-y-5 overflow-y-auto h-[calc(100%-60px)]">
          {/* Price Filter */}
          <div>
            <h4 className="font-semibold mb-2">মূল্য পরিসীমা</h4>
            <input
              type="range"
              min="0"
              max="50000"
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
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>জনপ্রিয়তা অনুযায়ী</option>
              <option>মূল্য (কম থেকে বেশি)</option>
              <option>মূল্য (বেশি থেকে কম)</option>
              <option>রেটিং</option>
            </select>
          </div>

          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition text-sm"
          >
            সব ফিল্টার প্রয়োগ করুন
          </button>
        </div>
      </div>

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
