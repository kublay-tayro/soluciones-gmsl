import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Tag, ChevronRight, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 12 } }
};

const Hero = () => (
    <header className="relative pt-32 pb-16 lg:pt-32 lg:pb-24 overflow-hidden hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12"
        >
            <motion.div variants={fadeUp} className="max-w-2xl lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                    <ShieldCheck size={14} /> Inventario Certificado
                </div>
                <h2 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                    Activos Corporativos.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                        Precios de Liquidación.
                    </span>
                </h2>
                <p className="text-slate-400 text-lg lg:text-xl mb-10 max-w-xl leading-relaxed">
                    Acceda a stock remanente de licitaciones estatales. Desde maquinaria industrial hasta equipamiento de oficina y deportivo. Productos nuevos que buscan su destino final.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link to="/catalogo" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded flex items-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-500/20">
                        Ver Catálogo Completo <ChevronRight size={20} />
                    </Link>
                    <a href="#contacto" className="px-8 py-4 rounded border border-slate-700 text-white hover:bg-white/5 font-medium transition-all">
                        Escribir a Soporte
                    </a>
                </div>
            </motion.div>

            {/* Panel Flotante Animado con Framer Motion */}
            <motion.div variants={fadeUp} className="hidden lg:flex lg:w-1/2 justify-center items-center relative min-h-[600px] w-full">
                {/* Contenedor principal escalado para que no se vea pequeño */}
                <div className="relative w-full h-full max-w-2xl transform scale-110 flex items-center justify-center">
                    {/* Fondo brillante amplio */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    
                    {/* Tarjeta Central: Escudo */}
                    <motion.div 
                        initial={{ y: 0 }}
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bg-slate-800/90 backdrop-blur-md border border-slate-700/50 p-10 rounded-full shadow-[0_0_60px_rgba(245,158,11,0.2)] z-30"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-amber-500 rounded-full blur animate-ping opacity-20"></div>
                            <ShieldCheck className="text-amber-500 w-24 h-24 relative z-10" />
                        </div>
                    </motion.div>

                    {/* Tarjeta Superior Izquierda: Logística */}
                    <motion.div 
                        initial={{ y: 0 }}
                        animate={{ y: [10, -10, 10] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-[10%] left-[5%] bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl shadow-2xl z-20 w-56"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
                                <Truck size={28} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base">Envíos</h4>
                                <p className="text-green-400 text-xs font-mono">Cobertura Nacional</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 flex overflow-hidden">
                            <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                                className="bg-blue-500 h-full relative"
                            >
                                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Tarjeta Superior Derecha: Precios */}
                    <motion.div 
                        initial={{ y: 0 }}
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-[20%] right-[0%] bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl shadow-2xl z-20 w-60"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-amber-500/20 p-3 rounded-lg text-amber-500">
                                <Tag size={28} />
                            </div>
                            <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                                Ofertas
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2.5 w-full bg-slate-700 rounded overflow-hidden">
                                <motion.div 
                                    initial={{ width: "0%" }}
                                    animate={{ width: "60%" }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 1.2 }}
                                    className="bg-amber-500 h-full"
                                ></motion.div>
                            </div>
                            <div className="h-2.5 w-2/3 bg-slate-700 rounded"></div>
                        </div>
                    </motion.div>

                    {/* Tarjeta Inferior Izquierda: Inventario */}
                    <motion.div 
                        initial={{ y: 0 }}
                        animate={{ y: [-8, 12, -8] }}
                        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[15%] left-[0%] bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl shadow-2xl z-20 w-64"
                    >
                        <div className="flex items-center gap-4 mb-5">
                            <div className="bg-green-500/20 p-3 rounded-lg text-green-400">
                                <Package size={28} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider">Categorías</div>
                                <div className="text-white font-bold text-sm">Industrial & Equipos</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="h-10 bg-amber-500 rounded-md"></motion.div>
                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} className="h-10 bg-slate-600 rounded-md"></motion.div>
                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="h-10 bg-blue-500 rounded-md"></motion.div>
                        </div>
                    </motion.div>

                    {/* Tarjeta Inferior Derecha: Estadísticas */}
                    <motion.div 
                        initial={{ y: 0 }}
                        animate={{ y: [12, -8, 12] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        className="absolute bottom-[10%] right-[5%] bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-2xl z-20 w-56"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-slate-400 text-xs uppercase tracking-wider">Estado</div>
                            <ChevronRight size={16} className="text-amber-500" />
                        </div>
                        <div className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                            Disponible
                        </div>
                        <div className="flex gap-1.5">
                            <div className="h-1.5 flex-1 bg-amber-500 rounded flex-grow"></div>
                            <div className="h-1.5 flex-1 bg-amber-500 rounded flex-grow"></div>
                            <div className="h-1.5 flex-1 bg-amber-500 rounded flex-grow"></div>
                            <div className="h-1.5 flex-1 bg-slate-600 rounded flex-grow"></div>
                        </div>
                    </motion.div>

                    {/* Puntos y conexiones decorativas */}
                    <div className="absolute top-[30%] left-[30%] w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
                    <div className="absolute bottom-[30%] right-[30%] w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-[70%] left-[70%] w-3 h-3 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                </div>
            </motion.div>
        </motion.div>
    </header>
);

const FeatureStrip = () => (
    <div className="bg-white border-b border-slate-200 py-8 scroll-mt-24">
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
                    <p className="text-sm text-slate-500">Envíos seguros a todo el territorio con aseguradora.</p>
                </div>
            </div>
        </div>
    </div>
);

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                // Mostrar solo 3 productos como destacados
                setFeaturedProducts(data.slice(0, 3));
            } catch (error) {
                console.error("Error cargando productos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="w-full">
            <Hero />
            <FeatureStrip />

            {/* Sección de Destacados */}
            <section className="container mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-2">Ingresos Destacados</h3>
                        <p className="text-slate-500">Oportunidades únicas agregadas recientemente al inventario.</p>
                    </div>
                    <Link to="/catalogo" className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-1 transition-colors">
                        Ver todo el inventario <ChevronRight size={18} />
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                        <p className="text-slate-500 animate-pulse">Cargando productos...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
                
                {featuredProducts.length === 0 && !loading && (
                    <div className="text-center text-slate-400 py-10">
                        Aún no hay productos destacados.
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
