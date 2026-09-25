# Arde

Landing page y tienda en línea de **Arde**, un sexshop: juguetes, lencería, aceites, velas de masaje y accesorios para disfrutar la intimidad sin prejuicios.

Construido con [Next.js](https://nextjs.org/) (App Router + export estático), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [GSAP](https://gsap.com/), [framer-motion](https://motion.dev/) y [Animate.css](https://animatecss.readthedocs.io/).

## Secciones

- **Inicio (Hero):** título con logo y palabra rotativa (Deseo · Placer · Fuego · Juego · Piel · Noche), reseñas flotantes, indicador de scroll y botones de acción.
- **Productos:** lista de productos destacados con precio y presentación, imagen de fondo al pasar el mouse y botón "Ver más / Ver menos".
- **Testimonios:** testimonios de clientes en formato paginado (PagedTestimonials).
- **Tienda:** grilla de productos con tarjetas, modal de detalle y botón de agregar a la bolsa.
- **Nosotros:** descripción de la marca con grilla de imágenes recortada (diced grid) en desktop.
- **Preguntas frecuentes:** acordeón con envíos, pagos y privacidad.
- **Footer:** navegación, redes sociales y contacto.

## Funcionalidades

### Productos (catálogo unificado)
- Un solo catálogo vive en `src/lib/products.ts` y alimenta tanto la sección **Productos** como la **Tienda**. Para editar nombre, descripción, categoría, precio, presentación o imagen, se edita ahí.

### Bolsa (checkout por WhatsApp / correo)
- Carrito persistente en `localStorage` (clave `arde-cart`).
- La bolsa permite ajustar cantidades, ver el total y generar un mensaje de pedido pre-armado.
- El pedido se envía por **WhatsApp**, por **correo** o se copia manualmente. No hay pasarela de pago: la compra se coordina por mensaje (transferencia u otro método acordado).
- Un botón flotante con el contador aparece cuando hay artículos en la bolsa.

### Contacto
- Modal de contacto con canales de atención: Instagram (`@arde.shop_co`), correo, WhatsApp y Telegram.

## Notas técnicas

### General
- El ancho máximo del contenido se interpola según `window.innerHeight`:
  - `1448px` si la altura es ≥ `912px`.
  - `1306px` si la altura es ≤ `800px`.
  - Valores intermedios se interpolan linealmente.

### Navbar
- El centro de navegación con *limelight* (indicador de pestaña activa) se oculta si `window.innerWidth` está por debajo del umbral definido en `Limelight.tsx`. Es específico por idioma; en la versión actual (español) el umbral por defecto es `768px`.

### Hero
- Dos versiones: desktop y tablet/móvil (`MobileHeroSection`).
- En desktop las reseñas flotantes se posicionan alrededor de la imagen; una de ellas se oculta por debajo de `1600px` de ancho.
- Título con palabra rotativa mediante el componente `TextSwap` (estilo morphing).

### Sección Productos
- Móvil: lista todos los productos destacados verticalmente.
- Desktop: muestra entre 4 y 6 según `window.innerHeight`:
  - `≥ 1048px` → 6 productos.
  - `≥ 924px` → 5 productos.
  - En caso contrario → 4 productos.
- "Ver más / Ver menos" alterna la lista con animaciones de Animate.css.
- Imagen de fondo detrás de la lista que aparece (escala y opacidad con GSAP) al pasar el mouse sobre un producto.
- El botón "Ver más" cambia su estilo al pasar el mouse sobre cualquier fila.
- Al hacer clic en un producto, la página hace scroll hasta la Tienda y abre su modal de detalle.

### Tienda
- Grilla de 3 columnas en desktop; en móvil 1 columna bajo `694px` de ancho y 2 a partir de ahí.
- Tarjetas con etiquetas de categoría y presentación, precio, precio anterior (si aplica) y botón de agregar a la bolsa.
- Modal de detalle con descripción, etiquetas, precio y agregado a la bolsa.

### Nosotros
- Desktop: grilla de imágenes recortada (máscaras CSS con radio invertido).
- Móvil: las imágenes se reemplazan por una vista simplificada según el ancho.

### FAQ
- Acordeón con chevrón animado.

### Footer
- Logotipo con ícono de llama que se anima al pasar el mouse.
- El color del acento se deriva de la variable `--accent` definida en CSS.

### Idioma
- El sitio se distribuye en español. Existe infraestructura heredada de i18n (parámetro `?lang=`, selector de idioma) y componentes de un template anterior (BookingModal, Calendar, LanguageSelector, etc.) que permanecen en el repositorio pero no se usan en la página actual.

## Tema visual

Tema oscuro manejado por variables CSS en `src/app/globals.css`:

| Variable | Valor |
| --- | --- |
| `--background` | `#000` |
| `--foreground` | `#fafafa` |
| `--middle-foreground` | `#e1e1e1` |
| `--sub-foreground` | `#aaa` |
| `--accent` | `#FF2D2D` |

## Cómo ejecutar

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm run build    # build con export estático en /out
```

El proyecto usa `output: 'export'`, por lo que `next build` genera un sitio 100 % estático en `out/` que puede servirse con cualquier servidor estático.

### Rutas de assets y basePath: raíz vs. GitHub Pages

El build de exportación es **estático**: el prefijo de las rutas (basePath) se graba en `out/` **al compilar** y no se decide en el navegador. Por esto, un mismo `out/` sirve para **un solo destino**. El prefijo lo controla la variable `NEXT_PUBLIC_BASE_PATH`:

- **Sin la variable (default) → build para la raíz.** Sirve para desarrollo local y para cualquier hosting (Netlify, Vercel, cPanel, nginx, etc.): las imágenes y enlaces se generan como `/images/...` y el contenido de `out/` se sube tal cual a la raíz del sitio.
- **Con `NEXT_PUBLIC_BASE_PATH=/Arde` → build para GitHub Pages** (sitio de proyecto en `<usuario>.github.io/Arde/`): las rutas se generan prefijadas como `/Arde/images/...`.

GitHub Pages es el único destino que necesita el prefijo, y por eso es el único que lo configura de forma visible en `.github/workflows/deploy.yml` (paso "Build Next.js"). No hace falta ningún archivo `.env` en local.

Comandos útiles:

```bash
npm run dev                        # local en http://localhost:3000/ (raíz)
npm run build                      # out/ para la raíz (local u otro hosting)
NEXT_PUBLIC_BASE_PATH=/Arde npm run build   # out/ para GitHub Pages
```

Todas las URLs de imágenes del sitio pasan por la función `asset()` de `src/lib/assets.ts`, que antepone `NEXT_PUBLIC_BASE_PATH` a las rutas locales (ignora URLs externas y datos `data:`). Si agregas una imagen nueva, usa `asset("/ruta/al/asset")` como `src` para que funcione en ambos destinos.

## Créditos

El proyecto hereda componentes y diseño de las siguientes fuentes:

- [Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) by [Aceternity UI](https://ui.aceternity.com/)
- [Limelight Nav](https://21st.dev/easemize/limelight-nav/default) by [EaseMize UI](https://21st.dev/easemize)
- [Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)
- [Wheel Picker](https://21st.dev/ncdai/wheel-picker/default) by [Chánh Đại](https://21st.dev/ncdai)
- [React Wheel Picker](https://www.npmjs.com/package/@ncdai/react-wheel-picker) by [Chánh Đại](https://github.com/ncdai)
- [すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)
- [Text Rotate](https://www.fancycomponents.dev/docs/components/text/text-rotate) by [Fancy Components](https://www.fancycomponents.dev/)
- [GSAP (GreenSock Animation Platform)](https://www.npmjs.com/package/gsap)
- [framer-motion](https://www.npmjs.com/package/framer-motion)
- [motion](https://www.npmjs.com/package/motion)
- [AnimateIcons](https://animateicons.vercel.app/)
- [Hero Section 6](https://21st.dev/meschacirung/hero-section-6/default) by [Tailark](https://21st.dev/tailark)
- [Modern Hero Section](https://21st.dev/ravikatiyar162/modern-hero-section/default) by [Ravi Katiyar](https://21st.dev/ravikatiyar)
- [Travel section #tailwind #slick.js](https://codepen.io/kristen17/pen/bGxEqqj) by [Kristen](https://codepen.io/kristen17)
- [Scroll Down Icon Animation](https://codepen.io/TKS31/pen/gOaKaxx) by [Tsukasa Aoki](https://codepen.io/TKS31)
- [i18next](https://www.npmjs.com/package/i18next)
- [Lucide React](https://www.npmjs.com/package/lucide-react)
- [tabler-icons-react](https://www.npmjs.com/package/tabler-icons-react)
- [Gooey Text Morphing](https://21st.dev/victorwelander/gooey-text-morphing/default) by [Victor Welander](https://21st.dev/victorwelander)
- [Morphing Text](https://21st.dev/dillionverma/morphing-text/default) by [Magic UI](https://21st.dev/magicui)
- [[gsap/component] ❍ Interactive Table with Image Hover & Idle Animation](https://codepen.io/filipz/pen/EaVNXmb) by [Filip Zrnzevic](https://codepen.io/filipz)
- [Text scroll and hover effect with GSAP and clip](https://codepen.io/Juxtopposed/pen/mdQaNbG) by [Juxtopposed](https://codepen.io/Juxtopposed)
- [Animate.css](https://github.com/animate-css/animate.css)
- [Animated Testimonials](https://ui.aceternity.com/components/animated-testimonials) by [Aceternity UI](https://ui.aceternity.com/)
- [Text Reveal Animation](https://codepen.io/swatiparge/pen/LYVMEag) by [Swati Parge](https://codepen.io/swatiparge)
- [Bento Grid](https://ui.aceternity.com/components/bento-grid) by [Aceternity UI](https://ui.aceternity.com/)
- [Lens](https://ui.aceternity.com/components/lens) by [Aceternity UI](https://ui.aceternity.com/)
- [Profile Card Testimonial Carousel](https://21st.dev/arunachalam0606/profile-card-testimonial-carousel/default) by [Arunachalam](https://21st.dev/arunachalam0606)
- [Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox/default) by [Edil Ozi](https://21st.dev/Edil-ozi)
- [チェックしないと押せないボタン](https://codepen.io/ash_creator/pen/JjZReNm) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)
- [Coach Scheduling Card](https://21st.dev/isaiahbjork/coach-scheduling-card/default) by [Isaiah](https://21st.dev/isaiahbjork)
- [Calendar](https://21st.dev/designali-in/calendar/default) by [Ali Imam](https://21st.dev/dalim)
- [react-swipeable](https://www.npmjs.com/package/react-swipeable)
- [Cards with inverted border-radius #scss](https://codepen.io/kristen17/pen/pomgrKp) by [Kristen](https://codepen.io/kristen17)
- [Input Floating Label animation](https://codepen.io/Mahe76/pen/qBQgXyK) by [Elpeeda](https://codepen.io/Mahe76)
- [Success Check Animation Pure CSS](https://codepen.io/istiaktridip/pen/BZqaOd) by [Istiak Tridip](https://codepen.io/istiaktridip)
- [Inverted border-radius using CSS mask II](https://codepen.io/t_afif/pen/LEPBYvK) by [Temani Afif](https://codepen.io/t_afif)
- [Accordion](https://21st.dev/molecule-lab-rushil/accordion/default) by [Molecule UI](https://21st.dev/molecule-ui)
- [JTB studios - Link](https://codepen.io/zzznicob/pen/GRPgKLM) by [Nico](https://codepen.io/zzznicob)
- [Hover Link Animation](https://21st.dev/erikvalencia1/hover-link-animation/default) by [Ruben](https://21st.dev/rubenerik)
- [Multi Colored Text with CSS](https://codepen.io/TajShireen/pen/YzZmbep) by [Shireen Taj](https://codepen.io/TajShireen)
- [vue-color-wheel](https://vue-color-wheel.vercel.app/) by [Robert Shaw](https://github.com/xiaoluoboding)
- [404 galaxy not found](https://codepen.io/remid/pen/YOVawm) by [Rémi Denimal](https://codepen.io/remid)

Fotografías de [Unsplash](https://unsplash.com/) y [Pexels](https://www.pexels.com/) usadas como imágenes de demostración.