import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { CartContext } from "../../contexts/CartContext/CartContext";
import { api, getErrorMessage, imageUrl } from "../../services/api";


const money = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" });

const CartSkeleton = () => (
  <div className="space-y-4" aria-label="Loading cart">
    {[1, 2].map((item) => <div key={item} className="h-32 animate-pulse rounded-2xl bg-slate-200" />)}
  </div>
);

const BuyerCart = () => {
  const {
    cartItems, loading, loadingProductId, increaseQty, decreaseQty, removeFromCart, loadCart,
  } = useContext(CartContext);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product.discounted_price) * item.quantity,
    0,
  );
  const delivery = cartItems.length ? 60 : 0;

  const updateItem = async (operation, item) => {
    try {
      await operation(item.product.id);
    } catch {
      // The provider already displays the server's useful error message.
    }
  };

  const handleCheckout = async () => {
    setPaymentLoading(true);
    try {
      const { data: order } = await api.post("/orders/orders/checkout/");
      const { data: payment } = await api.post("/payment/stripe/checkout/", { order_id: order.order_id });
      window.location.assign(payment.checkout_url);
    } catch (error) {
      await loadCart();
      toast.error(getErrorMessage(error, "Checkout could not be started. Your cart is safe."));
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <main className="page-shell py-8 sm:py-12">
      <Helmet><title>Your cart | Local Mart</title></Helmet>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Your cart</h1>
        </div>
        <Link to="/" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">Continue shopping</Link>
      </div>

      {loading ? <CartSkeleton /> : cartItems.length === 0 ? (
        <section className="empty-state">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-700"><ShoppingBag /></span>
          <h2 className="mt-5 text-xl font-bold">Your cart is waiting</h2>
          <p className="mt-2 max-w-md text-slate-600">Explore products from local sellers and add something you love.</p>
          <Link to="/" className="btn-primary mt-6">Browse products</Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-4" aria-label="Cart items">
            {cartItems.map((item) => {
              const busy = loadingProductId === item.product.id;
              return (
                <article key={item.id} className="surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <img
                    src={imageUrl(item.product.image)}
                    alt={item.product.name}
                    className="h-28 w-full rounded-xl bg-slate-100 object-cover sm:w-28"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-bold text-slate-950">{item.product.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{money.format(item.product.discounted_price)}</p>
                    <p className="mt-3 font-semibold">{money.format(item.total_price)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1">
                      <button className="icon-button" disabled={busy} onClick={() => updateItem(decreaseQty, item)} aria-label={`Decrease ${item.product.name}`}><Minus size={16} /></button>
                      <span className="w-10 text-center text-sm font-bold" aria-live="polite">{item.quantity}</span>
                      <button className="icon-button" disabled={busy || item.quantity >= item.product.stock} onClick={() => updateItem(increaseQty, item)} aria-label={`Increase ${item.product.name}`}><Plus size={16} /></button>
                    </div>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-800" disabled={busy} onClick={() => updateItem(removeFromCart, item)}><Trash2 size={16} /> Remove</button>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="surface h-fit p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600"><dt>Subtotal</dt><dd>{money.format(subtotal)}</dd></div>
              <div className="flex justify-between text-slate-600"><dt>Delivery</dt><dd>{money.format(delivery)}</dd></div>
              <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-bold"><dt>Total</dt><dd>{money.format(subtotal + delivery)}</dd></div>
            </dl>
            <button className="btn-primary mt-6 w-full" disabled={paymentLoading} onClick={handleCheckout}>
              {paymentLoading ? "Preparing secure checkout…" : "Continue to secure payment"}
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-slate-500">Inventory is reserved when checkout begins. Payments are processed securely by Stripe.</p>
          </aside>
        </div>
      )}
    </main>
  );
};

export default BuyerCart;
