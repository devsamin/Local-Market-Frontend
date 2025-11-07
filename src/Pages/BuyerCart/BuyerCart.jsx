// // // import React, { useState } from "react";
// // // import { FiMinus, FiPlus, FiTrash2, FiBox, FiX } from "react-icons/fi";
// // import OrderConfirmModal from "../OrderConfirmModal/OrderConfirmModal";

// // // const BuyerCart = () => {
// // //   const [showModal, setShowModal] = useState(false);

// // //   const cartItems = [
// // //     {
// // //       id: 1,
// // //       title: "Samsung Smart TV 43”",
// // //       category: "electronics",
// // //       image: "https://i.ibb.co.com/JjT2kW78/images.jpg",
// // //       price: 45000,
// // //       quantity: 1,
// // //     },
// // //     {
// // //       id: 2,
// // //       title: "Cotton T-Shirt",
// // //       category: "clothing",
// // //       image: "https://i.ibb.co.com/chY6MqJW/photo-1441984904996-e0b6ba687e04-crop-entropy-cs-tinysrgb-fit-max-fm-jpg-ixid-M3w3-Nzg4-Nzd8-MHwxf-H.jpg",
// // //       price: 800,
// // //       quantity: 1,
// // //     },
// // //   ];

// // //   const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
// // //   const deliveryCharge = 60;
// // //   const discount = 0;
// // //   const total = subtotal + deliveryCharge - discount;

// // //   return (
// // //     <div className="bg-gray-50 min-h-screen px-4 md:px-10 py-8">
// // //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //         {/* Left Section */}
// // //         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
// // //           <h2 className="text-2xl font-bold mb-2">🛒 শপিং কার্ট</h2>
// // //           <p className="text-gray-500 mb-5">{cartItems.length} টি পণ্য নির্বাচিত</p>

// // //           <div className="space-y-4">
// // //             {cartItems.map((item) => (
// // //               <div
// // //                 key={item.id}
// // //                 className="flex flex-col sm:flex-row justify-between items-center border rounded-xl p-4 hover:shadow-md transition"
// // //               >
// // //                 <div className="flex items-center gap-4 w-full sm:w-auto">
// // //                   <img
// // //                     src={item.image}
// // //                     alt={item.title}
// // //                     className="w-24 h-24 object-cover rounded-lg border"
// // //                   />
// // //                   <div>
// // //                     <h3 className="text-lg font-semibold">{item.title}</h3>
// // //                     <p className="text-sm text-gray-500">
// // //                       ক্যাটাগরি:{" "}
// // //                       <span className="font-medium text-gray-700">
// // //                         {item.category}
// // //                       </span>
// // //                     </p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-4 sm:mt-0">
// // //                   <div className="flex items-center border rounded-lg px-3 py-1">
// // //                     <button className="p-1 text-gray-600 hover:text-black">
// // //                       <FiMinus />
// // //                     </button>
// // //                     <span className="mx-3 font-medium">{item.quantity}</span>
// // //                     <button className="p-1 text-gray-600 hover:text-black">
// // //                       <FiPlus />
// // //                     </button>
// // //                   </div>
// // //                   <p className="text-lg font-semibold text-gray-800">
// // //                     ৳{item.price * item.quantity}
// // //                   </p>
// // //                   <button className="text-red-500 hover:text-red-700">
// // //                     <FiTrash2 />
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Right Section */}
// // //         <div className="bg-white lg:bg-[#0f172a] text-gray-900 lg:text-white rounded-2xl shadow-sm border p-6">
// // //           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
// // //             <FiBox /> অর্ডার সামারি
// // //           </h3>

