

// import React, { useState, useEffect, useContext } from "react";
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

// const CategoryProductSection = ({ category = "সব" }) => {
//   const [products, setProducts] = useState([]);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [priceRange, setPriceRange] = useState(50000);
//   const [rating, setRating] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const { addToCart, cartItems } = useContext(CartContext);

//   // 🔹 Fetch all products from backend API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/products/");
//         console.log("Fetched products:", response.data);
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // 🔹 Filter products by selected category
//   const filteredProducts =
//     category === "সব"
//       ? products
//       : products.filter((p) =>
//           p.categories?.some(
//             (cat) => typeof cat === "object" && cat.name === category
//           )
//         );

//   // 🔹 Apply price and rating filters
//   const finalProducts = filteredProducts.filter(
//     (p) => parseFloat(p.price) <= priceRange && (p.rating || 0) >= rating
//   );

//   // 🔹 Add product to backend cart
//   const handleAddToCart = async (product) => {
//     try {
//       const token = localStorage.getItem("access");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       };

//       const body = {
//         product_id: product.id,
//         quantity: 1,
//       };

//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/cart/add_item/",
//         body,
//         config
//       );

//       if (response.status === 200) {
//         alert("Product added to cart successfully!");
//         addToCart(product); // update local cart context
//       }
//     } catch (error) {
//       console.error(error);
//       alert(
//         error.response?.data?.error ||
//           "Failed to add product to cart. Try again."
//       );
//     }
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
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="justify-center whitespace-nowrap rounded-md text-sm font-medium border bg-background text-foreground hover:bg-gray-300 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 flex items-center gap-2"
//           >
//             <FiFilter className="w-4 h-4" /> ফিল্টার
//           </button>

//           <Link
//             to="/cart"
//             className="relative justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-800 text-white hover:bg-gray-950/90 h-9 px-4 py-2 flex items-center gap-2"
//           >
//             <FiShoppingCart className="w-4 h-4" /> কার্ট
//             {cartItems.length > 0 && (
//               <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center text-white bg-red-500 rounded-full border border-white">
//                 {cartItems.length}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {finalProducts.length > 0 ? (
//           finalProducts.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col cursor-pointer"
//             >
//               <div
//                 className="relative aspect-square overflow-hidden bg-gray-100"
//                 onClick={() => setSelectedProduct(product)}
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
//                 />
//                 {product.discount && (
//                   <span className="absolute top-2 right-2 text-white text-sm font-semibold
//              px-3 py-1 rounded-full bg-red-600 shadow-md">
//                     {product.discount}% ছাড়
//                   </span>
//                 )}
//               </div>

//               <div className="p-3 space-y-2">
//                 <h3 className="font-medium text-sm sm:text-base line-clamp-2">
//                   {product.name}
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
//                   {product.shortDesc || "৫জি স্মার্টফোন, ১২৮জিবি স্টোরেজ"}
//                 </p>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-1 sm:gap-2">
//                     <span className="font-semibold text-base sm:text-lg">
//                       ৳{product.price}
//                     </span>
//                     {product.oldPrice && (
//                       <span className="text-xs sm:text-sm text-gray-400 line-through">
//                         ৳{product.oldPrice}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-1 text-xs sm:text-sm">
//                     <FiStar className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
//                     <span>{product.rating}</span>
//                     <span className="text-gray-400">
//                       ({product.reviews || 0})
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between text-xs sm:text-sm">
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1 text-gray-500">
//                       <FiMapPin className="w-3 h-3" />
//                       <span>{product.location || "ঢাকা"}</span>
//                     </div>
//                     {product.verified && (
//                       <FiCheckCircle
//                         className="w-4 h-4 text-blue-500"
//                         title="যাচাইকৃত বিক্রেতা"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 pt-1">
//                   <span className="text-xs sm:text-sm text-gray-600 flex-1">
//                     {product.seller_name  || "অজানা বিক্রেতা"}
//                   </span>
//                   <button
//                     onClick={() => handleAddToCart(product)}
//                     className="justify-center whitespace-nowrap text-xs sm:text-sm font-medium bg-black text-white hover:bg-gray-800 h-7 sm:h-8 rounded-md px-2.5 sm:px-3 flex items-center gap-1 transition"
//                   >
//                     <FiShoppingCart className="w-3.5 h-3.5" /> কার্টে যোগ করুন
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center py-10 text-gray-500">
//             এই ক্যাটেগরিতে কোনো পণ্য পাওয়া যায়নি 😔
//           </p>
//         )}
//       </div>

