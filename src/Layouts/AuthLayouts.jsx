import { Link, Outlet } from "react-router-dom";

import localMartLogo from "../assets/local-mart-logo-web.png";


const AuthLayouts = () => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,#123822_0%,#06180d_45%,#041008_100%)] text-slate-900">
    <header className="page-shell flex h-[68px] items-center">
      <Link to="/" className="flex items-center gap-2.5 text-white" aria-label="Local Mart home">
        <img src={localMartLogo} alt="" className="h-11 w-11 rounded-xl border border-white/15 bg-white object-cover shadow-lg" />
        <span className="leading-none">
          <strong className="block text-base font-black tracking-[-.02em]">LOCAL MART</strong>
          <small className="mt-1 block text-[8px] font-bold uppercase tracking-[.18em] text-[#b7e34a]">Fresh · Local · Trusted</small>
        </span>
      </Link>
    </header>
    <main><Outlet /></main>
  </div>
);

export default AuthLayouts;
