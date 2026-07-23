import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { XCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { api } from "../../../services/api";


const PaymentFailed = () => {
  const [params] = useSearchParams();
  const orderId = params.get("order_id");

  useEffect(() => {
    if (orderId) api.post(`/orders/orders/${orderId}/cancel/`).catch(() => {});
  }, [orderId]);

  return (
    <main className="page-shell grid min-h-[70vh] place-items-center py-12 text-center">
      <Helmet><title>Checkout cancelled | Local Mart</title></Helmet>
      <section className="surface max-w-xl p-8 sm:p-12">
        <XCircle className="mx-auto h-16 w-16 text-rose-600" />
        <h1 className="mt-6 text-3xl font-bold">Checkout cancelled</h1>
        <p className="mt-3 leading-7 text-slate-600">You were not charged. Reserved inventory is being returned and your items will remain available in your cart.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="btn-primary" to="/cart">Return to cart</Link>
          <Link className="btn-secondary" to="/">Keep browsing</Link>
        </div>
      </section>
    </main>
  );
};

export default PaymentFailed;
