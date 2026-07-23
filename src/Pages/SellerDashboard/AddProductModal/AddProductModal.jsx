import { useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "react-toastify";

import { api, getErrorMessage, listData } from "../../../services/api";


const initialForm = { name: "", description: "", price: "", discount: "0", stock: "0", categories: [] };

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (isOpen) api.get("/category/").then(({ data }) => setCategories(listData(data))).catch(() => toast.error("Categories could not be loaded.")); }, [isOpen]);
  if (!isOpen) return null;

  const toggleCategory = (id) => setForm((current) => ({ ...current, categories: current.categories.includes(id) ? current.categories.filter((value) => value !== id) : [...current.categories, id] }));
  const submit = async (event) => {
    event.preventDefault(); setLoading(true);
    const data = new FormData();
    ["name", "description", "price", "discount", "stock"].forEach((key) => data.append(key, form[key]));
    form.categories.forEach((id) => data.append("category_ids", id));
    images.forEach((image, index) => data.append(index === 0 ? "image" : `image${index + 1}`, image));
    try { const response = await api.post("/products/", data); onAdd(response.data); toast.success("Product published."); setForm(initialForm); setImages([]); onClose(); }
    catch (error) { toast.error(getErrorMessage(error, "Product could not be published.")); }
    finally { setLoading(false); }
  };

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="add-product-title" className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><button className="icon-button absolute right-4 top-4" onClick={onClose} aria-label="Close"><X /></button><p className="eyebrow">New listing</p><h2 id="add-product-title" className="mt-2 text-2xl font-bold">Add a product</h2><form className="mt-6 space-y-5" onSubmit={submit}><label className="label block">Product name<input className="field mt-1 w-full" required maxLength={200} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label className="label block">Description<textarea className="field mt-1 min-h-28 w-full" maxLength={3000} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label><div className="grid gap-4 sm:grid-cols-3"><label className="label">Price (BDT)<input className="field mt-1 w-full" type="number" min="0.01" step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label><label className="label">Discount %<input className="field mt-1 w-full" type="number" min="0" max="99" required value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} /></label><label className="label">Stock<input className="field mt-1 w-full" type="number" min="0" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></label></div><fieldset><legend className="label mb-2">Categories</legend><div className="flex flex-wrap gap-2">{categories.map((category) => <label key={category.id} className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-semibold ${form.categories.includes(category.id) ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-200"}`}><input className="sr-only" type="checkbox" checked={form.categories.includes(category.id)} onChange={() => toggleCategory(category.id)} />{category.name}</label>)}</div></fieldset><label className="label block">Product images <span className="font-normal text-slate-400">(up to 3)</span><span className="mt-1 flex min-h-28 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50"><span className="flex items-center gap-2 text-sm font-normal text-slate-500"><ImagePlus size={19} />{images.length ? `${images.length} image(s) selected` : "JPEG, PNG, or WebP · max 5 MB each"}</span><input className="sr-only" type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(e) => setImages(Array.from(e.target.files || []).slice(0, 3))} /></span></label><div className="flex justify-end gap-3"><button type="button" className="btn-secondary" onClick={onClose}>Cancel</button><button className="btn-primary" disabled={loading}>{loading ? "Publishing…" : "Publish product"}</button></div></form></section></div>;
};

export default AddProductModal;
