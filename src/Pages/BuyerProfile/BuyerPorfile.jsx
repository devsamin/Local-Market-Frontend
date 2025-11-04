// // import React, { useState } from "react";
// // import { FiMail, FiPhone, FiMapPin, FiEdit3 } from "react-icons/fi";

// // const BuyerProfile = () => {
// //   const [activeTab, setActiveTab] = useState("personal");

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
// //       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //         {/* Header Section */}
// //         <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b border-gray-200 pb-5">
// //           <div className="flex items-center gap-6">
// //             {/* Profile Picture */}
// //             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-600 font-bold">
// //               <img src="https://i.ibb.co.com/KpT5c7RJ/file.jpg" alt="" />
// //             </div>

// //             {/* User Info */}
// //             <div>
// //               <div className="flex items-center gap-4">
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-1">
// //                 Abdulla Al Samin
// //               </h2>
// //               <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
// //                 ক্রেতা
// //               </div>
// //               </div>

// //               <div className="text-gray-600 text-sm mt-2 space-y-1">
// //                 <p className="flex items-center gap-2">
// //                   <FiMail /> samin@gmail.com
// //                 </p>
// //                 <p className="flex items-center gap-2">
// //                   <FiPhone /> 01712345678
// //                 </p>
// //                 <p className="flex items-center gap-2">
// //                   <FiMapPin /> ঢাকা
// //                 </p>
// //                 <p className="text-xs text-gray-400">
// //                   যোগদান: ৩১/১২/২০২৩
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Edit Profile Button */}
// //           <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
// //             <FiEdit3 /> প্রোফাইল সম্পাদনা
// //           </button>
// //         </div>

// //         {/* Tabs */}
// //         <div className="flex flex-wrap gap-2 mt-4 border-b border-gray-200">
// //           {[
// //             { key: "personal", label: "ব্যক্তিগত তথ্য" },
// //             { key: "orders", label: "অর্ডার ইতিহাস (0)" },
// //             { key: "reviews", label: "রিভিউ (0)" },
// //             { key: "settings", label: "সেটিংস" },
// //           ].map((tab) => (
// //             <button
// //               key={tab.key}
// //               onClick={() => setActiveTab(tab.key)}
// //               className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
// //                 activeTab === tab.key
// //                   ? "text-indigo-600 border-b-2 border-indigo-600 bg-gray-50"
// //                   : "text-gray-600 hover:text-indigo-500"
// //               }`}
// //             >
// //               {tab.label}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Tab Content */}
// //         <div className="mt-4">
// //           {activeTab === "personal" && (
// //             <div>
// //               <h3 className="text-lg font-semibold text-gray-800 mb-4">
// //                 ব্যক্তিগত তথ্য
// //               </h3>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
// //                 <div>
// //                   <label className="block text-sm text-gray-500 mb-1">
// //                     পূর্ণ নাম
// //                   </label>
// //                   <input
// //                     type="text"
// //                     defaultValue="রহিম উদ্দিন"
// //                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
// //                     readOnly
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm text-gray-500 mb-1">
// //                     ইমেইল
// //                   </label>
// //                   <input
// //                     type="text"
// //                     defaultValue="samin@gmail.com"
// //                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
// //                     readOnly
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm text-gray-500 mb-1">
// //                     মোবাইল নাম্বার
// //                   </label>
// //                   <input
// //                     type="text"
// //                     defaultValue="01712345678"
// //                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
// //                     readOnly
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm text-gray-500 mb-1">
// //                     শহর/জেলা
// //                   </label>
// //                   <input
// //                     type="text"
// //                     defaultValue="ঢাকা"
// //                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
// //                     readOnly
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm text-gray-500 mb-1">
// //                     জন্ম তারিখ
// //                   </label>
// //                   <input
// //                     type="text"
// //                     placeholder="mm/dd/yyyy"
// //                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
// //                     readOnly
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm text-gray-500 mb-1">
// //                     লিঙ্গ
// //                   </label>
// //                   <input
// //                     type="text"
// //                     placeholder=""
// //                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
// //                     readOnly
// //                   />
// //                 </div>
// //                 <div className="sm:col-span-2">
// //                   <label className="block text-sm text-gray-500 mb-1">
// //                     ঠিকানা
// //                   </label>
// //                   <textarea
// //                     placeholder="বিস্তারিত ঠিকানা"
// //                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 h-20"
// //                     readOnly
// //                   ></textarea>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //           {activeTab === "orders" && (
// //             <p className="text-gray-500 text-sm">কোন অর্ডার ইতিহাস নেই।</p>
// //           )}
// //           {activeTab === "reviews" && (
// //             <p className="text-gray-500 text-sm">কোন রিভিউ পাওয়া যায়নি।</p>
// //           )}
// //           {activeTab === "settings" && (
// //             <p className="text-gray-500 text-sm">সেটিংস অপশন আসছে শীঘ্রই।</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BuyerProfile;

