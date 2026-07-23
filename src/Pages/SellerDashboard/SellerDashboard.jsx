import { useCallback, useContext, useEffect, useState } from "react";
import { BarChart3, Boxes, LayoutDashboard, ShoppingBag } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { api, getErrorMessage, imageUrl } from "../../services/api";
import Analytics from "./Analytics";
import Orders from "./Orders";
import Overview from "./Overview";
import Products from "./Products";


const tabs = [
  ["overview", "Overview", LayoutDashboard], ["products", "Products", Boxes],
  ["orders", "Orders", ShoppingBag], ["analytics", "Analytics", BarChart3],
];

const SellerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true); setError("");
    try { const response = await api.get("/dashboard/seller-dashboard/"); setData(response.data); }
    catch (requestError) { setError(getErrorMessage(requestError, "Dashboard data could not be loaded.")); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <main className="page-shell py-8 sm:py-12">
      <Helmet><title>Seller dashboard | Local Mart</title></Helmet>
      <section className="surface flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
        {user.photo ? <img src={imageUrl(user.photo)} alt="" className="h-20 w-20 rounded-2xl object-cover" /> : <span className="grid h-20 w-20 place-items-center rounded-2xl bg-slate-950 text-2xl font-black text-white">{user.username?.[0]?.toUpperCase()}</span>}
        <div className="min-w-0 flex-1"><p className="eyebrow">Seller workspace</p><h1 className="mt-1 truncate text-3xl font-bold tracking-tight">{user.businessName || user.username}</h1><p className="mt-1 text-sm text-slate-500">Manage products, fulfil orders, and understand performance.</p></div>
        {data && <div className="grid grid-cols-3 gap-5 text-center"><div><strong className="block text-xl">{data.product_count}</strong><span className="text-xs text-slate-500">Products</span></div><div><strong className="block text-xl">{data.products_sold}</strong><span className="text-xs text-slate-500">Sold</span></div><div><strong className="block text-xl">{Number(data.average_rating).toFixed(1)}</strong><span className="text-xs text-slate-500">Rating</span></div></div>}
      </section>
      <nav className="mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2" aria-label="Seller dashboard sections">{tabs.map(([id, label, Icon]) => <button key={id} onClick={() => setActiveTab(id)} className={`flex min-w-max flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${activeTab === id ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`}><Icon size={18} />{label}</button>)}</nav>
      <div className="mt-6">{activeTab === "overview" && <Overview data={data} loading={loading} error={error} retry={refresh} />}{activeTab === "products" && <Products onChanged={refresh} />}{activeTab === "orders" && <Orders onChanged={refresh} />}{activeTab === "analytics" && <Analytics data={data} loading={loading} />}</div>
    </main>
  );
};

export default SellerDashboard;
