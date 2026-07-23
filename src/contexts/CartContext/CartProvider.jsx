import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { api, getErrorMessage } from "../../services/api";
import { AuthContext } from "../AuthContext/AuthContext";
import { CartContext } from "./CartContext";


export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [], item_count: 0, subtotal: "0.00" });
  const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const loadCart = useCallback(async () => {
    if (!user || user.role !== "buyer") {
      setCart({ items: [], item_count: 0, subtotal: "0.00" });
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get("/cart/");
      setCart(data);
    } catch (error) {
      if (error.response?.status !== 401) toast.error(getErrorMessage(error, "Could not load your cart."));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const mutate = useCallback(async (path, productId, quantity = 1) => {
    setLoadingProductId(productId);
    try {
      const { data } = await api.post(`/cart/${path}/`, { product_id: productId, quantity });
      setCart(data.cart);
      return data.cart;
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not update your cart."));
      throw error;
    } finally {
      setLoadingProductId(null);
    }
  }, []);

  const addToCart = useCallback(async (product) => {
    if (!user) {
      toast.info("Sign in as a buyer to add items to your cart.");
      return;
    }
    if (user.role !== "buyer") {
      toast.info("Seller accounts cannot place orders.");
      return;
    }
    await mutate("add_item", product.id);
    toast.success(`${product.name} added to your cart.`);
  }, [mutate, user]);

  const clearCart = useCallback(async () => {
    const { data } = await api.post("/cart/clear/");
    setCart(data.cart);
  }, []);

  const resetCart = useCallback(
    () => setCart({ items: [], item_count: 0, subtotal: "0.00" }),
    [],
  );

  const value = useMemo(
    () => ({
      cart,
      cartItems: cart.items || [],
      cartCount: cart.item_count || 0,
      loading,
      loadingProductId,
      loadCart,
      addToCart,
      increaseQty: (productId) => mutate("add_item", productId),
      decreaseQty: (productId) => mutate("decrease_item", productId),
      removeFromCart: (productId) => mutate("remove_item", productId),
      clearCart,
      resetCart,
    }),
    [cart, loading, loadingProductId, loadCart, addToCart, mutate, clearCart, resetCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
