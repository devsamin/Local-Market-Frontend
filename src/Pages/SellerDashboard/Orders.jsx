import { useCallback, useEffect, useMemo, useState } from "react";
import { PackageOpen, Search } from "lucide-react";
import { toast } from "react-toastify";

import { api, getErrorMessage, imageUrl, listData } from "../../services/api";


const transitions = { pending: ["processing"], processing: ["shipped"], shipped: ["delivered"], delivered: [], cancelled: [] };
const money = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" });

const Orders = ({ onChanged }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    try { const { data } = await api.get("/orders/seller-orders/"); setOrders(listData(data)); }
    catch (error) { toast.error(getErrorMessage(error, "Orders could not be loaded.")); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => orders.filter((item) => (status === "all" || item.status === status) && `${item.product_name} ${item.buyer_name} ${item.order}`.toLowerCase().includes(query.toLowerCase())), [orders, query, status]);

  const updateStatus = async (item, nextStatus) => {
    setBusyId(item.id);
    try { const { data } = await api.patch(`/orders/seller-orders/${item.id}/`, { status: nextStatus }); setOrders((current) => current.map((entry) => entry.id === item.id ? data : entry)); toast.success("Order status updated."); onChanged?.(); }
    catch (error) { toast.error(getErrorMessage(error, "Status could not be updated.")); }
    finally { setBusyId(null); }
  };

  return <section className="surface overflow-hidden"><div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-bold">Seller orders</h2><p className="mt-1 text-sm text-slate-500">Move paid orders through fulfilment.</p></div><div className="flex flex-col gap-2 sm:flex-row"><label className="relative"><span className="sr-only">Search orders</span><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input className="field pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders" /></label><select className="field" value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status"><option value="all">All statuses</option>{Object.keys(transitions).map((value) => <option key={value} value={value}>{value}</option>)}</select></div></div>{loading ? <div className="space-y-3 p-5">{[1,2,3].map((item) => <div className="h-24 animate-pulse rounded-xl bg-slate-200" key={item} />)}</div> : filtered.length === 0 ? <div className="empty-state m-5"><PackageOpen className="h-12 w-12 text-slate-400" /><h3 className="mt-4 font-bold">No matching orders</h3></div> : <div className="divide-y divide-slate-100">{filtered.map((item) => <article key={item.id} className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"><div className="flex min-w-0 gap-4">{item.product?.image ? <img src={imageUrl(item.product.image)} alt="" className="h-20 w-20 rounded-xl object-cover" /> : <span className="h-20 w-20 rounded-xl bg-slate-100" />}<div className="min-w-0"><h3 className="truncate font-bold">{item.product_name}</h3><p className="mt-1 text-sm text-slate-500">Order #{item.order} · {item.buyer_name}</p><p className="mt-2 text-sm font-semibold">{item.quantity} × {money.format(item.price)}</p></div></div><div className="flex items-center justify-between gap-3 md:justify-end"><span className="status-pill capitalize">{item.status}</span>{transitions[item.status]?.length > 0 && <select className="field w-auto" disabled={busyId === item.id} value="" onChange={(event) => updateStatus(item, event.target.value)} aria-label={`Update ${item.product_name} status`}><option value="" disabled>Update status</option>{transitions[item.status].map((value) => <option key={value} value={value}>{value}</option>)}</select>}</div></article>)}</div>}</section>;
};

export default Orders;
