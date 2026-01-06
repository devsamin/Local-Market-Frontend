



// import React, { useEffect, useState, useContext } from "react";
// import { Star } from "lucide-react";
// import axios from "axios";
// import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

// const Overview = () => {
//   const { user } = useContext(AuthContext);
//   const sellerId = user?.id || Number(localStorage.getItem("id"));
//   const token = localStorage.getItem("access");

//   const [summary, setSummary] = useState({
//     totalEarnings: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     avgRating: 0,
//   });

//   const [orderStats, setOrderStats] = useState([]);
//   const [productStats, setProductStats] = useState([]);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     if (sellerId) fetchOverviewData();
//   }, [sellerId]);

//   const fetchOverviewData = async () => {
//     try {
//       // === Orders ===
//       const resOrders = await axios.get("http://127.0.0.1:8000/api/orders/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const sellerOrders = resOrders.data.filter(
//         (order) => order.seller === sellerId
//       );

//       // === Products ===
//       const resProducts = await axios.get(
//         "http://127.0.0.1:8000/api/products/",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const sellerProducts = resProducts.data.filter(
//         (p) => p.seller === sellerId
//       );

//       // === Reviews ===
//       const resReviews = await axios.get(
//         "http://127.0.0.1:8000/api/reviews/",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const sellerReviews = resReviews.data.filter(
//         (r) => r.product.seller === sellerId
//       );

//       // === Summary ===
//       const totalEarnings = sellerOrders.reduce((sum, o) => sum + o.total, 0);
//       const avgRating =
//         sellerReviews.length > 0
//           ? (
//               sellerReviews.reduce((sum, r) => sum + r.rating, 0) /
//               sellerReviews.length
//             ).toFixed(1)
//           : 0;

//       setSummary({
//         totalEarnings,
//         totalProducts: sellerProducts.length,
//         totalOrders: sellerOrders.length,
//         avgRating,
//       });

//       // === Stats ===
//       setOrderStats([
//         { label: "অপেক্ষমান", count: sellerOrders.filter(o => o.status==="অপেক্ষমান").length },
//         { label: "সম্পন্ন", count: sellerOrders.filter(o => o.status==="সম্পন্ন").length },
//         { label: "বাতিল", count: sellerOrders.filter(o => o.status==="বাতিল").length },
//       ]);

//       setProductStats([
//         { label: "স্টকে আছে", count: sellerProducts.filter(p=>p.stock>0).length },
//         { label: "স্টক শেষ", count: sellerProducts.filter(p=>p.stock===0).length },
//         { label: "নতুন পণ্য", count: sellerProducts.filter(p => new Date(p.created_at) > new Date(Date.now() - 7*24*60*60*1000)).length },
//       ]);

//       setRecentOrders(sellerOrders.slice(-5).reverse());
//       setReviews(sellerReviews.slice(-5).reverse());
//     } catch (err) {
//       console.log("Overview API Error:", err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="p-5 rounded-xl text-white shadow bg-blue-500">
//           <span className="text-sm opacity-90">মোট আয়</span>
//           <h3 className="text-3xl font-semibold">
//             ৳{summary.totalEarnings.toLocaleString()}
//           </h3>
//         </div>
//         <div className="p-5 rounded-xl text-white shadow bg-green-500">
//           <span className="text-sm opacity-90">পণ্য বিক্রি</span>
//           <h3 className="text-3xl font-semibold">{summary.totalProducts}</h3>
//         </div>
//         <div className="p-5 rounded-xl text-white shadow bg-purple-500">
//           <span className="text-sm opacity-90">অর্ডার সংখ্যা</span>
//           <h3 className="text-3xl font-semibold">{summary.totalOrders}</h3>
//         </div>
//         <div className="p-5 rounded-xl text-white shadow bg-orange-500">
//           <span className="text-sm opacity-90">গড় রেটিং</span>
//           <h3 className="text-3xl font-semibold">{summary.avgRating}</h3>
//         </div>
//       </div>

//       {/* Order & Product Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-white rounded-xl border shadow p-5">
//           <h3 className="text-lg font-semibold mb-4">অর্ডার বিশ্লেষণ</h3>
//           {orderStats.map((stat,i)=>(
//             <div key={i} className="flex justify-between mb-2">
//               <span>{stat.label}</span>
//               <span className="bg-gray-200 px-3 py-1 rounded-full">{stat.count}</span>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl border shadow p-5">
//           <h3 className="text-lg font-semibold mb-4">পণ্য বিশ্লেষণ</h3>
//           {productStats.map((stat,i)=>(
//             <div key={i} className="flex justify-between mb-2">
//               <span>{stat.label}</span>
//               <span className="bg-gray-200 px-3 py-1 rounded-full">{stat.count}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recent Orders & Reviews */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {/* Recent Orders */}
//         <div className="bg-white rounded-xl border shadow p-5">
//           <h3 className="text-lg font-semibold mb-4">সাম্প্রতিক অর্ডার</h3>
//           {recentOrders.map((order, i)=>(
//             <div key={i} className="flex justify-between border-b py-2">
//               <div>
//                 <h4 className="font-medium text-gray-800">{order.id}</h4>
//                 <p className="text-xs text-gray-500">৳{order.total}</p>
//               </div>
//               <span className={`px-2 py-1 rounded-full ${
//                 order.status==="সম্পন্ন" ? "bg-green-100 text-green-700" :
//                 order.status==="অপেক্ষমান" ? "bg-yellow-100 text-yellow-700" :
//                 "bg-red-100 text-red-700"
//               }`}>{order.status}</span>
//             </div>
//           ))}
//         </div>

