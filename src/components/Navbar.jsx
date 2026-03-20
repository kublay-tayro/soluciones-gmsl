import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { cart, setIsCartOpen } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper para saber si una ruta está activa
    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isActive('/') ? 'bg-slate-900 shadow-lg py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-amber-500 p-1.5 rounded">
                        <Package className="text-slate-900" size={24} />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white font-bold text-xl leading-none tracking-tight">SOLUCIONES <span className="text-amber-500">GM&SL</span></h1>
                        <span className="text-slate-400 text-[10px] uppercase tracking-widest">Outlet de Contrataciones</span>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-slate-300 text-sm font-medium">
                    <Link to="/catalogo" className={`hover:text-white transition-colors ${isActive('/catalogo') ? 'text-amber-500' : ''}`}>Catálogo</Link>
                    <Link to="/nosotros" className={`hover:text-white transition-colors ${isActive('/nosotros') ? 'text-amber-500' : ''}`}>Quiénes Somos</Link>
                    <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/catalogo" className="text-white hover:text-amber-400 transition-colors" title="Buscar">
                        <Search size={20} />
                    </Link>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
                        title="Ver carrito"
                    >
                        <ShoppingCart size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
