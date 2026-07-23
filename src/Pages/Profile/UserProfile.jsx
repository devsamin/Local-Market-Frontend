import { useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { KeyRound, MapPin, Package, Pencil, Star, UserRound } from "lucide-react";
import { toast } from "react-toastify";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { api, getErrorMessage, imageUrl, listData } from "../../services/api";
import ReviewModal from "../ReviewModal/ReviewModal";


const money = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" });

const UserProfile = () => {
  const { updateUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewItem, setReviewItem] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { const [profileResponse, ordersResponse] = await Promise.all([api.get("/users/profile/"), api.get("/orders/orders/")]); setProfile(profileResponse.data); setOrders(listData(ordersResponse.data)); updateUser(profileResponse.data); }
    catch (error) { toast.error(getErrorMessage(error, "Profile could not be loaded.")); }
    finally { setLoading(false); }
  }, [updateUser]);
  useEffect(() => { load(); }, [load]);

  const saveProfile = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("photo")?.size) data.delete("photo");
    try { const response = await api.patch("/users/profile/", data); setProfile(response.data); updateUser(response.data); setEditing(false); toast.success("Profile updated."); }
    catch (error) { toast.error(getErrorMessage(error, "Profile could not be updated.")); }
  };
  const changePassword = async (event) => {
    event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.new_password !== data.confirm_password) { toast.error("New passwords do not match."); return; }
    delete data.confirm_password;
    try { await api.post("/users/change-password/", data); event.currentTarget.reset(); toast.success("Password changed successfully."); }
    catch (error) { toast.error(getErrorMessage(error, "Password could not be changed.")); }
  };

  if (loading || !profile) return <main className="page-shell py-12"><div className="h-72 animate-pulse rounded-3xl bg-slate-200" /></main>;
  const tabs = [["profile", "Profile", UserRound], ["orders", "Orders", Package], ["security", "Security", KeyRound]];
  return <main className="page-shell py-8 sm:py-12"><Helmet><title>Your account | Local Mart</title></Helmet><section className="surface flex flex-col gap-5 p-6 sm:flex-row sm:items-center"><div>{profile.photo ? <img src={imageUrl(profile.photo)} alt="" className="h-24 w-24 rounded-2xl object-cover" /> : <span className="grid h-24 w-24 place-items-center rounded-2xl bg-slate-950 text-3xl font-black text-white">{profile.username[0].toUpperCase()}</span>}</div><div className="min-w-0 flex-1"><p className="eyebrow capitalize">{profile.role} account</p><h1 className="mt-2 truncate text-3xl font-bold">{profile.username}</h1><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><MapPin size={16} />{profile.location || "Location not added"}</p></div><button className="btn-secondary" onClick={() => { setTab("profile"); setEditing(true); }}><Pencil size={17} /> Edit profile</button></section><div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]"><nav className="surface h-fit p-2" aria-label="Account sections">{tabs.map(([id, label, Icon]) => <button key={id} className={`menu-link w-full ${tab === id ? "bg-slate-950 text-white hover:bg-slate-950 hover:text-white" : ""}`} onClick={() => setTab(id)}><Icon size={18} />{label}</button>)}</nav><section className="surface p-5 sm:p-7">{tab === "profile" && <div><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Personal details</h2>{!editing && <button className="text-sm font-bold text-emerald-700" onClick={() => setEditing(true)}>Edit</button>}</div>{editing ? <form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={saveProfile}><label className="label">Username<input className="field mt-1 w-full" name="username" defaultValue={profile.username} required /></label><label className="label">Phone<input className="field mt-1 w-full" name="phone" type="tel" defaultValue={profile.phone} /></label><label className="label">Location<input className="field mt-1 w-full" name="location" defaultValue={profile.location} /></label>{profile.role === "seller" && <label className="label">Business name<input className="field mt-1 w-full" name="businessName" defaultValue={profile.businessName} /></label>}<label className="label sm:col-span-2">Address<textarea className="field mt-1 min-h-24 w-full" name="address" defaultValue={profile.address} /></label><label className="label sm:col-span-2">New profile photo<input className="field mt-1 w-full" name="photo" type="file" accept="image/jpeg,image/png,image/webp" /></label><div className="flex gap-3 sm:col-span-2"><button className="btn-primary">Save changes</button><button type="button" className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button></div></form> : <dl className="mt-6 grid gap-5 sm:grid-cols-2">{[["Username", profile.username], ["Email", profile.email], ["Phone", profile.phone || "Not added"], ["Location", profile.location || "Not added"], ["Address", profile.address || "Not added"], ...(profile.role === "seller" ? [["Business", profile.businessName || "Not added"]] : [])].map(([label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt><dd className="mt-1 break-words font-semibold">{value}</dd></div>)}</dl>}</div>}{tab === "orders" && <div><h2 className="text-xl font-bold">Order history</h2><div className="mt-6 space-y-5">{orders.length ? orders.map((order) => <article key={order.id} className="rounded-2xl border border-slate-200"><header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4"><div><strong>Order #{order.id}</strong><p className="mt-1 text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p></div><div className="text-right"><span className="status-pill capitalize">{order.status.replace("_", " ")}</span><p className="mt-1 text-sm font-bold">{money.format(order.total_price)}</p></div></header><div className="divide-y divide-slate-100">{order.items.map((item) => <div key={item.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">{item.product?.image ? <img src={imageUrl(item.product.image)} alt="" className="h-16 w-16 rounded-lg object-cover" /> : <span className="h-16 w-16 rounded-lg bg-slate-100" />}<div className="min-w-0 flex-1"><p className="truncate font-bold">{item.product_name || item.product?.name}</p><p className="text-xs text-slate-500">Qty {item.quantity} · {money.format(item.price)}</p></div>{item.review ? <span className="flex items-center gap-1 text-sm font-bold"><Star size={15} className="fill-amber-400 text-amber-400" />{item.review.rating}</span> : item.status === "delivered" && <button className="btn-secondary" onClick={() => setReviewItem(item)}>Write review</button>}</div>)}</div></article>) : <div className="empty-state"><Package className="h-12 w-12 text-slate-400" /><h3 className="mt-4 font-bold">No orders yet</h3></div>}</div></div>}{tab === "security" && <div><h2 className="text-xl font-bold">Change password</h2><p className="mt-2 text-sm text-slate-500">Use a unique password you do not use elsewhere.</p><form className="mt-6 max-w-md space-y-5" onSubmit={changePassword}><label className="label block">Current password<input className="field mt-1 w-full" name="current_password" type="password" autoComplete="current-password" required /></label><label className="label block">New password<input className="field mt-1 w-full" name="new_password" type="password" autoComplete="new-password" minLength={8} required /></label><label className="label block">Confirm new password<input className="field mt-1 w-full" name="confirm_password" type="password" autoComplete="new-password" minLength={8} required /></label><button className="btn-primary">Update password</button></form></div>}</section></div>{reviewItem && <ReviewModal orderItem={reviewItem} onClose={() => setReviewItem(null)} onSuccess={load} />}</main>;
};

export default UserProfile;
