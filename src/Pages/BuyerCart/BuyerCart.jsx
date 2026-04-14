// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
// import { IoArrowBack } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import OrderConfirmModal from "../OrderConfirmModal/OrderConfirmModal";
// import { BASE_URL } from "../../config.js/config";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CartContext } from "../../contexts/CartContext/CartContext";
// import { Helmet } from "react-helmet-async";

// const BuyerCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Per-item loading
//   const [itemLoading, setItemLoading] = useState(null);

//   // 🔹 Payment loading
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   const [showModal, setShowModal] = useState(false);

//   const token = localStorage.getItem("access");
//   const { removeFromCart } = useContext(CartContext);

//   /* ================= LOAD CART ================= */
//   const loadCart = async () => {
//     try {
//       const res = await axios.get(
//         "https://local-mart-11yd.onrender.com/api/cart/",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       setCartItems(res.data.items || []);
//     } catch (err) {
//       console.error(err);
//       setCartItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, [token]);

//   /* ================= INCREASE ================= */
//   const increaseQty = async (id) => {
//     const item = cartItems.find((i) => i.id === id);
//     if (!item) return;

//     setItemLoading(id);
//     try {
//       await axios.post(
//         "https://local-mart-11yd.onrender.com/api/cart/add_item/",
//         { product_id: item.product.id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       await loadCart();
//     } catch (err) {
//       toast.error("পরিমাণ বাড়ানো যায়নি");
//     } finally {
//       setItemLoading(null);
//     }
//   };

//   const decreaseQty = async (id) => {
//     const item = cartItems.find((i) => i.id === id);
//     if (!item) return;

//     setItemLoading(id);

//     try {
//       await axios.post(
//         "https://local-mart-11yd.onrender.com/api/cart/decrease_item/",
//         { product_id: item.product.id },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       // ✅ single source of truth
//       await loadCart();
//     } catch (err) {
//       toast.error("পরিমাণ কমানো যায়নি");
//     } finally {
//       setItemLoading(null);
//     }
//   };

//   /* ================= DELETE ================= */
//   const deleteItem = async (id) => {
//     const item = cartItems.find((i) => i.id === id);
//     if (!item) return;

//     setItemLoading(id);
//     try {
//       await axios.post(
//         "https://local-mart-11yd.onrender.com/api/cart/remove_item/",
//         { product_id: item.product.id },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       setCartItems((prev) => prev.filter((i) => i.id !== id));
//       removeFromCart(item.product.id);
//       toast.success("পণ্য মুছে ফেলা হয়েছে");
//     } catch (err) {
//       toast.error("পণ্য মুছতে সমস্যা হয়েছে");
//     } finally {
//       setItemLoading(null);
//     }
//   };

//   /* ================= PAYMENT ================= */
//   const handleCheckout = async () => {
//     setPaymentLoading(true); // 🔹 START loading
//     try {
//       // 1️⃣ Create Order
//       const orderRes = await axios.post(
//         "https://local-mart-11yd.onrender.com/api/orders/orders/checkout/",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       const { order_id } = orderRes.data;

//       // 2️⃣ Create Stripe Session
//       const stripeRes = await axios.post(
//         "https://local-mart-11yd.onrender.com/api/payment/stripe/checkout/",
//         { order_id },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       // 3️⃣ Redirect to Stripe
//       window.location.href = stripeRes.data.checkout_url;
//     } catch (err) {
//       toast.error("পেমেন্ট শুরু করা যায়নি");
//       console.error(err);
//     } finally {
//       setPaymentLoading(false); // 🔹 STOP loading
//     }
//   };

