import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// import { SiBkash, SiRocketdotchat } from "react-icons/si";
// import { GiReceiveMoney } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Column 1: About */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-white">LocalMarket</h2>
          <p className="text-gray-400 leading-relaxed">
            স্থানীয় বিক্রেতাদের সাথে ক্রেতাদের সংযোগ স্থাপনকারী বাংলাদেশের প্রথম ডিজিটাল মার্কেটপ্লেস। 
            নিরাপদ ও দ্রুত কেনাকাটার জন্য আমাদের সাথে থাকুন।
          </p>

          <div className="flex items-center gap-4 mt-5">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#b5ee08] transition"><FaFacebookF /></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#b5ee08] transition"><FaTwitter /></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#b5ee08] transition"><FaInstagram /></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#b5ee08] transition"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">দ্রুত লিংক</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-[#b5ee08] transition">আমাদের সম্পর্কে</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">কীভাবে কাজ করে</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">বিক্রেতা হন</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">সাহায্য ও সহযোগিতা</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">ডেলিভারি তথ্য</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">রিটার্ন পলিসি</a></li>
          </ul>
        </div>

        {/* Column 3: Popular Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">জনপ্রিয় ক্যাটেগরি</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-[#b5ee08] transition">ইলেকট্রনিক্স</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">পোশাক ও ফ্যাশন</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">মুদি ও খাবার</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">বই ও শিক্ষা</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">আসবাব ও সাজসজ্জা</a></li>
            <li><a href="#" className="hover:text-[#b5ee08] transition">স্বাস্থ্য ও সৌন্দর্য</a></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">যোগাযোগ</h3>
          <ul className="text-gray-400 space-y-2">
            <li>📞 +৮৮০ ১৭১২-৩৪৫৬৭৮</li>
            <li>📧 support@localmarket.bd</li>
            <li>📍 ঢাকা, বাংলাদেশ</li>
            <li>🕐 সোমবার - শুক্রবার: ৯:০০ - ১৮:০০</li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-700 py-8 px-4 text-center">
        <h3 className="text-lg font-semibold mb-2 text-white">নিউজলেটার</h3>
        <p className="text-gray-400 mb-4">
          বিশেষ অফার ও নতুন পণ্যের খবর পেতে সাবস্ক্রাইব করুন
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="আপনার ইমেইল"
            className="px-4 py-2 w-64 rounded-l-md bg-white text-gray-800"
          />
          <button className="bg-[#dadcd4] text-black px-5 py-2 rounded-r-md font-semibold hover:bg-lime-400 transition">
            সাবস্ক্রাইব
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 text-center text-gray-400 text-sm py-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-3">
          <a href="#" className="hover:text-[#b5ee08]">গোপনীয়তার নীতি</a> |
          <a href="#" className="hover:text-[#b5ee08]">ব্যবহারের শর্তাবলী</a> |
          <a href="#" className="hover:text-[#b5ee08]">কুকি নীতি</a> |
          <a href="#" className="hover:text-[#b5ee08]">আইনি বিজ্ঞপ্তি</a>
        </div>

        {/* Payment Methods */}
        <div className="flex justify-center items-center gap-5 text-3xl mb-4">
          {/* <SiBkash className="text-pink-500" />
          <GiReceiveMoney className="text-yellow-400" title="নগদ" />
          <SiRocketdotchat className="text-blue-400" /> */}
          <span className="bg-white text-black px-2 py-1 rounded text-sm">Cash on Delivery</span>
        </div>

        <p className="text-gray-500">
          © {new Date().getFullYear()} LocalMarket. সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
