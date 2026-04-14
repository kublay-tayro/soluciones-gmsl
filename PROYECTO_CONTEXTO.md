# Soluciones GM&SL — Contexto del Proyecto (Next.js Version)

## Descripción General
Tienda/outlet online para **Soluciones GM&SL**, empresa que comercializa activos remanentes de licitaciones estatales y corporativas (maquinaria pesada, tecnología, mobiliario, deportes, insumos).  
Esta plataforma fue migrada exitosamente desde Vite/React hacia **Next.js 15 (App Router)** para garantizar SEO dinámico de alta calidad mediante Server Side Rendering (SSR).

**Dominio:** soluciones-gmsl.com  
**Deploy:** Listo para Vercel o Node.js Hosting

---

## Stack Tecnológico Actualizado

| Capa | Tecnología |
|------|-----------|
| Framework | **Next.js 15 (App Router)** |
| Rendering | Server Side Rendering (SSR) dinámico |
| Estilos | Tailwind CSS 4 |
| Animaciones | Framer Motion |
| Routing | \`next/navigation\` & \`next/link\` |
| Backend/DB | Supabase (productos + auth) |
| Iconos | Lucide React |
| Multi-moneda | S/ (PEN) y $ (USD) soportados nativamente |

---

## Estructura de Archivos (App Router)

\`\`\`text
soluciones-gmsl-next/
├── src/
│   ├── app/
│   │   ├── layout.jsx            ← Root Layout (Navbar, Footer, Providers, SEO Global)
│   │   ├── page.jsx              ← Landing con SSR (Hero, Destacados)
│   │   ├── globals.css           ← Tailwind CSS Configuration
│   │   ├── catalogo/
│   │   │   └── page.jsx          ← Catálogo Server Component
│   │   ├── nosotros/
│   │   │   └── page.jsx          ← Quiénes Somos
│   │   ├── producto/[id]/
│   │   │   └── page.jsx          ← Ruta SSR Dinámica con OpenGraph / Meta SEO
│   │   └── admin/
│   │       ├── dashboard/page.jsx ← Panel CRUD Admin protegido
│   │       └── login/page.jsx     ← Login de Supabase
│   ├── components/
│   │   ├── ProductDetailView.jsx ← UI Interactiva del producto (Client Comp)
│   │   ├── Navbar.jsx, Footer.jsx
│   │   ├── CartDrawer.jsx, Toast.jsx
│   │   ├── ProductCard.jsx, ProductForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx       ← Manejo de Sesión Admin 
│   │   └── CartContext.jsx       ← Global Cart Management
│   ├── services/
│   │   ├── api.js                ← Consultas de DB
│   │   └── auth.js               ← Lógica de Auth
│   └── supabaseClient.js         ← Instancia de Supabase segura para SSR
├── .env.local                    ← Variables NEXT_PUBLIC_SUPABASE_*
└── next.config.mjs               ← Configuración Turbopack / SSR
\`\`\`

---

## Logros Alcanzados en Migración (Finalizados ✅)

- [x] **SSG / SSR Next.js:** El app entera pre-renderiza para un **SEO de categoría mundial**.
- [x] **Metadatos Dinámicos / Previstos de WhatsApp (Open Graph):** Cuando envías en WhatsApp la URL de un producto, automáticamente se jala el título, descripción e imagen a través de \`generateMetadata\` en Next.
- [x] **Multi-Moneda Dinámico (PEN/USD):** Las bases de datos, tarjetas de producto, panel administrativo y Checkout en WhatsApp ahora aceptan divisa como \`currency\`. Todo se mantiene congruente.
- [x] **Rescate de estilos Vite a App Router Globales:** Se restauró todo el frontend sin pérdida estética (Hero animado con Blur, Skeletons, Navbar colapsable).
- [x] **Aislamiento Seguro SSR de Supabase:** Se resolvieron los bugs de hidratación (falla común del parser al compilar \`next/link\`).

---

## Integraciones y Variables Configurados

- La moneda tiene **PEN (Soles)** como valor principal por defecto y USD seleccionable.
- Redes sociales agregadas al Footer con Hover y Layout Flex final.
- **WhatsApp Checkout:** \`51933495414\` integrado a todos los cálculos dinámicos de divisa múltiple.

Este proyecto se encuentra consolidado y funcional en entorno SSR. 🚀
