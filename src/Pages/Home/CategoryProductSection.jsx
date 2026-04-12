import React, { useState, useContext, useMemo } from "react";
import {
  FiShoppingCart,
  FiMapPin,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext/CartContext";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fuse from "fuse.js";

const CategoryProductSection = ({
  products = [],
  category = "সব",
  searchTerm = "",
}) => {
  const [locationTerm, setLocationTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const { addToCart, cartItems, loadingProductId } = useContext(CartContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 Category Filter
  const filteredByCategory = useMemo(() => {
    return category === "সব"
      ? products
      : products.filter((p) =>
          Array.isArray(p.categories)
            ? p.categories.some((cat) => cat && cat.name === category)
            : false,
        );
  }, [products, category]);

  // 🔹 Search
  const filteredBySearch = useMemo(() => {
    if (!searchTerm) return filteredByCategory;
    const fuse = new Fuse(filteredByCategory, {
      keys: ["name", "description"],
      threshold: 0.3,
    });
    return fuse.search(searchTerm).map((res) => res.item);
  }, [filteredByCategory, searchTerm]);

  // 🔹 Location Filter
  const finalProducts = useMemo(() => {
    if (!locationTerm) return filteredBySearch;
    const fuse = new Fuse(filteredBySearch, {
      keys: ["seller_location"],
      threshold: 0.4,
    });
    return fuse.search(locationTerm).map((r) => r.item);
  }, [filteredBySearch, locationTerm]);

  // 🔹 Pagination
  const totalPages = Math.ceil(finalProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return finalProducts.slice(start, start + itemsPerPage);
  }, [finalProducts, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, locationTerm]);

  // ⭐ Stars
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={
          i < Math.round(rating)
            ? "w-4 h-4 text-yellow-400 fill-yellow-400"
            : "w-4 h-4 text-gray-300"
        }
      />
    ));

  return (
    <div className="bg-gray-50 min-h-screen p-3 sm:p-4 text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
          <p className="text-gray-600">
            {finalProducts.length} টি পণ্য পাওয়া গেছে
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Location */}
          <div className="relative w-full sm:w-64">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="লোকেশন অনুযায়ী খুঁজুন..."
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
          >
            <FiShoppingCart /> কার্ট
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {paginatedProducts.length ? (
          paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Image */}
              <div
                className="relative aspect-square bg-gray-100 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />

                {product.discount && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.discount}% ছাড়
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 space-y-2">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-1">
                  {product.description || "No description"}
                </p>

                {/* Price */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg text-gray-900">
                      ৳{product.discounted_price}
                    </span>
                    {product.price && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ৳{product.price}
                      </span>
                    )}
                  </div>
                  <div className="flex">
                    {renderStars(product.average_rating || 0)}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <FiMapPin />
                  {product.seller_location || "লোকেশন নেই"}
                  {product.verified && (
                    <FiCheckCircle className="text-blue-500 ml-1" />
                  )}
                </div>

                {/* Button */}
                <button
                  disabled={loadingProductId === product.id}
                  onClick={() => addToCart(product)}
                  className={`w-full mt-2 flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-md
                    ${
                      loadingProductId === product.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                >
                  <FiShoppingCart />
                  {loadingProductId === product.id
                    ? "যোগ করা হচ্ছে..."
                    : "কার্টে যোগ করুন"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center py-20 text-gray-500">
            কোনো পণ্য পাওয়া যায়নি 😔
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
          loading={loadingProductId}
        />
      )}
    </div>
  );
};

export default CategoryProductSection;
