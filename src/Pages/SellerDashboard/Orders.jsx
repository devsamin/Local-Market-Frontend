import React from "react";
import { FiChevronDown } from "react-icons/fi";

const ordersData = [
  {
    id: "ORD-1001",
    customer: "আব্দুল করিম",
    phone: "017xxxxxxxx",
    date: "১৪ অক্টোবর ২০২৫, ৮:৩০ PM",
    status: "অপেক্ষমাণ",
    total: 135060,
    delivery: "ক্যাশ অন ডেলিভারি",
    items: [
      {
        name: "Samsung Galaxy A54",
        price: 42000,
        qty: 1,
        image: "https://via.placeholder.com/60",
      },
    ],
  },
  {
    id: "ORD-1002",
    customer: "রাশেদ মিয়া",
    phone: "018xxxxxxxx",
    date: "১৩ অক্টোবর ২০২৫, ৩:৪৫ PM",
    status: "নিশ্চিত",
    total: 1125100,
    delivery: "অনলাইন পেমেন্ট",
    items: [
      {
        name: "Apple iPhone 15",
        price: 65000,
        qty: 1,
        image: "https://via.placeholder.com/60",
      },
    ],
  },
  {
    id: "ORD-1003",
    customer: "মোঃ আরিফ",
    phone: "019xxxxxxxx",
    date: "১২ অক্টোবর ২০২৫, ১১:২০ AM",
    status: "সম্পন্ন",
    total: 190080,
    delivery: "ক্যাশ অন ডেলিভারি",
    items: [
      {
        name: "Samsung Smart TV 43''",
        price: 45000,
        qty: 1,
        image: "https://via.placeholder.com/60",
      },
    ],
  },
  {
    id: "ORD-1004",
    customer: "ইমরান হোসেন",
    phone: "016xxxxxxxx",
    date: "১১ অক্টোবর ২০২৫, ৫:১০ PM",
    status: "বাতিল",
    total: 18860,
    delivery: "অনলাইন পেমেন্ট",
    items: [
      {
        name: "Wireless Earbuds",
        price: 3000,
        qty: 1,
        image: "https://via.placeholder.com/60",
      },
      {
        name: "Power Bank 20000mAh",
        price: 4000,
        qty: 2,
        image: "https://via.placeholder.com/60",
      },
    ],
  },
];

// Status Color Map
const statusStyles = {
  অপেক্ষমাণ: "bg-yellow-100 text-yellow-700",
  নিশ্চিত: "bg-blue-100 text-blue-700",
  সম্পন্ন: "bg-green-100 text-green-700",
  বাতিল: "bg-red-100 text-red-700",
};

const Orders = () => {
  // Top Summary Counts
  const counts = {
    অপেক্ষমাণ: ordersData.filter((o) => o.status === "অপেক্ষমাণ").length,
    নিশ্চিত: ordersData.filter((o) => o.status === "নিশ্চিত").length,
    সম্পন্ন: ordersData.filter((o) => o.status === "সম্পন্ন").length,
    বাতিল: ordersData.filter((o) => o.status === "বাতিল").length,
  };

  return (
    <div className="p-5 space-y-6">
      {/* Top Heading */}
      <h2 className="text-xl font-semibold">অর্ডার ব্যবস্থাপনা</h2>
      <p className="text-sm text-gray-500">
        আপনার সকল অর্ডার দেখুন এবং পরিচালনা করুন
      </p>

      {/* Top Summary Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(counts).map(([label, count], idx) => (
          <div
            key={idx}
            className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-600 text-sm">{label}</p>
            <p
              className={`text-2xl font-bold ${
                label === "অপেক্ষমাণ"
                  ? "text-orange-500"
                  : label === "নিশ্চিত"
                  ? "text-blue-500"
                  : label === "সম্পন্ন"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {count}
            </p>
          </div>
        ))}
      </div>

      {/* Order List */}
      {ordersData.map((order, index) => (
        <div
          key={index}
          className="border rounded-lg p-5 bg-white shadow-sm mb-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <p className="font-semibold">
                গ্রাহক: {order.customer}{" "}
                <span className="text-sm text-gray-500">
                  (#{order.id})
                </span>
              </p>
              <p className="text-sm text-gray-500">
                ফোন: {order.phone}
              </p>
              <p className="text-xs text-gray-400">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">
                ৳{order.total.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{order.delivery}</p>
            </div>
          </div>

          {/* Badge */}
          <div className="mb-4">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                statusStyles[order.status]
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded border"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.qty} • ৳{item.price}
                    </p>
                  </div>
                </div>

                {/* Dropdown */}
                <div className="relative">
                  <select className="border rounded p-2 text-sm">
                    <option>অপেক্ষমাণ</option>
                    <option>নিশ্চিত</option>
                    <option>প্যাকেজিং</option>
                    <option>পরিবহন</option>
                    <option>সম্পন্ন</option>
                    <option>বাতিল</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
