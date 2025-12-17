

// import React, { createContext, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // 🛒 Add to cart
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // ➕ Increase
//   const increaseQty = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   // ➖ Decrease
//   const decreaseQty = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // ❌ Remove
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   // 🧹 Clear all items
// const clearCart = () => setCartItems([]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         increaseQty,
//         decreaseQty,
//         removeFromCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };



import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);


  // 🛒 Add to cart with API
  const addToCart = async (product) => {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData) {
    toast.warn("কার্টে পণ্য যোগ করার আগে লগইন করুন!");
    return;
  }

  if (userData?.role === "seller") {
    toast.error("সেলারেরা কার্টে পণ্য যোগ করতে পারবেন না!");
    return;
  }

  // ❌ Prevent double click on same product
  if (loadingProductId === product.id) return;

  try {
    setLoadingProductId(product.id);

    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const body = { product_id: product.id, quantity: 1 };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/cart/add_item/",
      body,
      config
    );

    if (response.status === 200) {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });

      toast.success("পণ্যটি কার্টে যোগ হয়েছে!");
    }
  } catch (error) {
    console.error(error);
    toast.error("কার্টে পণ্য যোগ করা যায়নি!");
  } finally {
    setLoadingProductId(null);
  }
};


  // ➕ Increase
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ➖ Decrease
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ❌ Remove
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧹 Clear all items
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        loadingProductId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
