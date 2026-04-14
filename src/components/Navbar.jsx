"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Package, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart, setIsCartOpen } = useCart();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar menú móvil al cambiar de ruta
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const isActive = (path) => pathname === path;

    const navLinks = [
        { href: '/catalogo', label: 'Catálogo' },
        { href: '/nosotros', label: 'Quiénes Somos' },
    ];

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isActive('/') ? 'bg-slate-900 shadow-lg py-3' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-amber-500 p-1.5 rounded">
                            <Package className="text-slate-900" size={24} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white font-bold text-xl leading-none tracking-tight">SOLUCIONES <span className="text-amber-500">GM&SL</span></h1>
                            <span className="text-slate-400 text-[10px] uppercase tracking-widest">Outlet de Contrataciones</span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8 text-slate-300 text-sm font-medium">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className={`hover:text-white transition-colors ${isActive(link.href) ? 'text-amber-500' : ''}`}>
                                {link.label}
                            </Link>
                        ))}
                        <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/catalogo" className="text-white hover:text-amber-400 transition-colors hidden md:block" title="Buscar">
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

                        {/* Hamburger button - mobile only */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-white hover:text-amber-400 p-2 transition-colors"
                            aria-label="Abrir menú"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile menu panel */}
            <div className={`fixed top-0 right-0 w-72 h-full bg-slate-900 z-[45] md:hidden transform transition-transform duration-300 shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full pt-24 px-6">
                    <div className="flex flex-col gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive(link.href) ? 'bg-amber-500/10 text-amber-500' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-lg text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                            Contacto
                        </a>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800">
                        <Link
                            href="/catalogo"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                        >
                            <Search size={18} /> Buscar productos
                        </Link>
                    </div>

                    <div className="mt-auto pb-8">
                        <a
                            href="https://wa.me/51933495414"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.029.575 2.035.892 3.167.892 3.18 0 5.767-2.587 5.767-5.768.001-3.185-2.585-5.77-5.768-5.77zM12 2C6.48 2 2 6.48 2 12c0 1.93.55 3.72 1.5 5.25L.5 23l5.8-1.42C8.18 22.5 10.02 23 12 23c5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
