"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ChevronRight, ShieldCheck, Truck, ArrowLeft, Share2, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import Badge from '@/components/Badge';

const ProductDetailView = ({ product }) => {
    const { addToCart } = useCart();

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Mira este producto en Soluciones GM&SL: ${product.name}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado al portapapeles');
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen bg-slate-50 pt-24 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <Package size={64} className="text-slate-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Producto no encontrado</h2>
                    <p className="text-slate-500 mb-6">El producto que buscas no existe o fue removido.</p>
                    <Link href="/catalogo" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded transition-colors">
                        Ir al Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    const currencySymbol = product.currency === 'USD' ? 'USD' : 'S/';
    const originalPrice = Number(product.original_price) || 0;
    const price = Number(product.price) || 0;
    const discount = originalPrice > 0 ? Math.round((1 - price / originalPrice) * 100) : 0;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            <div className="container mx-auto px-6">
                <motion.nav 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-slate-500 mb-8"
                >
                    <Link href="/" className="hover:text-amber-600 transition-colors">Inicio</Link>
                    <ChevronRight size={14} />
                    <Link href="/catalogo" className="hover:text-amber-600 transition-colors">Catálogo</Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.name}</span>
                </motion.nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                            <div className="relative aspect-square">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {product.badge && (
                                    <div className="absolute top-4 left-4">
                                        <Badge type={product.badge}>{product.badge}</Badge>
                                    </div>
                                )}
                                {discount > 0 && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                                        -{discount}% OFF
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
                            {product.category}
                        </div>
                        
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                            <div className="flex items-end gap-4 mb-4">
                                <span className="text-4xl font-extrabold text-slate-900">
                                    {currencySymbol} {price.toLocaleString()}
                                </span>
                                {originalPrice > 0 && (
                                    <span className="text-xl text-slate-400 line-through mb-1">
                                        {currencySymbol} {originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                            {discount > 0 && (
                                <span className="inline-block text-green-600 text-sm font-bold bg-green-100 px-3 py-1 rounded">
                                    Ahorras {currencySymbol} {(originalPrice - price).toLocaleString()} ({discount}% de descuento)
                                </span>
                            )}
                            <p className="text-xs text-slate-400 mt-3">* Precio no incluye IGV/IVA ni costos de envío para maquinaria pesada.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mb-8">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-lg"
                            >
                                <ShoppingCart size={20} /> Agregar al Pedido
                            </button>
                            <a
                                href={`https://wa.me/51933495414?text=${encodeURIComponent(`Hola, estoy interesado en: ${product.name} (${currencySymbol} ${price.toLocaleString()}) - ${window.location.href}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.029.575 2.035.892 3.167.892 3.18 0 5.767-2.587 5.767-5.768.001-3.185-2.585-5.77-5.768-5.77zM12 2C6.48 2 2 6.48 2 12c0 1.93.55 3.72 1.5 5.25L.5 23l5.8-1.42C8.18 22.5 10.02 23 12 23c5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>
                                Consultar por WhatsApp
                            </a>
                        </div>

                        <button onClick={handleShare} className="text-slate-500 hover:text-amber-600 text-sm font-medium flex items-center gap-2 transition-colors mb-8">
                            <Share2 size={16} /> Compartir este producto
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                                <ShieldCheck className="text-blue-600 flex-shrink-0" size={20} />
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Origen Verificado</p>
                                    <p className="text-xs text-slate-500">Trazabilidad legal completa</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
                                <Truck className="text-green-600 flex-shrink-0" size={20} />
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Envío Nacional</p>
                                    <p className="text-xs text-slate-500">Coordinamos la entrega</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200">
                    <Link href="/catalogo" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors">
                        <ArrowLeft size={18} /> Volver al catálogo
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailView;
