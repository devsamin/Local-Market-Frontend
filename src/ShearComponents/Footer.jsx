import { ArrowRight, Heart, MapPin, PackageCheck, ShieldCheck, Store, Truck } from "lucide-react";
import { Link } from "react-router-dom";

import localMartLogo from "../assets/local-mart-logo-web.png";


const Footer = () => (
  <footer className="mt-16 overflow-hidden bg-[#06180d] text-white">
    <div className="border-b border-white/10 bg-[#0a2213]">
      <div className="page-shell grid gap-5 py-6 sm:grid-cols-3">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#9bd41e]/15 text-[#a9df32]"><ShieldCheck size={21} /></span><div><strong className="block text-sm">Shop with confidence</strong><span className="text-xs text-white/50">Secure checkout and trusted sellers</span></div></div>
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#9bd41e]/15 text-[#a9df32]"><Store size={21} /></span><div><strong className="block text-sm">Support local business</strong><span className="text-xs text-white/50">Every order strengthens a community</span></div></div>
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#9bd41e]/15 text-[#a9df32]"><PackageCheck size={21} /></span><div><strong className="block text-sm">Clear order updates</strong><span className="text-xs text-white/50">Follow purchases from cart to delivery</span></div></div>
      </div>
    </div>

    <div className="page-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_.7fr_.7fr_1fr] lg:gap-12">
      <div>
        <Link to="/" className="flex w-fit items-center gap-3" aria-label="Local Mart home">
          <img src={localMartLogo} alt="" className="h-14 w-14 rounded-2xl bg-white object-cover" />
          <span><strong className="block text-xl font-black tracking-[-.03em]">LOCAL MART</strong><small className="mt-1 block text-[9px] font-bold uppercase tracking-[.2em] text-[#a9df32]">Fresh · Local · Trusted</small></span>
        </Link>
        <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">A community-first marketplace connecting shoppers with independent sellers and useful products close to home.</p>
        <p className="mt-5 flex items-center gap-2 text-sm text-white/65"><MapPin size={16} className="text-[#a9df32]" /> Serving local communities across Bangladesh</p>
      </div>

      <div>
        <h2 className="text-sm font-black uppercase tracking-[.12em] text-white">Marketplace</h2>
        <nav className="mt-5 flex flex-col gap-3.5 text-sm text-white/55" aria-label="Marketplace links">
          <Link className="transition hover:translate-x-1 hover:text-[#a9df32]" to="/">Browse products</Link>
          <Link className="transition hover:translate-x-1 hover:text-[#a9df32]" to="/cart">Your cart</Link>
          <Link className="transition hover:translate-x-1 hover:text-[#a9df32]" to="/profile">Orders</Link>
        </nav>
      </div>

      <div>
        <h2 className="text-sm font-black uppercase tracking-[.12em] text-white">Sell locally</h2>
        <nav className="mt-5 flex flex-col gap-3.5 text-sm text-white/55" aria-label="Seller links">
          <Link className="transition hover:translate-x-1 hover:text-[#a9df32]" to="/register">Become a seller</Link>
          <Link className="transition hover:translate-x-1 hover:text-[#a9df32]" to="/seller-dashboard">Seller dashboard</Link>
          <Link className="transition hover:translate-x-1 hover:text-[#a9df32]" to="/login">Seller sign in</Link>
        </nav>
      </div>

      <div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-[#a9df32]"><Truck size={20} /></span>
        <h2 className="mt-4 text-lg font-black">Made for local shopping.</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">Discover new sellers, useful finds and special offers updated by the community.</p>
        <a href="#products" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#a9df32]">Start exploring <ArrowRight size={16} /></a>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="page-shell flex flex-col gap-2 py-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Local Mart. All rights reserved.</p>
        <p className="flex items-center gap-1.5">Built for stronger local communities <Heart size={13} className="text-[#a9df32]" /></p>
      </div>
    </div>
  </footer>
);

export default Footer;
