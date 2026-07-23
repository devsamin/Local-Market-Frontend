import { useState } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../ShearComponents/Footer";
import Navbar from "../ShearComponents/Navbar";


const RootLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshOffers, setRefreshOffers] = useState(0);
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8f3] text-slate-900">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onOfferAdded={() => setRefreshOffers((value) => value + 1)} />
      <div id="main-content" className="flex-1"><Outlet context={{ searchTerm, refreshOffers }} /></div>
      <Footer />
    </div>
  );
};

export default RootLayout;
