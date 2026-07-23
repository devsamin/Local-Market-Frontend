import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { CartContext } from "../../../contexts/CartContext/CartContext";
import { api } from "../../../services/api";


const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const [state, setState] = useState("checking");
  const { resetCart } = useContext(CartContext);
  const orderId = params.get("order_id");

  useEffect(() => {
    if (!orderId) {
      setState("error");
      return undefined;
    }
    let cancelled = false;
    let timer;
    let attempts = 0;

    const check = async () => {
      try {
        const { data } = await api.get("/payment/status/", { params: { order_id: orderId } });
        if (cancelled) return;
        if (data.paid) {
          resetCart();
          setState("paid");
          return;
        }
        if (data.status === "cancelled") {
          setState("error");
          return;
        }
        attempts += 1;
        if (attempts < 10) timer = window.setTimeout(check, 1500);
        else setState("pending");
      } catch {
        if (!cancelled) setState("error");
      }
    };
    check();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [orderId, resetCart]);

  const content = {
    checking: [Clock3, "Confirming your payment", "This usually takes only a few seconds."],
    paid: [CheckCircle2, "Payment confirmed", "Your order is now with the seller. You can follow every update from your profile."],
    pending: [Clock3, "Payment is processing", "We have your order and will update its status as soon as Stripe confirms the payment."],
    error: [XCircle, "We could not confirm this payment", "No payment was marked complete. Check your orders or try checkout again."],
  }[state];
  const Icon = content[0];

  return (
    <main className="page-shell grid min-h-[70vh] place-items-center py-12 text-center">
      <Helmet><title>Payment status | Local Mart</title></Helmet>
      <section className="surface max-w-xl p-8 sm:p-12" aria-live="polite">
        <Icon className={`mx-auto h-16 w-16 ${state === "paid" ? "text-emerald-600" : state === "error" ? "text-rose-600" : "animate-pulse text-amber-500"}`} />
        <h1 className="mt-6 text-3xl font-bold tracking-tight">{content[1]}</h1>
        <p className="mt-3 leading-7 text-slate-600">{content[2]}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="btn-primary" to="/profile">View your orders</Link>
          <Link className="btn-secondary" to="/">Continue shopping</Link>
        </div>
      </section>
    </main>
  );
};

export default PaymentSuccess;
