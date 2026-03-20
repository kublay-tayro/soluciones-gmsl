import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
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
                    <li><Link to="/catalogo?cat=Maquinaria+Pesada" className="hover:text-amber-500 transition-colors">Maquinaria Pesada</Link></li>
                    <li><Link to="/catalogo?cat=Tecnología" className="hover:text-amber-500 transition-colors">Tecnología IT</Link></li>
                    <li><Link to="/catalogo?cat=Mobiliario" className="hover:text-amber-500 transition-colors">Mobiliario de Oficina</Link></li>
                    <li><Link to="/catalogo?cat=Insumos" className="hover:text-amber-500 transition-colors">Insumos y Materiales</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Empresa</h4>
                <ul className="space-y-3 text-sm">
                    <li><Link to="/nosotros" className="hover:text-white transition-colors">Quiénes Somos</Link></li>
                    <li><Link to="/admin/login" className="hover:text-white transition-colors">Portal Administrativo</Link></li>
                    <li><a href="#" className="hover:text-white transition-colors">Política de Devoluciones</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Libro de Reclamaciones</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Contacto Directo</h4>
                <p className="text-sm mb-4">Escríbenos para consultas o cotizaciones al por mayor.</p>
                <a href="https://wa.me/51933495414" target="_blank" rel="noopener noreferrer" className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition-colors text-center flex justify-center items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.029.575 2.035.892 3.167.892 3.18 0 5.767-2.587 5.767-5.768.001-3.185-2.585-5.77-5.768-5.77zM12 2C6.48 2 2 6.48 2 12c0 1.93.55 3.72 1.5 5.25L.5 23l5.8-1.42C8.18 22.5 10.02 23 12 23c5.52 0 10-4.48 10-10S17.52 2 12 2zm.01 18c-1.92 0-3.7-.63-5.22-1.72l-.38-.26-2.91.76.78-2.84-.23-.4C2.5 13.9 1.9 12.1 1.9 10.2c0-5.58 4.54-9.8 9.8-9.8 2.62 0 5.08 1.02 6.94 2.87 1.86 1.85 2.88 4.31 2.88 6.93 0 5.4-4.4 9.8-9.8 9.8z" /></svg>
                    WhatsApp
                </a>
                <p className="text-xs text-slate-500 mt-4 text-center">lun-vie 9am a 6pm</p>
            </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
            &copy; 2026 Soluciones GM&SL. Todos los derechos reservados.
        </div>
    </footer>
);

export default Footer;
