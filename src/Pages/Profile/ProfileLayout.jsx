import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiEdit3 } from "react-icons/fi";
import { BASE_URL } from "../../config.js/config";

const ProfileLayout = ({ profile, children }) => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b border-gray-200 pb-5">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
              <img
                src={
                  profile?.photo
                    ? `${BASE_URL}${profile.photo}`
                    : "https://i.ibb.co/2ypYw9Y/default-avatar.png"
                }
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {profile?.username}
              </h2>
              <div className="text-green-600 font-semibold text-sm">
                {profile?.role === "buyer" ? "ক্রেতা" : "বিক্রেতা"}
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                <FiMail /> {profile?.email}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FiPhone /> {profile?.phone}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FiMapPin /> {profile?.location}
              </p>
            </div>
          </div>

          <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            <FiEdit3 /> সম্পাদনা
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 border-b border-gray-200">
          {["personal", "orders", "reviews", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              {tab === "personal"
                ? "ব্যক্তিগত তথ্য"
                : tab === "orders"
                ? "অর্ডার"
                : tab === "reviews"
                ? "রিভিউ"
                : "সেটিংস"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
