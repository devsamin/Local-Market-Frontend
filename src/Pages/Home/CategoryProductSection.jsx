// import React, { useState, useContext, useMemo } from "react";
// import {
//   FiShoppingCart,
//   FiFilter,
//   FiX,
//   FiMapPin,
//   FiCheckCircle,
//   FiStar,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { CartContext } from "../../contexts/CartContext/CartContext";
// import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Fuse from "fuse.js";

// const CategoryProductSection = ({
//   products = [],
//   category = "সব",
//   searchTerm = "",
// }) => {
//   // 🔹 State
//   // const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [locationTerm, setLocationTerm] = useState("");
//   // const [priceRange, setPriceRange] = useState(50000);
//   // const [rating, setRating] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const userData = JSON.parse(localStorage.getItem("user"));
//   const { addToCart, cartItems,loadingProductId   } = useContext(CartContext);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // 🔹 Filter by category
//   const filteredByCategory = useMemo(() => {
//     return category === "সব"
//       ? products
//       : products.filter((p) =>
//           Array.isArray(p.categories)
//             ? p.categories.some((cat) => cat && cat.name === category)
//             : false
//         );
//   }, [products, category]);

//   // 🔹 Fuse search
//   const filteredBySearch = useMemo(() => {
//     if (!searchTerm) return filteredByCategory;
//     const fuse = new Fuse(filteredByCategory, {
//       keys: ["name", "description"],
//       threshold: 0.3,
//     });
//     return fuse.search(searchTerm).map((res) => res.item);
//   }, [filteredByCategory, searchTerm]);

//   // 🔹 Location Filter
//   const finalProducts = useMemo(() => {
//     if (!locationTerm) return filteredBySearch;

//     const normalized = locationTerm.trim().toLowerCase();

//     const fuse = new Fuse(filteredBySearch, {
//       keys: ["seller_location"],
//       threshold: 0.4,
//       ignoreLocation: true,
//       distance: 100,
//       includeScore: false,
//       isCaseSensitive: false,
//     });

//     return fuse.search(normalized).map((r) => r.item);
//   }, [filteredBySearch, locationTerm]);

//   // 🔹 Pagination Logic
//   const totalPages = Math.ceil(finalProducts.length / itemsPerPage);

//   const paginatedProducts = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     return finalProducts.slice(start, end);
//   }, [finalProducts, currentPage]);

//   // Whenever filters change → reset to page 1
//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, category, locationTerm]);

//   // 🔹 Add to cart
//   // const handleAddToCart = async (product) => {
//   //   if (userData?.role === "seller") {
//   //     toast.error("সেলারেরা কার্টে পণ্য যোগ করতে পারবেন না!");
//   //     return;
//   //   }

//   //   try {
//   //     const token = localStorage.getItem("access");
//   //     const config = {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         "Content-Type": "application/json",
//   //       },
//   //     };
//   //     const body = { product_id: product.id, quantity: 1 };
//   //     const response = await axios.post(
//   //       "http://127.0.0.1:8000/api/cart/add_item/",
//   //       body,
//   //       config
//   //     );
//   //     if (response.status === 200) {
//   //       toast.success("পণ্যটি সফলভাবে কার্টে যোগ হয়েছে!");
//   //       addToCart(product);
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     toast.error("Failed to add product to cart!");
//   //   }
//   // };

// //   const handleAddToCart = async (product) => {

// //   // 🔴 User not logged in
// //   if (!userData) {
// //     toast.warn("কার্টে পণ্য যোগ করার আগে লগইন করুন!");
// //     return;
// //   }

// //   // 🔴 Seller restriction
// //   if (userData?.role === "seller") {
// //     toast.error("সেলারেরা কার্টে পণ্য যোগ করতে পারবেন না!");
// //     return;
// //   }

// //   try {
// //     const token = localStorage.getItem("access");

// //     // 🔴 Extra safety
// //     if (!token) {
// //       toast.warn("কার্টে পণ্য যোগ করার আগে লগইন করুন!");
// //       return;
// //     }

// //     const config = {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //         "Content-Type": "application/json",
// //       },
// //     };

// //     const body = {
// //       product_id: product.id,
// //       quantity: 1,
// //     };

// //     const response = await axios.post(
// //       "http://127.0.0.1:8000/api/cart/add_item/",
// //       body,
// //       config
// //     );

// //     if (response.status === 200) {
// //       toast.success("পণ্যটি সফলভাবে কার্টে যোগ হয়েছে!");
// //       addToCart(product);
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     toast.error("কার্টে পণ্য যোগ করা যায়নি!");
// //   }
// // };

//   // ⭐ Rating stars
//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <FiStar
//         key={i}
//         className={
//           i < Math.round(rating)
//             ? "w-4 h-4 text-yellow-400 fill-yellow-400"
//             : "w-4 h-4 text-gray-300"
//         }
//       />
//     ));
//   };

