

// UserProfile.jsx
import React, { useEffect, useState, useContext } from "react";
import { FiMail, FiPhone, FiMapPin, FiEdit3 } from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../config.js/config";
import { toast } from "react-hot-toast";

import ReviewModal from "../ReviewModal/ReviewModal";
import { MdCurrencyExchange } from "react-icons/md";


import {
  HiCheckCircle,
  HiClock,
  HiXCircle,
} from "react-icons/hi";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [editing, setEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  console.log("Orders State:", orders);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);

  const navigate = useNavigate();
  const { logout, updateUser } = useContext(AuthContext);

  const location = useLocation();
  const urlTab = new URLSearchParams(location.search).get("tab");

  useEffect(() => {
    if (urlTab) setActiveTab(urlTab);
  }, [urlTab]);

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) return navigate("/login");

      const res = await axios.get(`${BASE_URL}/api/users/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(res.data);
      setPhotoPreview(res.data.photo ? `${BASE_URL}${res.data.photo}` : null);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        logout();
        navigate("/login");
      } else {
        setErrorMsg("প্রোফাইল লোড করতে ব্যর্থ হয়েছে।");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get(`${BASE_URL}/api/orders/orders/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
      console.log("Fetched Orders:", res.data);
    } catch (error) {
      console.error("Order Fetch Error:", error);
      toast.error("অর্ডার লোড করতে ব্যর্থ হয়েছে!");
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setProfile({ ...profile, photoFile: file });
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) return navigate("/login");

      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      formData.append("location", profile.location);
      formData.append("city", profile.city);
      formData.append("address", profile.address);

      if (profile.role === "seller") {
        formData.append("businessName", profile.businessName || "");
        formData.append("nidNumber", profile.nidNumber || "");
        formData.append("bankAccount", profile.bankAccount || "");
      }

      if (profile.photoFile) formData.append("photo", profile.photoFile);

      const res = await axios.put(`${BASE_URL}/api/users/profile/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(res.data);
      setPhotoPreview(res.data.photo ? `${BASE_URL}${res.data.photo}` : null);
      updateUser(res.data);
      setEditing(false);
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error(error);
      toast.error("প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে।");
    }
  };

  // Open Review Modal
  const openReviewModal = (item) => {
    setSelectedOrderItem(item);
    setShowReviewModal(true);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
        প্রোফাইল লোড হচ্ছে...
      </div>
    );

  if (errorMsg)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
        {errorMsg}
      </div>
    );

    // Tab-wise title
  const getTabTitle = () => {
    switch (activeTab) {
      case "personal":
        return "ব্যক্তিগত তথ্য";
      case "orders":
        return "অর্ডার ইতিহাস";
      case "reviews":
        return "রিভিউসমূহ";
      case "settings":
        return "সেটিংস";
      default:
        return "প্রোফাইল";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <Helmet>
      <title>{getTabTitle()} | LocalMart</title>
      <link rel="icon" type="image/svg+xml" href="/icons/home.svg" /> 
      {/* You can use your ImHome icon here converted to SVG or PNG */}
    </Helmet>
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b border-gray-200 pb-5">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200 relative">
              <img
                src={
                  photoPreview ||
                  "https://i.ibb.co/2ypYw9Y/default-avatar.png"
                }
                alt="User"
                className="w-full h-full object-cover"
              />
              {editing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {profile.username || "নাম পাওয়া যায়নি"}
                </h2>
                <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                  {profile.role === "buyer"
                    ? "ক্রেতা"
                    : profile.role === "seller"
                    ? "বিক্রেতা"
                    : "অজানা ভূমিকা"}
                </div>
              </div>

              <div className="text-gray-600 text-sm mt-2 space-y-1">
                <p className="flex items-center gap-2">
                  <FiMail /> {profile.email || "ইমেইল নেই"}
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone /> {profile.phone || "নম্বর নেই"}
                </p>
                <p className="flex items-center gap-2">
                  <FiMapPin /> {profile.location || "ঠিকানা নেই"},{" "}
                  {profile.city || ""}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 sm:mt-0 flex gap-2">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex mt-8 items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                <FiEdit3 /> প্রোফাইল সম্পাদনা
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  সংরক্ষণ
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    fetchProfile();
                  }}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  বাতিল
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4 border-b border-gray-200">
  
  {/* Personal Tab - always visible */}
  <button
    onClick={() => setActiveTab("personal")}
    className={`px-4 py-2 text-sm font-medium ${
      activeTab === "personal"
        ? "text-indigo-600 border-b-2 border-indigo-600"
        : "text-gray-600"
    }`}
  >
    ব্যক্তিগত তথ্য
  </button>

  {/* Only BUYER can see Orders */}
  {profile.role === "buyer" && (
    <button
      onClick={() => setActiveTab("orders")}
      className={`px-4 py-2 text-sm font-medium ${
        activeTab === "orders"
          ? "text-indigo-600 border-b-2 border-indigo-600"
          : "text-gray-600"
      }`}
    >
      অর্ডার ইতিহাস ({orders.length})
    </button>
  )}

  {/* Only BUYER can see Reviews */}
  {profile.role === "buyer" && (
    <button
      onClick={() => setActiveTab("reviews")}
      className={`px-4 py-2 text-sm font-medium ${
        activeTab === "reviews"
          ? "text-indigo-600 border-b-2 border-indigo-600"
          : "text-gray-600"
      }`}
    >
      রিভিউ
    </button>
  )}

  {/* Settings - always visible */}
  <button
    onClick={() => setActiveTab("settings")}
    className={`px-4 py-2 text-sm font-medium ${
      activeTab === "settings"
        ? "text-indigo-600 border-b-2 border-indigo-600"
        : "text-gray-600"
    }`}
  >
    সেটিংস
  </button>

</div>

        {/* CONTENT */}
        <div className="mt-4">
          {/* PERSONAL TAB */}
          {/* PERSONAL TAB */}
{activeTab === "personal" && (
  <div>
    <h3 className="text-lg font-semibold mb-4">ব্যক্তিগত তথ্য</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* General Fields (All Roles) */}
      {["username", "email", "phone", "city", "location"].map((field) => (
        <div key={field}>
          <label className="block text-sm text-gray-500 mb-1">
            {field === "username"
              ? "পূর্ণ নাম"
              : field === "phone"
              ? "মোবাইল নাম্বার"
              : field.toUpperCase()}
          </label>
          <input
            type="text"
            name={field}
            value={profile[field] || ""}
            onChange={handleChange}
            readOnly={!editing}
            className={`w-full border rounded-lg px-3 py-2 ${
              editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
            }`}
          />
        </div>
      ))}

      {/* Address */}
      <div className="sm:col-span-2">
        <label className="block text-sm text-gray-500 mb-1">ঠিকানা</label>
        <textarea
          name="address"
          value={profile.address || ""}
          onChange={handleChange}
          readOnly={!editing}
          className={`w-full border rounded-lg px-3 py-2 h-20 ${
            editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
          }`}
        />
      </div>

      {/* Seller-only Fields */}
      {profile.role === "seller" && (
        <>
          <div className="sm:col-span-2 mt-4 border-t pt-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ব্যবসায়িক তথ্য</h3>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-500 mb-1">দোকান/ব্যবসার নাম</label>
            <input
              type="text"
              name="businessName"
              value={profile.businessName || ""}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full border rounded-lg px-3 py-2 ${
                editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">১৭ সংখ্যার NID নম্বর</label>
            <input
              type="text"
              name="nidNumber"
              value={profile.nidNumber || ""}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full border rounded-lg px-3 py-2 ${
                editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">ব্যাংক অ্যাকাউন্ট নম্বর</label>
            <input
              type="text"
              name="bankAccount"
              value={profile.bankAccount || ""}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full border rounded-lg px-3 py-2 ${
                editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
              }`}
            />
          </div>
        </>
      )}
    </div>
  </div>
)}

 {/* ORDERS TAB */}
{activeTab === "orders" && (
  <div>
    <h3 className="text-2xl font-bold mb-6">অর্ডার ইতিহাস</h3>

    {orderLoading ? (
      <p className="text-gray-500">অর্ডার লোড হচ্ছে...</p>
    ) : orders.length === 0 ? (
      <p className="text-gray-500 text-sm">কোন অর্ডার পাওয়া যায়নি।</p>
    ) : (
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-lg">অর্ডার #{order.id}</h4>
              <span
  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full
    ${
      order.status === "delivered"
        ? "bg-green-100 text-green-700"
        : order.status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
>
  {order.status === "delivered" && <HiCheckCircle className="text-sm" />}
  {order.status === "pending" && <HiClock className="text-sm" />}
  {order.status === "cancelled" && <HiXCircle className="text-sm" />}

  {order.status === "delivered"
    ? "ডেলিভার্ড"
    : order.status === "pending"
    ? "পেন্ডিং"
    : "বাতিল"}
</span>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              তারিখ: {new Date(order.created_at).toLocaleDateString("bn-BD")}
            </p>

            {/* Order Items */}
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h5 className="font-medium">{item.product.name}</h5>
                    <p className="text-gray-500 text-sm mt-1">
                      {item.quantity} × {item.price}৳
                    </p>
                  </div>

                  {/* Review Button */}
                  {order.status === "delivered" && !item.review && (
                    <button
  onClick={() => openReviewModal(item)}
  type="button"
  className="
    inline-flex items-center gap-2
    px-4 py-2
    text-sm font-medium
    text-white
    rounded-full
    bg-gradient-to-r from-indigo-600 to-violet-600
    hover:from-indigo-700 hover:to-violet-700
    shadow-md hover:shadow-lg
    transition-all duration-300
    active:scale-95
  "
>
  ⭐ রিভিউ দিন
</button>

                  )}

                  {/* Already Reviewed */}
{order.status === "delivered" && item.review && (
  <span
    className="
      inline-flex items-center gap-1
      px-3 py-1
      text-xs font-semibold
      rounded-full
      bg-green-100 text-green-700
      border border-green-200
    "
  >
    ✔ রিভিউ করা হয়েছে
  </span>
)}
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="mt-4 flex justify-end items-center gap-2">
  <MdCurrencyExchange className="text-gray-500 text-lg" />
  <span className="text-lg font-semibold text-gray-900">
    {order.total_price}
  </span>
</div>
          </div>
        ))}
      </div>
    )}
  </div>
)}


    {/* REVIEWS TAB */}
{activeTab === "reviews" && (
  <div>
    <h3 className="text-2xl font-bold mb-6">আপনার রিভিউসমূহ</h3>

    {orderLoading ? (
      <p className="text-gray-500">রিভিউ লোড হচ্ছে...</p>
    ) : (
      <>
        {orders
          .flatMap((order) => order.items || [])
          .filter((item) => item.review) // শুধু যাদের review আছে
          .map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />

              {/* Review Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-semibold text-lg">{item.product.name}</h5>
                  <div className="flex items-center gap-2 mt-1">
                    {/* Star rating */}
                    <span className="text-yellow-500 font-medium">
                      ★ {item.review.rating}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({item.review.rating}/5)
                    </span>
                  </div>
                  {item.review.comment && (
                    <p className="text-gray-700 mt-2">{item.review.comment}</p>
                  )}
                </div>

                {/* Order info or date (optional) */}
                <p className="text-gray-400 text-sm mt-2">
                  অর্ডার তারিখ: {new Date(item.created_at).toLocaleDateString("bn-BD")}
                </p>
              </div>
            </div>
          ))}

        {/* যদি কোন review না থাকে */}
        {orders
          .flatMap((order) => order.items || [])
          .filter((item) => item.review).length === 0 && (
          <p className="text-gray-500 text-sm mt-4">
            আপনার কোন রিভিউ নেই।
          </p>
        )}
      </>
    )}
  </div>
)}


          {/* SETTINGS */}
          {activeTab === "settings" && (
            <p className="text-gray-500 text-sm">
              সেটিংস অপশন আসছে খুব শীঘ্রই…
            </p>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
  <ReviewModal
    open={showReviewModal} // <-- pass open prop
    orderItemId={selectedOrderItem?.id} // <-- pass the order item id
    onClose={() => setShowReviewModal(false)}
    onSuccess={() => {
      setShowReviewModal(false);
      fetchOrders(); // refresh orders to show review
    }}
  />
)}
    </div>
  );
};

export default UserProfile;
    