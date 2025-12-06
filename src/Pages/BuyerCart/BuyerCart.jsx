


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import OrderConfirmModal from "../OrderConfirmModal/OrderConfirmModal";
import { BASE_URL } from "../../config.js/config"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../../contexts/CartContext/CartContext";

const BuyerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");

  const {  removeFromCart } = useContext(CartContext);

  // ✅ Load Cart Items from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // DRF CartViewSet returns cart with items array
        console.log("cart",res.data);  
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Failed to load cart:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);
console.log(cartItems);
  // ✅ Increase Quantity
  const increaseQty = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/cart/add_item/",
        { product_id: item.product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Reload cart
      const cartRes = await axios.get("http://127.0.0.1:8000/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartRes.data.items || []);
    } catch (err) {
      console.error("Increase failed:", err);
    }
  };

  // ✅ Decrease Quantity
  const decreaseQty = async (id) => {
  const item = cartItems.find((i) => i.id === id);
  if (!item) return;
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/cart/decrease_item/",
      { product_id: item.product.id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCartItems(res.data.cart.items || []);
  } catch (err) {
    console.error("Decrease failed:", err);
  }
};

  // ✅ Delete Item
  const deleteItem = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/remove_item/",
        { product_id: item.product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) => prev.filter((i) => i.id !== id));
      // ✅ Context update for global cart count
    removeFromCart(item.product.id);
      // ✅ Show success toast
    toast.success("পণ্যটি সফলভাবে মুছে ফেলা হয়েছে!");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("পণ্য মুছে ফেলা যায়নি, পরে আবার চেষ্টা করুন।");
    }
  };

  // ✅ Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.discounted_price * item.quantity,
    0
  );
  const delivery = 60;
  const discount = 0;
  const total = subtotal + delivery - discount;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        🔄 কার্ট লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 🔙 Continue Shopping */}
      <div className="mb-2 -ml-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <IoArrowBack className="h-4 w-4" />
          কেনাকাটা চালিয়ে যান
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🛒 Left Section */}
        <div className="lg:col-span-2 space-y-6">
  <h2 className="text-2xl font-bold text-gray-900">🛒 কার্ট আইটেমস</h2>

  {cartItems.length === 0 ? (
    <div className="text-center text-gray-500 py-12 border rounded-xl bg-white shadow-sm">
      🛍️ আপনার কার্ট খালি
      <div className="mt-4">
        <Link
          to="/"
          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          পণ্য ব্রাউজ করুন
        </Link>
      </div>
    </div>
  ) : (
    cartItems.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition"
      >
        {/* Product Info */}
        <div className="flex items-center gap-5">
          <img
            src={`${BASE_URL}${item.product.image}`}  
            alt={item.product.name}
            className="w-24 h-24 object-cover rounded-lg border"
          />

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">
              {item.product.name}
            </h3>

            <p className="text-gray-500 text-sm">
              {item.product.category}
            </p>

            <p className="text-red-600 text-xs font-medium">
              মাত্র {item.product.stock} টি বাকি
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="text-right min-w-[180px]">

          {/* Price */}
          <p className="text-lg font-bold text-gray-900">
            ৳{item.product.discounted_price.toLocaleString()}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center justify-end gap-1 mt-3">

            <button
              onClick={() => decreaseQty(item.id)}
              className="p-2 rounded-md border hover:bg-gray-100 transition"
            >
              −
            </button>

            <span className="px-4 py-1 bg-gray-50 border rounded-md font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQty(item.id)}
              className="p-2 rounded-md border hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <p className="text-gray-600 text-sm mt-2">
            সাবটোটাল:{" "}
            <span className="font-semibold">
              ৳{(item.product.discounted_price * item.quantity).toLocaleString()}
            </span>
          </p>

          {/* Delete */}
          <button
            onClick={() => deleteItem(item.id)}
            className="text-red-600 mt-3 flex items-center gap-1 text-sm hover:text-red-800 ml-auto"
          >
            <FaTrashAlt /> মুছুন
          </button>
        </div>
      </div>
    ))
  )}
</div>

        {/* 📦 Right Section: Order Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-5 space-y-4 border">
            <h3 className="text-lg font-semibold bg-black text-white rounded-md p-2">
              📦 অর্ডার সারাংশ
            </h3>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <p className="font-medium border-b pb-1">
                নির্ধারিত পণ্য ({cartItems.length} টি)
              </p>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>
                    ৳{(item.product.discounted_price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-gray-600 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>সাবটোটাল</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span>৳{delivery}</span>
              </div>
              <div className="flex justify-between">
                <span>ছাড়</span>
                <span>-৳{discount}</span>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">সর্বমোট</p>
                <p className="text-3xl font-bold text-black">
                  ৳{total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 text-blue-700 p-2 rounded-md text-sm">
              ✅ আনুমানিক ডেলিভারি: 2 – 4 কার্যদিবস
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-lg font-semibold"
            >
              ✅ অর্ডার সম্পন্ন করুন ({cartItems.length} টি পণ্য)
            </button>
          </div>
        )}
      </div>

      {/* 🪟 Order Confirm Modal */}
      <OrderConfirmModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default BuyerCart;


