import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, X, Info, Truck, ShieldCheck, Package, ChevronRight, Tag } from 'lucide-react';

// --- Datos Simulados (Mock Data) ---
const productsData = [
    {
        id: 1,
        name: "Generador Industrial CAT 500kVA",
        category: "Maquinaria Pesada",
        price: 45000.00,
        originalPrice: 68000.00,
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        description: "Unidad excedente de licitación hospitalaria. Nuevo, 0 horas de uso. Capacidad industrial.",
        badge: "Oportunidad Única"
    },
    {
        id: 2,
        name: "Lote de Balones de Fútbol Pro FIFA",
        category: "Deportes y Recreación",
        price: 25.50,
        originalPrice: 85.00,
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=800&q=80",
        description: "Balones de alta competencia. Excedente de programa municipal de deportes.",
        badge: "Liquidación"
    },
    {
        id: 3,
        name: "Servidor Rack Dell PowerEdge R740",
        category: "Tecnología",
        price: 3200.00,
        originalPrice: 5500.00,
        image: "https://images.unsplash.com/photo-1558494949-efc535b5c47d?auto=format&fit=crop&w=800&q=80",
        description: "Servidor empresarial de alto rendimiento. Caja abierta, garantía intacta.",
        badge: "Tecnología"
    },
    {
        id: 4,
        name: "Retroexcavadora John Deere 310L",
        category: "Maquinaria Pesada",
        price: 82000.00,
        originalPrice: 115000.00,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        description: "Modelo 2024. No recepcionada por cambio de administración local. Documentación al día.",
        badge: "Alto Valor"
    },
    {
        id: 5,
        name: "Set de Escritorios Modulares (Pack x10)",
        category: "Mobiliario",
        price: 1500.00,
        originalPrice: 3000.00,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        description: "Estaciones de trabajo ergonómicas. Color haya/negro. Ideal para oficinas nuevas.",
        badge: "Pack Mayorista"
    },
    {
        id: 6,
        name: "Kit de Primeros Auxilios Táctico",
        category: "Insumos",
        price: 45.00,
        originalPrice: 120.00,
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80",
        description: "Kits completos nivel 3. Excedente de dotación de seguridad ciudadana.",
        badge: "Stock Limitado"
    }
];

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
                    <button className="hover:text-white transition-colors">Catálogo</button>
                    <button className="hover:text-white transition-colors">Cómo Comprar</button>
                    <button className="hover:text-white transition-colors">Garantías</button>
                    <button className="hover:text-white transition-colors">Contacto</button>
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
                    Activos Corporativos.<br/>
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

const ProductCard = ({ product, addToCart }) => (
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
                        <span className="block text-slate-400 text-xs line-through mb-0.5">USD {product.originalPrice.toLocaleString()}</span>
                        <span className="block text-2xl font-bold text-slate-900">USD {product.price.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">
                            -{Math.round((1 - product.price/product.originalPrice) * 100)}% OFF
                        </span>
                    </div>
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

const CartDrawer = ({ isOpen, onClose, cart, removeFromCart }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

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
                    <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded transition-colors">
                        Procesar Cotización
                    </button>
                </div>
            </div>
        </div>
    );
};

const FeatureStrip = () => (
    <div className="bg-white border-b border-slate-200 py-8">
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
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const filteredProducts = activeCategory === "Todos" 
        ? productsData 
        : productsData.filter(p => p.category === activeCategory);

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

            <main className="flex-grow container mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-2">Catálogo General</h3>
                        <p className="text-slate-500">Explore nuestro inventario actualizado en tiempo real.</p>
                    </div>
                    
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === cat 
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>

                {activeCategory !== "Todos" && filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">No hay stock disponible en esta categoría por el momento.</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
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
                    &copy; 2024 Soluciones GM&SL. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
}

export default App;