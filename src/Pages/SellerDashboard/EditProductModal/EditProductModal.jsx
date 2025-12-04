// import React, { useState } from "react";
// import axios from "axios";

// const EditProductModal = ({ product, onClose, onUpdate }) => {
//   const [form, setForm] = useState({
//     name: product.name || "",
//     price: product.price || "",
//     stock: product.stock || "",
//     discount: product.discount || "",
//     description: product.description || "",
//   });

//   const [imagePreview, setImagePreview] = useState(product.image || null);
//   const [newImage, setNewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("access");

//   // 🔹 Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🔹 Handle image select
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   // 🔹 Submit update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("description", form.description);
//       formData.append("price", form.price);
//       formData.append("stock", form.stock);
//       formData.append("discount", form.discount);
//       if (newImage) formData.append("image", newImage);

//       const res = await axios.patch(
//         `http://127.0.0.1:8000/api/products/${product.id}/`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       onUpdate(res.data);
//       alert("✅ পণ্যটি সফলভাবে আপডেট হয়েছে!");
//       onClose();
//     } catch (error) {
//       console.error("❌ Update Error:", error.response?.data || error);
//       alert("পণ্য আপডেট করতে সমস্যা হয়েছে!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative animate-fade-in">
//         {/* ❌ Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//         >
//           ✕
//         </button>

//         {/* Header */}
//         <div className="text-center mb-6">
//           <h2 className="text-lg font-semibold">পণ্য আপডেট করুন</h2>
//           <p className="text-sm text-gray-500">
//             আপনার পণ্যের তথ্য সম্পাদনা করুন। আপডেটের পর পরিবর্তনগুলি সংরক্ষিত হবে।
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Product Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               পণ্যের নাম *
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="পণ্যের নাম লিখুন"
//               className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               পণ্যের বিবরণ *
//             </label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="পণ্যের বিস্তারিত বিবরণ দিন"
//               className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-gray-800 outline-none"
//               required
//             />
//           </div>

//           {/* Price, Stock, Discount */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 মূল্য (৳) *
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 value={form.price}
//                 onChange={handleChange}
//                 placeholder="0"
//                 min="0"
//                 className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 স্টক সংখ্যা *
//               </label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={form.stock}
//                 onChange={handleChange}
//                 placeholder="0"
//                 min="0"
//                 className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600 mb-1">ছাড় (%)</label>
//               <input
//                 type="number"
//                 name="discount"
//                 value={form.discount}
//                 onChange={handleChange}
//                 placeholder="10"
//                 min="0"
//                 className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
//               />
//             </div>
//           </div>

//           {/* ✅ Image Upload Section */}
//           <div className="text-center mt-4">
//             <p className="text-sm text-gray-700 mb-2">পণ্যের ছবি আপডেট করুন</p>

//             {/* Current / Preview Image */}
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="w-32 h-32 object-cover mx-auto rounded-md border mb-3"
//               />
//             )}

//             {/* 🔘 Custom Upload Button */}
//             <button
//               type="button"
//               className="relative inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 px-4 py-2 transition-all"
//             >
//               📷 ছবি নির্বাচন করুন
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
//               />
//             </button>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 border rounded-md py-2 text-sm font-medium hover:bg-gray-100"
//             >
//               বাতিল
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-all text-sm font-medium disabled:opacity-50"
//             >
//               {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProductModal;


import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    name: product.name || "",
    price: product.price || "",
    stock: product.stock || "",
    discount: product.discount || "",
    description: product.description || "",
  });

  // ----- Image previews -----
  const [imagePreview, setImagePreview] = useState(product.image || null);
  const [image2Preview, setImage2Preview] = useState(product.image2 || null);
  const [image3Preview, setImage3Preview] = useState(product.image3 || null);

  // ----- New images -----
  const [newImage, setNewImage] = useState(null);
  const [newImage2, setNewImage2] = useState(null);
  const [newImage3, setNewImage3] = useState(null);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access");

  // Text fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---- Image handler (Reusable) ----
  const handleImageSelect = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("discount", form.discount);

      if (newImage) formData.append("image", newImage);
      if (newImage2) formData.append("image2", newImage2);
      if (newImage3) formData.append("image3", newImage3);

      const res = await axios.patch(
        `http://127.0.0.1:8000/api/products/${product.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdate(res.data);
      toast.success("✅ পণ্যটি সফলভাবে আপডেট হয়েছে!");
      onClose();
    } catch (error) {
      console.error("❌ Update Error:", error.response?.data || error);
      toast.error("❌ পণ্য আপডেট করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-center text-lg font-semibold mb-4">
          পণ্য আপডেট করুন
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm">পণ্যের নাম *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm">পণ্যের বিবরণ *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-20"
              required
            />
          </div>

          {/* Price Stock Discount */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm">মূল্য *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm">স্টক *</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm">ছাড় (%)</label>
              <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* -----------  IMAGE 1 ------------- */}
          <div className="text-center mt-4">
            <p className="text-sm mb-1">মেইন ছবি</p>

            {imagePreview && (
              <img
                src={imagePreview}
                className="w-28 h-28 object-cover mx-auto rounded-md border mb-2"
              />
            )}

            <button
              type="button"
              className="relative border px-4 py-2 rounded bg-gray-50"
            >
              ছবি পরিবর্তন করুন
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageSelect(e, setNewImage, setImagePreview)
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </button>
          </div>

          {/* -----------  IMAGE 2 ------------- */}
          <div className="text-center mt-4">
            <p className="text-sm mb-1">অতিরিক্ত ছবি ১</p>

            {image2Preview && (
              <img
                src={image2Preview}
                className="w-28 h-28 object-cover mx-auto rounded-md border mb-2"
              />
            )}

            <button
              type="button"
              className="relative border px-4 py-2 rounded bg-gray-50"
            >
              ছবি পরিবর্তন করুন
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageSelect(e, setNewImage2, setImage2Preview)
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </button>
          </div>

          {/* -----------  IMAGE 3 ------------- */}
          <div className="text-center mt-4">
            <p className="text-sm mb-1">অতিরিক্ত ছবি ২</p>

            {image3Preview && (
              <img
                src={image3Preview}
                className="w-28 h-28 object-cover mx-auto rounded-md border mb-2"
              />
            )}

            <button
              type="button"
              className="relative border px-4 py-2 rounded bg-gray-50"
            >
              ছবি পরিবর্তন করুন
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageSelect(e, setNewImage3, setImage3Preview)
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-900 text-white py-2 rounded"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
