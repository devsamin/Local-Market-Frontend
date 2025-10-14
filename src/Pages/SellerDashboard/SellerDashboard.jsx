// import React from "react";
// import {
//   FiShoppingCart,
//   FiPackage,
//   FiUsers,
//   FiStar,
//   FiTrendingUp,
//   FiMessageSquare,
//   FiBox,
//   FiBarChart2,
// } from "react-icons/fi";
// import { MdTrendingUp } from "react-icons/md";

// const SellerDashboard = () => {
//   const summary = [
//     {
//       title: "মোট আয়",
//       value: "৳89,180",
//       icon: <FiTrendingUp />,
//       color: "bg-blue-500",
//     },
//     {
//       title: "পণ্য বিক্রি",
//       value: "8",
//       icon: <FiShoppingCart />,
//       color: "bg-green-500",
//     },
//     {
//       title: "অর্ডার সংখ্যা",
//       value: "7",
//       icon: <FiPackage />,
//       color: "bg-purple-500",
//     },
//     {
//       title: "গড় রেটিং",
//       value: "4.2",
//       icon: <FiStar />,
//       color: "bg-orange-500",
//     },
//   ];

//   const orders = [
//     {
//       id: "Order#1",
//       product: "পণ্য নাম ১",
//       amount: "৳1,650",
//       status: "ডেলিভারী সম্পন্ন",
//       date: "১২ অক্টোবর ২০২৫",
//     },
//     {
//       id: "Order#2",
//       product: "পণ্য নাম ২",
//       amount: "৳2,100",
//       status: "অপেক্ষমান",
//       date: "১৩ অক্টোবর ২০২৫",
//     },
//   ];

//   const reviews = [
//     {
//       user: "মাহিন আহমেদ",
//       rating: 5,
//       comment: "খুবই ভালো পণ্য, দ্রুত ডেলিভারি পেয়েছি!",
//       date: "১২ অক্টোবর ২০২৫",
//     },
//     {
//       user: "তানিয়া ইসলাম",
//       rating: 4,
//       comment: "গুণগত মান ভালো ছিল, ধন্যবাদ বিক্রেতা!",
//       date: "১১ অক্টোবর ২০২৫",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8">
//       {/* ==== Top Menu Tabs ==== */}
      

//       {/* ==== Header (Seller Info) ==== */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
//         <div className="flex items-center gap-4">
//           <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
//           <img src="" alt="Samin" />
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold">আবদুল্লাহ আল চামিন</h2>
//             <p className="text-gray-500 text-sm">বিক্রেতা অ্যাকাউন্ট</p>
//             <div className="flex items-center gap-2 text-sm mt-1">
//               <span className="text-gray-600">⭐ 4.2 রেটিং</span>
//               <span className="text-gray-400">•</span>
//               <span className="text-gray-600">৮ পণ্য</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between gap-9 bg-white shadow-sm rounded-xl mx-4 py-3 mb-6">
//         <button className="flex items-center m-2 gap-2 text-gray-800 font-medium border-primary pb-1 ">
//           <MdTrendingUp className="text-lg" /> ওভারভিউ
//         </button>
//         <button className="flex items-center gap-2 text-gray-700 hover:text-primary transition">
//           <FiBox className="text-lg" /> পণ্য
//         </button>
//         <button className="flex items-center gap-2 text-gray-700 hover:text-primary transition">
//           <FiShoppingCart className="text-lg" /> অর্ডার
//         </button>
//         <button className="flex items-center m-2 gap-2 text-gray-700 hover:text-primary transition">
//           <FiBarChart2 className="text-lg" /> অ্যানালিটিক্স
//         </button>
//       </div>

//       {/* ==== Summary Cards ==== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {summary.map((item, index) => (
//           <div
//             key={index}
//             className={`p-5 rounded-xl text-white flex flex-col gap-2 shadow ${item.color}`}
//           >
//             <div className="flex justify-between items-center">
//               <span className="text-sm opacity-90">{item.title}</span>
//               <span className="text-2xl">{item.icon}</span>
//             </div>
//             <h3 className="text-2xl font-semibold">{item.value}</h3>
//           </div>
//         ))}
//       </div>

//       {/* ==== Status Section ==== */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
//         {/* === অর্ডার স্ট্যাটাস === */}
//         <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
//           <h3 className="font-semibold text-lg mb-4">অর্ডার স্ট্যাটাস</h3>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between items-center">
//               <span>অপেক্ষমাণ</span>
//               <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">1</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>নিশ্চিত</span>
//               <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">1</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>সম্পন্ন</span>
//               <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">3</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>বাতিল</span>
//               <span className="bg-red-400 text-white px-2 py-1 rounded-full text-xs">1</span>
//             </div>
//           </div>
//         </div>

