import React from "react";

const Overview = () => {
  const summary = [
    { title: "মোট আয়", value: "৳89,180", color: "bg-blue-500" },
    { title: "পণ্য বিক্রি", value: "8", color: "bg-green-500" },
    { title: "অর্ডার সংখ্যা", value: "7", color: "bg-purple-500" },
    { title: "গড় রেটিং", value: "4.2", color: "bg-orange-500" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summary.map((item, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl text-white flex flex-col gap-2 shadow ${item.color}`}
          >
            <span className="text-sm opacity-90">{item.title}</span>
            <h3 className="text-2xl font-semibold">{item.value}</h3>
          </div>
        ))}
      </div>
      <p className="text-gray-600">ওভারভিউ কনটেন্ট এখানে যোগ করা যাবে...</p>
    </div>
  );
};

export default Overview;
