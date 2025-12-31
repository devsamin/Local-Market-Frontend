// // import { ImHome } from "react-icons/im";
// // import { IoLocationOutline, IoSettingsOutline } from "react-icons/io5";
// // import { FiShoppingCart, FiLogOut } from "react-icons/fi";
// // import { FaRegUser, FaUserCircle } from "react-icons/fa";
// // import { MdOutlineHistory } from "react-icons/md";
// // import { Link } from "react-router-dom";
// // import { useState, useEffect, useContext, useRef } from "react";
// // import { CartContext } from "../contexts/CartContext/CartContext";
// // import { AuthContext } from "../contexts/AuthContext/AuthProvider";
// // import { BASE_URL } from "../config.js/config";

// // const Navbar = () => {
// //   const [open, setOpen] = useState(false);
// //   const { user, logout } = useContext(AuthContext);
// //   const { cartItems } = useContext(CartContext);
// //   const dropdownRef = useRef(null);

// //   const storedUser = JSON.parse(localStorage.getItem("user"));
// //   const role = user?.role || storedUser?.role || "No role";

// //   // ✅ Close dropdown when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <div className="navbar bg-base-100 shadow-md py-3 px-4 md:px-8 flex justify-between items-center relative z-50">
// //       {/* Left: Logo + Location */}
// //       <div className="flex items-center gap-4">
// //         <Link to="/" className="flex items-center gap-2">
// //           <div className="text-3xl text-[#222]">
// //             <ImHome />
// //           </div>
// //           <div>
// //             <h2 className="font-bold text-xl text-[#111] leading-none">
// //               LocalMarket
// //             </h2>
// //             <p className="text-xs text-gray-500 -mt-1">
// //               স্থানীয় বিক্রেতাদের প্ল্যাটফর্ম
// //             </p>
// //           </div>
// //         </Link>

// //         {/* Location */}
// //         <button className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-md transition border border-gray-200 bg-gray-50">
// //           <IoLocationOutline className="w-5 h-5 text-gray-500" />
// //           <div className="text-left">
// //             <p className="text-xs text-gray-500">আপনার এলাকা</p>
// //             <p className="text-sm font-medium">{user?.location}</p>
// //           </div>
// //         </button>
// //       </div>

// //       {/* Search Box */}
// //       <div className="flex-1 max-w-lg mx-6 hidden md:flex">
// //         <label className="input input-bordered flex items-center gap-2 w-full h-10 rounded-full px-3 text-base bg-gray-50">
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             fill="none"
// //             viewBox="0 0 24 24"
// //             strokeWidth={2}
// //             stroke="currentColor"
// //             className="w-6 h-6 text-gray-500"
// //           >
// //             <path
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //               d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
// //             />
// //           </svg>
// //           <input
// //             type="search"
// //             placeholder="পণ্য খুঁজুন..."
// //             className="grow bg-transparent outline-none placeholder:text-gray-500"
// //           />
// //         </label>
// //       </div>

// //       {/* Right Side */}
// //       <div className="flex items-center gap-4 relative">
// //         {/* Role-based button */}
// //         {user && role === "seller" ? (
// //           <Link
// //             to="/seller-dashboard"
// //             className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
// //           >
// //             ড্যাশবোর্ড
// //           </Link>
// //         ) : (
// //           <Link
// //             to="/cart"
// //             className="btn btn-ghost btn-circle relative text-2xl"
// //             title="কার্ট দেখুন"
// //           >
// //             <FiShoppingCart />
// //             {cartItems.length > 0 && (
// //               <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center text-white bg-red-500 rounded-full border border-white">
// //                 {cartItems.length}
// //               </span>
// //             )}
// //           </Link>
// //         )}

// //         {/* Profile / Auth */}
// //         {user ? (
// //           <div className="relative profile-dropdown" ref={dropdownRef}>
// //             <button
// //               onClick={() => setOpen(!open)}
// //               className="flex items-center gap-2"
// //             >
// //               <img
// //                 src={
// //                   user?.photo
// //                     ? `${BASE_URL}${user.photo}`
// //                     : "https://i.ibb.co/2ypYw9Y/default-avatar.png"
// //                 }
// //                 alt="User"
// //                 className="w-10 h-10 rounded-full object-cover border"
// //               />
// //             </button>

