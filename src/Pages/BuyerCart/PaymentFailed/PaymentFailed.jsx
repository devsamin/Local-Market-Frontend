import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-6 bg-red-50">
      <h1 className="text-4xl font-bold text-red-700 mb-4">❌ পেমেন্ট ব্যর্থ হয়েছে!</h1>
      <p className="text-gray-700 mb-6">
        আপনার পেমেন্ট সম্পন্ন হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।  
      </p>
      <Link
        to="/cart"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition"
      >
        কার্টে ফিরে যান
      </Link>
    </div>
  );
};

export default PaymentFailed;
