import React, { useState } from 'react';
import Category from '../Home/Category';
import SpecialOffers from '../Home/SpecialOffers';
import { useLoaderData } from 'react-router-dom';
import CategoryProductSection from '../Home/CategoryProductSection';

const HomePage = () => {
    const { categories, products } = useLoaderData();
    const [selectedCategory, setSelectedCategory] = useState('সব');
    return (
        <div>
            <Category categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            />
            <SpecialOffers/>
            <CategoryProductSection products={products}
            category={selectedCategory}
            />
        </div>
    );
};

export default HomePage;