// // //           <div className="bg-white/10 p-4 rounded-lg mb-4 border border-gray-300/30 text-gray-900 lg:text-gray-100">
// // //             <div className="flex justify-between mb-2">
// // //               <span>নির্বাচিত পণ্য</span>
// // //               <span>{cartItems.length} টি</span>
// // //             </div>
// // //             {cartItems.map((i) => (
// // //               <div
// // //                 key={i.id}
// // //                 className="flex justify-between text-sm text-gray-400"
// // //               >
// // //                 <span>{i.title}</span>
// // //                 <span>৳{i.price}</span>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="space-y-2 text-gray-300">
// // //             <div className="flex justify-between">
// // //               <span>সাবটোটাল</span>
// // //               <span>৳{subtotal}</span>
// // //             </div>
// // //             <div className="flex justify-between">
// // //               <span>ডেলিভারি চার্জ</span>
// // //               <span>৳{deliveryCharge}</span>
// // //             </div>
// // //             <div className="flex justify-between text-green-400">
// // //               <span>ডিসকাউন্ট</span>
// // //               <span>-৳{discount}</span>
// // //             </div>
// // //             <hr className="border-gray-700 my-3" />
// // //             <div className="flex justify-between text-lg font-bold text-white">
// // //               <span>সর্বমোট</span>
// // //               <span>৳{total}</span>
// // //             </div>
// // //           </div>

// // //           <div className="mt-5">
// // //             <button
// // //               onClick={() => setShowModal(true)}
// // //               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
// // //             >
// // //               অর্ডার সম্পন্ন করুন
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Modal */}
// // //       <OrderConfirmModal
// // //         isOpen={showModal}
// // //         onClose={() => setShowModal(false)}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default BuyerCart;






// // import React, { useState } from "react";
// // import { FaTrashAlt } from "react-icons/fa";
// // import { IoArrowBack } from "react-icons/io5";
// // import { Link } from "react-router-dom";
// // import { CartContext } from "../../contexts/CartContext/CartContext";

// // const BuyerCart = () => {
// //   const [showModal, setShowModal] = useState(false);

// //   const { cartItems, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);

// //   const [cartItems, setCartItems] = useState([
// //     {
// //       id: 1,
// //       name: "Samsung Galaxy A54",
// //       price: 35000,
// //       quantity: 2,
// //       image:
// //         "https://i.ibb.co.com/chY6MqJW/photo-1441984904996-e0b6ba687e04-crop-entropy-cs-tinysrgb-fit-max-fm-jpg-ixid-M3w3-Nzg4-Nzd8-MHwxf-H.jpg",
// //       category: "মোবাইল ও ট্যাবলেট",
// //       store: "টেক স্টোর",
// //       stock: 8,
// //     },
// //     {
// //       id: 2,
// //       name: "কটন টি-শার্ট",
// //       price: 800,
// //       quantity: 1,
// //       image:
// //         "https://i.ibb.co.com/1hMBMQF/maxresdefault.jpg",
// //       category: "Clothing",
// //       store: "Fashion Zone",
// //       stock: 20,
// //     },
// //   ]);

// //   const increaseQty = (id) => {
// //     setCartItems((prev) =>
// //       prev.map((item) =>
// //         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
// //       )
// //     );
// //   };

// //   const decreaseQty = (id) => {
// //     setCartItems((prev) =>
// //       prev.map((item) =>
// //         item.id === id && item.quantity > 1
// //           ? { ...item, quantity: item.quantity - 1 }
// //           : item
// //       )
// //     );
// //   };

// //   const deleteItem = (id) => {
// //     setCartItems((prev) => prev.filter((item) => item.id !== id));
// //   };

// //   const subtotal = cartItems.reduce(
// //     (acc, item) => acc + item.price * item.quantity,
// //     0
// //   );
// //   const delivery = 60;
// //   const discount = 0;
// //   const total = subtotal + delivery - discount;

// //   return (
// //     <div className="max-w-7xl mx-auto p-6">
// //       {/* 🔙 Top Left Continue Shopping Button */}
// //       <div className="mb-2 -ml-4">
// //         <Link
// //           to="/"
// //           className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 
// //           [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 
// //           outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] 
// //           aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
// //           aria-invalid:border-destructive hover:text-accent-foreground dark:hover:bg-accent/50 
// //           h-9 px-4 py-2 hover:bg-gray-100 mb-4 text-gray-700"
// //         >
// //           <IoArrowBack className="mr-2 h-4 w-4" />
// //           কেনাকাটা চালিয়ে যান
// //         </Link>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Left Section: Cart Items */}
// //         <div className="lg:col-span-2 space-y-5">
// //           <h2 className="text-2xl font-bold text-gray-800">🛒 কার্ট আইটেমস</h2>

