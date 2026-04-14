"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Tag, ChevronRight, ChevronDown, Package, Star, Quote, HelpCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
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

// --- Animated Counter ---
const AnimatedCounter = ({ target, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// --- Skeleton Card ---
const SkeletonCard = () => (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 flex flex-col h-full animate-pulse">
        <div className="h-64 bg-slate-200"></div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="h-3 w-20 bg-slate-200 rounded mb-3"></div>
            <div className="h-5 w-3/4 bg-slate-200 rounded mb-2"></div>
            <div className="h-3 w-full bg-slate-200 rounded mb-1"></div>
            <div className="h-3 w-2/3 bg-slate-200 rounded mb-4"></div>
            <div className="border-t border-slate-100 pt-4 mt-auto">
                <div className="h-7 w-1/3 bg-slate-200 rounded mb-4"></div>
                <div className="h-11 w-full bg-slate-200 rounded"></div>
            </div>
        </div>
    </div>
);

// --- Hero ---
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
                    <Link href="/catalogo" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded flex items-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-500/20">
                        Ver Catálogo Completo <ChevronRight size={20} />
                    </Link>
                    <a href="#contacto" className="px-8 py-4 rounded border border-slate-700 text-white hover:bg-white/5 font-medium transition-all">
                        Escribir a Soporte
                    </a>
                </div>
            </motion.div>

            {/* Panel Flotante Animado */}
            <motion.div variants={fadeUp} className="hidden lg:flex lg:w-1/2 justify-center items-center relative min-h-[600px] w-full">
                <div className="relative w-full h-full max-w-2xl transform scale-110 flex items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    
                    {/* Escudo Central */}
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

                    {/* Logística */}
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

                    {/* Precios */}
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

                    {/* Inventario */}
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

                    {/* Estadísticas */}
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

                    {/* Decorative dots */}
                    <div className="absolute top-[30%] left-[30%] w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
                    <div className="absolute bottom-[30%] right-[30%] w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-[70%] left-[70%] w-3 h-3 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                </div>
            </motion.div>
        </motion.div>
    </header>
);

// --- Stats Strip (animated counters) ---
const StatsStrip = () => (
    <div className="bg-slate-900 py-10 border-b border-slate-800">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <p className="text-3xl lg:text-4xl font-extrabold text-white">
                    <AnimatedCounter target={70} suffix="%" />
                </p>
                <p className="text-slate-500 text-sm uppercase tracking-wide mt-1">Descuento Máximo</p>
            </div>
            <div>
                <p className="text-3xl lg:text-4xl font-extrabold text-white">
                    <AnimatedCounter target={100} suffix="%" />
                </p>
                <p className="text-slate-500 text-sm uppercase tracking-wide mt-1">Garantía Legal</p>
            </div>
            <div>
                <p className="text-3xl lg:text-4xl font-extrabold text-white">
                    <AnimatedCounter target={500} suffix="+" />
                </p>
                <p className="text-slate-500 text-sm uppercase tracking-wide mt-1">Productos Vendidos</p>
            </div>
            <div>
                <p className="text-3xl lg:text-4xl font-extrabold text-white">
                    <AnimatedCounter target={24} suffix="/7" />
                </p>
                <p className="text-slate-500 text-sm uppercase tracking-wide mt-1">Soporte Online</p>
            </div>
        </div>
    </div>
);

// --- Feature Strip ---
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

// --- Testimonials ---
const testimonials = [
    {
        name: 'Carlos Mendoza',
        role: 'Gerente de Operaciones, Minera del Sur',
        text: 'Adquirimos un lote de equipos pesados a un precio increíble. Todo llegó en excelentes condiciones y con la documentación legal completa. Totalmente recomendado.',
        stars: 5,
    },
    {
        name: 'Patricia Huamán',
        role: 'Administradora, Colegio San Martín',
        text: 'Compramos mobiliario de oficina y equipos de cómputo para nuestro colegio. La calidad superó nuestras expectativas y el ahorro fue significativo respecto al mercado.',
        stars: 5,
    },
    {
        name: 'Roberto Quispe',
        role: 'Propietario, Ferretería El Constructor',
        text: 'La atención por WhatsApp fue rápida y profesional. Me ayudaron a elegir los insumos correctos y el envío llegó antes de lo esperado. Excelente servicio.',
        stars: 4,
    },
];

const TestimonialsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="bg-slate-50 py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">Lo Que Dicen Nuestros Clientes</h3>
                    <p className="text-slate-500 max-w-xl mx-auto">Empresas y emprendedores que ya confían en nuestro inventario.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow relative"
                        >
                            <Quote size={32} className="text-amber-500/20 absolute top-6 right-6" />
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, si) => (
                                    <Star key={si} size={16} className={si < t.stars ? 'text-amber-500 fill-amber-500' : 'text-slate-200'} />
                                ))}
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                                    {t.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                                    <p className="text-xs text-slate-500">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- FAQ ---
const faqs = [
    {
        q: '¿Los productos son nuevos o usados?',
        a: 'Nuestros productos son nuevos. Provienen de remanentes de licitaciones estatales y renovaciones corporativas donde quedaron sin asignar. Todos pasan por un proceso de verificación antes de ser publicados.',
    },
    {
        q: '¿Cómo puedo estar seguro de la procedencia legal?',
        a: 'Cada producto cuenta con trazabilidad legal. Proporcionamos documentación que acredita su origen, incluyendo actas de transferencia y certificados cuando aplica. Operamos bajo el marco legal peruano vigente.',
    },
    {
        q: '¿Realizan envíos a todo el Perú?',
        a: 'Sí, contamos con logística nacional. Para paquetes pequeños y medianos utilizamos servicios de courier. Para maquinaria pesada coordinamos el transporte especializado con nuestros socios logísticos.',
    },
    {
        q: '¿Cuáles son los métodos de pago?',
        a: 'Aceptamos transferencias bancarias, depósitos y pagos contra entrega para pedidos en Lima. Para cotizaciones al por mayor, coordinamos condiciones especiales vía WhatsApp.',
    },
    {
        q: '¿Puedo visitar el almacén antes de comprar?',
        a: 'Sí, previa coordinación por WhatsApp puedes agendar una visita para verificar los productos en persona. Nuestro equipo te asistirá en todo el proceso.',
    },
    {
        q: '¿Tienen política de devoluciones?',
        a: 'Sí, si el producto no corresponde a lo descripto o presenta fallas no declaradas, puedes iniciar una devolución dentro de los 7 días posteriores a la recepción. Contacta a nuestro equipo por WhatsApp para gestionar tu caso.',
    },
];

const FAQItem = ({ faq, isOpen, toggle }) => (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <button
            onClick={toggle}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
        >
            <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
            <ChevronDown size={20} className={`text-amber-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
            <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
        </div>
    </div>
);

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        <HelpCircle size={14} /> Preguntas Frecuentes
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">¿Tienes Dudas?</h3>
                    <p className="text-slate-500">Respuestas a las consultas más comunes de nuestros clientes.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-3"
                >
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            faq={faq}
                            isOpen={openIndex === i}
                            toggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-10"
                >
                    <p className="text-slate-500 text-sm mb-3">¿No encontraste lo que buscabas?</p>
                    <a
                        href="https://wa.me/51933495414?text=Hola%2C%20tengo%20una%20consulta%20sobre%20sus%20productos."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.029.575 2.035.892 3.167.892 3.18 0 5.767-2.587 5.767-5.768.001-3.185-2.585-5.77-5.768-5.77zM12 2C6.48 2 2 6.48 2 12c0 1.93.55 3.72 1.5 5.25L.5 23l5.8-1.42C8.18 22.5 10.02 23 12 23c5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>
                        Pregúntanos por WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

// --- Home Page ---
const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const featuredRef = useRef(null);
    const isInView = useInView(featuredRef, { once: true, amount: 0.1 });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
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
            <StatsStrip />
            <FeatureStrip />

            {/* Productos Destacados */}
            <section ref={featuredRef} className="container mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-2">Ingresos Destacados</h3>
                        <p className="text-slate-500">Oportunidades únicas agregadas recientemente al inventario.</p>
                    </div>
                    <Link href="/catalogo" className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-1 transition-colors">
                        Ver todo el inventario <ChevronRight size={18} />
                    </Link>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
                
                {featuredProducts.length === 0 && !loading && (
                    <div className="text-center text-slate-400 py-10">
                        Aún no hay productos destacados.
                    </div>
                )}
            </section>

            <TestimonialsSection />
            <FAQSection />
        </div>
    );
};

export default Home;
