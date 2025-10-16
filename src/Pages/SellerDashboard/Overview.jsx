import React from "react";
import { Star } from "lucide-react";

const Overview = () => {
  // Summary cards
  const summary = [
    { title: "মোট আয়", value: "৳89,180", color: "bg-blue-500" },
    { title: "পণ্য বিক্রি", value: "8", color: "bg-green-500" },
    { title: "অর্ডার সংখ্যা", value: "7", color: "bg-purple-500" },
    { title: "গড় রেটিং", value: "4.2", color: "bg-orange-500" },
  ];

  // Order analytics
  const orderStats = [
    { label: "অপেক্ষমান", color: "bg-yellow-500" },
    { label: "সম্পন্ন", color: "bg-green-600" },
    { label: "বাতিল", color: "bg-red-500" },
  ];

  // Product analytics
  const productStats = [
    { label: "স্টকে আছে", color: "bg-green-600" },
    { label: "স্টক শেষ", color: "bg-red-500" },
    { label: "নতুন পণ্য", color: "bg-blue-500" },
  ];

  // Recent Orders
  const recentOrders = [
    { id: "Order#1001", product: "Samsung A54", price: "৳48,000", status: "সম্পন্ন" },
    { id: "Order#1002", product: "Wireless Earbuds", price: "৳2,200", status: "সম্পন্ন" },
    { id: "Order#1003", product: "Laptop Dell Inspiron", price: "৳72,000", status: "অপেক্ষমান" },
    { id: "Order#1004", product: "Apple iPhone 15", price: "৳129,000", status: "বাতিল" },
  ];

  // Customer Reviews
  const reviews = [
    {
      name: "রহিম উদ্দিন",
      rating: 5,
      comment: "পণ্যের গুণগত মান চমৎকার। ডেলিভারিও দ্রুত ছিল!",
      date: "১০ অক্টোবর ২০২৫",
    },
    {
      name: "মোস্তাফিজুর রহমান",
      rating: 4,
      comment: "দাম একটু বেশি হলেও পণ্য ভালো লেগেছে।",
      date: "১২ অক্টোবর ২০২৫",
    },
    {
      name: "সাদিয়া ইসলাম",
      rating: 5,
      comment: "বিক্রেতার আচরণ দারুণ ছিল। ধন্যবাদ!",
      date: "১৩ অক্টোবর ২০২৫",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* === Top Summary Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl text-white shadow hover:shadow-lg transition-all ${item.color}`}
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm opacity-90">{item.title}</span>
              <h3 className="text-3xl font-semibold">{item.value}</h3>
              <div className="mt-2 w-full bg-white/30 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${(index + 1) * 20}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === Order & Product Analytics === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border shadow p-5">
          <h3 className="text-lg font-semibold mb-4">অর্ডার বিশ্লেষণ</h3>
          <div className="space-y-3">
            {orderStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{stat.label}</span>
                <span
                  className={`${stat.color} text-white text-xs px-3 py-1 rounded-full`}
                >
                  {Math.floor(Math.random() * 10) + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow p-5">
          <h3 className="text-lg font-semibold mb-4">পণ্য বিশ্লেষণ</h3>
          <div className="space-y-3">
            {productStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{stat.label}</span>
                <span
                  className={`${stat.color} text-white text-xs px-3 py-1 rounded-full`}
                >
                  {Math.floor(Math.random() * 10) + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Recent Orders & Reviews === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border shadow p-5">
          <h3 className="text-lg font-semibold mb-4">সাম্প্রতিক অর্ডার</h3>
          <div className="space-y-3">
            {recentOrders.map((order, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-3 last:border-none"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{order.product}</h4>
                  <p className="text-xs text-gray-500">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-700">{order.price}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "সম্পন্ন"
                        ? "bg-green-100 text-green-700"
                        : order.status === "অপেক্ষমান"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-white rounded-xl border shadow p-5">
          <h3 className="text-lg font-semibold mb-4">কাস্টমার রিভিউ</h3>
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="border-b pb-3 last:border-none flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{r.name}</span>
                  <span className="text-xs text-gray-500">{r.date}</span>
                </div>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill={index < r.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
