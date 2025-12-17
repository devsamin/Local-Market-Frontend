import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-6 bg-green-50">
      <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 পেমেন্ট সফল হয়েছে!</h1>
      <p className="text-gray-700 mb-6">
        আপনার অর্ডার প্রাপ্তি এবং ডেলিভারির জন্য ধন্যবাদ।  
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition"
      >
        আরও পণ্য ব্রাউজ করুন
      </Link>
    </div>
  );
};

export default PaymentSuccess;
