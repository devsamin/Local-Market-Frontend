// import React from "react";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// // import { SiBkash, SiRocketdotchat } from "react-icons/si";
// // import { GiReceiveMoney } from "react-icons/gi";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-200 mt-10">
//       <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
//         {/* Column 1: About */}
//         <div className="md:col-span-2">
//           <h2 className="text-2xl font-bold mb-4 text-white">LocalMarket</h2>
//           <p className="text-gray-400 leading-relaxed">
//             স্থানীয় বিক্রেতাদের সাথে ক্রেতাদের সংযোগ স্থাপনকারী বাংলাদেশের প্রথম ডিজিটাল মার্কেটপ্লেস। 
//             নিরাপদ ও দ্রুত কেনাকাটার জন্য আমাদের সাথে থাকুন।
//           </p>

//           <div className="flex items-center gap-4 mt-5">
//             <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#f0f2ea] transition"><FaFacebookF /></a>
//             <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#eff1e7] transition"><FaTwitter /></a>
//             <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#f3f5ee] transition"><FaInstagram /></a>
//             <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#f2f3ef] transition"><FaLinkedinIn /></a>
//           </div>
//         </div>

//         {/* Column 2: Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-white">দ্রুত লিংক</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li><a href="#" className="hover:text-[#f0f2ea] transition">আমাদের সম্পর্কে</a></li>
//             <li><a href="#" className="hover:text-[#f5f6f2] transition">কীভাবে কাজ করে</a></li>
//             <li><a href="#" className="hover:text-[#f4f5f1] transition">বিক্রেতা হন</a></li>
//             <li><a href="#" className="hover:text-[#ebebe9] transition">সাহায্য ও সহযোগিতা</a></li>
//             <li><a href="#" className="hover:text-[#f2f4ef] transition">ডেলিভারি তথ্য</a></li>
//             <li><a href="#" className="hover:text-[#f3f3f3] transition">রিটার্ন পলিসি</a></li>
//           </ul>
//         </div>

//         {/* Column 3: Popular Categories */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-white">জনপ্রিয় ক্যাটেগরি</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li><a href="#" className="hover:text-[#eeefea] transition">ইলেকট্রনিক্স</a></li>
//             <li><a href="#" className="hover:text-[#f6f8f2] transition">পোশাক ও ফ্যাশন</a></li>
//             <li><a href="#" className="hover:text-[#f8faf4] transition">মুদি ও খাবার</a></li>
//             <li><a href="#" className="hover:text-[#ecedea] transition">বই ও শিক্ষা</a></li>
//             <li><a href="#" className="hover:text-[#f8f9f5] transition">আসবাব ও সাজসজ্জা</a></li>
//             <li><a href="#" className="hover:text-[#f0f2eb] transition">স্বাস্থ্য ও সৌন্দর্য</a></li>
//           </ul>
//         </div>

//         {/* Column 4: Contact */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-white">যোগাযোগ</h3>
//           <ul className="text-gray-400 space-y-2">
//             <li>📞 +৮৮০ ১৭১২-৩৪৫৬৭৮</li>
//             <li>📧 support@localmarket.bd</li>
//             <li>📍 ঢাকা, বাংলাদেশ</li>
//             <li>🕐 সোমবার - শুক্রবার: ৯:০০ - ১৮:০০</li>
//           </ul>
//         </div>
//       </div>

