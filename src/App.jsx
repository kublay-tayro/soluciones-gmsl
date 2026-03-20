import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, X, Info, Truck, ShieldCheck, Package, ChevronRight, Tag } from 'lucide-react';

// --- Datos cargados desde Supabase ---
import { getProducts } from './services/api';


const categories = ["Todos", "Maquinaria Pesada", "Tecnología", "Mobiliario", "Deportes y Recreación", "Insumos"];

// --- Componentes ---

const Badge = ({ children, type }) => {
    const colors = {
        "Oportunidad Única": "bg-amber-500 text-white",
        "Liquidación": "bg-red-500 text-white",
        "Alto Valor": "bg-slate-800 text-white border border-slate-600",
        "default": "bg-blue-600 text-white"
    };
    return (
        <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${colors[type] || colors['default']}`}>
            {children}
        </span>
    );
};

const Navbar = ({ cartCount, toggleCart }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900 shadow-lg py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-amber-500 p-1.5 rounded">
                        <Package className="text-slate-900" size={24} />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white font-bold text-xl leading-none tracking-tight">SOLUCIONES <span className="text-amber-500">GM&SL</span></h1>
                        <span className="text-slate-400 text-[10px] uppercase tracking-widest">Outlet de Contrataciones</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8 text-slate-300 text-sm font-medium">
                    <a href="#catalogo" className="hover:text-white transition-colors">Catálogo</a>
                    <a href="#categorias" className="hover:text-white transition-colors">Categorías</a>
                    <a href="#nosotros" className="hover:text-white transition-colors">Quiénes Somos</a>
                    <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-white hover:text-amber-400 transition-colors">
                        <Search size={20} />
                    </button>
                    <button
                        onClick={toggleCart}
                        className="relative bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
                    >
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

const Hero = () => (
    <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                    <ShieldCheck size={14} /> Inventario Certificado
                </div>
                <h2 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                    Activos Corporativos.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                        Precios de Liquidación.
                    </span>
                </h2>
                <p className="text-slate-400 text-lg lg:text-xl mb-10 max-w-2xl leading-relaxed">
                    Acceda a stock remanente de licitaciones estatales. Desde maquinaria industrial hasta equipamiento de oficina y deportivo. Productos nuevos que buscan su destino final.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded flex items-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-500/20">
                        Ver Catálogo Completo <ChevronRight size={20} />
                    </button>
                    <button className="px-8 py-4 rounded border border-slate-700 text-white hover:bg-white/5 font-medium transition-all">
                        Hablar con un Asesor
                    </button>
                </div>
            </div>
        </div>

        {/* Decorative stats */}
        <div className="hidden lg:flex absolute right-0 bottom-12 gap-12 pr-12 border-l border-slate-800 pl-12">
            <div>
                <p className="text-3xl font-bold text-white">30% - 70%</p>
                <p className="text-slate-500 text-sm uppercase tracking-wide">Descuento Promedio</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-slate-500 text-sm uppercase tracking-wide">Garantía Legal</p>
            </div>
        </div>
    </header>
);

const ProductCard = ({ product, addToCart }) => {
    // Supabase returns snake_case names, so we need to handle both formats
    const originalPrice = product.original_price || product.originalPrice || 0;
    const price = product.price || 0;
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
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">{product.name}</h3>
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
                        className="w-full bg-slate-900 hover:bg-blue-700 text-white font-medium py-3 rounded flex items-center justify-center gap-2 transition-all"
                    >
                        <ShoppingCart size={18} /> Agregar al Pedido
                    </button>
                </div>
            </div>
        </div>
    );
};

const CartDrawer = ({ isOpen, onClose, cart, removeFromCart }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);


    const handleWhatsappCheckout = () => {
        const phoneNumber = "51933495414"; // Número de WhatsApp
        let message = "Hola, estoy interesado en los siguientes productos de Soluciones GM&SL:\n\n";

        cart.forEach(item => {
            message += `- ${item.name} (USD ${item.price.toLocaleString()})\n`;
        });

        message += `\n*Total: USD ${total.toLocaleString()}*`;
        message += "\n\nQuedo atento a su respuesta para coordinar la compra.";

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className={`fixed inset-0 z-[60] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className={`relative w-full max-w-md bg-white h-full shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <ShoppingCart size={20} /> Tu Pedido
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
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
                                        <p className="text-amber-600 font-bold text-sm">USD {item.price.toLocaleString()}</p>
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
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="text-2xl font-bold text-slate-900">USD {total.toLocaleString()}</span>
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

const FeatureStrip = () => (
    <div id="nosotros" className="bg-white border-b border-slate-200 py-8 scroll-mt-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900">Origen Transparente</h4>
                    <p className="text-sm text-slate-500">Productos legales de remanentes contractuales.</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
                    <Tag size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900">Precios Mayoristas</h4>
                    <p className="text-sm text-slate-500">Venta directa sin intermediarios comerciales.</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-full">
                    <Truck size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900">Logística Nacional</h4>
                    <p className="text-sm text-slate-500">Envío de paquetes y coordinación de maquinaria.</p>
                </div>
            </div>
        </div>
    </div>
);

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error cargando productos", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = activeCategory === "Todos"
        ? products
        : products.filter(p => p.category === activeCategory);

    const addToCart = (product) => {
        setCart([...cart, product]);
        setIsCartOpen(true);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar cartCount={cart.length} toggleCart={() => setIsCartOpen(true)} />
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                removeFromCart={removeFromCart}
            />

            <Hero />
            <FeatureStrip />

            <main id="catalogo" className="flex-grow container mx-auto px-6 py-16 scroll-mt-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-2">Catálogo General</h3>
                        <p className="text-slate-500">Explore nuestro inventario actualizado en tiempo real.</p>
                    </div>

                    {/* Category Filter */}
                    <div id="categorias" className="flex flex-wrap gap-2 scroll-mt-24">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? 'bg-slate-900 text-white shadow-lg scale-105'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                        <p className="text-slate-500 animate-pulse">Cargando inventario...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} addToCart={addToCart} />
                        ))}
                    </div>
                )}

                {activeCategory !== "Todos" && filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">No hay stock disponible en esta categoría por el momento.</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer id="contacto" className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 scroll-mt-24">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">SOLUCIONES <span className="text-amber-500">GM&SL</span></h4>
                        <p className="text-sm leading-relaxed mb-6">
                            Empresa especializada en la comercialización de activos remanentes de licitaciones gubernamentales y corporativas.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-slate-800 rounded hover:bg-amber-500 transition-colors cursor-pointer"></div>
                            <div className="w-8 h-8 bg-slate-800 rounded hover:bg-amber-500 transition-colors cursor-pointer"></div>
                            <div className="w-8 h-8 bg-slate-800 rounded hover:bg-amber-500 transition-colors cursor-pointer"></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Categorías</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Maquinaria Pesada</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Tecnología IT</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Flota Vehicular</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Mobiliario de Oficina</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Política de Devoluciones</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Certificaciones de Origen</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Libro de Reclamaciones</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Boletín de Oportunidades</h4>
                        <p className="text-sm mb-4">Reciba alertas de nuevos lotes antes que nadie.</p>
                        <div className="flex">
                            <input type="email" placeholder="Email corporativo" className="bg-slate-800 text-white px-4 py-2 rounded-l w-full focus:outline-none focus:ring-1 focus:ring-amber-500" />
                            <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-r font-bold hover:bg-amber-400 transition-colors">OK</button>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
                    &copy; 2026 Soluciones GM&SL. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
}

export default App;