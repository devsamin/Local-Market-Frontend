


import React, { useState } from "react";
import { FiX, FiShoppingCart, FiStar, FiMapPin, FiCheckCircle } from "react-icons/fi";
// import { toast } from "react-hot-toast";

const ProductDetailsModal = ({ product, onClose, addToCart, loadingProductId }) => {
  const [mainImage, setMainImage] = useState(product.image);

  // 🔥 User Data
  const userData = JSON.parse(localStorage.getItem("user"));

  // ⭐ Rating Stars Render Function
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  // 🔥 Extra Images (If exists)
  const extraImages = [
    product.image,
    product.image2,
    product.image3,
    // product.image4,
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded-full hover:bg-black transition"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

          {/* Left Side: Images */}
          <div>
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg border"
            />

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {extraImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  onClick={() => setMainImage(img)}
                  className={`h-20 object-cover rounded-md border cursor-pointer ${
                    mainImage === img ? "border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="space-y-4">
            {/* Title */}
            <h2 className="text-2xl font-semibold">{product.name}</h2>

            {/* Star Rating */}
            <div className="flex items-center gap-2">
              {renderStars(product.average_rating || 0)}
              <span className="text-sm text-gray-600">
                ({product.average_rating || 0} / 5)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-black">
                ৳{product.discounted_price}
              </span>

              {product.price && (
                <span className="text-lg text-gray-500 line-through">
                  ৳{product.price}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FiMapPin className="w-4 h-4" />
              <span>{product.seller_location || "লোকেশন নেই"}</span>

              {product.verified && (
                <FiCheckCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {product.description || "কোনো পণ্যের বিবরণ পাওয়া যায়নি।"}
            </p>

            {/* Seller + Add to Cart */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm">
                বিক্রেতা:{" "}
                <span className="font-semibold">
                  {product.seller_name || "অজানা"}
                </span>
              </p>

              {/* ❌ Seller cannot add to cart */}
              {userData?.role !== "seller" ? (
                <button
  disabled={loadingProductId === product.id}
  onClick={(e) => {
    e.stopPropagation();
    addToCart(product);
  }}
  className={`flex items-center gap-2 px-5 py-2 rounded-lg
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


              ) : (
                // <button
                //   onClick={() =>
                //     toast.error("সেলারেরা কার্টে পণ্য যোগ করতে পারবেন না!")
                //   }
                //   className="flex items-center gap-2 bg-gray-500 text-white px-5 py-2 rounded-lg cursor-not-allowed"
                // >
                //   <FiShoppingCart /> কার্টে যোগ করুন
                // </button>

                <button
  disabled
  className="flex items-center gap-2  bg-gray-500 text-white px-5 py-2 rounded-lg cursor-not-allowed"
>
  <FiShoppingCart /> কার্টে যোগ করুন
</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
