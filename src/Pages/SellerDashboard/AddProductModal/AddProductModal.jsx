import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductModal = ({ onClose, onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  // 🔹 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/category/");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("ক্যাটেগরি লোড করতে সমস্যা হয়েছে!");
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Watch image field for live preview
  const watchImage = watch("image");
  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const file = watchImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [watchImage]);

  // 🔹 Handle product submission
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access");
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("stock", data.stock || 0);
      formData.append("discount", data.discount || 0);

      if (data.category) formData.append("categories", data.category);
      if (data.image && data.image[0]) formData.append("image", data.image[0]);

      const res = await axios.post("http://127.0.0.1:8000/api/products/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onAdd(res.data);
      toast.success("পণ্য সফলভাবে যোগ হয়েছে!");
      reset();
      setImagePreview(null);
      onClose();
    } catch (error) {
      console.error("❌ Product Add Error:", error.response?.data || error);
      toast.error("পণ্য যোগ করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* <Toaster position="top-right" /> */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative"
      >
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">নতুন পণ্য যোগ করুন</h2>
          <p className="text-sm text-gray-500">
            আপনার পণ্যের বিস্তারিত তথ্য দিন। অ্যাডমিন অনুমোদনের পর পণ্যটি প্রদর্শিত হবে।
          </p>
        </div>

        {/* 📝 Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পণ্যের নাম *
            </label>
            <input
              {...register("name", { required: "পণ্যের নাম অবশ্যক" })}
              type="text"
              placeholder="পণ্যের নাম লিখুন"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পণ্যের বিবরণ *
            </label>
            <textarea
              {...register("description", { required: "পণ্যের বিবরণ অবশ্যক" })}
              placeholder="পণ্যের বিস্তারিত বিবরণ দিন"
              className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-gray-800 outline-none"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ক্যাটেগরি *
            </label>
            <select
              {...register("category", { required: "ক্যাটেগরি নির্বাচন করুন" })}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
            >
              <option value="">ক্যাটেগরি নির্বাচন করুন</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Price, Stock & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                মূল্য (৳) *
              </label>
              <input
                {...register("price", { required: "মূল্য অবশ্যক" })}
                type="number"
                placeholder="0"
                min="0"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                স্টক সংখ্যা *
              </label>
              <input
                {...register("stock", { required: "স্টক সংখ্যা অবশ্যক" })}
                type="number"
                placeholder="0"
                min="0"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">ছাড় (%)</label>
              <input
                {...register("discount")}
                type="number"
                placeholder="10"
                min="0"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-upload w-8 h-8 mx-auto text-gray-400 mb-2"
              aria-hidden="true"
            >
              <path d="M12 3v12"></path>
              <path d="m17 8-5-5-5 5"></path>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            </svg>
            <p className="text-sm text-gray-500 mb-2">পণ্যের ছবি আপলোড করুন</p>
            <button
              type="button"
              className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 border bg-background text-foreground hover:bg-gray-100 h-9 px-4 py-2"
            >
              ছবি নির্বাচন করুন
              <input
                {...register("image", { required: "ছবি অবশ্যক" })}
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </button>
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover mx-auto rounded-md border"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-md py-2 text-sm font-medium hover:bg-gray-100"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-all text-sm font-medium"
            >
              পণ্য যোগ করুন
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProductModal;