// //             {/* Dropdown */}
// //             {open && (
// //               <div className="absolute right-[-32px] mt-3 w-56 bg-white shadow-lg rounded-lg py-2 border">
// //                 <div className="flex items-center gap-3 px-4 py-2 border-b">
// //                   {user?.photoURL ? (
// //                     <img
// //                       src={user.photoURL}
// //                       alt="Profile"
// //                       className="w-10 h-10 rounded-full object-cover border"
// //                     />
// //                   ) : (
// //                     <FaUserCircle className="text-3xl text-gray-700" />
// //                   )}
// //                   <div>
// //                     <h3 className="font-semibold text-sm text-gray-800">
// //                       আমার অ্যাকাউন্ট
// //                     </h3>
// //                     <p className="text-xs font-bold text-green-600">{role}</p>
// //                   </div>
// //                 </div>

// //                 <Link
// //                   to="/profile"
// //                   className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
// //                 >
// //                   <FaRegUser className="text-lg text-gray-500" /> প্রোফাইল
// //                 </Link>

// //                 {role === "buyer" ? (
// //                   <Link
// //                     to="/orders"
// //                     className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
// //                   >
// //                     <MdOutlineHistory className="text-lg text-gray-500" />{" "}
// //                     অর্ডার ইতিহাস
// //                   </Link>
// //                 ) : (
// //                   <Link
// //                     to="/seller-dashboard"
// //                     className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
// //                   >
// //                     <MdOutlineHistory className="text-lg text-gray-500" />{" "}
// //                     বিক্রেতা ড্যাশবোর্ড
// //                   </Link>
// //                 )}

// //                 <Link
// //                   to="/settings"
// //                   className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
// //                 >
// //                   <IoSettingsOutline className="text-lg text-gray-500" /> সেটিংস
// //                 </Link>

// //                 <hr className="my-1" />

// //                 <button
// //                   onClick={logout}
// //                   className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
// //                 >
// //                   <FiLogOut className="text-lg" /> লগআউট
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           <div className="flex items-center gap-3">
// //             <Link
// //               to="/register"
// //               className="px-4 py-2 border border-gray-300 rounded-full text-gray-800 hover:bg-gray-100 transition"
// //             >
// //               রেজিস্টার
// //             </Link>
// //             <Link
// //               to="/login"
// //               className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
// //             >
// //               লগইন
// //             </Link>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;


// import { ImHome } from "react-icons/im";
// import { IoLocationOutline, IoSettingsOutline, IoStarOutline } from "react-icons/io5";
// import { FiShoppingCart, FiLogOut } from "react-icons/fi";
// import { FaRegUser, FaUserCircle } from "react-icons/fa";
// import { MdOutlineHistory, MdStarBorder } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { useState, useEffect, useContext, useRef } from "react";
// import { CartContext } from "../contexts/CartContext/CartContext";
// import { AuthContext } from "../contexts/AuthContext/AuthProvider";
// import { BASE_URL } from "../config.js/config";
// import SellerAddSpecialOfferModal from "../Pages/SellerAddSpecialOfferModal/SellerAddSpecialOfferModal"; // import the modal

// const Navbar = ({ searchTerm, setSearchTerm, onOfferAdded  }) => {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useContext(AuthContext);
//   const { cartItems } = useContext(CartContext);
//   const dropdownRef = useRef(null);

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role || storedUser?.role || "No role";

//   const [openOfferModal, setOpenOfferModal] = useState(false);
  

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="navbar bg-base-100 shadow-md py-3 px-4 md:px-8 flex justify-between items-center relative z-50">

//       {/* Left Side: Logo */}
//       <div className="flex items-center gap-4">
//         <Link to="/" className="flex items-center gap-2">
//           <div className="text-3xl text-[#222]">
//             <ImHome />
//           </div>
//           <div>
//             <h2 className="font-bold text-xl text-[#111] leading-none">
//               LocalMarket
//             </h2>
//             <p className="text-xs text-gray-500 -mt-1">
//               স্থানীয় বিক্রেতাদের প্ল্যাটফর্ম
//             </p>
//           </div>
//         </Link>

//         {/* Location */}
//         <button className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-md transition border border-gray-200 bg-gray-50">
//           <IoLocationOutline className="w-5 h-5 text-gray-500" />
//           <div>
//             <p className="text-xs text-gray-500">আপনার এলাকা</p>
//             <p className="text-sm font-medium">{user?.location}</p>
//           </div>
//         </button>
//       </div>

     
//   {/* 🔹 Search Input */}
//       <div className="flex-1 max-w-lg mx-6 hidden md:flex">
//         <label className="input input-bordered flex items-center gap-2 w-full h-10 rounded-full px-3 text-base bg-gray-50">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-6 h-6 text-gray-500"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
//             />
//           </svg>
//           <input
//             type="search"
//             placeholder="পণ্য খুঁজুন..."
//             className="grow bg-transparent outline-none placeholder:text-gray-500"
//             value={searchTerm} // 🔹 bind value
//             onChange={(e) => setSearchTerm(e.target.value)} // 🔹 update parent state
//           />
//         </label>
//       </div>

