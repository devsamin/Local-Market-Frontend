import { ImHome } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UseAuth from "../hooks/UseAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = UseAuth();
  console.log(user?.email || "Guest");
  console.log(user?.profilePhoto || "No Photo");
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-md py-3 px-4 md:px-8 flex justify-between items-center relative">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <div className="text-3xl text-[#222]"><ImHome /></div>
          <div>
            <h2 className="font-bold text-xl text-[#111] leading-none">LocalMarket</h2>
            <p className="text-xs text-gray-500 -mt-1">স্থানীয় বিক্রেতাদের প্ল্যাটফর্ম</p>
          </div>
        </Link>
      </div>

      {/* Search (center) */}
      <div className="flex-1 max-w-lg mx-6 hidden md:flex">
        <label className="input input-bordered flex items-center gap-2 w-full h-10 rounded-full px-3 text-base bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input type="search" placeholder="পণ্য খুঁজুন..." className="grow bg-transparent outline-none placeholder:text-gray-500" />
        </label>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">
        {/* Cart */}
        <Link to="/cart" className="btn btn-ghost btn-circle relative text-2xl">
          <FiShoppingCart />
          <span className="badge badge-sm badge-primary absolute top-0 right-0 translate-x-1 -translate-y-1">1</span>
        </Link>

        {user ? (
          // Profile Dropdown
          <div className="relative profile-dropdown">
            <img
  src={user?.photoURL || "https://i.ibb.co/2ypYw9Y/default-avatar.png"}
  alt="User"
  className="w-10 h-10 rounded-full object-cover border"
/>
            <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle text-xl">
              <FaRegUser />
            </button>
            {open && (
              <div className="absolute translate-x-8 right-0 mt-3 w-56 bg-white shadow-lg rounded-lg py-2 border z-50">
                {/* User Info */}
                <div className="flex items-center gap-3 px-4 py-2 border-b">
                  <FaUserCircle className="text-3xl text-gray-700" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">আমার অ্যাকাউন্ট</h3>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                {/* Menu Items */}
                <Link to="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700">
                  <FaRegUser className="text-lg text-gray-500" /> প্রোফাইল
                </Link>
                <Link to="/orders" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700">
                  <MdOutlineHistory className="text-lg text-gray-500" /> অর্ডার ইতিহাস
                </Link>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700">
                  <IoSettingsOutline className="text-lg text-gray-500" /> সেটিংস
                </Link>

                <hr className="my-1" />
                <button onClick={logoutUser} className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                  <FiLogOut className="text-lg" /> লগআউট
                </button>
              </div>
            )}
          </div>
        ) : (
           // Dribbble-style Sign Up / Log In
  <div className="flex items-center gap-3">
    <Link
      to="/register"
      className="px-4 py-2 border border-gray-300 rounded-full text-gray-800 hover:bg-gray-100 transition"
    >
      রেজিস্টার
    </Link>
    <Link
      to="/login"
      className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
    >
      লগইন
    </Link>
  </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
