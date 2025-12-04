import React, { useState, useContext, useMemo } from "react";
import {
  FiShoppingCart,
  FiFilter,
  FiX,
  FiMapPin,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext/CartContext";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fuse from "fuse.js";


const CategoryProductSection = ({ products = [], category = "সব", searchTerm = "" }) => {
  // 🔹 State
  const [isFilterOpen, setIsFilterOpen] = useState(false); // filter drawer
  const [locationTerm, setLocationTerm] = useState(""); // Location filter
  const [priceRange, setPriceRange] = useState(50000); // price filter
  const [rating, setRating] = useState(0); // rating filter
  const [selectedProduct, setSelectedProduct] = useState(null); // modal product
  const userData = JSON.parse(localStorage.getItem("user"));
  const { addToCart, cartItems } = useContext(CartContext); // cart context

  console.log("userData:", userData);
  

  // 🔹 Filter by category
  const filteredByCategory = useMemo(() => {
    return category === "সব"
      ? products
      : products.filter((p) =>
          Array.isArray(p.categories)
            ? p.categories.some((cat) => cat && cat.name === category)
            : false
        );
  }, [products, category]);

  // 🔹 Filter by search term using Fuse.js
  const filteredBySearch = useMemo(() => {
    if (!searchTerm) return filteredByCategory;
    const fuse = new Fuse(filteredByCategory, {
      keys: ["name", "description"],
      threshold: 0.3,
    });
    return fuse.search(searchTerm).map((res) => res.item);
  }, [filteredByCategory, searchTerm]);

  // 🔹 Apply price and rating filters
  // const finalProducts = useMemo(() => {
  //   return filteredBySearch.filter(
  //     (p) => parseFloat(p.price) <= priceRange && (p.rating || 0) >= rating
  //   );
  // }, [filteredBySearch, priceRange, rating]);

 // 🔹 Filter by location (Bangla + English + upper/lower case)
const finalProducts = useMemo(() => {
  if (!locationTerm) return filteredBySearch;

  const normalized = locationTerm.trim().toLowerCase();

  const fuse = new Fuse(filteredBySearch, {
    keys: ["seller_location"],     // 🔥 Correct field
    threshold: 0.4,                // 60% fuzzy
    ignoreLocation: true,
    distance: 100,
    includeScore: false,
    isCaseSensitive: false,        // 🔥 uppercase/lowercase supported
  });

  return fuse
    .search(normalized)
    .map((r) => r.item);

}, [filteredBySearch, locationTerm]);

  // 🔹 Add product to cart
  const handleAddToCart = async (product) => {
     if (userData?.role==="seller") {
    toast.error("সেলারেরা কার্টে পণ্য যোগ করতে পারবেন না!");
    return; // exit early
  }
    try {
      const token = localStorage.getItem("access");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const body = { product_id: product.id, quantity: 1 };
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cart/add_item/",
        body,
        config
      );
      if (response.status === 200) {
        // toast.success("Product added to cart successfully!");
        
toast.success("পণ্যটি সফলভাবে কার্টে যোগ করা হয়েছে!");
        addToCart(product); // update local cart
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart!");
    }
  };


  const renderStars = (rating) => {
  return [...Array(5)].map((_, i) => (
    <FiStar
      key={i}
      className={
        i < Math.round(rating)
          ? "w-4 h-4 text-yellow-400 fill-yellow-400"
          : "w-4 h-4 text-gray-300"
      }
    />
  ));
};


  return (
    <div className="relative p-3 sm:p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">{category}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {finalProducts.length} টি পণ্য পাওয়া গেছে
          </p>
        </div>

        <div className="flex items-center gap-2">
           {/* 🔹 Location Search Input */}
        {/* 🔹 Location Search Input with Icon (Professional UI) */}
<div className="relative w-full sm:w-64">
  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
  <input
    type="text"
    placeholder="লোকেশন অনুযায়ী খুঁজুন..."
    value={locationTerm}
    onChange={(e) => setLocationTerm(e.target.value)}
    className="w-full border rounded pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
  />
</div>

          {/* <Link
            to="/cart"
            className="relative justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-800 text-white hover:bg-gray-950/90 h-9 px-4 py-2 flex items-center gap-2"
          >
            <FiShoppingCart className="w-4 h-4" /> কার্ট
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center text-white bg-red-500 rounded-full border border-white">
                {cartItems.length}
              </span>
            )}
          </Link> */}
          {/* Cart Button */}
  {userData?.role !== "seller" ? (
    // Buyer বা Non-Seller এর জন্য
    <Link
      to="/cart"
      className="relative justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-800 text-white hover:bg-gray-950/90 h-9 px-4 py-2 flex items-center gap-2"
    >
      <FiShoppingCart className="w-4 h-4" /> কার্ট
      {cartItems.length > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center text-white bg-red-500 rounded-full border border-white">
          {cartItems.length}
        </span>
      )}
    </Link>
  ) : (
    // Seller এর জন্য disabled Button
    <button
      className="justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-600 text-white cursor-not-allowed h-9 px-4 py-2 flex items-center gap-2"
      onClick={() => toast.error("সেলারেরা কার্ট ব্যবহার করতে পারবেন না!")}
    >
      <FiShoppingCart className="w-4 h-4" /> কার্ট
    </button>
  )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {finalProducts.length ? (
          finalProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div
                className="relative aspect-square bg-gray-100 overflow-hidden"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full duration-300 hover:scale-105"
                />

                {/* Discount Badge */}
                {product.discount && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {product.discount}% ছাড়
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 space-y-3">
                {/* Title */}
                <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                  {product.name}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-gray-500 line-clamp-1">
                  {product.description || "পণ্যের সংক্ষিপ্ত বর্ণনা নেই"}
                </p>

                {/* Price + Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      ৳{product.discounted_price}
                    </span>

                    {product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ৳{product.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-sm">
  {renderStars(product.average_rating || 0)}
  <span className="text-gray-700 ml-1">
    {/* {Number(product.average_rating || 0).toFixed(1)} */}
  </span>
</div>

                </div>

                {/* Location + Verified */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="w-3 h-3" />
                    <span>{product.seller_location || "লোকেশন নেই"}</span>


                    {product.verified && (
                      <FiCheckCircle
                        className="w-4 h-4 text-blue-500"
                        title="যাচাইকৃত বিক্রেতা"
                      />
                    )}
                  </div>
                </div>

                {/* Seller + Cart Button */}
                <div className="flex items-center gap-2 pt-2">
                  {/* <span className="text-sm text-gray-600 flex-1">
                    {product.seller_name || "অজানা বিক্রেতা"}
                  </span> */}

                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation(); // STOP DOUBLE CALL
                      handleAddToCart(product);
                    }}
                    className="ml-auto flex items-center justify-center gap-1 bg-black text-white text-sm rounded-md px-3 py-1.5 hover:bg-gray-800"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    কার্টে যোগ করুন
                  </button> */}
                  {/* Add to Cart Button */}
{userData?.role !== "seller" ? (
  <button
    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
    className="ml-auto flex items-center justify-center gap-1 bg-black text-white text-sm rounded-md px-3 py-1.5 hover:bg-gray-800"
  >
    <FiShoppingCart /> কার্টে যোগ করুন
  </button>
) : (
  <button
    onClick={(e) => { e.stopPropagation(); toast.error("সেলারেরা কার্টে পণ্য যোগ করতে পারবেন না!"); }}
    className="ml-auto flex items-center justify-center gap-1 bg-gray-600 text-white text-sm rounded-md px-3 py-1.5 cursor-not-allowed"
  >
    <FiShoppingCart /> কার্টে যোগ করুন
  </button>
)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-20 text-lg">
            এই ক্যাটেগরিতে কোনো পণ্য পাওয়া যায়নি 😔
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
          {/* Price Range */}
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

          {/* Sorting */}
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

      {/* Overlay */}
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default CategoryProductSection;
