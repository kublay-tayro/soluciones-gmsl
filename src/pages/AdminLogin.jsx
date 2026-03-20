import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Lock, Mail, AlertCircle } from 'lucide-react';
import { signIn } from '../services/auth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            navigate('/admin');
        } catch (err) {
            setError('Credenciales incorrectas. Verifica tu email y contraseña.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="bg-amber-500 p-2 rounded">
                            <Package className="text-slate-900" size={28} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                        SOLUCIONES <span className="text-amber-500">GM&SL</span>
                    </h1>
                    <p className="text-slate-400 mt-2">Panel de Administración</p>
                </div>

                {/* Form Card */}
                <div className="bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700">
                    <div className="flex items-center gap-2 mb-6">
                        <Lock className="text-amber-500" size={20} />
                        <h2 className="text-lg font-semibold text-white">Iniciar Sesión</h2>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                            <AlertCircle size={18} />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-700 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                                    placeholder="admin@ejemplo.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-700 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                                    Verificando...
                                </>
                            ) : (
                                'Ingresar al Panel'
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-slate-500 text-sm mt-6">
                    <a href="/" className="hover:text-amber-500 transition-colors">
                        ← Volver a la tienda
                    </a>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
