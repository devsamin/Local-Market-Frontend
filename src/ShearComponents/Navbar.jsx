import { ImHome } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UseAuth from "../hooks/UseAuth";
import { CartContext } from "../contexts/CartContext/CartContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = UseAuth();
  const { cartItems } = useContext(CartContext);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || storedUser?.role || "No role";
  console.log("User Role:", role);

  const [location, setLocation] = useState("ঢাকা, বাংলাদেশ"); // default location

  // Dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-md py-3 px-4 md:px-8 flex justify-between items-center relative z-50">
      {/* Left Side: Logo + Location */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-3xl text-[#222]">
            <ImHome />
          </div>
          <div>
            <h2 className="font-bold text-xl text-[#111] leading-none">
              LocalMarket
            </h2>
            <p className="text-xs text-gray-500 -mt-1">
              স্থানীয় বিক্রেতাদের প্ল্যাটফর্ম
            </p>
          </div>
        </Link>

        {/* Location Button */}
        <button className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-md transition border border-gray-200 bg-gray-50">
          <IoLocationOutline className="w-5 h-5 text-gray-500" />
          <div className="text-left">
            <p className="text-xs text-gray-500">আপনার এলাকা</p>
            <p className="text-sm font-medium">{location}</p>
          </div>
        </button>
      </div>

      {/* Search Box */}
      <div className="flex-1 max-w-lg mx-6 hidden md:flex">
        <label className="input input-bordered flex items-center gap-2 w-full h-10 rounded-full px-3 text-base bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-500"
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
            className="grow bg-transparent outline-none placeholder:text-gray-500"
          />
        </label>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 relative">
        {/* Role-based button */}
        {user && role === "বিক্রেতা" ? (
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
          >
            ড্যাশবোর্ড
          </Link>
        ) : (
          <Link
            to="/cart"
            className="btn btn-ghost btn-circle relative text-2xl"
            title="কার্ট দেখুন"
          >
            <FiShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center text-white bg-red-500 rounded-full border border-white">
      {cartItems.length}
    </span>
            )}
          </Link>
        )}

        {/* Profile / Auth */}
        {user ? (
          <div className="relative profile-dropdown">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/2ypYw9Y/default-avatar.png"
                }
                alt="User"
                className="w-10 h-10 rounded-full object-cover border"
              />
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-[-32px] mt-3 w-56 bg-white shadow-lg rounded-lg py-2 border">
                <div className="flex items-center gap-3 px-4 py-2 border-b">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-gray-700" />
                  )}
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">
                      আমার অ্যাকাউন্ট
                    </h3>
                    <p className="text-xs font-bold text-green-600">{role}</p>
                  </div>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <FaRegUser className="text-lg text-gray-500" /> প্রোফাইল
                </Link>

                {role === "ক্রেতা" ? (
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    <MdOutlineHistory className="text-lg text-gray-500" />{" "}
                    অর্ডার ইতিহাস
                  </Link>
                ) : (
                  <Link
                    to="/seller-dashboard"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    <MdOutlineHistory className="text-lg text-gray-500" />{" "}
                    বিক্রেতা ড্যাশবোর্ড
                  </Link>
                )}

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <IoSettingsOutline className="text-lg text-gray-500" /> সেটিংস
                </Link>

                <hr className="my-1" />

                <button
                  onClick={logoutUser}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  <FiLogOut className="text-lg" /> লগআউট
                </button>
              </div>
            )}
          </div>
        ) : (
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
