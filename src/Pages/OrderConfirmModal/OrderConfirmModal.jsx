import React, { useState } from "react";
import { FiX, FiUser, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext/CartContext";
import { Helmet } from "react-helmet-async";
const OrderConfirmModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState("home");
  const navigate = useNavigate(); // ✅ Navigate hook
  const { clearCart } = useContext(CartContext);

  if (!isOpen) return null;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // const handleConfirm = () => {
  //   setStep(4);
  //   setTimeout(() => {
  //     onClose();
  //     setStep(1);
  //   }, 2500);
  // };
  const handleConfirm = async () => {
    const token = localStorage.getItem("access");

    try {
      const res = await axios.post(
        "https://local-mart-11yd.onrender.com/api/orders/orders/checkout/",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Order placed successfully! 🎉");
      console.log("Order Created:", res.data);
      clearCart(); // ✅ Clear cart after order

      setStep(4);
      setTimeout(() => {
        onClose();
        setStep(1);
        navigate("/profile?tab=orders"); // ✅ Redirect to orders tab
      }, 2000);
    } catch (e) {
      toast.error("Order failed. Try again! ", e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto">
      <Helmet>
        <title>অর্ডার নিশ্চিতকরণ | LocalMarket</title>
      </Helmet>
      <div className="bg-white w-[90%] max-w-lg rounded-2xl shadow-xl relative p-6 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black text-xl"
        >
          <FiX />
        </button>

        <h2 className="text-xl font-bold mb-2 text-gray-900">
          অর্ডার সম্পূর্ণ করুন
        </h2>
        <p className="text-gray-500 mb-5">আপনার অর্ডারের তথ্য পূরণ করুন</p>

        {/* Step Indicator */}
        <div className="relative mb-6">
          {/* Progress underline */}
          <div className="absolute top-4 left-0 w-full h-[3px] bg-gray-200 rounded-full">
            <div
              className={`h-[3px] bg-green-500 rounded-full transition-all duration-500`}
              style={{
                width:
                  step === 1
                    ? "0%"
                    : step === 2
                      ? "50%"
                      : step === 3
                        ? "100%"
                        : "100%",
              }}
            ></div>
          </div>

          <div className="flex items-center justify-between relative z-10">
            {["তথ্য", "পেমেন্ট", "নিশ্চিতকরণ"].map((label, index) => {
              const isCompleted = step > index + 1;
              const isActive = step === index + 1;

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center text-sm font-medium ${
                    isCompleted
                      ? "text-green-600"
                      : isActive
                        ? "text-blue-600"
                        : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 border-2 transition-all duration-300 ${
                      isCompleted
                        ? "border-green-500 bg-green-500 text-white"
                        : isActive
                          ? "border-blue-600 bg-blue-100"
                          : "border-gray-300 bg-white"
                    }`}
                  >
                    {isCompleted ? <FiCheckCircle /> : index + 1}
                  </div>
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
              <FiUser /> গ্রাহকের তথ্য
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="আপনার পূর্ণ নাম"
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="০১XXXXXXXXX"
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="email"
                placeholder="আপনার ইমেইল (ঐচ্ছিক)"
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="আপনার এলাকা নির্বাচন করুন"
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Delivery Type */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-2">
                ডেলিভারির পদ্ধতি
              </h4>

              <div className="space-y-2">
                <label
                  onClick={() => setDeliveryType("home")}
                  className={`flex items-center justify-between border p-3 rounded-lg cursor-pointer transition ${
                    deliveryType === "home"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <span>🏠 হোম ডেলিভারি</span>
                  <small className="text-gray-500">৳৬০ চার্জ</small>
                </label>

                <label
                  onClick={() => setDeliveryType("pickup")}
                  className={`flex items-center justify-between border p-3 rounded-lg cursor-pointer transition ${
                    deliveryType === "pickup"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <span>🛍️ নিজে নিয়ে যাবেন</span>
                  <small className="text-green-500">ফ্রি</small>
                </label>
              </div>
            </div>

            <div className="mt-5">
              <textarea
                rows="3"
                placeholder="বিস্তারিত ঠিকানা লিখুন"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg"
              >
                পরবর্তী ধাপ
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              💳 পেমেন্ট অপশন
            </h3>
            <div className="space-y-3">
              {["বিকাশ", "নগদ", "ক্যাশ অন ডেলিভারি"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:border-blue-400 transition"
                >
                  <input type="radio" name="payment" />
                  <span>{method}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="flex items-center gap-1 text-gray-600 hover:text-black"
              >
                <FiArrowLeft /> পিছনে
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg"
              >
                পরবর্তী ধাপ
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              ✅ অর্ডার নিশ্চিতকরণ
            </h3>
            <ul className="text-sm text-gray-600 mb-5 space-y-2">
              <li>📦 পণ্য সংখ্যা: ২ টি</li>
              <li>💰 মোট মূল্য: ৳৪৫,৮৬০</li>
              <li>
                🚚 ডেলিভারি:{" "}
                {deliveryType === "home"
                  ? "হোম ডেলিভারি (৳৬০)"
                  : "নিজে নিয়ে যাবেন (ফ্রি)"}
              </li>
            </ul>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="flex items-center gap-1 text-gray-600 hover:text-black"
              >
                <FiArrowLeft /> পিছনে
              </button>
              <button
                onClick={handleConfirm}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg"
              >
                নিশ্চিত করুন
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center py-10">
            <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              অর্ডার সফলভাবে সম্পন্ন হয়েছে 🎉
            </h3>
            <p className="text-gray-500">
              আপনার অর্ডারটি সফলভাবে সাবমিট হয়েছে। আমাদের টিম শীঘ্রই যোগাযোগ
              করবে।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmModal;
