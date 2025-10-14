import React from "react";

const Orders = () => {
  const orders = [
    {
      id: "Order#1",
      product: "পণ্য নাম ১",
      amount: "৳1,650",
      status: "ডেলিভারী সম্পন্ন",
      date: "১২ অক্টোবর ২০২৫",
    },
    {
      id: "Order#2",
      product: "পণ্য নাম ২",
      amount: "৳2,100",
      status: "অপেক্ষমান",
      date: "১৩ অক্টোবর ২০২৫",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">সাম্প্রতিক অর্ডার</h3>
        <button className="text-sm text-blue-600 hover:underline">সব দেখুন</button>
      </div>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border flex justify-between items-center hover:bg-gray-50 transition"
          >
            <div>
              <h4 className="font-semibold text-gray-700">{order.product}</h4>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{order.amount}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  order.status === "ডেলিভারী সম্পন্ন"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
