// import React from "react";
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// import { FiX } from "react-icons/fi";

// const AddProductModal = ({ onClose, onAdd }) => {
//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = (data) => {
//     const newProduct = {
//       name: data.name,
//       description: data.description,
//       price: `৳${data.price}`,
//       stock: parseInt(data.stock) || 0,
//       rating: 0,
//       reviews: 0,
//       image: data.image || "https://via.placeholder.com/300",
//       category: data.category || "Uncategorized",
//       discount: parseInt(data.discount) || 0,
//     };

//     onAdd(newProduct);
//     reset();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//         >
//           <FiX size={20} />
//         </button>

//         <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
//           নতুন পণ্য যোগ করুন
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">পণ্যের নাম</label>
//             <input
//               {...register("name", { required: true })}
//               type="text"
//               placeholder="Product Name"
//               className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">বিবরণ</label>
//             <textarea
//               {...register("description")}
//               placeholder="Product Description"
//               className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">মূল্য (৳)</label>
//               <input
//                 {...register("price", { required: true })}
//                 type="number"
//                 placeholder="1200"
//                 className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">স্টক</label>
//               <input
//                 {...register("stock")}
//                 type="number"
//                 placeholder="10"
//                 className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">ক্যাটাগরি</label>
//               <input
//                 {...register("category")}
//                 type="text"
//                 placeholder="Electronics"
//                 className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">ছাড় (%)</label>
//               <input
//                 {...register("discount")}
//                 type="number"
//                 placeholder="10"
//                 className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">ছবি লিংক</label>
//             <input
//               {...register("image")}
//               type="text"
//               placeholder="https://example.com/image.jpg"
//               className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-all text-sm font-medium"
//           >
//             যোগ করুন
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AddProductModal;

// api


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import axios from "axios";

const AddProductModal = ({ onClose, onAdd }) => {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);

  // 🔹 Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/category/");
        console.log("Fetched categories:", res.data);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Handle product submission
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access"); // JWT token

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("discount", data.discount || 0);
      formData.append("stock", data.stock || 0);

      if (data.category) {
        formData.append("categories", data.category); // single category
      }

      // ✅ Handle image file upload
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await axios.post(
        "http://127.0.0.1:8000/api/products/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Product Added:", res.data);
      onAdd(res.data);
      reset();
      onClose();
    } catch (error) {
      console.error("❌ Product Add Error:", error.response?.data || error);
      alert("পণ্য যোগ করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
          নতুন পণ্য যোগ করুন
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">পণ্যের নাম</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Product Name"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">বিবরণ</label>
            <textarea
              {...register("description")}
              placeholder="Product Description"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">মূল্য (৳)</label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="1200"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">স্টক</label>
              <input
                {...register("stock")}
                type="number"
                placeholder="10"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Category & Discount */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">ক্যাটাগরি</label>
              <select
                {...register("category")}
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              >
                <option value="">-- ক্যাটাগরি নির্বাচন করুন --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">ছাড় (%)</label>
              <input
                {...register("discount")}
                type="number"
                placeholder="10"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              />
            </div>
          </div>

          {/* ✅ Image Upload (File Input) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">ছবি</label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="w-full border rounded-md px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:border-0 file:rounded-md file:bg-gray-800 file:text-white focus:ring-2 focus:ring-gray-800 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-all text-sm font-medium"
          >
            যোগ করুন
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProductModal;

