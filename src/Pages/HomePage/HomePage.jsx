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

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("সব");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/category/"),
          axios.get("http://127.0.0.1:8000/api/products/"),
        ]);

        setCategories([{ id: 0, name: "সব" }, ...catRes.data]);
        setProducts(prodRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <SpecialOffers />

      <CategoryProductSection
        products={products}
        category={selectedCategory}
      />
    </div>
  );
};

export default HomePage;