//       {/* Right Side */}
//       <div className="flex items-center gap-4 relative">

//         {/* If seller → Dashboard button, else customer cart */}
//         {user && role === "seller" ? (
//           <Link
//             to="/seller-dashboard"
//             className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
//           >
//             ড্যাশবোর্ড
//           </Link>
//         ) : (
//           <Link
//             to="/cart"
//             className="btn btn-ghost btn-circle relative text-2xl"
//             title="কার্ট দেখুন"
//           >
//             <FiShoppingCart />
//             {cartItems.length > 0 && (
//               <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center text-white bg-red-500 rounded-full border border-white">
//                 {cartItems.length}
//               </span>
//             )}
//           </Link>
//         )}

//         {/* Profile Dropdown */}
//         {user ? (
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setOpen(!open)}
//               className="flex items-center gap-2"
//             >
//               <img
//                 src={
//                   user?.photo
//                     ? `${BASE_URL}${user.photo}`
//                     : "https://i.ibb.co/2ypYw9Y/default-avatar.png"
//                 }
//                 alt="User"
//                 className="w-10 h-10 rounded-full object-cover border"
//               />
//             </button>

//             {open && (
//               <div className="absolute right-[-32px] mt-3 w-56 bg-white shadow-lg rounded-lg py-2 border">
//                 {/* Profile Header */}
//                 <div className="flex items-center gap-3 px-4 py-2 border-b">
//                   {user?.photo ? (
//                     <img
//                       src={`${BASE_URL}${user.photo}`}
//                       alt="Profile"
//                       className="w-10 h-10 rounded-full object-cover border"
//                     />
//                   ) : (
//                     <FaUserCircle className="text-3xl text-gray-700" />
//                   )}

//                   <div>
//                     <h3 className="font-semibold text-sm text-gray-800">
//                       আমার অ্যাকাউন্ট
//                     </h3>
//                     <p className="text-xs font-bold text-green-600">{role}</p>
//                   </div>
//                 </div>

//                 {/* UPDATED PROFILE LINKS */}
//                 <Link
//                   to="/profile?tab=personal"
//                   className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
//                 >
//                   <FaRegUser className="text-lg text-gray-500" /> প্রোফাইল
//                 </Link>

//                 {role === "buyer" ? (
//                   <Link
//                     to="/profile?tab=orders"
//                     className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
//                   >
//                     <MdOutlineHistory className="text-lg text-gray-500" />
//                     অর্ডার ইতিহাস
//                   </Link>
//                 ) : (
//                   // <Link
//                   //   to="/seller-dashboard"
//                   //   className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
//                   // >
//                   //   <MdOutlineHistory className="text-lg text-gray-500" />
//                   //   বিক্রেতা ড্যাশবোর্ড
//                   // </Link>
//                   <>
//     <Link
//       to="/seller-dashboard"
//       className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
//     >
//       <MdOutlineHistory className="text-lg text-gray-500" />
//       বিক্রেতা ড্যাশবোর্ড
//     </Link>

//     <button
//       onClick={() => setOpenOfferModal(true)}
//       className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
//     >
//       <IoStarOutline/>

//  বিশেষ অফার
//     </button>
//     {/* Modal */}
//       <SellerAddSpecialOfferModal
//   isOpen={openOfferModal}
//   onClose={() => setOpenOfferModal(false)}
//   onSuccess={onOfferAdded}
// />

//   </>
                  
//                 )}

//                 <Link
//                   to="/profile?tab=settings"
//                   className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
//                 >
//                   <IoSettingsOutline className="text-lg text-gray-500" /> সেটিংস
//                 </Link>

             

//                 <hr className="my-1" />

//                 <button
//                   onClick={logout}
//                   className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//                 >
//                   <FiLogOut className="text-lg" /> লগআউট
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="flex items-center gap-3">
//             <Link
//               to="/register"
//               className="px-4 py-2 border border-gray-300 rounded-full text-gray-800 hover:bg-gray-100 transition"
//             >
//               রেজিস্টার
//             </Link>
//             <Link
//               to="/login"
//               className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
//             >
//               লগইন
//             </Link>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Navbar;




// update code 
import { ImHome } from "react-icons/im";
import { IoLocationOutline, IoSettingsOutline, IoStarOutline } from "react-icons/io5";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";

