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

  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://local-mart-11yd.onrender.com/api/category/",
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("ক্যাটেগরি লোড করতে সমস্যা হয়েছে!");
      }
    };
    fetchCategories();
  }, []);

  // Watch main image for preview
  const watchImage = watch("image");
  useEffect(() => {
    if (watchImage && watchImage[0]) {
      setImagePreview(URL.createObjectURL(watchImage[0]));
    }
  }, [watchImage]);

  // Handle form submit
  // const onSubmit = async (data) => {
  //   try {
  //     const token = localStorage.getItem("access");
  //     const formData = new FormData();

  //     formData.append("name", data.name);
  //     formData.append("description", data.description || "");
  //     formData.append("price", data.price);
  //     formData.append("stock", data.stock || 0);
  //     formData.append("discount", data.discount || 0);

  //     formData.append("category_ids", data.category);

  //     if (data.image && data.image[0]) formData.append("image", data.image[0]);
  //     if (data.image2 && data.image2[0]) formData.append("image2", data.image2[0]);
  //     if (data.image3 && data.image3[0]) formData.append("image3", data.image3[0]);

  //     const res = await axios.post("https://local-mart-11yd.onrender.com/api/products/", formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     onAdd(res.data);
  //     toast.success("পণ্য সফলভাবে যোগ হয়েছে!");
  //     reset();
  //     setImagePreview(null);
  //     onClose();
  //   } catch (error) {
  //     console.error("❌ Product Add Error:", error.response?.data || error);
  //     toast.error("❌ পণ্য যোগ করতে সমস্যা হয়েছে!");
  //   }
  // };

  const onSubmit = async (data) => {
    if (loading) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("access");
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("stock", Number(data.stock));
      formData.append("discount", Number(data.discount || 0));

      formData.append("category_ids", data.category);

      if (data.image?.[0]) formData.append("image", data.image[0]);
      if (data.image2?.[0]) formData.append("image2", data.image2[0]);
      if (data.image3?.[0]) formData.append("image3", data.image3[0]);

      const res = await axios.post(
        "https://local-mart-11yd.onrender.com/api/products/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onAdd(res.data);
      toast.success("পণ্য সফলভাবে যোগ হয়েছে!");
      reset();
      onClose();
    } catch (error) {
      console.error("❌ Product Add Error:", error.response?.data || error);
      toast.error("❌ পণ্য যোগ করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute bg-gray-950 rounded-full top-4 right-4 text-white hover:text-white p-1"
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">নতুন পণ্য যোগ করুন</h2>
          <p className="text-sm text-gray-500">
            আপনার পণ্যের বিস্তারিত তথ্য দিন। অ্যাডমিন অনুমোদনের পর পণ্যটি
            প্রদর্শিত হবে।
          </p>
        </div>

        {/* Form */}
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
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
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
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
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
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
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
                type="text"
                step="any"
                placeholder="0"
                min="0"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none relative z-10"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                স্টক সংখ্যা *
              </label>
              <input
                {...register("stock", { required: "স্টক সংখ্যা অবশ্যক" })}
                type="text"
                step="any"
                placeholder="0 "
                min="0"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none relative z-10"
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                ছাড় (%)
              </label>
              <input
                {...register("discount")}
                type="text"
                step="any"
                placeholder="10"
                min="0"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none relative z-10"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">মেইন ছবি *</p>
            <label className="relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all border bg-background hover:bg-gray-100 h-9 px-4 py-2 cursor-pointer">
              ছবি নির্বাচন করুন
              <input
                {...register("image", { required: "মেইন ছবি আবশ্যক" })}
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
            {watch("image")?.[0] && (
              <img
                src={URL.createObjectURL(watch("image")[0])}
                alt="Preview"
                className="mt-3 w-28 h-28 object-cover mx-auto rounded-md border"
              />
            )}
          </div>

          {/* Extra Images */}
          {[1, 2].map((i) => (
            <div className="text-center mt-4" key={i}>
              <p className="text-sm text-gray-600 mb-1">অতিরিক্ত ছবি {i}</p>
              <label className="relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all border bg-background hover:bg-gray-100 h-9 px-4 py-2 cursor-pointer">
                ছবি নির্বাচন করুন
                <input
                  {...register(`image${i + 1}`)}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
              {watch(`image${i + 1}`)?.[0] && (
                <img
                  src={URL.createObjectURL(watch(`image${i + 1}`)[0])}
                  alt="Preview"
                  className="mt-3 w-28 h-28 object-cover mx-auto rounded-md border"
                />
              )}
            </div>
          ))}

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
              disabled={loading}
              className={`flex-1 py-2 rounded-md transition-all text-sm font-medium
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gray-900 text-white hover:bg-gray-800"
    }`}
            >
              {loading ? "যোগ করা হচ্ছে..." : "পণ্য যোগ করুন"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProductModal;
