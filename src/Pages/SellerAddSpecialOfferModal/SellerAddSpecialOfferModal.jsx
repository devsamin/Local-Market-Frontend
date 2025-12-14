// import React, { useState } from "react";
// import { FiX } from "react-icons/fi";
// import axios from "axios";
// import { BASE_URL } from "../../config.js/config";
// import { toast } from "react-hot-toast";

// const SellerAddSpecialOfferModal = ({ isOpen, onClose, onSuccess }) => {
//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [badge, setBadge] = useState("");
//   const [badgeColor, setBadgeColor] = useState("bg-green-500");
//   const [image, setImage] = useState(null);
//   const [previewImg, setPreviewImg] = useState(null);
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   // Image preview handler
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) {
//       setPreviewImg(URL.createObjectURL(file));
//     }
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("subtitle", subtitle);
//     formData.append("badge", badge);
//     formData.append("badgeColor", badgeColor);
//     formData.append("image", image);

//     try {
//       await axios.post(`${BASE_URL}/api/offers/create/`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("সফলভাবে অফার যোগ করা হয়েছে!");
//       setLoading(false);

//       onSuccess(); // Refresh offers
//       onClose(); // Close modal
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("অফার যোগ করতে সমস্যা হয়েছে!");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50">
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 animate-fadeIn">

//         {/* Modal Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">নতুন বিশেষ অফার যোগ করুন</h2>
//           <button onClick={onClose}>
//             <FiX className="text-2xl text-gray-500 hover:text-red-500" />
//           </button>
//         </div>

//         {/* Offer Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Title */}
//           <div>
//             <label className="text-sm font-semibold">শিরোনাম</label>
//             <input
//               type="text"
//               className="w-full border rounded px-3 py-2 mt-1"
//               placeholder="যেমন: ঈদ বিশেষ ছাড়"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* Subtitle */}
//           <div>
//             <label className="text-sm font-semibold">সাবটাইটেল</label>
//             <input
//               type="text"
//               className="w-full border rounded px-3 py-2 mt-1"
//               placeholder="যেমন: সব পণ্যে ৩০% পর্যন্ত ছাড়!"
//               value={subtitle}
//               onChange={(e) => setSubtitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* Badge */}
//           <div>
//             <label className="text-sm font-semibold">ব্যাজ</label>
//             <input
//               type="text"
//               className="w-full border rounded px-3 py-2 mt-1"
//               placeholder="যেমন: ৩০% ছাড় / নতুন / ফ্রি ডেলিভারি"
//               value={badge}
//               onChange={(e) => setBadge(e.target.value)}
//               required
//             />
//           </div>

//           {/* Badge Color */}
//           <div>
//             <label className="text-sm font-semibold">ব্যাজ রঙ</label>
//             <select
//               className="w-full border rounded px-3 py-2 mt-1"
//               value={badgeColor}
//               onChange={(e) => setBadgeColor(e.target.value)}
//             >
//               <option value="bg-green-500">সবুজ</option>
//               <option value="bg-blue-600">নীল</option>
//               <option value="bg-orange-500">কমলা</option>
//               <option value="bg-red-500">লাল</option>
//               <option value="bg-purple-600">পার্পল</option>
//             </select>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="text-sm font-semibold">ইমেজ আপলোড</label>
//             <input
//               type="file"
//               className="w-full border rounded px-3 py-2 mt-1"
//               accept="image/*"
//               onChange={handleImageChange}
//               required
//             />

//             {previewImg && (
//               <img
//                 src={previewImg}
//                 alt="Preview"
//                 className="w-full h-40 object-cover rounded-lg mt-3 shadow"
//               />
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition"
//             disabled={loading}
//           >
//             {loading ? "যোগ করা হচ্ছে..." : "অফার যোগ করুন"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerAddSpecialOfferModal;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config.js/config";

const SellerAddSpecialOfferModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("");
  const [badgeColor, setBadgeColor] = useState("bg-green-500");
  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access");
  if (!isOpen) return null;

  // Image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("badge", badge);
    formData.append("badgeColor", badgeColor);
    formData.append("image", image);

    try {
      const res = await axios.post(`${BASE_URL}/api/offers/`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" },
      });

      toast.success("সফলভাবে অফার যোগ করা হয়েছে!");
      
      onSuccess(); // Refresh offers
      onClose(); // Close modal
      // ✅ IMPORTANT
    setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("অফার যোগ করতে সমস্যা হয়েছে!");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">নতুন বিশেষ অফার যোগ করুন</h2>
          <p className="text-sm text-gray-500">
            আপনার অফারের বিস্তারিত তথ্য দিন। অফার সফলভাবে যোগ করার পর এটি তালিকায় দেখানো হবে।
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">শিরোনাম *</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              placeholder="যেমন: ঈদ বিশেষ ছাড়"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">সাবটাইটেল *</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              placeholder="যেমন: সব পণ্যে ৩০% পর্যন্ত ছাড়!"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
            />
          </div>

          {/* Badge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ব্যাজ *</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              placeholder="যেমন: ৩০% ছাড় / নতুন / ফ্রি ডেলিভারি"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              required
            />
          </div>

          {/* Badge Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ব্যাজ রঙ</label>
            <select
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              value={badgeColor}
              onChange={(e) => setBadgeColor(e.target.value)}
            >
              <option value="bg-green-500">সবুজ</option>
              <option value="bg-blue-600">নীল</option>
              <option value="bg-orange-500">কমলা</option>
              <option value="bg-red-500">লাল</option>
              <option value="bg-purple-600">পার্পল</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">ইমেজ আপলোড *</p>
            <label className="relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all border bg-background hover:bg-gray-100 h-10 px-4 py-2 cursor-pointer">
              ছবি নির্বাচন করুন
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
                required
              />
            </label>
            {previewImg && (
              <img
                src={previewImg}
                alt="Preview"
                className="mt-3 w-28 h-28 object-cover mx-auto rounded-md border"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-md py-2 text-sm font-medium hover:bg-gray-100"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition-all text-sm font-medium"
            >
              {loading ? "যোগ করা হচ্ছে..." : "অফার যোগ করুন"}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default SellerAddSpecialOfferModal;
