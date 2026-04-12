// import React from "react";
// import { FaTag } from "react-icons/fa";

// const SpecialOffers = () => {
//   const offers = [
//     {
//       id: 1,
//       title: "ঈদ বিশেষ ছাড়",
//       subtitle: "সব পণ্যে ৩০% পর্যন্ত ছাড়!",
//       image:
//         "https://i.ibb.co.com/RkgQS471/sangbad-bangla-1653659591.jpg",
//       badge: "৩০% ছাড়",
//       badgeColor: "bg-green-500",
//     },
//     {
//       id: 2,
//       title: "ইলেকট্রনিক্স মেলা",
//       subtitle: "স্মার্টফোন, ল্যাপটপ ও গ্যাজেটে দারুণ অফার!",
//       image:
//         "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
//       badge: "নতুন",
//       badgeColor: "bg-blue-600",
//     },
//     {
//       id: 3,
//       title: "ফ্রি ডেলিভারি অফার",
//       subtitle: "৳1000+ অর্ডারে ডেলিভারি একদম ফ্রি",
//       image:
//         "https://i.ibb.co.com/yBSggV5Z/a69814d824b980fdb895e0bd4c16ebff.jpg",
//       badge: "ফ্রি ডেলিভারি",
//       badgeColor: "bg-orange-500",
//     },
//   ];

//   return (
//     <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10">
//       {/* Header */}
//       <div className="flex items-center gap-2 px-6 mb-6">
//         <FaTag className="text-[#16a34a] text-2xl" />
//         <h2 className="text-3xl font-bold text-gray-800">বিশেষ অফার</h2>
//       </div>

//       {/* Offers Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
//         {offers.map((offer) => (
//           <div
//             key={offer.id}
//             className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
//           >
//             {/* Background Image */}
//             <img
//               src={offer.image}
//               alt={offer.title}
//               className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
//             />

//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

//             {/* Badge */}
//             <span
//               className={`absolute top-4 left-4 text-white text-sm px-4 py-1 rounded-full ${offer.badgeColor}`}
//             >
//               {offer.badge}
//             </span>

//             {/* Text Content */}
//             <div className="absolute bottom-4 left-4 text-white">
//               <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
//               <p className="text-sm opacity-90">{offer.subtitle}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SpecialOffers;

// import React, { useEffect, useState } from "react";
// import { FaTag } from "react-icons/fa";
// import axios from "axios";
// import { BASE_URL } from "../../config.js/config";

// const SpecialOffers = () => {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Offers from API
//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/offers/`);
//         setOffers(response.data);
//         console.log("Fetched offers:", response.data);
//       } catch (error) {
//         console.error("Error loading offers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOffers();
//   }, []);

//   return (
//     <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10">

//       {/* Header */}
//       <div className="flex items-center gap-2 px-6 mb-6">
//         <FaTag className="text-[#16a34a] text-2xl" />
//         <h2 className="text-3xl font-bold text-gray-800">বিশেষ অফার</h2>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <p className="text-center text-gray-500 text-lg py-10">
//           অফার লোড হচ্ছে...
//         </p>
//       )}

//       {/* No offers */}
//       {!loading && offers.length === 0 && (
//         <p className="text-center text-gray-500 text-lg py-10">
//           বর্তমানে কোনো বিশেষ অফার নেই
//         </p>
//       )}

//       {/* Offers Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
//         {offers.map((offer) => (
//           <div
//             key={offer.id}
//             className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
//           >
//             {/* Background Image */}
//             <img
//               src={offer.image}
//               alt={offer.title}
//               className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
//             />

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

//             {/* Badge */}
//             <span
//               className={`absolute top-4 left-4 text-white text-sm px-4 py-1 rounded-full ${offer.badgeColor}`}
//             >
//               {offer.badge}
//             </span>

//             {/* Text */}
//             <div className="absolute bottom-4 left-4 text-white">
//               <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
//               <p className="text-sm opacity-90">{offer.subtitle}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SpecialOffers;

// import { FaTag } from "react-icons/fa";

// const SpecialOffers = ({ offers = [] }) => {
//   return (
//     <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10">

//       {/* Header */}
//       <div className="flex items-center gap-2 px-6 mb-6">
//         <FaTag className="text-[#16a34a] text-2xl" />
//         <h2 className="text-3xl font-bold text-gray-800">বিশেষ অফার</h2>
//       </div>

//       {offers.length === 0 && (
//         <p className="text-center text-gray-500 text-lg py-10">
//           বর্তমানে কোনো বিশেষ অফার নেই
//         </p>
//       )}

//       {/* 🔥 Horizontal Scroll */}
//       <div className="overflow-x-auto px-6">
//         <div className="flex gap-6 min-w-full">

//           {offers.map((offer) => (
//             <div
//               key={offer.id}
//               className="
//                 min-w-[33.33%]
//                 relative
//                 rounded-xl
//                 overflow-hidden
//                 shadow-md
//                 hover:shadow-xl
//                 transition-all
//                 duration-300
//                 group
//               "
//             >
//               <img
//                 src={offer.image}
//                 alt={offer.title}
//                 className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

//               {/* Badge */}
//               <span
//                 className={`absolute top-4 left-4 text-white text-sm px-4 py-1 rounded-full ${offer.badgeColor}`}
//               >
//                 {offer.badge}
//               </span>

//               {/* Text */}
//               <div className="absolute bottom-4 left-4 text-white">
//                 <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
//                 <p className="text-sm opacity-90">{offer.subtitle}</p>
//               </div>
//             </div>
//           ))}

//         </div>
//       </div>

//     </section>
//   );
// };

// export default SpecialOffers;

import { FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useEffect } from "react";

const SpecialOffers = ({ offers = [] }) => {
  const sliderRef = useRef(null);

  // 👉 Arrow scroll
  const scroll = (direction) => {
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  // 👉 Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: sliderRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-10 bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 mb-6">
        <div className="flex items-center gap-2">
          <FaTag className="text-green-600 text-2xl" />
          <h2 className="text-3xl font-bold text-gray-800">বিশেষ অফার</h2>
        </div>

        {/* Arrow Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border bg-black shadow hover:bg-gray-700"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border bg-black shadow hover:bg-gray-700"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="
          flex gap-6 px-6 overflow-x-auto scroll-smooth
          scrollbar-hide
          cursor-grab active:cursor-grabbing
        "
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="
              min-w-[85%]
              sm:min-w-[45%]
              lg:min-w-[30%]
              xl:min-w-[24%]
              relative rounded-xl overflow-hidden
              shadow-md hover:shadow-xl transition-all
              group
            "
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Badge */}
            <span
              className={`absolute top-4 left-4 px-4 py-1 text-sm text-white rounded-full ${offer.badgeColor}`}
            >
              {offer.badge}
            </span>

            {/* Text */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{offer.title}</h3>
              <p className="text-sm opacity-90">{offer.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