// //           {cartItems.map((item) => (
// //             <div
// //               key={item.id}
// //               className="bg-white border rounded-xl shadow p-4 flex items-center justify-between"
// //             >
// //               <div className="flex items-center gap-5">
// //                 <img
// //                   src={item.image}
// //                   alt={item.name}
// //                   className="w-24 h-24 object-cover rounded-md"
// //                 />
// //                 <div className="space-y-1">
// //                   <h3 className="text-lg font-semibold">{item.name}</h3>
// //                   <p className="text-gray-500 text-sm">
// //                     {item.category} | {item.store}
// //                   </p>
// //                   <p className="text-red-500 text-xs">
// //                     মাত্র {item.stock} টি বাকি
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="text-right">
// //                 <p className="text-lg font-semibold text-gray-700">
// //                   ৳{item.price.toLocaleString()}
// //                 </p>
// //                 <div className="flex items-center justify-end gap-2 mt-2">
// //                   <button
// //                     onClick={() => decreaseQty(item.id)}
// //                     className="px-2 py-1 border rounded-md hover:bg-gray-950 hover:text-white"
// //                   >
// //                     -
// //                   </button>
// //                   <span className="px-3 font-medium">{item.quantity}</span>
// //                   <button
// //                     onClick={() => increaseQty(item.id)}
// //                     className="px-2 py-1 border rounded-md hover:bg-gray-950 hover:text-white"
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //                 <p className="text-gray-600 mt-1">
// //                   সাবটোটাল : ৳
// //                   {(item.price * item.quantity).toLocaleString()}
// //                 </p>
// //                 <button
// //                   onClick={() => deleteItem(item.id)}
// //                   className="text-red-500 mt-2 flex items-center gap-1 text-sm ml-18 hover:text-red-700"
// //                 >
// //                   <FaTrashAlt /> মুছুন
// //                 </button>
// //               </div>
// //             </div>
// //           ))}

// //           {/* ➕ Add More Products Button */}
// //           <div className="flex justify-end">
// //             <Link to={'/'} className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
// //               ➕ আরও পণ্য যোগ করুন
// //             </Link>
// //           </div>
// //         </div>

// //         {/* Right Section: Order Summary */}
// //         <div className="bg-white rounded-xl shadow-lg p-5 space-y-4 border">
// //           <h3 className="text-lg font-semibold bg-black text-white rounded-md p-2">
// //             📦 অর্ডার সারাংশ
// //           </h3>

// //           <div className="bg-gray-50 rounded-lg p-3 space-y-2">
// //             <p className="font-medium border-b pb-1">
// //               নির্ধারিত পণ্য ({cartItems.length} টি)
// //             </p>
// //             {cartItems.map((item) => (
// //               <div
// //                 key={item.id}
// //                 className="flex justify-between text-sm text-gray-700"
// //               >
// //                 <span>
// //                   {item.name} × {item.quantity}
// //                 </span>
// //                 <span>৳{(item.price * item.quantity).toLocaleString()}</span>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="text-gray-600 space-y-2 text-sm">
// //             <div className="flex justify-between">
// //               <span>সাবটোটাল</span>
// //               <span>৳{subtotal.toLocaleString()}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>ডেলিভারি চার্জ</span>
// //               <span>৳{delivery}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>ছাড়</span>
// //               <span>-৳{discount}</span>
// //             </div>
// //           </div>

// //           {/* Total */}
// //           <div className="flex justify-end mt-4">
// //             <div className="text-right">
// //               <p className="text-sm text-gray-400">সর্বমোট</p>
// //               <p className="text-3xl font-bold text-black">
// //                 ৳{total.toLocaleString()}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="bg-blue-50 text-blue-700 p-2 rounded-md text-sm">
// //             ✅ আনুমানিক ডেলিভারি: 2 – 4 কার্যদিবস
// //           </div>

// //           <button onClick={() => setShowModal(true)} className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-lg font-semibold">
// //             ✅ অর্ডার সম্পন্ন করুন ({cartItems.length} টি পণ্য)
// //           </button>
// //         </div>
// //       </div>