//       {/* Newsletter */}
//       <div className="border-t border-gray-700 py-8 px-4 text-center">
//         <h3 className="text-lg font-semibold mb-2 text-white">নিউজলেটার</h3>
//         <p className="text-gray-400 mb-4">
//           বিশেষ অফার ও নতুন পণ্যের খবর পেতে সাবস্ক্রাইব করুন
//         </p>
//         <div className="flex justify-center">
//           <input
//             type="email"
//             placeholder="আপনার ইমেইল"
//             className="px-4 py-2 w-64 rounded-l-md bg-white text-gray-800"
//           />
//           <button className="bg-[#dadcd4] text-black px-5 py-2 rounded-r-md font-semibold hover:bg-amber-50 transition">
//             সাবস্ক্রাইব
//           </button>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="border-t border-gray-800 text-center text-gray-400 text-sm py-6">
//         <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-3">
//           <a href="#" className="hover:text-[#e8e9e4]">গোপনীয়তার নীতি</a> |
//           <a href="#" className="hover:text-[#fefffc]">ব্যবহারের শর্তাবলী</a> |
//           <a href="#" className="hover:text-[#f2f5e9]">কুকি নীতি</a> |
//           <a href="#" className="hover:text-[#f8f9f3]">আইনি বিজ্ঞপ্তি</a>
//         </div>

//         {/* Payment Methods */}
//         <div className="flex justify-center items-center gap-5 text-3xl mb-4">
//           {/* <SiBkash className="text-pink-500" />
//           <GiReceiveMoney className="text-yellow-400" title="নগদ" />
//           <SiRocketdotchat className="text-blue-400" /> */}
//           <span className="bg-white text-black px-2 py-1 rounded text-sm">Cash on Delivery</span>
//         </div>

//         <p className="text-gray-500">
//           © {new Date().getFullYear()} LocalMarket. সর্বস্বত্ব সংরক্ষিত।
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-white tracking-wide">
            LocalMarket
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            স্থানীয় বিক্রেতাদের সাথে ক্রেতাদের সংযোগ স্থাপনকারী বাংলাদেশের
            আধুনিক ডিজিটাল মার্কেটপ্লেস। নিরাপদ, দ্রুত ও নির্ভরযোগ্য কেনাকাটা।
          </p>

          {/* Social */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 rounded-full bg-gray-800 hover:bg-white hover:text-black transition duration-300"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            দ্রুত লিংক
          </h3>
          <ul className="space-y-3">
            {[
              "আমাদের সম্পর্কে",
              "কীভাবে কাজ করে",
              "বিক্রেতা হন",
              "ডেলিভারি তথ্য",
              "রিটার্ন পলিসি",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            জনপ্রিয় ক্যাটেগরি
          </h3>
          <ul className="space-y-3">
            {[
              "ইলেকট্রনিক্স",
              "ফ্যাশন",
              "গ্রোসারি",
              "বই ও শিক্ষা",
              "স্বাস্থ্য ও সৌন্দর্য",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            যোগাযোগ
          </h3>
          <ul className="space-y-3 text-sm">
            <li>📞 +880 1712-345678</li>
            <li>📧 support@localmarket.bd</li>
            <li>📍 ঢাকা, বাংলাদেশ</li>
            <li>🕒 ৯:০০ AM – ৬:০০ PM</li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-700 py-10 text-center px-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Newsletter
        </h3>
        <p className="text-gray-400 mb-6">
          নতুন অফার ও আপডেট পেতে সাবস্ক্রাইব করুন
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <input
            type="email"
            placeholder="আপনার ইমেইল"
            className="px-5 py-3 w-full sm:w-72 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-8 text-center text-sm">
        
        {/* Payment Methods */}
        <div className="flex justify-center items-center gap-6 mb-5">
          <img
            src="https://i.ibb.co.com/S7yCSYK0/download.png"
            alt="Stripe"
            className="h-6 bg-white px-2 py-1 rounded"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
            alt="Visa"
            className="h-6 bg-white px-2 py-1 rounded"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="MasterCard"
            className="h-6 bg-white px-2 py-1 rounded"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
            alt="Amex"
            className="h-6 bg-white px-2 py-1 rounded"
          />
          <span className="px-3 py-1 border border-gray-600 rounded">
            Cash on Delivery
          </span>
        </div>

        <div className="flex justify-center gap-4 mb-3">
          {["Privacy Policy", "Terms", "Cookies"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="hover:text-white transition"
            >
              {item}
            </a>
          ))}
        </div>

        <p className="text-gray-500">
          © {new Date().getFullYear()} LocalMarket. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
