import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Edit2, Trash2, LogOut, Search, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getProducts, deleteProduct } from '../services/api';
import ProductForm from '../components/ProductForm';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error al eliminar el producto');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    const handleFormSuccess = () => {
        fetchProducts();
        handleFormClose();
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <header className="bg-slate-900 shadow-lg">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-500 p-1.5 rounded">
                            <Package className="text-slate-900" size={24} />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-lg">
                                SOLUCIONES <span className="text-amber-500">GM&SL</span>
                            </h1>
                            <span className="text-slate-400 text-xs">Panel de Administración</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-slate-400 text-sm hidden md:block">
                            {user?.email}
                        </span>
                        <Link
                            to="/"
                            className="text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            Ver Tienda
                        </Link>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                            <LogOut size={18} />
                            <span className="hidden md:inline">Salir</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <p className="text-slate-500 text-sm">Total Productos</p>
                        <p className="text-3xl font-bold text-slate-900">{products.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <p className="text-slate-500 text-sm">Categorías Activas</p>
                        <p className="text-3xl font-bold text-slate-900">
                            {new Set(products.map(p => p.category)).size}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <p className="text-slate-500 text-sm">Valor Total Inventario</p>
                        <p className="text-3xl font-bold text-slate-900">
                            ${products.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Products Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-900">Gestión de Productos</h2>

                        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar producto..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full md:w-64"
                                />
                            </div>
                            <button
                                onClick={fetchProducts}
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <RefreshCw size={18} />
                                <span className="md:hidden">Actualizar</span>
                            </button>
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium px-4 py-2 rounded-lg transition-colors"
                            >
                                <Plus size={18} />
                                Nuevo Producto
                            </button>
                        </div>
                    </div>

                    {/* Products Table */}
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mx-auto mb-4"></div>
                            <p className="text-slate-500">Cargando productos...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="p-12 text-center">
                            <Package className="mx-auto text-slate-300 mb-4" size={48} />
                            <p className="text-slate-500">
                                {searchTerm ? 'No se encontraron productos' : 'No hay productos aún'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-slate-600 font-semibold text-sm">Producto</th>
                                        <th className="text-left py-4 px-6 text-slate-600 font-semibold text-sm">Categoría</th>
                                        <th className="text-left py-4 px-6 text-slate-600 font-semibold text-sm">Precio</th>
                                        <th className="text-left py-4 px-6 text-slate-600 font-semibold text-sm">Badge</th>
                                        <th className="text-right py-4 px-6 text-slate-600 font-semibold text-sm">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredProducts.map(product => (
                                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-slate-900 line-clamp-1">{product.name}</p>
                                                        <p className="text-slate-500 text-xs line-clamp-1">{product.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-slate-600 text-sm">{product.category}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <p className="font-semibold text-slate-900">${product.price?.toLocaleString()}</p>
                                                    {product.original_price && (
                                                        <p className="text-slate-400 text-xs line-through">
                                                            ${product.original_price?.toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {product.badge && (
                                                    <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded">
                                                        {product.badge}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Editar"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirm(product.id)}
                                                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Product Form Modal */}
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onClose={handleFormClose}
                    onSuccess={handleFormSuccess}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">¿Eliminar producto?</h3>
                        <p className="text-slate-500 mb-6">
                            Esta acción no se puede deshacer. El producto será eliminado permanentemente.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
