// import React, { useState } from 'react';
// import Category from '../Home/Category';
// import SpecialOffers from '../Home/SpecialOffers';
// import { useLoaderData } from 'react-router-dom';
// import CategoryProductSection from '../Home/CategoryProductSection';

// const HomePage = () => {
//     const { categories, products } = useLoaderData();
//     const [selectedCategory, setSelectedCategory] = useState('সব');
//     return (
//         <div>
//             <Category categories={categories}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//             />
//             <SpecialOffers/>
//             <CategoryProductSection products={products}
//             category={selectedCategory}
//             />
//         </div>
//     );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Category from "../Home/Category";
import SpecialOffers from "../Home/SpecialOffers";
import CategoryProductSection from "../Home/CategoryProductSection";
// import Navbar from "../../ShearComponents/Navbar";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("সব");

   const { searchTerm , refreshOffers } = useOutletContext();

  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      const res = await axios.get("https://local-market-backend.onrender.com/api/offers/");
      setOffers(res.data);
    } catch (error) {
      console.error("Error loading offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [refreshOffers]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get("https://local-market-backend.onrender.com/api/category/"),
          axios.get("https://local-market-backend.onrender.com/api/products/"),
        ]);

        setCategories([{ id: 0, name: "সব" }, ...catRes.data]);
        setProducts(prodRes.data);
        console.log(prodRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <Helmet>
        <title>হোম পেজ | LocalMarket</title>
      </Helmet>
      


      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* <SpecialOffers />
      {/* ⭐ Pass offers + refresh function */}
      <SpecialOffers offers={offers}  /> 

      <CategoryProductSection
        products={products}
        category={selectedCategory}
        searchTerm={searchTerm} // 🔹 pass searchTerm
      />
    </div>
  );
};

export default HomePage;


