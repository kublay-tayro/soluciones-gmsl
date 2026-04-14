import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Soluciones GM&SL | Outlet de Contrataciones',
  description: 'Adquiera activos corporativos y maquinaria pesada de remanentes de licitaciones. Precios de liquidación directos.',
  openGraph: {
    title: 'Soluciones GM&SL | Outlet de Contrataciones',
    description: 'Adquiera activos corporativos y maquinaria pesada de remanentes de licitaciones. Precios de liquidación directos.',
    type: 'website',
    locale: 'es_PE',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <Toast />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
