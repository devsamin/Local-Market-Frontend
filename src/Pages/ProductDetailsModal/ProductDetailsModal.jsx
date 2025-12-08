// import React, { useState } from "react";
// import { FiX, FiShoppingCart, FiStar, FiMapPin, FiCheckCircle } from "react-icons/fi";

// const ProductDetailsModal = ({ product, onClose, addToCart }) => {
//   const [mainImage, setMainImage] = useState(product.image);

//   // 🔥 নিচের ৩টা অতিরিক্ত ইমেজ (demo purpose)
//   const extraImages = [
//     product.image || "https://i.ibb.co.com/chY6MqJW/photo-1441984904996-e0b6ba687e04-crop-entropy-cs-tinysrgb-fit-max-fm-jpg-ixid-M3w3-Nzg4-Nzd8-MHwxf-H.jpg",
//     product.image2 || "https://i.ibb.co.com/PvbNN8pS/tshirt-hanging-shirt-shop-generative-ai-971989-3350.jpg",
//     product.image3 || "https://i.ibb.co.com/V0CWTJQR/images.jpg",
//   ];

// const renderStars = (rating) => {
//   return [...Array(5)].map((_, i) => (
//     <FiStar
//       key={i}
//       className={
//         i < Math.round(rating)
//           ? "w-4 h-4 text-yellow-400 fill-yellow-400"
//           : "w-4 h-4 text-gray-300"
//       }
//     />
//   ));
// };


//   return (
//     <>
//       {/* Overlay */}
//       <div
//         onClick={onClose}
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
//         <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl p-6 relative">
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 text-gray-600 hover:text-black"
//           >
//             <FiX size={22} />
//           </button>

//           <div className="grid md:grid-cols-2 gap-6">
//             {/* ---------- Left: Image Gallery ---------- */}
//             <div>
//               {/* Main Image */}
//               <div className="w-full aspect-square overflow-hidden rounded-lg border">
//                 <img
//                   src={mainImage}
//                   alt={product.name}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* Thumbnails */}
//               <div className="flex justify-center gap-2 mt-3">
//                 {extraImages.map((img, i) => (
//                   <img
//                     key={i}
//                     src={img}
//                     alt={`Thumbnail ${i + 1}`}
//                     onClick={() => setMainImage(img)}
//                     className={`w-20 h-20 rounded-md border cursor-pointer object-cover transition-transform hover:scale-105 ${
//                       mainImage === img ? "border-black" : "border-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* ---------- Right: Product Info ---------- */}
//             <div className="space-y-4">
//               <h2 className="text-2xl font-semibold">{product.name}</h2>

//               {/* Price */}
//               <div className="flex items-center gap-2">
//                 <span className="text-xl font-bold text-gray-900">
//                   ৳{product.price}
//                 </span>
//                 {product.oldPrice && (
//                   <span className="text-sm text-gray-400 line-through">
//                     ৳{product.oldPrice}
//                   </span>
//                 )}
//                 {product.discount && (
//                   <span className="text-sm text-white bg-red-500 px-2 py-0.5 rounded-md">
//                     {product.discount}% ছাড়
//                   </span>
//                 )}
//               </div>

//               {/* Rating */}
//              {/* Rating */}
// <div className="flex items-center gap-1 text-sm">
//   {renderStars(product.average_rating || 0)}
//   <span className="text-gray-700 ml-1 font-medium">
//     {Number(product.average_rating || 0).toFixed(1)}
//   </span>

//   {product.total_reviews !== undefined && (
//     <span className="text-gray-500 text-sm ml-1">
//       ({product.total_reviews} রিভিউ)
//     </span>
//   )}
// </div>


//               {/* Location & Verified */}
//               <div className="flex items-center gap-3 text-sm text-gray-600">
//                 <span className="flex items-center gap-1">
//                   <FiMapPin /> {product.location || "ঢাকা"}
//                 </span>
//                 {product.verified && (
//                   <span className="flex items-center gap-1 text-blue-600">
//                     <FiCheckCircle /> যাচাইকৃত বিক্রেতা
//                   </span>
//                 )}
//               </div>

//               {/* Description */}
//               <p className="text-gray-700 text-sm leading-relaxed">
//                 {product.description ||
//                   "এই পণ্যটি অত্যন্ত মানসম্পন্ন এবং টেকসই। সর্বশেষ প্রযুক্তি ব্যবহৃত হয়েছে যাতে ব্যবহারকারী একটি চমৎকার অভিজ্ঞতা পান।"}
//               </p>

//               {/* Seller + Cart Button */}
//               <div className="flex items-center justify-between pt-2">
//                 <p className="text-sm text-gray-600">
//   বিক্রেতা :{" "}
//   <span className="font-medium">
//     {product.seller_name || "অজানা"}
//   </span>
// </p>

//                 <button
//                   onClick={() => addToCart(product)}
//                   className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
//                 >
//                   <FiShoppingCart /> কার্টে যোগ করুন
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetailsModal;


import React, { useState } from "react";
import { FiX, FiShoppingCart, FiStar, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";

const ProductDetailsModal = ({ product, onClose, addToCart }) => {
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
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  <FiShoppingCart /> কার্টে যোগ করুন
                </button>
              ) : (
                <button
                  onClick={() =>
                    toast.error("সেলারেরা কার্টে পণ্য যোগ করতে পারবেন না!")
                  }
                  className="flex items-center gap-2 bg-gray-500 text-white px-5 py-2 rounded-lg cursor-not-allowed"
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
