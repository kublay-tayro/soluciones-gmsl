"use client";
import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Toast = () => {
    const { toast } = useCart();

    return (
        <div className={`fixed bottom-6 right-6 z-[70] transition-all duration-500 ${toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
            <div className="bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 max-w-sm">
                <div className="bg-green-500 p-1.5 rounded-full flex-shrink-0">
                    <Check size={14} className="text-white" />
                </div>
                <div className="flex-grow min-w-0">
                    <p className="text-sm font-semibold truncate">{toast.productName}</p>
                    <p className="text-xs text-slate-400">agregado al pedido</p>
                </div>
                <ShoppingCart size={18} className="text-amber-500 flex-shrink-0" />
            </div>
        </div>
    );
};

export default Toast;