// //       {/* Modal */}
// //        <OrderConfirmModal
// //         isOpen={showModal}
// //         onClose={() => setShowModal(false)}
// //       />
// //     </div>
// //   );
// // };

// // export default BuyerCart;


// import React, { useState, useContext } from "react";
// import { FaTrashAlt } from "react-icons/fa";
// import { IoArrowBack } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { CartContext } from "../../contexts/CartContext/CartContext";
// import OrderConfirmModal from "../OrderConfirmModal/OrderConfirmModal";

// const BuyerCart = () => {
//   const [showModal, setShowModal] = useState(false);
//   const { cartItems, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const delivery = 60;
//   const discount = 0;
//   const total = subtotal + delivery - discount;

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* 🔙 Continue Shopping */}
//       <div className="mb-2 -ml-4">
//         <Link
//           to="/"
//           className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2 hover:bg-gray-100 mb-4 text-gray-700"
//         >
//           <IoArrowBack className="mr-2 h-4 w-4" />
//           কেনাকাটা চালিয়ে যান
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* 🛒 Left Section: Cart Items */}
//         <div className="lg:col-span-2 space-y-5">
//           <h2 className="text-2xl font-bold text-gray-800">🛒 কার্ট আইটেমস</h2>

//           {cartItems.length === 0 ? (
//             <div className="text-center text-gray-500 py-10 border rounded-xl">
//               🛍️ আপনার কার্ট বর্তমানে খালি
//               <div className="mt-4">
//                 <Link
//                   to="/"
//                   className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
//                 >
//                   পণ্য ব্রাউজ করুন
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white border rounded-xl shadow p-4 flex items-center justify-between"
//               >
//                 <div className="flex items-center gap-5">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-24 h-24 object-cover rounded-md"
//                   />
//                   <div className="space-y-1">
//                     <h3 className="text-lg font-semibold">{item.name}</h3>
//                     <p className="text-gray-500 text-sm">
//                       {item.category} | {item.store}
//                     </p>
//                     {item.stock && (
//                       <p className="text-red-500 text-xs">
//                         মাত্র {item.stock} টি বাকি
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-lg font-semibold text-gray-700">
//                     ৳{item.price.toLocaleString()}
//                   </p>
//                   <div className="flex items-center justify-end gap-2 mt-2">
//                     <button
//                       onClick={() => decreaseQty(item.id)}
//                       className="px-2 py-1 border rounded-md hover:bg-gray-950 hover:text-white"
//                     >
//                       -
//                     </button>
//                     <span className="px-3 font-medium">{item.quantity}</span>
//                     <button
//                       onClick={() => increaseQty(item.id)}
//                       className="px-2 py-1 border rounded-md hover:bg-gray-950 hover:text-white"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="text-gray-600 mt-1">
//                     সাবটোটাল : ৳
//                     {(item.price * item.quantity).toLocaleString()}
//                   </p>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-500 mt-2 flex items-center gap-1 text-sm hover:text-red-700"
//                   >
//                     <FaTrashAlt /> মুছুন
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}

//           {/* ➕ Add More Products Button */}
//           {cartItems.length > 0 && (
//             <div className="flex justify-end">
//               <Link
//                 to="/"
//                 className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
//               >
//                 ➕ আরও পণ্য যোগ করুন
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* 📦 Right Section: Order Summary */}
//         {cartItems.length > 0 && (
//           <div className="bg-white rounded-xl shadow-lg p-5 space-y-4 border">
//             <h3 className="text-lg font-semibold bg-black text-white rounded-md p-2">
//               📦 অর্ডার সারাংশ
//             </h3>

//             <div className="bg-gray-50 rounded-lg p-3 space-y-2">
//               <p className="font-medium border-b pb-1">
//                 নির্ধারিত পণ্য ({cartItems.length} টি)
//               </p>
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between text-sm text-gray-700"
//                 >
//                   <span>
//                     {item.name} × {item.quantity}
//                   </span>
//                   <span>৳{(item.price * item.quantity).toLocaleString()}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="text-gray-600 space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span>সাবটোটাল</span>
//                 <span>৳{subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>ডেলিভারি চার্জ</span>
//                 <span>৳{delivery}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>ছাড়</span>
//                 <span>-৳{discount}</span>
//               </div>
//             </div>