//   return (
//     <div className="relative p-3 sm:p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-bold">{category}</h2>
//           <p className="text-muted-foreground text-sm sm:text-base">
//             {finalProducts.length} টি পণ্য পাওয়া গেছে
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Location Search */}
//           <div className="relative w-full sm:w-64">
//             <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="লোকেশন অনুযায়ী খুঁজুন..."
//               value={locationTerm}
//               onChange={(e) => setLocationTerm(e.target.value)}
//               className="w-full border rounded pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
//             />
//           </div>

//           {/* Cart */}
//           {userData?.role !== "seller" ? (
//             <Link
//               to="/cart"
//               className="relative justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-800 text-white hover:bg-gray-950 h-9 px-4 py-2 flex items-center gap-2"
//             >
//               <FiShoppingCart className="w-4 h-4" /> কার্ট
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center text-white bg-red-500 rounded-full border border-white">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>
//           ) : (
//             <button
//               onClick={() =>
//                 toast.error("সেলারেরা কার্ট ব্যবহার করতে পারবেন না!")
//               }
//               className="justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-600 text-white cursor-not-allowed h-9 px-4 py-2 flex items-center gap-2"
//             >
//               <FiShoppingCart className="w-4 h-4" /> কার্ট
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Product Grid — UPDATED TO paginatedProducts */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {paginatedProducts.length ? (
//           paginatedProducts.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer flex flex-col"
//             >
//               {/* Image */}
//               <div
//                 className="relative aspect-square bg-gray-100 overflow-hidden"
//                 onClick={() => setSelectedProduct(product)}
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-cover w-full h-full duration-300 hover:scale-105"
//                 />

//                 {/* Discount */}
//                 {product.discount && (
//                   <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//                     {product.discount}% ছাড়
//                   </span>
//                 )}
//               </div>

//               {/* Info */}
//               <div className="p-3 space-y-3">
//                 <h3 className="font-medium text-sm sm:text-base line-clamp-2">
//                   {product.name}
//                 </h3>

//                 <p className="text-xs text-gray-500 line-clamp-1">
//                   {product.description || "পণ্যের সংক্ষিপ্ত বর্ণনা নেই"}
//                 </p>

//                 {/* Price */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <span className="font-semibold text-lg">
//                       ৳{product.discounted_price}
//                     </span>
//                     {product.price && (
//                       <span className="text-sm text-gray-500 line-through">
//                         ৳{product.price}
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-1 text-sm">
//                     {renderStars(product.average_rating || 0)}
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="flex items-center justify-between text-sm">
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <FiMapPin className="w-3 h-3" />
//                     <span>{product.seller_location || "লোকেশন নেই"}</span>

//                     {product.verified && (
//                       <FiCheckCircle className="w-4 h-4 text-blue-500" />
//                     )}
//                   </div>
//                 </div>

//                 {/* Add to Cart */}
//                 <div className="flex items-center gap-2 pt-2">
//                   {userData?.role !== "seller" ? (
//                     <button
//   disabled={loadingProductId === product.id}
//   onClick={(e) => {
//     e.stopPropagation();
//     addToCart(product);
//   }}
//   className={`ml-auto flex items-center gap-1 text-sm rounded-md px-3 py-1.5
//     ${
//       loadingProductId === product.id
//         ? "bg-gray-400 cursor-not-allowed"
//         : "bg-black text-white hover:bg-gray-800"
//     }`}
// >
//   <FiShoppingCart />
//   {loadingProductId === product.id
//     ? "যোগ করা হচ্ছে..."
//     : "কার্টে যোগ করুন"}
// </button>

//                   ) : (
//                     // <button
//                     //   onClick={() =>
//                     //     toast.error("সেলারেরা কার্টে পণ্য যোগ করতে পারবেন না!")
//                     //   }
//                     //   className="ml-auto flex items-center justify-center gap-1 bg-gray-600 text-white text-sm rounded-md px-3 py-1.5 cursor-not-allowed"
//                     // >
//                     //   <FiShoppingCart /> কার্টে যোগ করুন
//                     // </button>

//                      <button
//     disabled
//     className="flex ml-11 items-center gap-2 bg-gray-500 text-white px-5 py-2 rounded-lg cursor-not-allowed"
//   >
//     <FiShoppingCart /> কার্টে যোগ করুন
//   </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500 py-20 text-lg">
//             কোনো পণ্য পাওয়া যায়নি 😔
//           </p>
//         )}
//       </div>

//       {/* ⭐ Modern Pagination UI */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-10">
//           <div className="flex items-center space-x-2 bg-white shadow-md px-4 py-2 rounded-full">

//             {/* Prev */}
//             <button
//               onClick={() =>
//                 currentPage > 1 && setCurrentPage(currentPage - 1)
//               }
//               className={`px-3 py-1 rounded-full text-sm font-medium border ${
//                 currentPage === 1
//                   ? "text-gray-400 border-gray-300 cursor-not-allowed"
//                   : "hover:bg-gray-100"
//               }`}
//               disabled={currentPage === 1}
//             >
//               ‹ Prev
//             </button>

//             {/* Page Numbers */}
//             {[...Array(totalPages)].map((_, index) => {
//               const page = index + 1;
//               return (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`px-3 py-1 rounded-full text-sm font-medium border ${
//                     currentPage === page
//                       ? "bg-black text-white border-black"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               );
//             })}

//             {/* Next */}
//             <button
//               onClick={() =>
//                 currentPage < totalPages && setCurrentPage(currentPage + 1)
//               }
//               className={`px-3 py-1 rounded-full text-sm font-medium border ${
//                 currentPage === totalPages
//                   ? "text-gray-400 border-gray-300 cursor-not-allowed"
//                   : "hover:bg-gray-100"
//               }`}
//               disabled={currentPage === totalPages}
//             >
//               Next ›
//             </button>

//           </div>
//         </div>
//       )}

//       {/* Filter Drawer */}
//       {/* (unchanged code below) */}

//       {/* Modal */}
//       {selectedProduct && (
//         <ProductDetailsModal
//   product={selectedProduct}
//   onClose={() => setSelectedProduct(null)}
//   addToCart={addToCart}
//   loading={loadingProductId}
// />

//       )}
//     </div>
//   );
// };

// export default CategoryProductSection;

// updated code for responsive
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

  // Filter by category
  const filteredByCategory = useMemo(() => {
    return category === "সব"
      ? products
      : products.filter((p) =>
          Array.isArray(p.categories)
            ? p.categories.some((cat) => cat && cat.name === category)
            : false,
        );
  }, [products, category]);

  // Fuse search
  const filteredBySearch = useMemo(() => {
    if (!searchTerm) return filteredByCategory;
    const fuse = new Fuse(filteredByCategory, {
      keys: ["name", "description"],
      threshold: 0.3,
    });
    return fuse.search(searchTerm).map((res) => res.item);
  }, [filteredByCategory, searchTerm]);

  // Location filter
  const finalProducts = useMemo(() => {
    if (!locationTerm) return filteredBySearch;
    const normalized = locationTerm.trim().toLowerCase();
    const fuse = new Fuse(filteredBySearch, {
      keys: ["seller_location"],
      threshold: 0.4,
      ignoreLocation: true,
      distance: 100,
      includeScore: false,
      isCaseSensitive: false,
    });
    return fuse.search(normalized).map((r) => r.item);
  }, [filteredBySearch, locationTerm]);

  // Pagination
  const totalPages = Math.ceil(finalProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return finalProducts.slice(start, end);
  }, [finalProducts, currentPage]);

  // Reset page on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, locationTerm]);

  // Render stars
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
    <div className="relative p-3 sm:p-4 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">{category}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {finalProducts.length} টি পণ্য পাওয়া গেছে
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          {/* Location input */}
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

          {/* Cart button */}
          {userData?.role !== "seller" ? (
            <Link
              to="/cart"
              className="relative justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-800 text-white hover:bg-gray-950 h-9 px-4 py-2 flex items-center gap-2 mt-2 sm:mt-0"
            >
              <FiShoppingCart className="w-4 h-4" /> কার্ট
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center text-white bg-red-500 rounded-full border border-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
          ) : (
            <button
              onClick={() =>
                toast.error("সেলারেরা কার্ট ব্যবহার করতে পারবেন না!")
              }
              className="justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-600 text-white cursor-not-allowed h-9 px-4 py-2 flex items-center gap-2 mt-2 sm:mt-0"
            >
              <FiShoppingCart className="w-4 h-4" /> কার্ট
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {paginatedProducts.length ? (
          paginatedProducts.map((product) => (
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
                {product.discount && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full shadow">
                    {product.discount}% ছাড়
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-2 sm:p-3 space-y-2 sm:space-y-3">
                <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {product.description || "পণ্যের সংক্ষিপ্ত বর্ণনা নেই"}
                </p>

                {/* Price & Rating */}
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
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="w-3 h-3" />
                    <span>{product.seller_location || "লোকেশন নেই"}</span>
                    {product.verified && (
                      <FiCheckCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex items-center gap-2 pt-2">
                  {userData?.role !== "seller" ? (
                    <button
                      disabled={loadingProductId === product.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className={`ml-auto flex items-center gap-1 text-xs sm:text-sm rounded-md px-2 sm:px-3 py-1.5
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
                    <button
                      disabled
                      className="flex ml-auto items-center gap-2 bg-gray-500 text-white px-3 py-1.5 rounded-lg cursor-not-allowed text-xs sm:text-sm"
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
            কোনো পণ্য পাওয়া যায়নি 😔
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-2 bg-white shadow-md px-2 py-2 rounded-full">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              disabled={currentPage === 1}
            >
              ‹ Prev
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    currentPage === page
                      ? "bg-black text-white border-black"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              disabled={currentPage === totalPages}
            >
              Next ›
            </button>
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
