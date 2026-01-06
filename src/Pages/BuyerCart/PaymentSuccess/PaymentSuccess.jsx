// import React from "react";
// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";

// const PaymentSuccess = () => {
//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen text-center p-6 bg-green-50">
//       <Helmet>
//         <title>পেমেন্ট সফল হয়েছে | LocalMarket</title>
//       </Helmet>
//       <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 পেমেন্ট সফল হয়েছে!</h1>
//       <p className="text-gray-700 mb-6">
//         আপনার অর্ডার প্রাপ্তি এবং ডেলিভারির জন্য ধন্যবাদ।  
//       </p>
//       <Link
//         to="/"
//         className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition"
//       >
//         আরও পণ্য ব্রাউজ করুন
//       </Link>
//     </div>
//   );
// };

// export default PaymentSuccess;

import React, { useEffect, useContext, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../../../contexts/CartContext/CartContext";

const PaymentSuccess = () => {
  const token = localStorage.getItem("access");
  const { clearCart } = useContext(CartContext);

  const hasRun = useRef(false); // 🔥 IMPORTANT

  useEffect(() => {
    if (hasRun.current) return; // ❌ prevent multiple run
    hasRun.current = true;

    const completePayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const order_id = params.get("order_id");

      if (!order_id) return;

      try {
        await axios.get(
          `https://local-market-backend.onrender.com/api/payment/payment-success/?order_id=${order_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        clearCart();
        toast.success("পেমেন্ট সফল হয়েছে, কার্ট ক্লিয়ার করা হয়েছে!");

      } catch (err) {
        console.error(err);
        toast.error("পেমেন্ট কনফার্ম করতে সমস্যা হয়েছে");
      }
    };

    completePayment();
  }, [token, clearCart]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-6 bg-green-50">
      <Helmet>
        <title>পেমেন্ট সফল হয়েছে | LocalMarket</title>
      </Helmet>

      <h1 className="text-4xl font-bold text-green-700 mb-4">
        🎉 পেমেন্ট সফল হয়েছে!
      </h1>

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
