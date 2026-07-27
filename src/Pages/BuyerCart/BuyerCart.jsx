import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { CartContext } from "../../contexts/CartContext/CartContext";
import { api, getErrorMessage, imageUrl } from "../../services/api";


const money = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" });

const CartSkeleton = () => (
  <div className="border-t border-slate-300" aria-label="Loading cart">
    {[1, 2, 3].map((item) => (
      <div key={item} className="grid grid-cols-[minmax(0,1fr)_112px] gap-5 border-b border-slate-300 py-6 sm:grid-cols-[minmax(0,1fr)_176px] sm:gap-8">
        <div className="space-y-4 py-1">
          <div className="h-7 w-2/3 animate-pulse bg-slate-200" />
          <div className="h-4 w-24 animate-pulse bg-slate-200" />
          <div className="mt-8 h-10 w-32 animate-pulse bg-slate-200" />
        </div>
        <div className="aspect-square animate-pulse bg-slate-100" />
      </div>
    ))}
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
    <main className="bg-white">
      <Helmet><title>Your cart | Local Mart</title></Helmet>
      <div className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="mb-9 flex items-end justify-between gap-5 border-b border-slate-300 pb-5 sm:mb-12">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#087c35]">Shopping bag</p>
            <h1 className="cart-display mt-2 text-4xl uppercase leading-none text-slate-950 sm:text-5xl">Your cart</h1>
          </div>
          <Link
            to="/"
            className="border-b border-[#087c35] pb-1 text-xs font-black uppercase tracking-[0.12em] text-[#087c35] transition hover:border-slate-950 hover:text-slate-950 sm:text-sm"
          >
            Continue shopping
          </Link>
        </div>

        {loading ? <CartSkeleton /> : cartItems.length === 0 ? (
          <section className="flex min-h-[420px] flex-col items-center justify-center border border-slate-300 px-6 py-14 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-[#edf7e7] text-[#087c35]"><ShoppingBag /></span>
            <h2 className="cart-display mt-6 text-3xl uppercase text-slate-950">Your cart is waiting</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">Explore products from local sellers and add something you love.</p>
            <Link to="/" className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#087c35] px-7 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#09682f]">
              Browse products
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-16">
            <section className="border-t border-slate-300" aria-label="Cart items">
              {cartItems.map((item) => {
                const busy = loadingProductId === item.product.id;
                return (
                  <article
                    key={item.id}
                    className="grid grid-cols-[minmax(0,1fr)_112px] gap-5 border-b border-slate-300 py-6 sm:grid-cols-[minmax(0,1fr)_176px] sm:gap-8 sm:py-7"
                  >
                    <div className="flex min-w-0 flex-col py-0.5 sm:py-1">
                      <div>
                        <h2 className="cart-display text-[1.45rem] uppercase leading-[1.05] text-slate-950 sm:text-[1.75rem]">
                          {item.product.name}
                        </h2>
                        <p className="mt-2 text-sm font-semibold text-slate-700">
                          {money.format(item.product.discounted_price)}
                        </p>
                      </div>

                      <dl className="mt-5 space-y-2 text-[11px] uppercase tracking-[0.08em] text-slate-500 sm:mt-7">
                        <div className="flex flex-wrap items-center gap-2">
                          <dt className="font-black text-slate-950">Availability</dt>
                          <span className="h-3 border-l border-slate-300" aria-hidden="true" />
                          <dd>{item.product.stock} in stock</dd>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <dt className="font-black text-slate-950">Line total</dt>
                          <span className="h-3 border-l border-slate-300" aria-hidden="true" />
                          <dd>{money.format(item.total_price)}</dd>
                        </div>
                      </dl>

                      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
                        <div className="inline-flex h-10 items-center border border-slate-300 bg-white">
                          <button
                            className="grid h-full w-10 place-items-center text-slate-800 transition hover:bg-[#edf7e7] hover:text-[#087c35]"
                            disabled={busy}
                            onClick={() => updateItem(decreaseQty, item)}
                            aria-label={`Decrease ${item.product.name}`}
                          >
                            <Minus size={14} strokeWidth={2.25} />
                          </button>
                          <span className="w-9 text-center text-sm font-black text-slate-950" aria-live="polite">{item.quantity}</span>
                          <button
                            className="grid h-full w-10 place-items-center text-slate-800 transition hover:bg-[#edf7e7] hover:text-[#087c35]"
                            disabled={busy || item.quantity >= item.product.stock}
                            onClick={() => updateItem(increaseQty, item)}
                            aria-label={`Increase ${item.product.name}`}
                          >
                            <Plus size={14} strokeWidth={2.25} />
                          </button>
                        </div>
                        <button
                          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 transition hover:text-[#087c35]"
                          disabled={busy}
                          onClick={() => updateItem(removeFromCart, item)}
                        >
                          <Trash2 size={13} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="self-center overflow-hidden bg-[#f6f7f5]">
                      <img
                        src={imageUrl(item.product.image)}
                        alt={item.product.name}
                        className="aspect-square h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="h-fit border border-slate-400 bg-white lg:sticky lg:top-24">
              <div className="border-t-[5px] border-[#087c35] px-6 py-5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#087c35]">Your order</p>
                <h2 className="cart-display mt-1 text-3xl uppercase leading-none text-slate-950">Order summary</h2>
              </div>

              <dl className="border-t border-slate-400 text-xs">
                <div className="flex items-center justify-between gap-5 px-6 py-5">
                  <dt className="cart-display text-base uppercase text-slate-950">Subtotal</dt>
                  <dd className="font-semibold text-slate-800">{money.format(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between gap-5 px-6 pb-5">
                  <dt className="cart-display text-base uppercase text-slate-950">Delivery</dt>
                  <dd className="font-semibold text-slate-800">{money.format(delivery)}</dd>
                </div>
                <div className="flex items-center justify-between gap-5 border-t border-slate-400 px-6 py-5">
                  <dt className="cart-display text-lg uppercase text-slate-950">Total</dt>
                  <dd className="text-base font-black text-[#087c35]">{money.format(subtotal + delivery)}</dd>
                </div>
              </dl>

              <div className="border-t border-slate-400 p-4">
                <button
                  className="inline-flex min-h-12 w-full items-center justify-center bg-[#087c35] px-5 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#09682f] disabled:hover:bg-[#087c35]"
                  disabled={paymentLoading}
                  onClick={handleCheckout}
                >
                  {paymentLoading ? "Preparing secure checkout…" : "Continue to secure payment"}
                </button>
                <p className="mt-3 text-center text-[10px] leading-4 text-slate-500">
                  Inventory is reserved when checkout begins. Payments are processed securely by Stripe.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default BuyerCart;
