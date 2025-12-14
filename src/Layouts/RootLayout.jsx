// import React from 'react';
// import Navbar from '../ShearComponents/Navbar';
// import { Outlet } from 'react-router-dom';
// import Footer from '../ShearComponents/Footer';

// const RootLayout = () => {
//     return (
//         <div>
//             <Navbar/>
//             <Outlet/>
//             <Footer/>
//         </div>
//     );
// };

// export default RootLayout;


import React, { useState } from 'react';
import Navbar from '../ShearComponents/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../ShearComponents/Footer';

const RootLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshOffers, setRefreshOffers] = useState(0);

  return (
    <div>
     <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOfferAdded={() => setRefreshOffers(prev => prev + 1)}
      />
      <Outlet context={{ searchTerm, refreshOffers }} />
      <Footer />
    </div>
  );
};

export default RootLayout;
