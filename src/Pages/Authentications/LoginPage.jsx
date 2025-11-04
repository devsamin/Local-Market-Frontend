import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("ক্রেতা");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ loading state

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);

  // ✅ Bangla → English mapping for backend
  const roleMap = {
    ক্রেতা: "buyer",
    বিক্রেতা: "seller",
    অ্যাডমিন: "admin",
  };

  const roleDescription = {
    ক্রেতা: "ক্রেতা হিসেবে লগইন করে আপনার পছন্দের পণ্য কিনুন।",
    বিক্রেতা: "বিক্রেতা হিসেবে লগইন করে আপনার দোকান পরিচালনা করুন।",
    অ্যাডমিন: "অ্যাডমিন লগইন শুধুমাত্র অনুমোদিত ব্যবহারকারীদের জন্য।",
  };

  const onSubmit = async (data) => {
    setErrorMsg(""); // clear previous error
    setLoading(true); // ✅ Start loading
    try {
      // ✅ Send English role to backend
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username: data.username,
        password: data.password,
        role: roleMap[role],
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      const profileRes = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
        headers: { Authorization: `Bearer ${res.data.access}` },
      });

      login(profileRes.data);

      toast.success(`স্বাগতম, ${profileRes.data.username}! আপনি সফলভাবে লগইন করেছেন।`, {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      const errMsg =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail ||
        "লগইন ব্যর্থ হয়েছে! দয়া করে তথ্যগুলো যাচাই করুন।";
      setErrorMsg(errMsg);
    } finally {
      setLoading(false); // ✅ Stop loading after success or error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-gray-300">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 bg-black text-white rounded-2xl">
            <FaStore size={28} />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            LocalMarket এ স্বাগতম
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center gap-3 mb-4">
          {["ক্রেতা", "বিক্রেতা", "অ্যাডমিন"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition ${
                role === r
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {r === "ক্রেতা" && <FiUser />}
              {r === "বিক্রেতা" && <FaStore />}
              {r === "অ্যাডমিন" && <FiLock />}
              {r}
            </button>
          ))}
        </div>

        {/* Role Info */}
        <p className="text-center text-gray-600 text-sm mb-5">
          {roleDescription[role]}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইউজারনেম
            </label>
            <input
              type="text"
              placeholder="আপনার ইউজারনেম"
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:outline-none border-gray-300 focus:ring-black"
              {...register("username", { required: "ইউজারনেম প্রয়োজন" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="আপনার পাসওয়ার্ড"
                className="w-full border rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:outline-none border-gray-300 focus:ring-black"
                {...register("password", { required: "পাসওয়ার্ড প্রয়োজন" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          {/* ✅ Submit Button with loading */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed text-white"
                : "bg-black hover:bg-gray-800 text-white"
            }`}
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          নতুন অ্যাকাউন্ট তৈরি করুন{" "}
          <Link to="/register" className="text-black font-medium hover:underline">
            এখানে
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