//         {/* Reviews */}
//         <div className="bg-white rounded-xl border shadow p-5">
//           <h3 className="text-lg font-semibold mb-4">কাস্টমার রিভিউ</h3>
//           {reviews.map((r,i)=>(
//             <div key={i} className="border-b pb-3 last:border-none flex flex-col gap-1">
//               <div className="flex justify-between items-center">
//                 <span className="font-medium text-gray-800">{r.product?.name || r.name}</span>
//                 <span className="text-xs text-gray-500">{r.created_at?.slice(0,10)}</span>
//               </div>
//               <div className="flex text-yellow-500">
//                 {[...Array(5)].map((_, idx)=>(
//                   <Star key={idx} size={14} fill={idx<r.rating ? "currentColor":"none"} />
//                 ))}
//               </div>
//               <p className="text-sm text-gray-700">{r.comment}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;


import React, { useEffect, useState, useContext } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const sellerId = user?.id || Number(localStorage.getItem("id"));
  const token = localStorage.getItem("access");

  const [summary, setSummary] = useState({
    totalEarnings: 0,
    totalProducts: 0,
    totalOrders: 0,
    avgRating: 0,
  });

  const [orderStats, setOrderStats] = useState([]);
  const [productStats, setProductStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (sellerId) fetchOverviewData();
  }, [sellerId]);

  const fetchOverviewData = async () => {
    try {
      const res = await axios.get(
        "https://local-market-backend.onrender.com/api/dashboard/seller-dashboard/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data;

      // Summary
      setSummary({
        totalEarnings: data.total_earnings,
        totalProducts: data.products_sold,
        totalOrders:
          data.orders_count.pending +
          data.orders_count.completed +
          data.orders_count.cancelled,
        avgRating: data.average_rating,
      });

      // Order Stats
      setOrderStats([
        { label: "অপেক্ষমান", count: data.orders_count.pending },
        { label: "সম্পন্ন", count: data.orders_count.completed },
        { label: "বাতিল", count: data.orders_count.cancelled },
      ]);

      // Product Stats (not available in backend)
      setProductStats([
        { label: "স্টকে আছে", count: 0 },
        { label: "স্টক শেষ", count: 0 },
        { label: "নতুন পণ্য", count: 0 },
      ]);

      // Lists
      setRecentOrders(data.recent_orders);
      setReviews(data.recent_reviews);
    } catch (err) {
      console.log("Seller Dashboard Error:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl text-white shadow bg-blue-500">
          <span className="text-sm opacity-90">মোট আয়</span>
          <h3 className="text-3xl font-semibold">
            ৳{summary.totalEarnings.toLocaleString()}
          </h3>
        </div>

        <div className="p-5 rounded-xl text-white shadow bg-green-500">
          <span className="text-sm opacity-90">মোট পণ্য বিক্রি</span>
          <h3 className="text-3xl font-semibold">{summary.totalProducts}</h3>
        </div>

        <div className="p-5 rounded-xl text-white shadow bg-purple-500">
          <span className="text-sm opacity-90">অর্ডার সংখ্যা</span>
          <h3 className="text-3xl font-semibold">{summary.totalOrders}</h3>
        </div>

        <div className="p-5 rounded-xl text-white shadow bg-orange-500">
          <span className="text-sm opacity-90">গড় রেটিং</span>
          <h3 className="text-3xl font-semibold">{summary.avgRating}</h3>
        </div>
      </div>

      {/* Order & Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border shadow p-5">
          <h3 className="text-lg font-semibold mb-4">অর্ডার বিশ্লেষণ</h3>
          {orderStats.map((stat, i) => (
            <div key={i} className="flex justify-between mb-2">
              <span>{stat.label}</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                {stat.count}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border shadow p-5">
          <h3 className="text-lg font-semibold mb-4">পণ্য বিশ্লেষণ</h3>
          {productStats.map((stat, i) => (
            <div key={i} className="flex justify-between mb-2">
              <span>{stat.label}</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                {stat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders & Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border shadow p-5">
          <h3 className="text-lg font-semibold mb-4">সাম্প্রতিক অর্ডার</h3>

          {recentOrders.map((order, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <div>
                <h4 className="font-medium text-gray-800">
                  {order.product_name}
                </h4>
                <p className="text-xs text-gray-500">৳{order.price}</p>
              </div>

              <span
                className={`px-2 py-1 rounded-full ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl border shadow p-5">
          <h3 className="text-lg font-semibold mb-4">কাস্টমার রিভিউ</h3>

          {reviews.map((r, i) => (
            <div
              key={i}
              className="border-b pb-3 last:border-none flex flex-col gap-1"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{r.product}</span>
                <span className="text-xs text-gray-500">{r.date}</span>
              </div>

              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    fill={idx < r.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-700">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