//   /* ================= TOTALS ================= */
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.product.discounted_price * item.quantity,
//     0,
//   );
//   const delivery = 60;
//   const total = subtotal + delivery;

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         🔄 কার্ট লোড হচ্ছে...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <Helmet>
//         <title>কার্ট | LocalMarket</title>
//       </Helmet>
//       {/* BACK */}
//       <Link
//         to="/"
//         className="flex items-center gap-2 mb-4 font-bold text-white"
//       >
//         <IoArrowBack /> কেনাকাটা চালিয়ে যান
//       </Link>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* ================= LEFT ================= */}
//         <div className="lg:col-span-2 space-y-5">
//           {cartItems.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl shadow">
//               🛒 আপনার কার্ট খালি
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center bg-white p-5 rounded-xl shadow"
//               >
//                 {/* INFO */}
//                 <div className="flex gap-4">
//                   <img
//                     src={
//                       item.product.image ||
//                       "https://i.ibb.co/2ypYw9Y/default-avatar.png"
//                     }
//                     alt={item.product.name}
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-black">
//                       {item.product.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       ৳{item.product.discounted_price.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 {/* CONTROLS */}
//                 <div className="text-right min-w-[200px]">
//                   <div className="flex justify-end items-center gap-2">
//                     <button
//                       disabled={itemLoading === item.id}
//                       onClick={() => decreaseQty(item.id)}
//                       className="px-3 py-1 border rounded cursor-pointer"
//                     >
//                       <FaMinus size={12} />
//                     </button>

//                     <span
//                       className="min-w-[40px] text-center text-sm font-medium
//                  bg-gray-50 border rounded-md py-1 "
//                     >
//                       {item.quantity}
//                     </span>

//                     <button
//                       disabled={itemLoading === item.id}
//                       onClick={() => increaseQty(item.id)}
//                       className="px-3 py-1 border rounded cursor-pointer"
//                     >
//                       <FaPlus size={12} />
//                     </button>
//                   </div>

//                   <p className="text-sm mt-2">
//                     সাবটোটাল :{" "}
//                     <b>
//                       ৳
//                       {(
//                         item.product.discounted_price * item.quantity
//                       ).toLocaleString()}
//                     </b>
//                   </p>

//                   <button
//                     disabled={itemLoading === item.id}
//                     onClick={() => deleteItem(item.id)}
//                     className="flex items-center gap-1 text-red-600 mt-2 ml-auto text-sm"
//                   >
//                     <FaTrashAlt /> মুছুন
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* ================= RIGHT ================= */}
//         {cartItems.length > 0 && (
//           <div className="bg-white p-5 rounded-xl shadow space-y-4">
//             <h3 className="font-semibold text-lg">📦 অর্ডার সারাংশ</h3>

//             <div className="text-sm space-y-1">
//               <div className="flex justify-between">
//                 <span>সাবটোটাল</span>
//                 <span>৳{subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>ডেলিভারি</span>
//                 <span>৳{delivery}</span>
//               </div>
//             </div>

//             <div className="flex justify-between font-bold text-lg">
//               <span>সর্বমোট</span>
//               <span>৳{total.toLocaleString()}</span>
//             </div>

//             <button
//               disabled={paymentLoading}
//               onClick={handleCheckout}
//               className={`w-full py-2 rounded-lg text-white font-semibold ${
//                 paymentLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-black hover:bg-gray-900"
//               }`}
//             >
//               {paymentLoading ? "⏳ পেমেন্ট হচ্ছে..." : "💳 পেমেন্ট করুন"}
//             </button>
//           </div>
//         )}
//       </div>

//       <OrderConfirmModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//       />
//     </div>
//   );
// };

// export default BuyerCart;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import OrderConfirmModal from "../OrderConfirmModal/OrderConfirmModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../../contexts/CartContext/CartContext";
import { Helmet } from "react-helmet-async";

const BuyerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemLoading, setItemLoading] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("access");
  const { removeFromCart } = useContext(CartContext);

  /* ================= LOAD CART ================= */
  const loadCart = async () => {
    try {
      const res = await axios.get(
        "https://local-mart-11yd.onrender.com/api/cart/",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error(err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [token]);

  /* ================= UPDATE ================= */
  const increaseQty = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    setItemLoading(id);
    try {
      await axios.post(
        "https://local-mart-11yd.onrender.com/api/cart/add_item/",
        { product_id: item.product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await loadCart();
    } catch {
      toast.error("পরিমাণ বাড়ানো যায়নি");
    } finally {
      setItemLoading(null);
    }
  };

  const decreaseQty = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    setItemLoading(id);
    try {
      await axios.post(
        "https://local-mart-11yd.onrender.com/api/cart/decrease_item/",
        { product_id: item.product.id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await loadCart();
    } catch {
      toast.error("পরিমাণ কমানো যায়নি");
    } finally {
      setItemLoading(null);
    }
  };

  const deleteItem = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    setItemLoading(id);
    try {
      await axios.post(
        "https://local-mart-11yd.onrender.com/api/cart/remove_item/",
        { product_id: item.product.id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setCartItems((prev) => prev.filter((i) => i.id !== id));
      removeFromCart(item.product.id);
      toast.success("পণ্য মুছে ফেলা হয়েছে");
    } catch {
      toast.error("পণ্য মুছতে সমস্যা হয়েছে");
    } finally {
      setItemLoading(null);
    }
  };

  /* ================= PAYMENT ================= */
  const handleCheckout = async () => {
    setPaymentLoading(true);
    try {
      const orderRes = await axios.post(
        "https://local-mart-11yd.onrender.com/api/orders/orders/checkout/",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { order_id } = orderRes.data;

      const stripeRes = await axios.post(
        "https://local-mart-11yd.onrender.com/api/payment/stripe/checkout/",
        { order_id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      window.location.href = stripeRes.data.checkout_url;
    } catch (err) {
      toast.error("পেমেন্ট শুরু করা যায়নি");
    } finally {
      setPaymentLoading(false);
    }
  };

  /* ================= TOTAL ================= */
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.discounted_price * item.quantity,
    0,
  );
  const delivery = 60;
  const total = subtotal + delivery;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black">
        🔄 কার্ট লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 text-black bg-white">
      <Helmet>
        <title>কার্ট | LocalMarket</title>
      </Helmet>

      {/* BACK */}
      <Link
        to="/"
        className="flex items-center gap-2 mb-4 font-medium text-gray-700 hover:text-black"
      >
        <IoArrowBack /> কেনাকাটা চালিয়ে যান
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-5">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow text-black">
              🛒 আপনার কার্ট খালি
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-5 rounded-xl shadow"
              >
                {/* INFO */}
                <div className="flex gap-4">
                  <img
                    src={
                      item.product.image ||
                      "https://i.ibb.co/2ypYw9Y/default-avatar.png"
                    }
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div>
                    <h3 className="font-semibold text-black">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ৳{item.product.discounted_price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* CONTROLS */}
                <div className="text-right min-w-[200px] text-black">
                  <div className="flex justify-end items-center gap-2">
                    <button
                      disabled={itemLoading === item.id}
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 border rounded"
                    >
                      <FaMinus size={12} />
                    </button>

                    <span className="min-w-[40px] text-center text-sm font-medium bg-gray-50 border rounded-md py-1 text-black">
                      {item.quantity}
                    </span>

                    <button
                      disabled={itemLoading === item.id}
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 border rounded"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  <p className="text-sm mt-2 text-black">
                    সাবটোটাল :{" "}
                    <b>
                      ৳
                      {(
                        item.product.discounted_price * item.quantity
                      ).toLocaleString()}
                    </b>
                  </p>

                  <button
                    disabled={itemLoading === item.id}
                    onClick={() => deleteItem(item.id)}
                    className="flex items-center gap-1 text-red-600 mt-2 ml-auto text-sm"
                  >
                    <FaTrashAlt /> মুছুন
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        {cartItems.length > 0 && (
          <div className="bg-white p-5 rounded-xl shadow space-y-4 text-black">
            <h3 className="font-semibold text-lg">📦 অর্ডার সারাংশ</h3>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>সাবটোটাল</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>ডেলিভারি</span>
                <span>৳{delivery}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>সর্বমোট</span>
              <span>৳{total.toLocaleString()}</span>
            </div>

            <button
              disabled={paymentLoading}
              onClick={handleCheckout}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                paymentLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900"
              }`}
            >
              {paymentLoading ? "⏳ পেমেন্ট হচ্ছে..." : "💳 পেমেন্ট করুন"}
            </button>
          </div>
        )}
      </div>

      <OrderConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default BuyerCart;
