import React, { useEffect, useState, useContext } from "react";
import { FiMail, FiPhone, FiMapPin, FiEdit3 } from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js/config";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [editing, setEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const navigate = useNavigate();
  const { logout, updateUser } = useContext(AuthContext);

  // Fetch Profile from API
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

  useEffect(() => {
    fetchProfile();
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
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setProfile(res.data);
      setPhotoPreview(res.data.photo ? `${BASE_URL}${res.data.photo}` : null);
      updateUser(res.data); // ✅ Update context so Navbar updates instantly
      setEditing(false);
      alert("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error(error);
      alert("প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে।");
    }
  };

  if (loading)
    return <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">প্রোফাইল লোড হচ্ছে...</div>;

  if (errorMsg)
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">{errorMsg}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b border-gray-200 pb-5">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200 relative">
              <img
                src={photoPreview || "https://i.ibb.co/2ypYw9Y/default-avatar.png"}
                alt="User"
                className="w-full h-full object-cover"
              />
              {editing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  title="Click to change photo"
                />
              )}
            </div>

            {/* User info */}
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.username || "নাম পাওয়া যায়নি"}</h2>
                <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                  {profile.role === "buyer" ? "ক্রেতা" : profile.role === "seller" ? "বিক্রেতা" : "অজানা ভূমিকা"}
                </div>
              </div>
              <div className="text-gray-600 text-sm mt-2 space-y-1">
                <p className="flex items-center gap-2"><FiMail /> {profile.email || "ইমেইল নেই"}</p>
                <p className="flex items-center gap-2"><FiPhone /> {profile.phone || "নম্বর নেই"}</p>
                <p className="flex items-center gap-2"><FiMapPin /> {profile.location || "ঠিকানা নেই"}, {profile.city || ""}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 sm:mt-0 flex gap-2">
            {!editing ? (
              <button onClick={() => setEditing(true)} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
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
  onClick={() => { setEditing(false); fetchProfile(); }}
  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
>
  বাতিল
</button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 border-b border-gray-200">
          {["personal", "orders", "reviews", "settings"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${activeTab === tab ? "text-indigo-600 border-b-2 border-indigo-600 bg-gray-50" : "text-gray-600 hover:text-indigo-500"}`}
            >
              {tab === "personal" ? "ব্যক্তিগত তথ্য" : tab === "orders" ? "অর্ডার ইতিহাস (0)" : tab === "reviews" ? "রিভিউ (0)" : "সেটিংস"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "personal" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">ব্যক্তিগত তথ্য</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {["username","email","phone","city","location"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm text-gray-500 mb-1">{field === "username" ? "পূর্ণ নাম" : field === "phone" ? "মোবাইল নাম্বার" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type="text"
                      name={field}
                      value={profile[field] || ""}
                      onChange={handleChange}
                      readOnly={!editing}
                      className={`w-full border rounded-lg px-3 py-2 ${editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"}`}
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-500 mb-1">ঠিকানা</label>
                  <textarea
                    name="address"
                    value={profile.address || ""}
                    onChange={handleChange}
                    readOnly={!editing}
                    className={`w-full border rounded-lg px-3 py-2 h-20 ${editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"}`}
                  />
                </div>

                {profile.role === "seller" && ["businessName","nidNumber","bankAccount"].map(field => (
                  <div key={field}>
                    <label className="block text-sm text-gray-500 mb-1">
                      {field === "businessName" ? "ব্যবসার নাম" : field === "nidNumber" ? "NID নম্বর" : "ব্যাংক অ্যাকাউন্ট"}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={profile[field] || ""}
                      onChange={handleChange}
                      readOnly={!editing}
                      className={`w-full border rounded-lg px-3 py-2 ${editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "orders" && <p className="text-gray-500 text-sm">কোন অর্ডার ইতিহাস নেই।</p>}
          {activeTab === "reviews" && <p className="text-gray-500 text-sm">কোন রিভিউ পাওয়া যায়নি।</p>}
          {activeTab === "settings" && <p className="text-gray-500 text-sm">সেটিংস অপশন আসছে শীঘ্রই।</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
