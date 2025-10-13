import React, { useState } from "react";
import { FiMinus, FiPlus, FiTrash2, FiBox, FiX } from "react-icons/fi";

const BuyerCart = () => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  const cartItems = [
    {
      id: 1,
      title: "Samsung Smart TV 43”",
      category: "electronics",
      image: "https://via.placeholder.com/120x80.png?text=TV",
      price: 45000,
      quantity: 1,
    },
    {
      id: 2,
      title: "Cotton T-Shirt",
      category: "clothing",
      image: "https://via.placeholder.com/120x80.png?text=T-Shirt",
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

      {/* Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg relative p-6 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-2">অর্ডার সম্পূর্ণ করুন</h2>
            <p className="text-gray-500 mb-4">
              আপনার অর্ডারের তথ্য পূরণ করুন
            </p>

            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-6">
              {["তথ্য", "পেমেন্ট", "নিশ্চিতকরণ"].map((label, index) => {
                const stepNumber = index + 1;
                const active = step === stepNumber;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                        active
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span
                      className={`font-medium ${
                        active ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                    {index < 2 && (
                      <div className="w-10 h-[2px] bg-gray-300 mx-2"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">গ্রাহকের তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="আপনার পূর্ণ নাম"
                    className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="০১১xxxxxxxx"
                    className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="আপনার ইমেইল (ঐচ্ছিক)"
                    className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="আপনার এরিয়া নির্বাচন করুন"
                    className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <h4 className="font-semibold mb-2">ডেলিভারি পদ্ধতি</h4>
                <div className="space-y-2 mb-3">
                  <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:border-blue-500">
                    <input type="radio" name="delivery" />
                    <span>হোম ডেলিভারি - আপনার ঠিকানায় পৌঁছে দেয়া হবে ৳৬০</span>
                  </label>
                  <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:border-blue-500">
                    <input type="radio" name="delivery" />
                    <span>নিজে নিয়ে যাবেন - দোকান থেকে নিজে সংগ্রহ করুন</span>
                  </label>
                </div>

                <textarea
                  placeholder="বিস্তারিত ঠিকানা লিখুন"
                  rows="3"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">পেমেন্ট তথ্য</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:border-blue-500">
                    <input type="radio" name="payment" />
                    <span>ক্যাশ অন ডেলিভারি</span>
                  </label>
                  <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:border-blue-500">
                    <input type="radio" name="payment" />
                    <span>বিকাশ / নগদ / রকেট</span>
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-6">
                <h3 className="text-xl font-semibold text-green-600 mb-3">
                  ✅ অর্ডার নিশ্চিত হয়েছে!
                </h3>
                <p className="text-gray-600">
                  ধন্যবাদ! আপনার অর্ডারটি সফলভাবে নিশ্চিত করা হয়েছে।
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2 rounded-lg border font-semibold hover:bg-gray-100"
                >
                  আগের ধাপ
                </button>
              ) : (
                <div></div>
              )}
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  পরের ধাপ
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                >
                  নিশ্চিত করুন
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerCart;
