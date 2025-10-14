import React, { useState } from "react";
import { FiMinus, FiPlus, FiTrash2, FiBox, FiX } from "react-icons/fi";
import OrderConfirmModal from "../OrderConfirmModal/OrderConfirmModal";

const BuyerCart = () => {
  const [showModal, setShowModal] = useState(false);

  const cartItems = [
    {
      id: 1,
      title: "Samsung Smart TV 43”",
      category: "electronics",
      image: "https://i.ibb.co.com/JjT2kW78/images.jpg",
      price: 45000,
      quantity: 1,
    },
    {
      id: 2,
      title: "Cotton T-Shirt",
      category: "clothing",
      image: "https://i.ibb.co.com/chY6MqJW/photo-1441984904996-e0b6ba687e04-crop-entropy-cs-tinysrgb-fit-max-fm-jpg-ixid-M3w3-Nzg4-Nzd8-MHwxf-H.jpg",
      price: 800,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryCharge = 60;
  const discount = 0;
  const total = subtotal + deliveryCharge - discount;

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-10 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">🛒 শপিং কার্ট</h2>
          <p className="text-gray-500 mb-5">{cartItems.length} টি পণ্য নির্বাচিত</p>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center border rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      ক্যাটাগরি:{" "}
                      <span className="font-medium text-gray-700">
                        {item.category}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex items-center border rounded-lg px-3 py-1">
                    <button className="p-1 text-gray-600 hover:text-black">
                      <FiMinus />
                    </button>
                    <span className="mx-3 font-medium">{item.quantity}</span>
                    <button className="p-1 text-gray-600 hover:text-black">
                      <FiPlus />
                    </button>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    ৳{item.price * item.quantity}
                  </p>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white lg:bg-[#0f172a] text-gray-900 lg:text-white rounded-2xl shadow-sm border p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiBox /> অর্ডার সামারি
          </h3>

          <div className="bg-white/10 p-4 rounded-lg mb-4 border border-gray-300/30 text-gray-900 lg:text-gray-100">
            <div className="flex justify-between mb-2">
              <span>নির্বাচিত পণ্য</span>
              <span>{cartItems.length} টি</span>
            </div>
            {cartItems.map((i) => (
              <div
                key={i.id}
                className="flex justify-between text-sm text-gray-400"
              >
                <span>{i.title}</span>
                <span>৳{i.price}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ</span>
              <span>৳{deliveryCharge}</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>ডিসকাউন্ট</span>
              <span>-৳{discount}</span>
            </div>
            <hr className="border-gray-700 my-3" />
            <div className="flex justify-between text-lg font-bold text-white">
              <span>সর্বমোট</span>
              <span>৳{total}</span>
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              অর্ডার সম্পন্ন করুন
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <OrderConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default BuyerCart;
