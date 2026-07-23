import { useCallback, useContext, useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { api, getErrorMessage, imageUrl, listData } from "../../services/api";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import AddProductModal from "./AddProductModal/AddProductModal";
import EditProductModal from "./EditProductModal/EditProductModal";


const money = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" });

const Products = ({ onChanged }) => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { const { data } = await api.get("/products/", { params: { seller_id: user.id, page_size: 60 } }); setProducts(listData(data)); }
    catch (error) { toast.error(getErrorMessage(error, "Products could not be loaded.")); }
    finally { setLoading(false); }
  }, [user.id]);
  useEffect(() => { load(); }, [load]);

  const remove = async (product) => {
    if (!window.confirm(`Delete “${product.name}”? This cannot be undone.`)) return;
    try { await api.delete(`/products/${product.id}/`); setProducts((items) => items.filter((item) => item.id !== product.id)); toast.success("Product deleted."); onChanged?.(); }
    catch (error) { toast.error(getErrorMessage(error, "Product could not be deleted.")); }
  };

  const upsert = (product) => { setProducts((items) => [product, ...items.filter((item) => item.id !== product.id)]); onChanged?.(); };

  return <section className="surface overflow-hidden"><div className="flex items-center justify-between gap-4 border-b border-slate-200 p-5"><div><h2 className="text-xl font-bold">Product catalogue</h2><p className="mt-1 text-sm text-slate-500">{products.length} listings in this view</p></div><button className="btn-primary" onClick={() => setAddOpen(true)}><Plus size={18} /> Add product</button></div>{loading ? <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="h-48 animate-pulse rounded-xl bg-slate-200" />)}</div> : products.length === 0 ? <div className="empty-state m-5"><h3 className="text-lg font-bold">Your first product starts here</h3><p className="mt-2 text-slate-500">Create a complete listing with clear photos and inventory.</p><button className="btn-primary mt-5" onClick={() => setAddOpen(true)}>Add a product</button></div> : <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <article key={product.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex gap-4">{product.image ? <img src={imageUrl(product.image)} alt="" className="h-24 w-24 rounded-xl object-cover" /> : <span className="h-24 w-24 rounded-xl bg-slate-100" />}<div className="min-w-0 flex-1"><h3 className="line-clamp-2 font-bold">{product.name}</h3><p className="mt-2 font-semibold">{money.format(product.discounted_price)}</p><p className={`mt-1 text-xs font-semibold ${product.stock <= 5 ? "text-rose-600" : "text-slate-500"}`}>{product.stock} in stock</p></div></div><div className="mt-4 grid grid-cols-3 gap-2"><button className="btn-secondary px-2" onClick={() => setViewProduct(product)} aria-label={`View ${product.name}`}><Eye size={17} /></button><button className="btn-secondary px-2" onClick={() => setEditProduct(product)} aria-label={`Edit ${product.name}`}><Pencil size={17} /></button><button className="btn-secondary px-2 text-rose-600" onClick={() => remove(product)} aria-label={`Delete ${product.name}`}><Trash2 size={17} /></button></div></article>)}</div>}<AddProductModal isOpen={addOpen} onClose={() => setAddOpen(false)} onAdd={upsert} />{editProduct && <EditProductModal product={editProduct} onClose={() => setEditProduct(null)} onUpdate={upsert} />}{viewProduct && <ProductDetailsModal product={viewProduct} onClose={() => setViewProduct(null)} addToCart={() => {}} loading={false} />}</section>;
};

export default Products;
