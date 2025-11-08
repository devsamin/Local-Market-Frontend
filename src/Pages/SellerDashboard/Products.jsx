// import React, { useState } from "react";
// import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
// import AddProductModal from "./AddProductModal/AddProductModal";

// const Products = () => {
//   const [products, setProducts] = useState([
//     {
//       name: "Power Bank 20000mAh",
//       description: "ফাস্ট চার্জিং পাওয়ার ব্যাংক",
//       price: "৳1,200",
//       stock: 12,
//       rating: 4.5,
//       reviews: 22,
//       image: "https://via.placeholder.com/300",
//       category: "Electronics",
//       discount: 10,
//     },
//     {
//       name: "Wireless Earbuds",
//       description: "নয়েজ ক্যান্সেলেশন সহ ইয়ারবাড",
//       price: "৳3,400",
//       stock: 8,
//       rating: 4.2,
//       reviews: 15,
//       image: "https://via.placeholder.com/300",
//       category: "Audio",
//       discount: 18,
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false);

//   const handleAddProduct = (newProduct) => {
//     setProducts((prev) => [...prev, newProduct]);
//   };

//   return (
//     <div className="p-4">
//       {/* === Header === */}
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold text-gray-800">
//           পণ্য ব্যবস্থাপনা
//         </h3>
//         <button
//           onClick={() => setShowModal(true)}
//           className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 h-9 px-4 py-2"
//         >
//           +
//           নতুন পণ্য যোগ করুন
//         </button>
//       </div>

//       {/* === Product Grid === */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
//         {products.map((product, i) => (
//           <div
//             key={i}
//             className="bg-white border rounded-lg overflow-hidden flex flex-col hover:shadow-sm transition-all"
//           >
//             {/* Image */}
//             <div className="relative">
//               <div className="h-40 overflow-hidden bg-gray-100">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {product.discount > 0 && (
//                 <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
//                   {product.discount}% ছাড়
//                 </span>
//               )}
//             </div>

//             {/* Content */}
//             <div className="p-2 space-y-1">
//               <h3 className="font-semibold text-xs line-clamp-1">
//                 {product.name}
//               </h3>
//               <p className="text-[10px] text-gray-500 line-clamp-1">
//                 {product.description}
//               </p>
//               <p className="text-[10px] text-gray-400">
//                 ক্যাটাগরি: {product.category}
//               </p>

//               <div className="flex items-center justify-between">
//                 <p className="text-sm font-semibold">{product.price}</p>
//                 <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded">
//                   স্টক: {product.stock}
//                 </span>
//               </div>

//               <div className="flex items-center gap-1 text-[10px] text-yellow-500">
//                 ⭐ {product.rating} ({product.reviews})
//               </div>

//               <div className="border-t my-1"></div>

//               <div className="flex gap-1">
//                 <button className="flex-1 flex items-center justify-center gap-1 text-[12px] border rounded px-2 py-1 hover:bg-gray-100">
//                   <FiEye className="w-3 h-3" /> দেখুন
//                 </button>
//                 <button className="flex-1 flex items-center justify-center gap-1 text-[12px] border rounded px-2 py-1 hover:bg-gray-100">
//                   <FiEdit2 className="w-3 h-3" /> এডিট
//                 </button>
//                 <button className="flex items-center justify-center gap-1 text-[12px] bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600">
//                   <FiTrash2 className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* === Add Product Modal === */}
//       {showModal && (
//         <AddProductModal
//           onClose={() => setShowModal(false)}
//           onAdd={handleAddProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default Products;


// api 

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddProductModal from "./AddProductModal/AddProductModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access"); // JWT token
  const sellerId = localStorage.getItem("id"); // store this when login

  // ✅ Fetch all products by this seller
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://127.0.0.1:8000/api/products/?seller_id=${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Add new product (from modal)
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("আপনি কি সত্যিই এই পণ্যটি মুছে ফেলতে চান?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("✅ পণ্যটি সফলভাবে মুছে ফেলা হয়েছে!");
    } catch (error) {
      console.error("❌ Delete Error:", error.response?.data || error);
      alert("পণ্যটি মুছতে সমস্যা হয়েছে!");
    }
  };

  // ✅ Edit product
  const handleEdit = async (id) => {
    const newName = prompt("নতুন পণ্যের নাম লিখুন:");
    if (!newName) return;

    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/products/${id}/`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? res.data : p))
      );
      alert("✅ পণ্যটি আপডেট হয়েছে!");
    } catch (error) {
      console.error("❌ Update Error:", error.response?.data || error);
      alert("পণ্য আপডেট করতে সমস্যা হয়েছে!");
    }
  };

  if (loading) {
    return <p className="text-center py-10">⏳ পণ্য লোড হচ্ছে...</p>;
  }

  return (
    <div className="p-4">
      {/* === Header === */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">পণ্য ব্যবস্থাপনা</h3>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 h-9 px-4 py-2"
        >
          + নতুন পণ্য যোগ করুন
        </button>
      </div>

      {/* === Product Grid === */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">কোন পণ্য পাওয়া যায়নি</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg overflow-hidden flex flex-col hover:shadow-sm transition-all"
            >
              {/* Image */}
              <div className="relative">
                <div className="h-40 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                    {product.discount}% ছাড়
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-2 space-y-1">
                <h3 className="font-semibold text-xs line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[10px] text-gray-500 line-clamp-1">
                  {product.description}
                </p>
                <p className="text-[10px] text-gray-400">
                  ক্যাটাগরি:{" "}
                  {product.categories?.length
                    ? product.categories.map((c) => c.name).join(", ")
                    : "Uncategorized"}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">৳{product.price}</p>
                  <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded">
                    স্টক: {product.stock}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                  ⭐ {product.rating || 0} ({product.reviews?.length || 0})
                </div>

                <div className="border-t my-1"></div>

                <div className="flex gap-1">
                  <button className="flex-1 flex items-center justify-center gap-1 text-[12px] border rounded px-2 py-1 hover:bg-gray-100">
                    <FiEye className="w-3 h-3" /> দেখুন
                  </button>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex-1 flex items-center justify-center gap-1 text-[12px] border rounded px-2 py-1 hover:bg-gray-100"
                  >
                    <FiEdit2 className="w-3 h-3" /> এডিট
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center justify-center gap-1 text-[12px] bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === Add Product Modal === */}
      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddProduct}
        />
      )}
    </div>
  );
};

export default Products;