//       {/* Filter Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
//           isFilterOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center px-4 py-3 border-b">
//           <h3 className="text-lg font-bold">ফিল্টার অপশন</h3>
//           <button
//             onClick={() => setIsFilterOpen(false)}
//             className="text-gray-600 hover:text-black"
//           >
//             <FiX size={20} />
//           </button>
//         </div>
//         <div className="p-4 space-y-5 overflow-y-auto h-[calc(100%-60px)]">
//           <div>
//             <h4 className="font-semibold mb-2">মূল্য পরিসীমা</h4>
//             <input
//               type="range"
//               min="0"
//               max="50000"
//               value={priceRange}
//               onChange={(e) => setPriceRange(Number(e.target.value))}
//               className="w-full accent-black"
//             />
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>৳0</span>
//               <span>৳{priceRange}</span>
//             </div>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-2">ন্যূনতম রেটিং</h4>
//             <input
//               type="range"
//               min="0"
//               max="5"
//               step="0.5"
//               value={rating}
//               onChange={(e) => setRating(Number(e.target.value))}
//               className="w-full accent-black"
//             />
//             <p className="text-sm text-gray-600">⭐ {rating} এবং তার বেশি</p>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-2">সাজান</h4>
//             <select className="w-full border rounded px-3 py-2 text-sm">
//               <option>জনপ্রিয়তা অনুযায়ী</option>
//               <option>মূল্য (কম থেকে বেশি)</option>
//               <option>মূল্য (বেশি থেকে কম)</option>
//               <option>রেটিং</option>
//             </select>
//           </div>

//           <button
//             onClick={() => setIsFilterOpen(false)}
//             className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition text-sm"
//           >
//             সব ফিল্টার প্রয়োগ করুন
//           </button>
//         </div>
//       </div>

//       {/* Overlay */}
//       {isFilterOpen && (
//         <div
//           onClick={() => setIsFilterOpen(false)}
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//         />
//       )}

//       {/* Product Details Modal */}
//       {selectedProduct && (
//         <ProductDetailsModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//           addToCart={handleAddToCart}
//         />
//       )}
//     </div>
//   );
// };

// export default CategoryProductSection;
import React, { useState, useContext } from "react";
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

const CategoryProductSection = ({ products = [], category = "সব" }) => {
  // 🔹 State
  const [isFilterOpen, setIsFilterOpen] = useState(false); // filter drawer
  const [priceRange, setPriceRange] = useState(50000); // price filter
  const [rating, setRating] = useState(0); // rating filter
  const [selectedProduct, setSelectedProduct] = useState(null); // modal product

  const { addToCart, cartItems } = useContext(CartContext); // cart context

  console.log("Products in CategoryProductSection:", products);
  // 🔹 Filter products by category
  const filteredProducts =
    category === "সব"
      ? products
      : products.filter((p) =>
          Array.isArray(p.categories)
            ? p.categories.some((cat) => cat && cat.name === category)
            : false
        );

  // 🔹 Apply price and rating filters
  const finalProducts = filteredProducts.filter(
    (p) => parseFloat(p.price) <= priceRange && (p.rating || 0) >= rating
  );

  // 🔹 Add product to cart
  const handleAddToCart = async (product) => {
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
        alert("Product added to cart successfully!");
        addToCart(product); // update local cart
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error ||
          "Failed to add product to cart. Try again."
      );
    }
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
          <button
            onClick={() => setIsFilterOpen(true)}
            className="justify-center whitespace-nowrap rounded-md text-sm font-medium border bg-background text-foreground hover:bg-gray-300 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 flex items-center gap-2"
          >
            <FiFilter className="w-4 h-4" /> ফিল্টার
          </button>

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
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {finalProducts.length > 0 ? (
          finalProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Product Image */}
              <div
                className="relative aspect-square overflow-hidden bg-gray-100"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <span className="absolute top-2 right-2 text-white text-sm font-semibold px-3 py-1 rounded-full bg-red-600 shadow-md">
                    {product.discount}% ছাড়
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 space-y-2">
                <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                  {product.shortDesc || "পণ্যের সংক্ষিপ্ত বর্ণনা নেই"}
                </p>

                <div className="flex items-center justify-between">
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
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <FiStar className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating || 0}</span>
                    <span className="text-gray-400">
                      ({product.reviews || 0})
                    </span>
                  </div>
                </div>

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

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs sm:text-sm text-gray-600 flex-1">
                    {product.seller_name || "অজানা বিক্রেতা"}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="justify-center whitespace-nowrap text-xs sm:text-sm font-medium bg-black text-white hover:bg-gray-800 h-7 sm:h-8 rounded-md px-2.5 sm:px-3 flex items-center gap-1 transition"
                  >
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

