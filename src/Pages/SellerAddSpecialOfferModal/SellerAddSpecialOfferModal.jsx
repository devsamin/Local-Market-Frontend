import { useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "react-toastify";

import { api, getErrorMessage } from "../../services/api";


const colors = [
  ["Emerald", "bg-emerald-600"], ["Blue", "bg-blue-600"], ["Amber", "bg-amber-600"],
  ["Rose", "bg-rose-600"], ["Violet", "bg-violet-600"],
];

const SellerAddSpecialOfferModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({ title: "", subtitle: "", badge: "", badgeColor: "bg-emerald-600" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  if (!isOpen) return null;

  const chooseImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Choose an image smaller than 5 MB."); return; }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!image) { toast.error("Add an offer image."); return; }
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value.trim()));
    data.append("image", image);
    try {
      await api.post("/offers/", data);
      toast.success("Special offer published.");
      setForm({ title: "", subtitle: "", badge: "", badgeColor: "bg-emerald-600" });
      setImage(null); setPreview(""); onSuccess?.(); onClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Offer could not be published."));
    } finally { setLoading(false); }
  };

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="offer-title" className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><button className="icon-button absolute right-4 top-4" onClick={onClose} aria-label="Close"><X /></button><p className="eyebrow">Seller promotion</p><h2 id="offer-title" className="mt-2 text-2xl font-bold">Create a special offer</h2><form className="mt-6 space-y-4" onSubmit={submit}><label className="label">Title<input className="field mt-1 w-full" required maxLength={255} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><label className="label">Short description<textarea className="field mt-1 min-h-24 w-full" required maxLength={255} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></label><div className="grid gap-4 sm:grid-cols-2"><label className="label">Badge<input className="field mt-1 w-full" required maxLength={100} placeholder="20% off" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} /></label><label className="label">Badge colour<select className="field mt-1 w-full" value={form.badgeColor} onChange={(e) => setForm({ ...form, badgeColor: e.target.value })}>{colors.map(([name, value]) => <option key={value} value={value}>{name}</option>)}</select></label></div><label className="label block">Offer image<span className="mt-1 grid min-h-36 cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:border-emerald-500">{preview ? <img src={preview} alt="Offer preview" className="h-48 w-full object-cover" /> : <span className="flex flex-col items-center gap-2"><ImagePlus /> JPEG, PNG, or WebP · max 5 MB</span>}<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} /></span></label><div className="flex justify-end gap-3 pt-2"><button type="button" className="btn-secondary" onClick={onClose}>Cancel</button><button className="btn-primary" disabled={loading}>{loading ? "Publishing…" : "Publish offer"}</button></div></form></section></div>;
};

export default SellerAddSpecialOfferModal;
