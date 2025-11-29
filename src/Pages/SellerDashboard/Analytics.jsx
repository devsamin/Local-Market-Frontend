// import React from "react";
// import { Star } from "lucide-react";

// const Analytics = () => {
//   const products = [
//     { name: "Power Bank 20000mAh", price: "৳3,000", rating: 4.4 },
//     { name: "Wireless Earbuds", price: "৳2,200", rating: 4.6 },
//     { name: "Samsung Galaxy A54", price: "৳48,000", rating: 4.7 },
//     { name: "Laptop Dell Inspiron", price: "৳72,000", rating: 4.3 },
//     { name: "Apple iPhone 15", price: "৳129,000", rating: 4.8 },
//   ];

//   const stats = [
//     { label: "মোট বিক্রয়", value: "৳89,180", color: "bg-green-500" },
//     { label: "এ মাসের বিক্রয়", value: "৳0", color: "bg-blue-500" },
//     { label: "মোট পণ্য বিক্রিত মূল্য", value: "৳29,726", color: "bg-pink-500" },
//   ];

//   const analytics = [
//     { label: "পাওয়ার ব্যাংক বিক্রয়", value: 36 },
//     { label: "ওয়্যারলেস ইয়ারবাড", value: 60 },
//     { label: "ল্যাপটপ বিক্রয়", value: 42 },
//     { label: "মোবাইল বিক্রয়", value: 64 },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       {/* === Top Stats === */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {stats.map((item, index) => (
//           <div
//             key={index}
//             className={`text-white ${item.color} rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center`}
//           >
//             <h2 className="text-2xl font-bold">{item.value}</h2>
//             <p className="text-sm mt-1 opacity-90">{item.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* === Popular Products === */}
//       <div className="bg-white rounded-xl border shadow-sm">
//         <div className="p-6">
//           <h3 className="text-lg font-semibold mb-4">জনপ্রিয় পণ্য</h3>
//           <div className="space-y-4">
//             {products.map((p, i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between border-b pb-3 last:border-none"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src="https://via.placeholder.com/50"
//                     alt={p.name}
//                     className="w-12 h-12 rounded-lg object-cover"
//                   />
//                   <div>
//                     <h4 className="text-sm font-medium">{p.name}</h4>
//                     <p className="text-xs text-gray-500">{p.price}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-1 text-yellow-500">
//                   <Star size={16} fill="currentColor" />
//                   <span className="text-sm text-gray-700">{p.rating}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* === Sales Analytics === */}
//       <div className="bg-white rounded-xl border shadow-sm">
//         <div className="p-6">
//           <h3 className="text-lg font-semibold mb-4">বিক্রয় বিশ্লেষণ</h3>
//           <div className="space-y-4">
//             {analytics.map((item, i) => (
//               <div key={i}>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>{item.label}</span>
//                   <span>{item.value}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
//                     style={{ width: `${item.value}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;



import React, { useEffect, useState, useContext } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const sellerId = user?.id || Number(localStorage.getItem("id"));
  const token = localStorage.getItem("access");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(sellerId) fetchProducts();
  }, [sellerId]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const sellerProducts = res.data.filter(p=>p.seller===sellerId);
      setProducts(sellerProducts);
    } catch(err) {
      console.log("Analytics API Error:", err);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <h3 className="text-lg font-semibold mb-4">জনপ্রিয় পণ্য</h3>
        {products.map((p,i)=>(
          <div key={i} className="flex items-center justify-between border-b pb-3 last:border-none">
            <div className="flex items-center gap-3">
              <img src={p.image || "https://via.placeholder.com/50"} alt={p.name} className="w-12 h-12 rounded-lg"/>
              <div>
                <h4 className="text-sm font-medium">{p.name}</h4>
                <p className="text-xs text-gray-500">৳{p.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm text-gray-700">{p.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics;