import { CartContext } from "../contexts/CartContext/CartContext";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import { BASE_URL } from "../config.js/config";
import SellerAddSpecialOfferModal from "../Pages/SellerAddSpecialOfferModal/SellerAddSpecialOfferModal";

const Navbar = ({ searchTerm, setSearchTerm, onOfferAdded }) => {
  const [open, setOpen] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const dropdownRef = useRef(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || storedUser?.role || "No role";

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">

      {/* ================= NAVBAR ================= */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3">

        {/* LEFT – LOGO */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <ImHome className="text-3xl text-[#222]" />
            <div className="hidden sm:block">
              <h2 className="font-bold text-xl text-[#111] leading-none">
                LocalMarket
              </h2>
              <p className="text-xs text-gray-500 -mt-1">
                স্থানীয় বিক্রেতাদের প্ল্যাটফর্ম
              </p>
            </div>
          </Link>

          {/* Location */}
          <button className="hidden md:flex items-center gap-2 px-3 py-2 border rounded-md bg-gray-50 text-gray-600">
            <IoLocationOutline className="w-5 h-5" />
            <div>
              <p className="text-xs">আপনার এলাকা</p>
              <p className="text-sm font-medium">{user?.location || "—"}</p>
            </div>
          </button>
        </div>

        {/* DESKTOP SEARCH */}
        <div className="flex-1 max-w-lg mx-6 hidden md:flex">
          <label className="flex items-center gap-2 w-full h-10 px-4 rounded-full bg-gray-50 border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="search"
              placeholder="পণ্য খুঁজুন..."
              className="grow bg-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {/* Seller / Cart */}
          {user && role === "seller" ? (
            <Link
              to="/seller-dashboard"
              className="px-4 py-2 bg-black text-white rounded-full text-sm"
            >
              ড্যাশবোর্ড
            </Link>
          ) : (
            <Link to="/cart" className="relative text-2xl">
              <FiShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}

          {/* PROFILE */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)}>
                <img
                  src={
                    user?.photo
                      ? `${BASE_URL}${user.photo}`
                      : "https://i.ibb.co/2ypYw9Y/default-avatar.png"
                  }
                  alt="User"
                  className="w-9 h-9 rounded-full border object-cover"
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow border">

                  {/* 🔹 DROPDOWN HEADER (IMAGE FIXED) */}
                  <div className="px-4 py-3 border-b flex items-center gap-3">
                    {user?.photo ? (
                      <img
                        src={`${BASE_URL}${user.photo}`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-gray-600" />
                    )}

                    <div>
                      <p className="text-sm font-semibold">আমার অ্যাকাউন্ট</p>
                      <p className="text-xs text-green-600 font-bold">{role}</p>
                    </div>
                  </div>

                  {/* LINKS */}
                  <Link to="/profile?tab=personal" className="block px-4 py-2 hover:bg-gray-100">
                    <FaRegUser className="inline mr-2" /> প্রোফাইল
                  </Link>

                  {role === "buyer" ? (
                    <Link to="/profile?tab=orders" className="block px-4 py-2 hover:bg-gray-100">
                      <MdOutlineHistory className="inline mr-2" /> অর্ডার ইতিহাস
                    </Link>
                  ) : (
                    <>
                      <Link to="/seller-dashboard" className="block px-4 py-2 hover:bg-gray-100">
                        <MdOutlineHistory className="inline mr-2" /> বিক্রেতা ড্যাশবোর্ড
                      </Link>

                      <button
                        onClick={() => setOpenOfferModal(true)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <IoStarOutline className="inline mr-2" /> বিশেষ অফার
                      </button>
                    </>
                  )}

                  <Link to="/profile?tab=settings" className="block px-4 py-2 hover:bg-gray-100">
                    <IoSettingsOutline className="inline mr-2" /> সেটিংস
                  </Link>

                  <hr />

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    <FiLogOut className="inline mr-2" /> লগআউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-4 py-2 bg-black text-white rounded-full text-sm">
                লগইন
              </Link>
              <Link to="/register" className="px-4 py-2 border rounded-full text-sm">
                রেজিস্টার
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="search"
          placeholder="পণ্য খুঁজুন..."
          className="w-full px-4 py-2 border rounded-full outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* OFFER MODAL */}
      <SellerAddSpecialOfferModal
        isOpen={openOfferModal}
        onClose={() => setOpenOfferModal(false)}
        onSuccess={onOfferAdded}
      />
    </div>
  );
};

export default Navbar;

