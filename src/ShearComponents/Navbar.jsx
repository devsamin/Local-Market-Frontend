import { useContext, useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  CirclePlus,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  PackageCheck,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import localMartLogo from "../assets/local-mart-logo-web.png";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { CartContext } from "../contexts/CartContext/CartContext";
import SellerAddSpecialOfferModal from "../Pages/SellerAddSpecialOfferModal/SellerAddSpecialOfferModal";
import { api, imageUrl } from "../services/api";


const Navbar = ({ searchTerm, setSearchTerm, onOfferAdded }) => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const close = (event) => {
      if (event.type === "keydown" && event.key === "Escape") setProfileOpen(false);
      if (event.type === "pointerdown" && !profileRef.current?.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    if (location.pathname !== "/") navigate("/");
    setMobileOpen(false);
  };

  const handleLogout = () => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) api.post("/users/logout/", { refresh }).catch(() => {});
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  const userAvatar = (className) => user.photo ? (
    <img src={imageUrl(user.photo)} alt="" className={`${className} object-cover`} />
  ) : (
    <span className={`${className} grid place-items-center bg-gradient-to-br from-[#159447] to-[#075e2a] font-black text-white`}>
      {user.username?.[0]?.toUpperCase()}
    </span>
  );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#e1ecdc] bg-white/92 shadow-[0_8px_35px_rgba(23,74,38,.06)] backdrop-blur-xl">
        <div className="page-shell flex h-[76px] items-center gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Local Mart home">
            <img src={localMartLogo} alt="" className="h-12 w-12 rounded-2xl border border-[#dcebd4] bg-white object-cover shadow-sm" />
            <span className="hidden leading-none sm:block">
              <strong className="block text-lg font-black tracking-[-0.035em] text-slate-950">LOCAL MART</strong>
              <small className="mt-1 block text-[8px] font-bold uppercase tracking-[.2em] text-[#087c35]">Fresh · Local · Trusted</small>
            </span>
          </Link>

          <form className="relative mx-auto hidden w-full max-w-2xl md:block" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="site-search">Search products</label>
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input id="site-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search products, sellers, or locations" className="field w-full pl-11 pr-4" />
          </form>

          <nav className="ml-auto flex items-center gap-1" aria-label="Account navigation">
            {user?.role === "seller" && (
              <button className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#f1f9e9] hover:text-[#087c35] lg:flex" onClick={() => setOfferOpen(true)}>
                <CirclePlus size={18} /> Add offer
              </button>
            )}
            {user?.role !== "seller" && (
              <Link to="/cart" className="premium-nav-icon relative" aria-label={`Cart with ${cartCount} items`} title="Your cart">
                <ShoppingBag size={21} strokeWidth={1.8} />
                {cartCount > 0 && <span className="cart-badge">{cartCount > 99 ? "99+" : cartCount}</span>}
              </Link>
            )}

            {user ? (
              <div ref={profileRef} className="relative">
                <button className="premium-profile-button relative ml-1" onClick={() => setProfileOpen((open) => !open)} aria-label="Open profile menu" aria-expanded={profileOpen} aria-haspopup="menu" title={user.username}>
                  {userAvatar("h-9 w-9 rounded-full text-sm")}
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#9bd41e]" aria-hidden="true" />
                </button>

                {profileOpen && (
                  <div className="profile-menu" role="menu">
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#087c35] to-[#155f2d] px-3.5 pb-3.5 pt-4 text-white">
                      <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#b7e34a]/15" />
                      <div className="relative flex items-center gap-3">
                        {userAvatar("h-11 w-11 rounded-xl border-2 border-white/70 text-base shadow-md")}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5"><p className="truncate text-sm font-black">{user.username}</p><BadgeCheck size={15} className="shrink-0 text-[#c6ef5c]" /></div>
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-[.14em] text-white/60">{user.role} account</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      {user.role === "seller" && (
                        <Link role="menuitem" className="profile-menu-link" to="/seller-dashboard" onClick={() => setProfileOpen(false)}>
                          <span className="profile-menu-icon"><LayoutDashboard size={17} /></span>
                          <span className="min-w-0 flex-1"><strong className="block text-sm">Seller dashboard</strong><small className="text-[11px] text-slate-400">Products, orders and insights</small></span>
                          <ChevronRight size={15} className="text-slate-300" />
                        </Link>
                      )}
                      <Link role="menuitem" className="profile-menu-link" to="/profile" onClick={() => setProfileOpen(false)}>
                        <span className="profile-menu-icon"><UserRound size={17} /></span>
                        <span className="min-w-0 flex-1"><strong className="block text-sm">Profile & account</strong><small className="text-[11px] text-slate-400">Details and preferences</small></span>
                        <ChevronRight size={15} className="text-slate-300" />
                      </Link>
                      {user.role === "buyer" && (
                        <Link role="menuitem" className="profile-menu-link" to="/profile" onClick={() => setProfileOpen(false)}>
                          <span className="profile-menu-icon"><PackageCheck size={17} /></span>
                          <span className="min-w-0 flex-1"><strong className="block text-sm">My orders</strong><small className="text-[11px] text-slate-400">Track recent purchases</small></span>
                          <ChevronRight size={15} className="text-slate-300" />
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-100 p-2">
                      <button role="menuitem" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-rose-600 transition hover:bg-rose-50" onClick={handleLogout}>
                        <LogOut size={17} /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="premium-nav-icon ml-1 hidden sm:grid" aria-label="Sign in" title="Sign in"><LogIn size={21} strokeWidth={1.8} /></Link>
            )}
            <button className="icon-button md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
          </nav>
        </div>

        {mobileOpen && (
          <div className="page-shell border-t border-[#e6efe2] py-3 md:hidden">
            <form className="relative" role="search" onSubmit={submitSearch}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="field w-full pl-10" placeholder="Search Local Mart" aria-label="Search products" />
            </form>
            {!user && <Link to="/login" className="btn-primary mt-3 w-full" onClick={() => setMobileOpen(false)}>Sign in</Link>}
            {user?.role === "seller" && <button className="btn-secondary mt-3 w-full" onClick={() => { setOfferOpen(true); setMobileOpen(false); }}><CirclePlus size={18} /> Add special offer</button>}
          </div>
        )}
      </header>
      <SellerAddSpecialOfferModal isOpen={offerOpen} onClose={() => setOfferOpen(false)} onSuccess={onOfferAdded} />
    </>
  );
};

export default Navbar;
