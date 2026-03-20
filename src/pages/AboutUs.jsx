import React from 'react';
import { ShieldCheck, Target, Users, CheckCircle } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Quiénes Somos</h1>
                    <p className="text-lg text-slate-600">Conectando la eficiencia corporativa con el verdadero valor de mercado.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-12">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Target className="text-amber-500" /> Nuestra Misión
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                        En Soluciones GM&SL, nos especializamos en la comercialización y gestión inteligente de activos remanentes provenientes de licitaciones estatales y renovaciones corporativas. Nuestro objetivo principal es reintegrar al mercado maquinaria, equipamiento tecnológico y mobiliario de alta calidad, garantizando un ecosistema de precios justos, accesibles y con transparencia total en cada transacción comercial.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Users className="text-amber-500" /> Nuestra Visión
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        Buscamos consolidarnos a nivel nacional como el principal outlet industrial y corporativo confiable, destacando rigurosamente por nuestra seriedad comercial, el rotundo respaldo legal de nuestras operaciones y un servicio logístico de primer nivel que impulse a la pequeña, mediana y gran empresa a expandirse sin comprometer drásticamente su flujo de caja o inversiones críticas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 text-white p-8 rounded-2xl">
                        <ShieldCheck className="text-amber-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-3">Marco Legal Intachable</h3>
                        <p className="text-slate-400 text-sm">
                            Todos nuestros grandes equipos cuentan con trazabilidad legal absoluta comprobable y provienen directamente de excedentes operativos formalmente declarados o liquidaciones aprobadas.
                        </p>
                    </div>
                    <div className="bg-slate-900 text-white p-8 rounded-2xl">
                        <CheckCircle className="text-amber-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-3">Garantía de Valor</h3>
                        <p className="text-slate-400 text-sm">
                            Realizamos recuentos y testeos aleatorios antes de la publicación de cada lote para asegurar siempre que nuestros clientes adquieran precisamente lo prometido, en excelentes condiciones operativas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
