import React, { Suspense } from 'react';
import { getProductById } from '@/services/api';
import ProductDetailView from '@/components/ProductDetailView';

export async function generateMetadata({ params }) {
    const { id } = await params;
    
    try {
        const product = await getProductById(id);
        
        if (!product) {
            return { title: 'Producto No Encontrado | Soluciones GM&SL' };
        }

        const currencySymbol = product.currency === 'USD' ? 'USD' : 'S/';
        
        return {
            title: `${product.name} | Soluciones GM&SL`,
            description: `${product.description?.slice(0, 150)}... ${currencySymbol} ${product.price?.toLocaleString()}`,
            openGraph: {
                title: `${product.name} - ${currencySymbol} ${product.price?.toLocaleString()}`,
                description: product.description,
                images: [
                    {
                        url: product.image,
                        width: 800,
                        height: 600,
                        alt: product.name,
                    },
                ],
                type: 'website',
            },
        };
    } catch (error) {
        return { title: 'Producto | Soluciones GM&SL' };
    }
}

export default async function ProductPage({ params }) {
    const { id } = await params;
    let product = null;

    try {
        product = await getProductById(id);
    } catch (error) {
        console.error("Error cargando producto en servidor", error);
    }

    return (
        <ProductDetailView product={product} />
    );
}
