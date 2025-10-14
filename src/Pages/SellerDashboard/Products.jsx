import React from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const Products = () => {
  // Demo data (replace with real API or props later)
  const products = [
    {
      name: "Power Bank 20000mAh",
      description: "ফাস্ট চার্জিং পাওয়ার ব্যাংক",
      price: "৳1,200",
      stock: 12,
      rating: 4.5,
      reviews: 22,
      image: "https://via.placeholder.com/300",
    },
    {
      name: "Wireless Earbuds",
      description: "নয়েজ ক্যান্সেলেশন সহ ইয়ারবাড",
      price: "৳3,400",
      stock: 8,
      rating: 4.2,
      reviews: 15,
      image: "https://via.placeholder.com/300",
    },
    {
      name: "Laptop Dell Inspiron",
      description: "8GB RAM, 512GB SSD, Core i5",
      price: "৳45,000",
      stock: 0,
      rating: 4.7,
      reviews: 10,
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="p-4">
      {/* === Top Actions & Stats === */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          পণ্য ব্যবস্থাপনা
        </h3>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          নতুন পণ্য যোগ করুন
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow-sm p-4 rounded-lg border text-center">
          <h4 className="text-sm text-gray-500">মোট পণ্য</h4>
          <p className="text-xl font-bold text-gray-800">7</p>
        </div>
        <div className="bg-white shadow-sm p-4 rounded-lg border text-center">
          <h4 className="text-sm text-gray-500">সক্রিয়</h4>
          <p className="text-xl font-bold text-gray-800">6</p>
        </div>
        <div className="bg-white shadow-sm p-4 rounded-lg border text-center">
          <h4 className="text-sm text-gray-500">স্টক আউট</h4>
          <p className="text-xl font-bold text-gray-800">1</p>
        </div>
        <div className="bg-white shadow-sm p-4 rounded-lg border text-center">
          <h4 className="text-sm text-gray-500">অপেক্ষমান অনুমোদন</h4>
          <p className="text-xl font-bold text-gray-800">1</p>
        </div>
      </div>

      {/* === Product Cards (Your Design) === */}
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
      </div>

      {/* Content */}
      <div className="p-2 space-y-1">
        <h3 className="font-semibold text-xs line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-500 line-clamp-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{product.price}</p>
          <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded">
            স্টক: {product.stock}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 fill-yellow-400"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </svg>
          <span>
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="border-t my-1"></div>

        <div className="flex gap-1">
          <button className="flex-1 flex items-center justify-center gap-1 text-[13px] border rounded px-2 py-1 hover:bg-gray-100">
            <FiEye className="w-3 h-3" /> দেখুন
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 text-[13px] border rounded px-2 py-1 hover:bg-gray-100">
            <FiEdit2 className="w-3 h-3" /> এডিট
          </button>
          <button className="flex items-center justify-center gap-1 text-[13px] bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600">
            <FiTrash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Products;
