"use client";
import React from 'react';
import { ShoppingCart, X, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartDrawer = () => {
    const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
    
    const totalUSD = cart.filter(item => item.currency === 'USD').reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const totalPEN = cart.filter(item => item.currency !== 'USD').reduce((sum, item) => sum + (Number(item.price) || 0), 0);

    const handleWhatsappCheckout = () => {
        const phoneNumber = "51933495414"; // Número de WhatsApp configurado
        let message = "Hola, estoy interesado en los siguientes productos de Soluciones GM&SL:\n\n";

        cart.forEach(item => {
            const sym = item.currency === 'USD' ? 'USD ' : 'S/ ';
            message += `- ${item.name} (${sym}${(Number(item.price) || 0).toLocaleString()})\n`;
        });

        message += `\n*Totales estimados:*`;
        if (totalPEN > 0) message += `\nS/ ${totalPEN.toLocaleString()}`;
        if (totalUSD > 0) message += `\nUSD ${totalUSD.toLocaleString()}`;
        message += "\n\nQuedo atento a su respuesta para coordinar la compra.";

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className={`fixed inset-0 z-[60] flex justify-end transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>

            <div className={`relative w-full max-w-md bg-white h-full shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <ShoppingCart size={20} /> Tu Pedido
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                </div>

                <div className="flex-grow overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <Package size={48} className="mb-4 opacity-50" />
                            <p>Su carrito está vacío.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded bg-white" />
                                    <div className="flex-grow">
                                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-slate-500 mb-2">{item.category}</p>
                                        <p className="text-amber-600 font-bold text-sm">{item.currency === 'USD' ? 'USD' : 'S/'} {(Number(item.price) || 0).toLocaleString()}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(index)} className="text-slate-300 hover:text-red-500 self-start">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-white">
                    <div className="flex flex-col gap-2 mb-4">
                        <span className="text-slate-600 font-medium">Subtotales</span>
                        {totalPEN > 0 && (
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">Soles (PEN)</span>
                                <span className="text-xl font-bold text-slate-900">S/ {totalPEN.toLocaleString()}</span>
                            </div>
                        )}
                        {totalUSD > 0 && (
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">Dólares (USD)</span>
                                <span className="text-xl font-bold text-slate-900">USD {totalUSD.toLocaleString()}</span>
                            </div>
                        )}
                        {totalPEN === 0 && totalUSD === 0 && (
                             <div className="flex justify-between items-center">
                                 <span className="text-slate-500 text-sm">Total</span>
                                 <span className="text-xl font-bold text-slate-900">S/ 0</span>
                             </div>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mb-6 text-center">
                        * Precios no incluyen IGV/IVA ni costos de envío para maquinaria pesada.
                    </p>
                    <button
                        onClick={handleWhatsappCheckout}
                        disabled={cart.length === 0}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.029.575 2.035.892 3.167.892 3.18 0 5.767-2.587 5.767-5.768.001-3.185-2.585-5.77-5.768-5.77zM12 2C6.48 2 2 6.48 2 12c0 1.93.55 3.72 1.5 5.25L.5 23l5.8-1.42C8.18 22.5 10.02 23 12 23c5.52 0 10-4.48 10-10S17.52 2 12 2zm.01 18c-1.92 0-3.7-.63-5.22-1.72l-.38-.26-2.91.76.78-2.84-.23-.4C2.5 13.9 1.9 12.1 1.9 10.2c0-5.58 4.54-9.8 9.8-9.8 2.62 0 5.08 1.02 6.94 2.87 1.86 1.85 2.88 4.31 2.88 6.93 0 5.4-4.4 9.8-9.8 9.8z" /></svg>
                        Cotizar por WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
