import { useContext, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon, MapPin, ShieldCheck, ShoppingCart, Star, X } from "lucide-react";

import { imageUrl } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";


const money = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" });

const ProductDetailsModal = ({ product, onClose, addToCart, loading }) => {
  const images = [...new Set([product.image, product.image2, product.image3].filter(Boolean))];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] || "";
  const dialogRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => setSelectedIndex(0), [product.id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (images.length > 1 && event.key === "ArrowLeft") setSelectedIndex((current) => (current - 1 + images.length) % images.length);
      if (images.length > 1 && event.key === "ArrowRight") setSelectedIndex((current) => (current + 1) % images.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, onClose]);

  const moveImage = (direction) => {
    setSelectedIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#061b0e]/75 p-3 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" tabIndex={-1} className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[28px] bg-white p-4 shadow-[0_30px_100px_rgba(3,24,11,.35)] outline-none sm:p-6">
        <button className="icon-button absolute right-4 top-4 z-20 border border-slate-200 bg-white shadow-lg" onClick={onClose} aria-label="Close product details"><X size={19} /></button>

        <div className="grid gap-7 md:grid-cols-[1.08fr_.92fr]">
          <div className="min-w-0">
            <div className="group/gallery relative aspect-square overflow-hidden rounded-[22px] bg-[#f2f6ef]">
              {selectedImage ? (
                <img src={imageUrl(selectedImage)} alt={`${product.name}, view ${selectedIndex + 1}`} className="h-full w-full object-cover" />
              ) : (
                <span className="grid h-full place-items-center text-slate-400"><ImageIcon size={34} /><span className="mt-2 text-sm">No image available</span></span>
              )}
              {images.length > 1 && (
                <>
                  <button type="button" className="gallery-arrow left-3" onClick={() => moveImage(-1)} aria-label="Previous product image"><ChevronLeft size={20} /></button>
                  <button type="button" className="gallery-arrow right-3" onClick={() => moveImage(1)} aria-label="Next product image"><ChevronRight size={20} /></button>
                  <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/70 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">{selectedIndex + 1} / {images.length}</span>
                </>
              )}
            </div>

            {images.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2.5" aria-label="Choose a product image">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={`group/thumb relative aspect-[1.35/1] overflow-hidden rounded-xl border-2 bg-slate-100 transition ${selectedIndex === index ? "border-[#087c35] shadow-[0_0_0_3px_rgba(122,190,40,.18)]" : "border-transparent hover:border-[#9bd41e]"}`}
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedIndex === index}
                  >
                    <img src={imageUrl(image)} alt="" className="h-full w-full object-cover transition group-hover/thumb:scale-105" />
                    <span className={`absolute inset-0 transition ${selectedIndex === index ? "bg-transparent" : "bg-white/10 group-hover/thumb:bg-transparent"}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col py-2 md:pr-3">
            <p className="eyebrow">{product.categories?.map((category) => category.name).join(" · ") || "Local find"}</p>
            <h2 id="product-dialog-title" className="mt-3 pr-10 text-3xl font-black tracking-[-.035em] text-slate-950 sm:text-4xl">{product.name}</h2>
            <p className="mt-2 text-sm text-slate-500">Sold by <strong className="text-slate-800">{product.seller_name || "Local Mart seller"}</strong></p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 rounded-full bg-[#f2f9e9] px-2.5 py-1 text-[#087c35]"><Star size={15} className="fill-[#9bd41e] text-[#78b800]" /><strong>{Number(product.average_rating || 0).toFixed(1)}</strong></span>
              <span className="text-slate-400">customer rating</span>
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              <strong className="text-3xl font-black text-[#087c35]">{money.format(product.discounted_price)}</strong>
              {product.discount > 0 && <span className="text-slate-400 line-through">{money.format(product.price)}</span>}
            </div>
            <p className="mt-6 whitespace-pre-line leading-7 text-slate-600">{product.description || "The seller has not added a description yet."}</p>
            <div className="mt-6 space-y-3 rounded-2xl border border-[#dcebd4] bg-[#f7fbf4] p-4 text-sm text-slate-600">
              <p className="flex items-center gap-2"><MapPin size={16} className="text-[#087c35]" />{product.seller_location || "Seller location not provided"}</p>
              <p className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#087c35]" /><strong className="text-slate-900">Availability:</strong> {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
            </div>
            {addToCart && user?.role !== "seller" && (
              <button className="btn-primary mt-6 w-full" disabled={loading || !product.is_available} onClick={() => addToCart(product)}>
                <ShoppingCart size={18} />{loading ? "Adding…" : product.is_available ? "Add to cart" : "Currently unavailable"}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsModal;