//         {/* === পণ্য স্ট্যাটাস === */}
//         <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
//           <h3 className="font-semibold text-lg mb-4">পণ্য স্ট্যাটাস</h3>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between items-center">
//               <span>মোট</span>
//               <span className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs">7</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>সক্রিয়</span>
//               <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">6</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>স্টক শেষ</span>
//               <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">1</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>অপেক্ষমাণ অনুমোদন</span>
//               <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">1</span>
//             </div>
//           </div>
//         </div>

//         {/* === আর্থিক তথ্য === */}
//         <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
//           <h3 className="font-semibold text-lg mb-4">আর্থিক তথ্য</h3>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between items-center">
//               <span>মোট আয়</span>
//               <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
//                 ৳89,180
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>এই মাসে</span>
//               <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">৳0</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>গড় অর্ডার মূল্য</span>
//               <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs">
//                 ৳29726
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>মোট রিভিউ</span>
//               <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">10</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ==== Orders, Products & Reviews ==== */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Orders + Products */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Recent Orders */}
//           <div className="bg-white p-5 rounded-xl shadow-sm">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold text-gray-800">সাম্প্রতিক অর্ডার</h3>
//               <button className="text-sm text-blue-600 hover:underline">সব দেখুন</button>
//             </div>
//             <div className="space-y-4">
//               {orders.map((order, index) => (
//                 <div
//                   key={index}
//                   className="p-4 rounded-lg border flex justify-between items-center hover:bg-gray-50 transition"
//                 >
//                   <div>
//                     <h4 className="font-semibold text-gray-700">{order.product}</h4>
//                     <p className="text-sm text-gray-500">{order.date}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-medium">{order.amount}</p>
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full ${
//                         order.status === "ডেলিভারী সম্পন্ন"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Products */}
//           <div className="bg-white p-5 rounded-xl shadow-sm">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold text-gray-800">পণ্য বিবরণ</h3>
//               <button className="text-sm text-blue-600 hover:underline">
//                 নতুন পণ্য যোগ করুন
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
//                 সক্রিয় ৫
//               </span>
//               <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
//                 বিক্রি হয়েছে ৩
//               </span>
//               <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
//                 স্টক আউট ১
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Reviews */}
//         <div className="bg-white p-5 rounded-xl shadow-sm">
//           <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//             <FiMessageSquare /> সাম্প্রতিক রিভিউ
//           </h3>
//           <div className="space-y-4">
//             {reviews.map((rev, index) => (
//               <div key={index} className="border-b pb-3 last:border-none">
//                 <div className="flex justify-between">
//                   <h4 className="font-medium text-gray-700">{rev.user}</h4>
//                   <span className="text-sm text-gray-500">{rev.date}</span>
//                 </div>
//                 <div className="text-yellow-500 text-sm">
//                   {"⭐".repeat(rev.rating)}{" "}
//                   <span className="text-gray-600">{rev.comment}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;





import React, { useState } from "react";
import {
  FiShoppingCart,
  FiPackage,
  FiStar,
  FiTrendingUp,
  FiMessageSquare,
  FiBox,
  FiBarChart2,
} from "react-icons/fi";
import { MdTrendingUp } from "react-icons/md";

// ==== Import Child Components (You will create these files) ====
import Overview from "./Overview";
import Products from "./Products";
import Orders from "./Orders";
import Analytics from "./Analytics";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview"); // overview, products, orders, analytics

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
      {/* ==== Header (Seller Info) ==== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
            <img src="" alt="Samin" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">আবদুল্লাহ আল চামিন</h2>
            <p className="text-gray-500 text-sm">বিক্রেতা অ্যাকাউন্ট</p>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-gray-600">⭐ 4.2 রেটিং</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">৮ পণ্য</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==== Top Tabs ==== */}
      <div className="flex justify-between gap-9 bg-white shadow-sm rounded-xl mx-4 py-3 mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center m-2 gap-2 font-medium ${
            activeTab === "overview"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <MdTrendingUp className="text-lg" /> ওভারভিউ
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 ${
            activeTab === "products"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <FiBox className="text-lg" /> পণ্য
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 ${
            activeTab === "orders"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <FiShoppingCart className="text-lg" /> অর্ডার
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center m-2 gap-2 ${
            activeTab === "analytics"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <FiBarChart2 className="text-lg" /> অ্যানালিটিক্স
        </button>
      </div>

      {/* ==== Render Selected Tab ==== */}
      {renderContent()}
    </div>
  );
};

export default SellerDashboard;
