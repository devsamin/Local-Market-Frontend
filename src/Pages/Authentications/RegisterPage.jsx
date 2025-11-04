import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { FiUser, FiPhone, FiMail, FiLock, FiBriefcase, FiFileText, FiCreditCard } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [role, setRole] = useState("buyer");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", role);
      formData.append("phone", data.phone);
      formData.append("location", `${data.city}, ${data.area}`);
      formData.append("address", data.address);

      // Seller-only fields
      if (role === "seller") {
        formData.append("businessName", data.businessName || "");
        formData.append("nidNumber", data.nidNumber || "");
        formData.append("bankAccount", data.bankAccount || "");
      }

      // Photo upload
      if (data.photo && data.photo[0]) formData.append("photo", data.photo[0]);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন লগইন করুন 🔐", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/login");
      // localStorage.setItem("user", JSON.stringify(createdUser));
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      // Backend field error display
      if (error.response?.data) {
        const backendErrors = error.response.data;
        const firstError = Object.keys(backendErrors)[0];
        setErrorMsg(`${firstError}: ${backendErrors[firstError][0]}`);
      } else {
        setErrorMsg("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const roleDescription = {
    buyer: "ক্রেতা হিসেবে রেজিস্ট্রেশন করে স্থানীয় বিক্রেতাদের কাছ থেকে পণ্য কিনুন।",
    seller: "বিক্রেতা হিসেবে রেজিস্ট্রেশন করে আপনার দোকানের পণ্য LocalMarket-এ বিক্রি করুন।",
    admin: "অ্যাডমিন রেজিস্ট্রেশন শুধুমাত্র অনুমোদিত ব্যক্তিদের জন্য।",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-3 py-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 bg-black text-white rounded-2xl">
            <FaStore size={28} />
          </div>
          <h2 className="text-xl font-bold">LocalMarket এ যোগ দিন</h2>
          <p className="text-sm text-gray-500">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-gray-100 rounded-full mb-3 text-sm font-medium">
          {[
            { key: "buyer", label: "ক্রেতা" },
            { key: "seller", label: "বিক্রেতা" },
            { key: "admin", label: "অ্যাডমিন" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full transition ${
                role === tab.key
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setRole(tab.key)}
            >
              {tab.key === "buyer" && <FiUser />}
              {tab.key === "seller" && <FaStore />}
              {tab.key === "admin" && <FiLock />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Role Info */}
        <div className="text-center text-gray-600 text-sm mb-6">{roleDescription[role]}</div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">পূর্ণ নাম *</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("fullName", { required: "পূর্ণ নাম লিখুন" })}
                type="text"
                placeholder="আপনার পূর্ণ নাম"
                className="input input-bordered w-full pl-10 h-10"
              />
            </div>
            {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">মোবাইল নাম্বার *</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("phone", {
                  required: "মোবাইল নাম্বার প্রয়োজন",
                  pattern: { value: /^01[0-9]{9}$/, message: "সঠিক মোবাইল নাম্বার দিন (01XXXXXXXXX)" },
                })}
                type="text"
                placeholder="01XXXXXXXXX"
                className="input input-bordered w-full pl-10 h-10"
              />
            </div>
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">ইমেইল *</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("email", {
                  required: "ইমেইল প্রয়োজন",
                  pattern: { value: /^\S+@\S+$/i, message: "সঠিক ইমেইল লিখুন" },
                })}
                type="email"
                placeholder="আপনার ইমেইল ঠিকানা"
                className="input input-bordered w-full pl-10 h-10"
              />
            </div>
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">পাসওয়ার্ড *</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("password", {
                  required: "পাসওয়ার্ড প্রয়োজন",
                  minLength: { value: 6, message: "কমপক্ষে ৬ অক্ষর হতে হবে" },
                })}
                type="password"
                placeholder="কমপক্ষে ৬ অক্ষর"
                className="input input-bordered w-full pl-10 h-10"
              />
            </div>
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">পাসওয়ার্ড নিশ্চিত করুন *</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("confirmPassword", {
                  required: "পাসওয়ার্ড নিশ্চিত করুন",
                  validate: (value) => value === password || "পাসওয়ার্ড মেলেনি",
                })}
                type="password"
                placeholder="পুনরায় লিখুন"
                className="input input-bordered w-full pl-10 h-10"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Photo Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">প্রোফাইল ছবি</label>
            <input
              type="file"
              {...register("photo")}
              accept="image/*"
              onChange={handlePhotoChange}
              className="file-input file-input-bordered w-full"
            />
            {photoPreview && <img src={photoPreview} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-full" />}
          </div>

          {/* City & Area */}
          <div>
            <label className="block text-sm font-medium mb-1">শহর/জেলা *</label>
            <select {...register("city", { required: "শহর নির্বাচন করুন" })} className="select select-bordered w-full h-10">
              <option value="">নির্বাচন করুন</option>
              <option>ঢাকা</option>
              <option>চট্টগ্রাম</option>
              <option>রাজশাহী</option>
              <option>সিলেট</option>
            </select>
            {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">এরিয়া *</label>
            <select {...register("area", { required: "এরিয়া নির্বাচন করুন" })} className="select select-bordered w-full h-10">
              <option value="">নির্বাচন করুন</option>
              <option>ধানমন্ডি</option>
              <option>গুলশান</option>
              <option>মিরপুর</option>
            </select>
            {errors.area && <p className="text-red-600 text-sm">{errors.area.message}</p>}
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">ঠিকানা *</label>
            <textarea
              {...register("address", { required: "ঠিকানা লিখুন" })}
              placeholder="বিস্তারিত ঠিকানা লিখুন"
              className="textarea textarea-bordered w-full h-20"
            ></textarea>
            {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
          </div>

          {/* Seller Fields */}
          {role === "seller" && (
            <>
              <div className="col-span-2 mt-4 mb-1 border-t pt-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">ব্যবসায়িক তথ্য</h3>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">দোকান/ব্যবসার নাম *</label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-3 text-gray-400" />
                  <input
                    {...register("businessName", { required: "ব্যবসার নাম লিখুন" })}
                    type="text"
                    placeholder="দোকান বা ব্যবসার নাম লিখুন"
                    className="input input-bordered w-full pl-10 h-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">১৭ সংখ্যার NID নম্বর *</label>
                <div className="relative">
                  <FiFileText className="absolute left-3 top-3 text-gray-400" />
                  <input
                    {...register("nidNumber", {
                      required: "NID নম্বর দিন",
                      pattern: { value: /^[0-9]{17}$/, message: "১৭ সংখ্যার NID দিন" },
                    })}
                    type="text"
                    placeholder="NID নম্বর লিখুন"
                    className="input input-bordered w-full pl-10 h-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ব্যাংক অ্যাকাউন্ট নম্বর *</label>
                <div className="relative">
                  <FiCreditCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    {...register("bankAccount", { required: "ব্যাংক অ্যাকাউন্ট দিন" })}
                    type="text"
                    placeholder="ব্যাংক অ্যাকাউন্ট লিখুন"
                    className="input input-bordered w-full pl-10 h-10"
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit & Error */}
          {errorMsg && <p className="col-span-2 text-red-600">{errorMsg}</p>}
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-black text-white hover:bg-gray-800 transition rounded-md h-11"
            >
              {loading ? "রেজিস্ট্রেশন হচ্ছে..." : "রেজিস্ট্রেশন করুন"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
