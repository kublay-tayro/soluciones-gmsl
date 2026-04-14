import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Loader2 } from 'lucide-react';
import { createProduct, updateProduct } from '../services/api';

const ProductForm = ({ product, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        original_price: '',
        currency: 'PEN',
        image: '',
        description: '',
        badge: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = [
        "Maquinaria Pesada",
        "Tecnología",
        "Mobiliario",
        "Deportes y Recreación",
        "Insumos"
    ];

    const badges = [
        "",
        "Oportunidad Única",
        "Liquidación",
        "Alto Valor",
        "Stock Limitado",
        "Pack Mayorista",
        "Tecnología"
    ];

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                category: product.category || '',
                price: product.price?.toString() || '',
                original_price: product.original_price?.toString() || '',
                currency: product.currency || 'PEN',
                image: product.image || '',
                description: product.description || '',
                badge: product.badge || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validaciones básicas
        if (!formData.name || !formData.category || !formData.price || !formData.image) {
            setError('Por favor completa los campos obligatorios');
            setLoading(false);
            return;
        }

        const productData = {
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            original_price: formData.original_price ? parseFloat(formData.original_price) : null,
            currency: formData.currency,
            image: formData.image,
            description: formData.description || null,
            badge: formData.badge || null
        };

        try {
            if (product) {
                await updateProduct(product.id, productData);
            } else {
                await createProduct(productData);
            }
            onSuccess();
        } catch (err) {
            console.error('Error saving product:', err);
            setError('Error al guardar el producto. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl my-8">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">
                        {product ? 'Editar Producto' : 'Nuevo Producto'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nombre del Producto *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Ej: Generador Industrial CAT 500kVA"
                        />
                    </div>

                    {/* Categoría y Badge */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Categoría *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                            >
                                <option value="">Seleccionar categoría</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Etiqueta (Badge)
                            </label>
                            <select
                                name="badge"
                                value={formData.badge}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                            >
                                <option value="">Sin etiqueta</option>
                                {badges.filter(b => b).map(badge => (
                                    <option key={badge} value={badge}>{badge}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Precios */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Moneda *
                            </label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                            >
                                <option value="PEN">Soles (PEN)</option>
                                <option value="USD">Dólares (USD)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Precio Venta *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Precio Original
                            </label>
                            <input
                                type="number"
                                name="original_price"
                                value={formData.original_price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="0.00 (opcional, para mostrar descuento)"
                            />
                        </div>
                    </div>

                    {/* URL de Imagen */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            URL de la Imagen *
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                        {formData.image && (
                            <div className="mt-3">
                                <img
                                    src={formData.image}
                                    alt="Vista previa"
                                    className="w-32 h-32 object-cover rounded-lg border border-slate-200"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                            placeholder="Descripción detallada del producto..."
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    {product ? 'Guardar Cambios' : 'Crear Producto'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