// import React, { useEffect, useState, useContext } from "react";
// import { FiMail, FiPhone, FiMapPin, FiEdit3 } from "react-icons/fi";
// import axios from "axios";
// import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config.js/config";

// const BuyerProfile = () => {
//   const [activeTab, setActiveTab] = useState("personal");
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("access");
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const res = await axios.get(
//           "http://127.0.0.1:8000/api/users/profile/",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setProfile(res.data);
//       } catch (error) {
//         console.error("Profile load error:", error);
//         if (error.response?.status === 401) {
//           // Token expired or invalid
//           logout();
//           navigate("/login");
//         } else {
//           setErrorMsg("প্রোফাইল লোড করতে ব্যর্থ হয়েছে।");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate, logout]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
//         প্রোফাইল লোড হচ্ছে...
//       </div>
//     );
//   }

//   if (errorMsg) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
//         {errorMsg}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b border-gray-200 pb-5">
//           <div className="flex items-center gap-6">
//             {/* Profile Picture */}
//             <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
//               <img
//                 src={
//                   user?.photo
//                     ? `${BASE_URL}${user.photo}`
//                     : "https://i.ibb.co/2ypYw9Y/default-avatar.png"
//                 }
//                 alt="User"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* User Info */}
//             <div>
//               <div className="flex items-center gap-4">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                   {profile?.username || "নাম পাওয়া যায়নি"}
//                 </h2>
//                 <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
//                   {profile?.role === "buyer" ? "ক্রেতা" : "অজানা ভূমিকা"}
//                 </div>
//               </div>

//               <div className="text-gray-600 text-sm mt-2 space-y-1">
//                 <p className="flex items-center gap-2">
//                   <FiMail /> {profile?.email || "ইমেইল নেই"}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <FiPhone /> {profile?.phone || "নম্বর নেই"}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <FiMapPin /> {profile?.city || "ঠিকানা নেই"}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   যোগদান:{" "}
//                   {profile?.date_joined
//                     ? new Date(profile.date_joined).toLocaleDateString("bn-BD")
//                     : "অজানা"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Edit Profile Button */}
//           <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
//             <FiEdit3 /> প্রোফাইল সম্পাদনা
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-2 mt-4 border-b border-gray-200">
//           {[
//             { key: "personal", label: "ব্যক্তিগত তথ্য" },
//             { key: "orders", label: "অর্ডার ইতিহাস (0)" },
//             { key: "reviews", label: "রিভিউ (0)" },
//             { key: "settings", label: "সেটিংস" },
//           ].map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
//                 activeTab === tab.key
//                   ? "text-indigo-600 border-b-2 border-indigo-600 bg-gray-50"
//                   : "text-gray-600 hover:text-indigo-500"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="mt-4">
//           {activeTab === "personal" && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 ব্যক্তিগত তথ্য
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm text-gray-500 mb-1">
//                     পূর্ণ নাম
//                   </label>
//                   <input
//                     type="text"
//                     value={profile?.full_name || ""}
//                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//                     readOnly
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-gray-500 mb-1">
//                     ইমেইল
//                   </label>
//                   <input
//                     type="text"
//                     value={profile?.email || ""}
//                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//                     readOnly
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-gray-500 mb-1">
//                     মোবাইল নাম্বার
//                   </label>
//                   <input
//                     type="text"
//                     value={profile?.phone || ""}
//                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//                     readOnly
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-gray-500 mb-1">
//                     শহর/জেলা
//                   </label>
//                   <input
//                     type="text"
//                     value={profile?.city || ""}
//                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//                     readOnly
//                   />
//                 </div>
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm text-gray-500 mb-1">
//                     ঠিকানা
//                   </label>
//                   <textarea
//                     value={profile?.address || ""}
//                     className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 h-20"
//                     readOnly
//                   ></textarea>
//                 </div>
//               </div>
//             </div>
//           )}
//           {activeTab === "orders" && (
//             <p className="text-gray-500 text-sm">কোন অর্ডার ইতিহাস নেই।</p>
//           )}
//           {activeTab === "reviews" && (
//             <p className="text-gray-500 text-sm">কোন রিভিউ পাওয়া যায়নি।</p>
//           )}
//           {activeTab === "settings" && (
//             <p className="text-gray-500 text-sm">সেটিংস অপশন আসছে শীঘ্রই।</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyerProfile;



import React, { useEffect, useState, useContext } from "react";
import { FiMail, FiPhone, FiMapPin, FiEdit3, FiBriefcase, FiFileText, FiCreditCard } from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js/config";

const BuyerProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data);
      } catch (error) {
        console.error("Profile load error:", error);
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

    fetchProfile();
  }, [navigate, logout]);

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">প্রোফাইল লোড হচ্ছে...</div>;
  if (errorMsg) return <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">{errorMsg}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b border-gray-200 pb-5">
          <div className="flex items-center gap-6">
            {/* Profile Photo */}
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
              <img
                src={profile?.photo ? `${BASE_URL}${profile.photo}` : "https://i.ibb.co/2ypYw9Y/default-avatar.png"}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile?.username || "নাম পাওয়া যায়নি"}</h2>
                <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                  {profile?.role === "buyer" ? "ক্রেতা" : profile?.role === "seller" ? "বিক্রেতা" : "অজানা ভূমিকা"}
                </div>
              </div>

              <div className="text-gray-600 text-sm mt-2 space-y-1">
                <p className="flex items-center gap-2"><FiMail /> {profile?.email || "ইমেইল নেই"}</p>
                <p className="flex items-center gap-2"><FiPhone /> {profile?.phone || "নম্বর নেই"}</p>
                <p className="flex items-center gap-2"><FiMapPin /> {profile?.location || "ঠিকানা নেই"}, {profile?.area || ""}</p>
                <p className="text-xs text-gray-400">
                  যোগদান: {profile?.date_joined ? new Date(profile.date_joined).toLocaleDateString("bn-BD") : "অজানা"}
                </p>
              </div>
            </div>
          </div>

          <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            <FiEdit3 /> প্রোফাইল সম্পাদনা
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 border-b border-gray-200">
          {[
            { key: "personal", label: "ব্যক্তিগত তথ্য" },
            { key: "orders", label: "অর্ডার ইতিহাস (0)" },
            { key: "reviews", label: "রিভিউ (0)" },
            { key: "settings", label: "সেটিংস" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
                activeTab === tab.key ? "text-indigo-600 border-b-2 border-indigo-600 bg-gray-50" : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "personal" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">ব্যক্তিগত তথ্য</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">পূর্ণ নাম</label>
                  <input type="text" value={profile?.username || ""} readOnly className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">ইমেইল</label>
                  <input type="text" value={profile?.email || ""} readOnly className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">মোবাইল নাম্বার</label>
                  <input type="text" value={profile?.phone || ""} readOnly className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">শহর/জেলা</label>
                  <input type="text" value={profile?.city || ""} readOnly className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">এরিয়া</label>
                  <input type="text" value={profile?.location || ""} readOnly className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"/>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-500 mb-1">ঠিকানা</label>
                  <textarea value={profile?.address || ""} readOnly className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 h-20"/>
                </div>

                {/* Seller Info */}
                {profile?.role === "seller" && (
                  <>
                    <div className="sm:col-span-2 mt-4 border-t pt-3">
                      <h4 className="text-md font-semibold text-gray-700 mb-2">ব্যবসায়িক তথ্য</h4>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">ব্যবসার নাম</label>
                      <input type="text" value={profile?.businessName || ""} readOnly className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"/>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">NID নম্বর</label>
                      <input type="text" value={profile?.nidNumber || ""} readOnly className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"/>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">ব্যাংক অ্যাকাউন্ট</label>
                      <input type="text" value={profile?.bankAccount || ""} readOnly className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"/>
                    </div>
                  </>
                )}
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

export default BuyerProfile;
