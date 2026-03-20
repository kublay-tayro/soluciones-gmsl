import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Box } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Sincronizar categoría elegida desde la URL (para links desde Footer/Home)
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('cat') || "Todos";

    const categories = ["Todos", "Maquinaria Pesada", "Tecnología", "Mobiliario", "Deportes y Recreación", "Insumos"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error cargando productos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCategoryChange = (cat) => {
        if (cat === "Todos") {
            searchParams.delete('cat');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ cat });
        }
    };

    const filteredProducts = products.filter(p => {
        const matchCategory = activeCategory === "Todos" || p.category === activeCategory;
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            <div className="container mx-auto px-6">
                
                {/* Header Catálogo y Buscador */}
                <div className="bg-slate-900 rounded-2xl p-8 mb-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <Box className="text-amber-500" /> Catálogo Completo
                        </h1>
                        <p className="text-slate-400">Encuentra equipos, tecnología y maquinaria al mejor precio.</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Buscar en la tienda..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        />
                    </div>
                </div>

                {/* Filtros laterales y Cuadrícula principal */}
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-28">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Filter size={18} /> Categorías
                            </h3>
                            <div className="flex flex-col gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            activeCategory === cat
                                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <main className="flex-grow">
                        {loading ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mx-auto mb-4"></div>
                                <p className="text-slate-500">Cargando inventario actual...</p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                                <Box className="mx-auto text-slate-300 mb-4" size={48} />
                                <p className="text-slate-600 font-medium mb-1">No se encontraron productos</p>
                                <p className="text-slate-400 text-sm">Prueba buscar con otras palabras o selecciona "Todos" en categorías.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