//             {/* Total */}
//             <div className="flex justify-end mt-4">
//               <div className="text-right">
//                 <p className="text-sm text-gray-400">সর্বমোট</p>
//                 <p className="text-3xl font-bold text-black">
//                   ৳{total.toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-blue-50 text-blue-700 p-2 rounded-md text-sm">
//               ✅ আনুমানিক ডেলিভারি: 2 – 4 কার্যদিবস
//             </div>

//             <button
//               onClick={() => setShowModal(true)}
//               className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-lg font-semibold"
//             >
//               ✅ অর্ডার সম্পন্ন করুন ({cartItems.length} টি পণ্য)
//             </button>
//           </div>
//         )}
//       </div>

//       {/* 🪟 Order Confirm Modal */}
//       <OrderConfirmModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//       />
//     </div>
//   );
// };

// export default BuyerCart;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import OrderConfirmModal from "../OrderConfirmModal/OrderConfirmModal";

const BuyerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");

  // ✅ Load Cart Items from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // DRF CartViewSet returns cart with items array
        console.log(res.data);  
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Failed to load cart:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);
console.log(cartItems);
  // ✅ Increase Quantity
  const increaseQty = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/cart/add_item/",
        { product_id: item.product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Reload cart
      const cartRes = await axios.get("http://127.0.0.1:8000/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartRes.data.items || []);
    } catch (err) {
      console.error("Increase failed:", err);
    }
  };

  // ✅ Decrease Quantity
  const decreaseQty = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item || item.quantity <= 1) return;
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/remove_item/",
        { product_id: item.product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cartRes = await axios.get("http://127.0.0.1:8000/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartRes.data.items || []);
    } catch (err) {
      console.error("Decrease failed:", err);
    }
  };

  // ✅ Delete Item
  const deleteItem = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/remove_item/",
        { product_id: item.product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ✅ Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.discounted_price * item.quantity,
    0
  );
  const delivery = 60;
  const discount = 0;
  const total = subtotal + delivery - discount;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        🔄 কার্ট লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 🔙 Continue Shopping */}
      <div className="mb-2 -ml-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <IoArrowBack className="h-4 w-4" />
          কেনাকাটা চালিয়ে যান
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🛒 Left Section */}
        <div className="lg:col-span-2 space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">🛒 কার্ট আইটেমস</h2>

          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-10 border rounded-xl">
              🛍️ আপনার কার্ট বর্তমানে খালি
              <div className="mt-4">
                <Link
                  to="/"
                  className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  পণ্য ব্রাউজ করুন
                </Link>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl shadow p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">{item.product.category}</p>
                    <p className="text-red-500 text-xs">
                      মাত্র {item.quantity} টি বাকি
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-700">
                    ৳{item.product.discounted_price.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 border rounded-md hover:bg-gray-950 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 border rounded-md hover:bg-gray-950 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">
                    সাবটোটাল : ৳
                    {(item.product.discounted_price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 mt-2 flex items-center gap-1 text-sm hover:text-red-700"
                  >
                    <FaTrashAlt /> মুছুন
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 📦 Right Section: Order Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-5 space-y-4 border">
            <h3 className="text-lg font-semibold bg-black text-white rounded-md p-2">
              📦 অর্ডার সারাংশ
            </h3>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <p className="font-medium border-b pb-1">
                নির্ধারিত পণ্য ({cartItems.length} টি)
              </p>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>
                    ৳{(item.product.discounted_price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-gray-600 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>সাবটোটাল</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span>৳{delivery}</span>
              </div>
              <div className="flex justify-between">
                <span>ছাড়</span>
                <span>-৳{discount}</span>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">সর্বমোট</p>
                <p className="text-3xl font-bold text-black">
                  ৳{total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 text-blue-700 p-2 rounded-md text-sm">
              ✅ আনুমানিক ডেলিভারি: 2 – 4 কার্যদিবস
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-lg font-semibold"
            >
              ✅ অর্ডার সম্পন্ন করুন ({cartItems.length} টি পণ্য)
            </button>
          </div>
        )}
      </div>

      {/* 🪟 Order Confirm Modal */}
      <OrderConfirmModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default BuyerCart;


