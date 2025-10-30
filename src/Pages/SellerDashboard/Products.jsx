import React, { useState } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddProductModal from "./AddProductModal/AddProductModal";

const Products = () => {
  const [products, setProducts] = useState([
    {
      name: "Power Bank 20000mAh",
      description: "ফাস্ট চার্জিং পাওয়ার ব্যাংক",
      price: "৳1,200",
      stock: 12,
      rating: 4.5,
      reviews: 22,
      image: "https://via.placeholder.com/300",
      category: "Electronics",
      discount: 10,
    },
    {
      name: "Wireless Earbuds",
      description: "নয়েজ ক্যান্সেলেশন সহ ইয়ারবাড",
      price: "৳3,400",
      stock: 8,
      rating: 4.2,
      reviews: 15,
      image: "https://via.placeholder.com/300",
      category: "Audio",
      discount: 18,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className="p-4">
      {/* === Header === */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          পণ্য ব্যবস্থাপনা
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 h-9 px-4 py-2"
        >
          +
          নতুন পণ্য যোগ করুন
        </button>
      </div>

      {/* === Product Grid === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product, i) => (
          <div
            key={i}
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
                ক্যাটাগরি: {product.category}
              </p>

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{product.price}</p>
                <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded">
                  স্টক: {product.stock}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                ⭐ {product.rating} ({product.reviews})
              </div>

              <div className="border-t my-1"></div>

              <div className="flex gap-1">
                <button className="flex-1 flex items-center justify-center gap-1 text-[12px] border rounded px-2 py-1 hover:bg-gray-100">
                  <FiEye className="w-3 h-3" /> দেখুন
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 text-[12px] border rounded px-2 py-1 hover:bg-gray-100">
                  <FiEdit2 className="w-3 h-3" /> এডিট
                </button>
                <button className="flex items-center justify-center gap-1 text-[12px] bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600">
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
