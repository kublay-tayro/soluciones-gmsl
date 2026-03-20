import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { CartProvider } from '../contexts/CartContext';

const PublicLayout = () => {
    return (
        <CartProvider>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <CartDrawer />
                
                {/* El Outlet renderiza la página activa (Home, Catalog, o AboutUs) aquí */}
                <div className="flex-grow">
                    <Outlet />
                </div>
                
                <Footer />
            </div>
        </CartProvider>
    );
};

export default PublicLayout;
