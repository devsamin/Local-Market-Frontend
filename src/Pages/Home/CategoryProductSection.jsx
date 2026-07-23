import { useContext, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  MessageCircle,
  SearchX,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { CartContext } from "../../contexts/CartContext/CartContext";
import { imageUrl } from "../../services/api";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";


const PAGE_SIZE = 24;
const money = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" });
const sortOptions = [
  { value: "-created_at", label: "Newest first", hint: "Recently added products" },
  { value: "price", label: "Price: low to high", hint: "Lowest prices first" },
  { value: "-price", label: "Price: high to low", hint: "Premium prices first" },
  { value: "-average_rating", label: "Top rated", hint: "Best customer ratings" },
];

const paginationItems = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, null, total];
  if (current >= total - 3) return [1, null, total - 4, total - 3, total - 2, total - 1, total];
  return [1, null, current - 1, current, current + 1, null, total];
};

const ProductSkeleton = () => (
  <div className="surface overflow-hidden" aria-hidden="true">
    <div className="aspect-[1.3/1] animate-pulse bg-slate-200" />
    <div className="space-y-2.5 p-4">
      <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
      <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="h-10 animate-pulse rounded-full bg-slate-200" />
    </div>
  </div>
);

const CategoryProductSection = ({
  products, count, page, hasNext, hasPrevious, onPageChange, ordering, onOrderingChange,
  loading, error, retry, searchTerm,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);
  const { addToCart, cartCount, loadingProductId } = useContext(CartContext);
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const selectedSort = sortOptions.find((option) => option.value === ordering) || sortOptions[0];

  useEffect(() => {
    const closeSort = (event) => {
      if (event.type === "keydown" && event.key === "Escape") setSortOpen(false);
      if (event.type === "pointerdown" && !sortRef.current?.contains(event.target)) setSortOpen(false);
    };
    document.addEventListener("pointerdown", closeSort);
    document.addEventListener("keydown", closeSort);
    return () => {
      document.removeEventListener("pointerdown", closeSort);
      document.removeEventListener("keydown", closeSort);
    };
  }, []);

  const changePage = (nextPage) => {
    if (nextPage === page || nextPage < 1 || nextPage > totalPages) return;
    onPageChange(nextPage);
    window.setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  return (
    <section id="products" className="page-shell scroll-mt-32 py-10 sm:py-14" aria-labelledby="products-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Curated nearby</p>
          <h2 id="products-heading" className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {searchTerm ? `Results for “${searchTerm}”` : "Explore the marketplace"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">{count} {count === 1 ? "product" : "products"}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <div ref={sortRef} className="relative">
            <button
              type="button"
              className={`premium-sort min-w-[190px] justify-start ${sortOpen ? "border-[#78b800] ring-4 ring-[#9bd41e]/10" : ""}`}
              onClick={() => setSortOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eff9e9] text-[#087c35]"><SlidersHorizontal size={15} /></span>
              <span className="min-w-0 flex-1 text-left leading-tight">
                <span className="block text-[9px] font-black uppercase tracking-[.16em] text-slate-400">Sort by</span>
                <span className="mt-0.5 block truncate text-sm font-black text-slate-800">{selectedSort.label}</span>
              </span>
              <ChevronDown size={16} className={`shrink-0 text-[#087c35] transition ${sortOpen ? "rotate-180" : ""}`} />
            </button>

            {sortOpen && (
              <div className="sort-menu" role="listbox" aria-label="Sort products">
                <div className="border-b border-[#e4efe0] px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#087c35]">Arrange products</p>
                </div>
                <div className="p-2">
                  {sortOptions.map((option) => {
                    const active = option.value === ordering;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={active}
                        className={`sort-menu-item ${active ? "sort-menu-item-active" : ""}`}
                        onClick={() => {
                          onOrderingChange(option.value);
                          setSortOpen(false);
                        }}
                      >
                        <span className="min-w-0 flex-1 text-left">
                          <span className="block text-sm font-bold">{option.label}</span>
                          <span className={`mt-0.5 block text-[11px] ${active ? "text-[#087c35]/70" : "text-slate-400"}`}>{option.hint}</span>
                        </span>
                        <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${active ? "bg-[#087c35] text-white" : "border border-slate-200 text-transparent"}`}><Check size={13} strokeWidth={3} /></span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="premium-nav-icon relative" aria-label={`Cart with ${cartCount} items`}>
            <ShoppingCart size={19} />
            {cartCount > 0 && <span className="cart-badge">{cartCount > 99 ? "99+" : cartCount}</span>}
          </Link>
        </div>
      </div>

      {error ? (
        <div className="empty-state mt-8" role="alert">
          <AlertCircle className="h-12 w-12 text-rose-500" />
          <h3 className="mt-4 text-xl font-bold">Products are unavailable</h3>
          <p className="mt-2 text-slate-600">{error}</p>
          <button className="btn-primary mt-5" onClick={retry}>Try again</button>
        </div>
      ) : loading ? (
        <div className="mt-8 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)}
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state mt-8">
          <SearchX className="h-12 w-12 text-slate-400" />
          <h3 className="mt-4 text-xl font-bold">No matching products</h3>
          <p className="mt-2 text-slate-600">Try a broader search or another category.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const busy = loadingProductId === product.id;
            const unavailable = !product.is_available;
            return (
              <article key={product.id} className="product-card group flex min-w-0 flex-col overflow-hidden">
                <button
                  className="relative block aspect-[1.3/1] overflow-hidden bg-[#f1f5ee] text-left"
                  onClick={() => setSelectedProduct(product)}
                  aria-label={`View ${product.name} details`}
                >
                  {product.image ? (
                    <img src={imageUrl(product.image)} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                  ) : (
                    <span className="grid h-full place-items-center text-sm text-slate-400">No image</span>
                  )}
                  {product.discount > 0 && <span className="absolute left-3 top-3 rounded-full bg-[#087c35] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">{product.discount}% off</span>}
                  {unavailable && <span className="absolute inset-x-3 bottom-3 rounded-lg bg-slate-950/85 px-3 py-2 text-center text-xs font-bold text-white">Out of stock</span>}
                </button>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[10px] font-black uppercase tracking-[.13em] text-[#087c35]">{product.categories?.[0]?.name || "Local favourite"}</p>
                    <div className="flex shrink-0 items-center gap-1 text-xs text-slate-500">
                      <Star size={13} className="fill-[#9bd41e] text-[#78b800]" />
                      <span className="font-bold text-slate-700">{Number(product.average_rating || 0).toFixed(1)}</span>
                    </div>
                  </div>
                  <button className="mt-1.5 line-clamp-2 min-h-10 text-left text-[16px] font-extrabold leading-5 text-slate-950 hover:text-[#087c35]" onClick={() => setSelectedProduct(product)}>{product.name}</button>
                  <p className="mt-1 truncate text-xs text-slate-500">by <span className="font-semibold text-slate-700">{product.seller_name || "Local Mart seller"}</span></p>
                  <div className="mt-3 flex min-w-0 items-center gap-3 text-[11px] font-medium text-slate-500">
                    <span className="flex shrink-0 items-center gap-1.5"><Truck size={13} className="text-[#087c35]" /> Shipping extra</span>
                    <span className="flex min-w-0 items-center gap-1 truncate"><MapPin size={12} className="shrink-0 text-[#087c35]" />{product.seller_location || "Local seller"}</span>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2.5 pt-4">
                    <div className="flex flex-col">
                      <strong className="text-[21px] font-black tracking-tight text-slate-950">{money.format(product.discounted_price)}</strong>
                      {product.discount > 0 && <span className="text-[11px] text-slate-400 line-through">{money.format(product.price)}</span>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button className="product-buy-button" disabled={busy || unavailable} onClick={() => addToCart(product)}>
                        <ShoppingBag size={15} />{busy ? "Adding…" : unavailable ? "Sold out" : "Buy"}
                      </button>
                      <button className="product-ask-button" onClick={() => setSelectedProduct(product)} aria-label={`Ask about ${product.name}`}>
                        <MessageCircle size={14} /> Ask
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!loading && !error && totalPages > 1 && (
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Product pages">
          <button className="pagination-arrow" disabled={!hasPrevious} onClick={() => changePage(page - 1)} aria-label="Previous page"><ArrowLeft size={17} /><span className="hidden sm:inline">Previous</span></button>
          <div className="flex items-center gap-1.5">
            {paginationItems(page, totalPages).map((item, index) => item ? (
              <button
                key={item}
                type="button"
                className={`pagination-number ${page === item ? "pagination-number-active" : ""}`}
                onClick={() => changePage(item)}
                aria-label={`Page ${item}`}
                aria-current={page === item ? "page" : undefined}
              >
                {item}
              </button>
            ) : <span key={`ellipsis-${index}`} className="px-1 text-slate-400" aria-hidden="true">…</span>)}
          </div>
          <button className="pagination-arrow" disabled={!hasNext} onClick={() => changePage(page + 1)} aria-label="Next page"><span className="hidden sm:inline">Next</span><ArrowRight size={17} /></button>
        </nav>
      )}

      {selectedProduct && <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} addToCart={addToCart} loading={loadingProductId === selectedProduct.id} />}
    </section>
  );
};

export default CategoryProductSection;
