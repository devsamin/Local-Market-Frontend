


import React, { useState, useEffect, useContext } from "react";
import {
  Package,
  ShoppingCart,
  Star,
  Box,
  BarChart2,
} from "lucide-react";
import { MdTrendingUp } from "react-icons/md";

import Overview from "./Overview";
import Products from "./Products";
import Orders from "./Orders";
import Analytics from "./Analytics";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import axios from "axios";

const SellerDashboard = () => {
  const { user } = useContext(AuthContext);
  const sellerId = user?.id || Number(localStorage.getItem("id"));
  const token = localStorage.getItem("access");
  const [activeTab, setActiveTab] = useState("overview");

  // ==== API states ====
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  // ==== Load API Data ====
  useEffect(() => {
  if (sellerId) {
    fetchProducts();
    fetchOrders();
    fetchRatings();
  }
}, [sellerId]);

  // === Products API ===
  const fetchProducts = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/products/",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Filter seller-wise
    const sellerProducts = res.data.filter(
  (item) => item.seller === Number(sellerId)
);

    setTotalProducts(sellerProducts.length);

    console.log("Filtered Products:", sellerProducts);
  } catch (error) {
    console.log("Product API Error:", error);
  }
};


  // === Orders API ===
  const fetchOrders = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/orders/seller-orders/",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Seller Orders:", res.data);
    setTotalOrders(res.data.length); // total count
  } catch (error) {
    console.log("Order API Error:", error);
  }
};

  // === Rating API ===
  const fetchRatings = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/reviews/",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // seller-wise filter
    const sellerReviews = res.data.filter(
      (rev) => rev.product.seller === sellerId
    );

    if (sellerReviews.length > 0) {
      const avg =
        sellerReviews.reduce((sum, item) => sum + item.rating, 0) /
        sellerReviews.length;
      setAvgRating(avg.toFixed(1));
    } else {
      setAvgRating(0);
    }

    console.log("Filtered Reviews:", sellerReviews);
  } catch (error) {
    console.log("Review API Error:", error);
  }
};

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "analytics":
        return <Analytics />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8">
      
      {/* ==== Seller Info Section ==== */}
      <div className="flex items-center gap-4 mb-6 bg-white rounded-xl shadow p-5">
        <div className="relative rounded-full h-20 w-20 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">আহমেদ আলী</h1>
          <p className="text-sm text-gray-500">বিক্রেতা ড্যাশবোর্ড</p>

          <div className="flex items-center gap-6 mt-2">
            {/* ==== Total Products ==== */}
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Package className="w-4 h-4 text-gray-500" />
              <span>{totalProducts} পণ্য</span>
            </div>

            {/* ==== Total Orders ==== */}
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <ShoppingCart className="w-4 h-4 text-gray-500" />
              <span>{totalOrders} অর্ডার</span>
            </div>

            {/* ==== Avg Rating ==== */}
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{avgRating} রেটিং</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==== Navigation Tabs ==== */}
      <div className="flex justify-between gap-9 bg-white shadow-sm rounded-xl mx-4 py-3 mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 ${
            activeTab === "overview"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-700 hover:text-indigo-600"
          }`}
        >
          <MdTrendingUp className="text-lg" /> ওভারভিউ
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 ${
            activeTab === "products"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-700 hover:text-indigo-600"
          }`}
        >
          <Box className="text-lg" /> পণ্য
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 ${
            activeTab === "orders"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-700 hover:text-indigo-600"
          }`}
        >
          <ShoppingCart className="text-lg" /> অর্ডার
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 ${
            activeTab === "analytics"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-700 hover:text-indigo-600"
          }`}
        >
          <BarChart2 className="text-lg" /> অ্যানালিটিক্স
        </button>
      </div>

      {/* ==== Dynamic Content ==== */}
      {renderContent()}
    </div>
  );
};

export default SellerDashboard;
