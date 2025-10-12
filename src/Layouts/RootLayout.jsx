import React from 'react';
import Navbar from '../ShearComponents/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../ShearComponents/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayout;