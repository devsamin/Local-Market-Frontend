import React, { useState } from "react";
import {
  FiHome,
  FiPackage,
  FiUser,
  FiShoppingCart,
  FiLogOut,
  FiPlusCircle,
} from "react-icons/fi";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, Seller!</h2>
            <p className="text-gray-600">
              Here’s a quick overview of your shop activity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white shadow-md rounded-xl p-5 text-center">
                <h3 className="text-gray-500 text-sm">Total Products</h3>
                <p className="text-2xl font-bold mt-2">45</p>
              </div>
              <div className="bg-white shadow-md rounded-xl p-5 text-center">
                <h3 className="text-gray-500 text-sm">Pending Orders</h3>
                <p className="text-2xl font-bold mt-2">12</p>
              </div>
              <div className="bg-white shadow-md rounded-xl p-5 text-center">
                <h3 className="text-gray-500 text-sm">Total Earnings</h3>
                <p className="text-2xl font-bold mt-2">৳120,000</p>
              </div>
            </div>
          </div>
        );

      case "products":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Products</h2>
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                <FiPlusCircle /> Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((p) => (
                <div
                  key={p}
                  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition relative"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-semibold">
                    Product Image
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Product {p}</h3>
                    <p className="text-gray-500 mb-3">৳500</p>

                    {/* Action Buttons */}
                    <div className="flex justify-start items-center gap-3">
                      <FiEdit
                        size={20}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer transition"
                        title="Edit"
                      />
                      <FiTrash2
                        size={20}
                        className="text-red-600 hover:text-red-800 cursor-pointer transition"
                        title="Delete"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3">Order ID</th>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Amount</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((order) => (
                    <tr key={order} className="border-b">
                      <td className="p-3">#100{order}</td>
                      <td className="p-3">Customer {order}</td>
                      <td className="p-3 text-yellow-600">Pending</td>
                      <td className="p-3">৳500</td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:underline">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="bg-white shadow-md rounded-xl p-6 max-w-md">
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1">Name</label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Seller Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1">
                  Email
                </label>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  placeholder="seller@example.com"
                />
              </div>
              <div>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Seller Dashboard</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition ${
              activeTab === "dashboard"
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FiHome /> Dashboard
          </button>
          <button
            className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition ${
              activeTab === "products"
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("products")}
          >
            <FiPackage /> Products
          </button>
          <button
            className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition ${
              activeTab === "orders"
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <FiShoppingCart /> Orders
          </button>
          <button
            className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition ${
              activeTab === "profile"
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FiUser /> Profile
          </button>
          <button
            className="flex items-center gap-3 p-3 rounded-lg w-full text-left text-red-600 hover:bg-red-100 transition mt-6"
            onClick={() => alert("Logged out!")}
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default SellerDashboard;
