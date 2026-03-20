import React from 'react';
import { ShoppingCart, Info } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Badge from './Badge';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    
    // Asignación segura de precios para evitar NaN
    const originalPrice = Number(product.original_price) || 0;
    const price = Number(product.price) || 0;
    const discount = originalPrice > 0 ? Math.round((1 - price / originalPrice) * 100) : 0;

    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-amber-400/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <Badge type={product.badge}>{product.badge}</Badge>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium flex items-center gap-1">
                        <Info size={12} /> Stock limitado
                    </p>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">{product.category}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-amber-500 transition-colors">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>

                <div className="border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex items-end justify-between mb-4">
                        <div>
                            {originalPrice > 0 && (
                                <span className="block text-slate-400 text-xs line-through mb-0.5">USD {originalPrice.toLocaleString()}</span>
                            )}
                            <span className="block text-2xl font-bold text-slate-900">USD {price.toLocaleString()}</span>
                        </div>
                        {discount > 0 && (
                            <div className="text-right">
                                <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">
                                    -{discount}% OFF
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded flex items-center justify-center gap-2 transition-all"
                    >
                        <ShoppingCart size={18} /> Agregar al Pedido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
