import React, { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("ক্রেতা"); // Default role
  const { loginUser, setUser } = UseAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.role = role; // ✅ Attach selected role
    console.log("Login Data:", data);

    loginUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        const loggedInUser = {
          ...user,
          role: data.role,
        };

        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        console.log("User Logged In:", loggedInUser);
        navigate("/"); // redirect after login
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
      });
  };

  const roleDescription = {
    ক্রেতা: "ক্রেতা হিসেবে লগইন করে আপনার পছন্দের পণ্য কিনুন।",
    বিক্রেতা: "বিক্রেতা হিসেবে লগইন করে আপনার দোকান পরিচালনা করুন।",
    অ্যাডমিন: "অ্যাডমিন লগইন শুধুমাত্র অনুমোদিত ব্যবহারকারীদের জন্য।",
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
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              placeholder="আপনার ইমেইল ঠিকানা"
              className={`w-full border rounded-xl px-4 py-2 focus:ring-2 focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
              }`}
              {...register("email", { required: "ইমেইল প্রয়োজন" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
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
                className={`w-full border rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-black"
                }`}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            লগইন করুন
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          নতুন অ্যাকাউন্ট তৈরি করুন{" "}
          <Link to="/register" className="text-black font-medium hover:underline">
            এখনই
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
