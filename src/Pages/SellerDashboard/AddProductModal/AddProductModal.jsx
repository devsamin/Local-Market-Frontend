import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const AddProductModal = ({ onClose, onAdd }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newProduct = {
      name: data.name,
      description: data.description,
      price: `৳${data.price}`,
      stock: parseInt(data.stock) || 0,
      rating: 0,
      reviews: 0,
      image: data.image || "https://via.placeholder.com/300",
      category: data.category || "Uncategorized",
      discount: parseInt(data.discount) || 0,
    };

    onAdd(newProduct);
    reset();
    onClose();
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
          <div>
            <label className="block text-sm text-gray-600 mb-1">পণ্যের নাম</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Product Name"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">বিবরণ</label>
            <textarea
              {...register("description")}
              placeholder="Product Description"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
            />
          </div>

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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">ক্যাটাগরি</label>
              <input
                {...register("category")}
                type="text"
                placeholder="Electronics"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              />
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

          <div>
            <label className="block text-sm text-gray-600 mb-1">ছবি লিংক</label>
            <input
              {...register("image")}
              type="text"
              placeholder="https://example.com/image.jpg"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
            />
          </div>

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
