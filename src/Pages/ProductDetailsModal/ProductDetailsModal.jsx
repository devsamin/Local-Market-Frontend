import React, { useState } from "react";
import { FiX, FiShoppingCart, FiStar, FiMapPin, FiCheckCircle } from "react-icons/fi";

const ProductDetailsModal = ({ product, onClose, addToCart }) => {
  const [mainImage, setMainImage] = useState(product.image);

  // 🔥 নিচের ৩টা অতিরিক্ত ইমেজ (demo purpose)
  const extraImages = [
    product.image || "https://i.ibb.co.com/chY6MqJW/photo-1441984904996-e0b6ba687e04-crop-entropy-cs-tinysrgb-fit-max-fm-jpg-ixid-M3w3-Nzg4-Nzd8-MHwxf-H.jpg",
    product.image2 || "https://i.ibb.co.com/PvbNN8pS/tshirt-hanging-shirt-shop-generative-ai-971989-3350.jpg",
    product.image3 || "https://i.ibb.co.com/V0CWTJQR/images.jpg",
  ];

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
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            <FiX size={22} />
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            {/* ---------- Left: Image Gallery ---------- */}
            <div>
              {/* Main Image */}
              <div className="w-full aspect-square overflow-hidden rounded-lg border">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2 mt-3">
                {extraImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 rounded-md border cursor-pointer object-cover transition-transform hover:scale-105 ${
                      mainImage === img ? "border-black" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ---------- Right: Product Info ---------- */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{product.name}</h2>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ৳{product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ৳{product.oldPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="text-sm text-white bg-red-500 px-2 py-0.5 rounded-md">
                    {product.discount}% ছাড়
                  </span>
                )}
              </div>

              {/* Rating */}
             {/* Rating */}
<div className="flex items-center gap-1 text-sm">
  {renderStars(product.average_rating || 0)}
  <span className="text-gray-700 ml-1 font-medium">
    {Number(product.average_rating || 0).toFixed(1)}
  </span>

  {product.total_reviews !== undefined && (
    <span className="text-gray-500 text-sm ml-1">
      ({product.total_reviews} রিভিউ)
    </span>
  )}
</div>


              {/* Location & Verified */}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FiMapPin /> {product.location || "ঢাকা"}
                </span>
                {product.verified && (
                  <span className="flex items-center gap-1 text-blue-600">
                    <FiCheckCircle /> যাচাইকৃত বিক্রেতা
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {product.description ||
                  "এই পণ্যটি অত্যন্ত মানসম্পন্ন এবং টেকসই। সর্বশেষ প্রযুক্তি ব্যবহৃত হয়েছে যাতে ব্যবহারকারী একটি চমৎকার অভিজ্ঞতা পান।"}
              </p>

              {/* Seller + Cart Button */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-gray-600">
  বিক্রেতা :{" "}
  <span className="font-medium">
    {product.seller_name || "অজানা"}
  </span>
</p>

                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  <FiShoppingCart /> কার্টে যোগ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsModal;
