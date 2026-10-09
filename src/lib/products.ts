// Catálogo único de productos. Edita aquí nombre, descripción,
// categoría, valor (precio), tamaño/peso (volume), imagen, etc.
// Tanto la sección de Productos como la Tienda se alimentan de este archivo.

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  volume: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  featured: boolean;
}

export const PRODUCTS: Product[] = [
   {
    "id": "dados-eroticos-fluorescentes-set-x-2",
    "name": "Dados Eróticos Fluorescentes (Set x 2)",
    "description": "El Set de Dados Eróticos Fluorescentes (Set x 2) está diseñado para añadir espontaneidad, dinamismo y un toque pícaro a tus encuentros en pareja, perfecto para jugar a la luz de las velas o en la penumbra.\n\nEste par de dados combina en una sola jugada una acción erótica (como besar, chupar, \"Tú decides\", etc.) con una zona del cuerpo (como senos, pene, entre otras), creando múltiples combinaciones tentadoras para salir de la rutina, romper el hielo e iniciar el juego previo de forma muy divertida.",
    "category": "Juegos",
    "volume": "1 Set",
    "price": 7000,
    "imageUrl": "/images/products/dadosx2.webp",
    "featured": false
  },
  {
    "id": "anillo-vibrador-bola-anal",
    "name": "Anillo Vibrador Bola Anal",
    "description": "El Anillo Vibrador Bola Anal es un accesorio de estimulación avanzada diseñado para ofrecer una experiencia multi-sensorial y de placer compartido en pareja.\n\nSu estructura de tono fucsia translúcido incorpora un cuerpo completamente texturizado con relieves de puntos, un potente motor vibratorio y una extensión anal con cuenta de bola destinada a la estimulación perineal o anal durante la intimidad.",
    "category": "Juguetes",
    "volume": "1 unidad",
    "price": 10000,
    "imageUrl": "/images/products/anillovibrador.webp",
    "featured": false
  },
  {
    "id": "dados-eroticos-fluorescentes-set-x-3",
    "name": "Dados Eróticos Fluorescentes (Set x 3)",
    "description": "El Set de Dados Eróticos Fluorescentes (Set x 3) está diseñado para añadir espontaneidad, emoción y un toque místico a tus encuentros en pareja, incluso en la penumbra o la oscuridad total.\n\nCada uno de los 3 dados cumple una función específica dentro de la dinámica del juego (Acción, Zona del Cuerpo y Posición/Lugar), creando infinitas combinaciones tentadoras para salir de la rutina, romper el hielo y guiarse por el azar en la intimidad.",
    "category": "Juegos",
    "volume": "1 Set",
    "price": 10000,
    "imageUrl": "/images/products/dadosx3.webp",
    "featured": false
  },
  {
    "id": "lubricante-intimo-pocket-pleasure-cereza-con-dados-del-amor",
    "name": "Lubricante Íntimo Pocket Pleasure - Cereza (con Dados del Amor)",
    "description": "El Lubricante Íntimo Pocket Pleasure (20 ml) - Sabor Cereza (con Dados del Amor) está diseñado para transformar tus encuentros íntimos en una experiencia sensorial única, divertida y altamente estimulante.\n\nEste kit combina la dulzura e intensidad del sabor a cereza con un juego de dados eróticos para salir de la rutina, potenciando la sensibilidad al máximo y encendiendo la chispa en tus momentos de placer en pareja.\n\nBase acuosa.",
    "category": "Lubricantes",
    "volume": "20 ml",
    "price": 20000,
    "imageUrl": "/images/products/combolubricantedado_cereza.webp",
    "featured": false
  },
  {
    "id": "lubricante-intimo-pocket-pleasure-fresa-con-dados-del-amor",
    "name": "Lubricante Íntimo Pocket Pleasure - Fresa (con Dados del Amor)",
    "description": "El Lubricante Íntimo Pocket Pleasure (20 ml) - Sabor Fresa (con Dados del Amor) está diseñado para transformar tus encuentros íntimos en una experiencia sensorial única, divertida y altamente estimulante.\n\nEste kit combina la dulzura e intensidad del sabor a fresa con un juego de dados eróticos para salir de la rutina, potenciando la sensibilidad al máximo y encendiendo la chispa en tus momentos de placer en pareja.\n\nBase acuosa.",
    "category": "Lubricantes",
    "volume": "20 ml",
    "price": 20000,
    "imageUrl": "/images/products/combolubricantedado_fresa.webp",
    "featured": false
  },
  {
    "id": "pirinola-erotica-edicion-poses-lugares",
    "name": "Pirinola Erótica (Edición Poses / Lugares)",
    "description": "La Pirinola Erótica (Edición Poses / Lugares) está diseñada para inyectar aventura, espontaneidad y un toque pícaro a las noches en pareja, convirtiendo el azar en una guía para explorar nuevos lugares e ideas en la intimidad.\n\nEsta pirinola giratoria de gran tamaño combina en sus caras pictogramas ilustrados de distintas posiciones eróticas (como el 69, entre otras) con lugares estratégicos de la casa (como Sofá, Comedor, Sala), ofreciendo una dinámica directa, emocionante y sin complicaciones para romper la rutina.",
    "category": "Juegos",
    "volume": "1 unidad",
    "price": 7000,
    "imageUrl": "/images/products/pirinola.webp",
    "featured": false
  },
  {
    "id": "esposas-metalicas-clasicas",
    "name": "Esposas Metálicas Clásicas",
    "description": "Las Esposas Metálicas Clásicas son un accesorio tradicional de inmovilización diseñado para juegos de rol, fantasías de autoridad y dinámicas de control firme con un toque realista.",
    "category": "Juguetes",
    "volume": "1 unidad",
    "price": 15000,
    "imageUrl": "/images/products/esposasmetalicas.webp",
    "featured": false
  },
  {
    "id": "huevo-masturbador-funny-egg-boca",
    "name": "Huevo Masturbador Funny Egg (Boca)",
    "description": "El Huevo Masturbador Funny Egg es un estimulante compacto de bolsillo diseñado para ofrecer una experiencia de placer intensa, portátil y sumamente discreta.",
    "category": "Masturbadores",
    "volume": "1 unidad",
    "price": 18000,
    "imageUrl": "/images/products/huevofunny_1.webp",
    "featured": false
  },
  {
    "id": "huevo-masturbador-funny-egg-vagina",
    "name": "Huevo Masturbador Funny Egg (Vagina)",
    "description": "El Huevo Masturbador Funny Egg es un estimulante compacto de bolsillo diseñado para ofrecer una experiencia de placer intensa, portátil y sumamente discreta.",
    "category": "Masturbadores",
    "volume": "1 unidad",
    "price": 18000,
    "imageUrl": "/images/products/huevofunny.webp",
    "featured": false
  },
  {
    "id": "kit-fetish-10-pzs-rojo",
    "name": "Kit Fetish 10 pzs Rojo",
    "description": "El Kit de Bondage BDSM x 10 Piezas (Color Rojo) está diseñado para explorar el juego de dominación, sumisión y estimulación sensorial en pareja con un toque apasionado, vibrante y seductor.\n\nEste set combina accesorios acolchados con suave felpa roja, herramientas de restricción sensorial y elementos de sujeción para experimentar el control, la entrega y sensaciones intensas con total comodidad y seguridad.",
    "category": "BDSM",
    "volume": "1 Kit (10pzs)",
    "price": 85000,
    "imageUrl": "/images/products/kitfetish10_rojo.webp",
    "featured": false
  },
  {
    "id": "kit-fetish-10-pzs-negro",
    "name": "Kit Fetish 10 pzs Negro",
    "description": "El Kit de Bondage BDSM x 10 Piezas (Color Negro) está diseñado para explorar el juego de dominación, sumisión y estimulación sensorial en pareja con un toque apasionado, vibrante y seductor.\n\nEste set combina accesorios acolchados con suave felpa negra, herramientas de restricción sensorial y elementos de sujeción para experimentar el control, la entrega y sensaciones intensas con total comodidad y seguridad.",
    "category": "BDSM",
    "volume": "1 Kit (10pzs)",
    "price": 85000,
    "imageUrl": "/images/products/kitfetish10_negro.webp",
    "featured": false
  },
  {
    "id": "condones-prudence-chocolate-caja-x3",
    "name": "Condones Prudence Chocolate (Caja x3)",
    "description": "Los Preservativos Prudence Sabor y Color Chocolate (Caja x 3 unidades) están diseñados para añadir un toque dulce, tentador e irresistible a tus encuentros íntimos, manteniendo siempre los más altos estándares de protección y seguridad.\n\nElaborados con látex natural de alta calidad y probados 100% electrónicamente, estos condones combinan un llamativo color marrón con un exquisito aroma y sabor a chocolate, ideal para despertar los sentidos durante el juego previo y la intimidad.",
    "category": "Condones",
    "volume": "1 Caja",
    "price": 12000,
    "imageUrl": "/images/products/condonesprudence_chocolate.webp",
    "featured": false
  },
  {
    "id": "condones-prudence-neon-caja-x3",
    "name": "Condones Prudence Neon (Caja x3)",
    "description": "Los Preservativos Prudence Neón (Caja x 3 unidades) están diseñados para encender la diversión en la intimidad y hacer inolvidable cada encuentro, combinando un increíble efecto luminoso con la máxima protección y seguridad.\n\nElaborados con hule de látex natural de alta calidad y probados 100% electrónicamente, estos condones destacan por su capacidad de brillar en la oscuridad (bajo la tendencia #PonleyBrilla), transformando la experiencia visual al apagar las luces.",
    "category": "Condones",
    "volume": "1 Caja",
    "price": 14000,
    "imageUrl": "/images/products/condonesprudence_neon.webp",
    "featured": false
  },
  {
    "id": "condones-prudence-fresa-caja-x3",
    "name": "Condones Prudence Fresa (Caja x3)",
    "description": "Los Preservativos Prudence Sabor Fresa (Caja x 3 unidades) están diseñados para añadir un toque dulce, tentador e irresistible a tus encuentros íntimos, manteniendo siempre los más altos estándares de protección y seguridad.\n\nElaborados con látex natural de alta calidad y probados 100% electrónicamente, estos condones combinan un exquisito aroma y sabor a fresa, ideal para despertar los sentidos durante el juego previo y la intimidad.",
    "category": "Condones",
    "volume": "1 Caja",
    "price": 12000,
    "imageUrl": "/images/products/condonesprudence_fresa.webp",
    "featured": false
  },
  {
    "id": "garganta-profunda-sen-intimo",
    "name": "Garganta Profunda Sen Íntimo",
    "description": "El Spray Desensibilizante Garganta Profunda (15 ml) de Sen Íntimo está diseñado para transformar tus encuentros íntimos en una experiencia mucho más cómoda, placentera y libre de molestias.\n\nSu innovadora fórmula está especialmente pensada para reducir suavemente el reflejo nauseoso y adormecer levemente la garganta, permitiendo disfrutar de una estimulación oral más profunda, fluida y placentera con total confianza.",
    "category": "Lubricantes",
    "volume": "15 ml",
    "price": 28000,
    "imageUrl": "/images/products/gargantaprodunda.webp",
    "featured": false
  },
  {
    "id": "feromonas-hombre-flavor-sex",
    "name": "Feromonas Hombre Flavor Sex",
    "description": "Fragancia en spray con aroma cítrico y deportivo.",
    "category": "Higiene íntima",
    "volume": "20 ml",
    "price": 12000,
    "imageUrl": "/images/products/feromonahombreflavor.webp",
    "featured": false
  },
  {
    "id": "feromonas-mujer-frutos-rojos-flavor-sex",
    "name": "Feromonas Mujer Frutos Rojos Flavor Sex",
    "description": "Fragancia en spray con aroma a frutos rojos.",
    "category": "Higiene íntima",
    "volume": "20 ml",
    "price": 12000,
    "imageUrl": "/images/products/feromonasmujerflavor.webp",
    "featured": false
  },
  {
    "id": "retardante-spray-sen-intimo",
    "name": "Retardante Spray Sen Íntimo",
    "description": "El Lubricante Íntimo Retardante Ejaculation Delay Spray de Sen Íntimo está diseñado para transformar tus encuentros íntimos en una experiencia sensorial única, prolongada y altamente estimulante.\n\nSu innovadora fórmula en spray está especialmente diseñada para ayudar a controlar el tiempo de respuesta y prolongar la relación, reduciendo suavemente la hipersensibilidad sin perder el placer, para que disfrutes de momentos de pasión sin prisas.\n\nBase acuosa, no comestible.",
    "category": "Lubricantes",
    "volume": "15 ml",
    "price": 30000,
    "imageUrl": "/images/products/retardantesenintimo.webp",
    "featured": false
  },
  {
    "id": "retardante-spray-flavor-sex",
    "name": "Retardante Spray Flavor Sex",
    "description": "Potencia tu control y prolonga tus momentos de intimidad con Delay For Men. Diseñado para brindarte mayor seguridad y permitirte disfrutar de una conexión más duradera y plena junto a tu pareja.\n\nBase acuosa, no comestible.",
    "category": "Lubricantes",
    "volume": "7 ml",
    "price": 15000,
    "imageUrl": "/images/products/retardanteflavor.webp",
    "featured": false
  },
  {
    "id": "lubricante-anal-flavor-sex",
    "name": "Lubricante Anal Flavor Sex",
    "description": "Base acuosa, dilata y desensibiliza, sin sabor, no comestible.",
    "category": "Lubricantes",
    "volume": "15 g",
    "price": 15000,
    "imageUrl": "/images/products/lubricante-anal-flavor.webp",
    "featured": false
  },
  {
    "id": "lubricante-intimo-anal-desensibilizante-pocket-pleasure",
    "name": "Lubricante Íntimo Anal Desensibilizante Pocket Pleasure",
    "description": "El Lubricante Íntimo Anal Desensibilizante de Pocket Pleasure está diseñado para transformar tus encuentros íntimos en una experiencia sensorial única, confortable y altamente placentera.\n\nSu innovadora fórmula combina un suave efecto desensibilizante que reduce la sensibilidad en la zona para facilitar la relajación, junto a una textura sedosa que elimina la fricción y enciende la chispa en tus momentos de placer.\n\nBase acuosa.",
    "category": "Lubricantes",
    "volume": "4 ml",
    "price": 12000,
    "imageUrl": "/images/products/lubricanteintimoanal.webp",
    "featured": false
  },
  {
    "id": "lubricante-multi-o-elixir",
    "name": "Lubricante Multi-O Elixir",
    "description": "Descubre una experiencia diseñada para intensificar el disfrute y facilitar los momentos de máxima excitación con el Gel Lubricante Íntimo Multi. Formulado especialmente para complementar la lubricación natural, este gel ayuda a potenciar la sensibilidad y maximizar el bienestar durante la intimidad, brindando un deslizamiento suave y continuo.\n\nBase acuosa, dilata y desensibiliza, sin sabor, no comestible.",
    "category": "Lubricantes",
    "volume": "15 ml",
    "price": 22000,
    "imageUrl": "/images/products/multioo-elixir.webp",
    "featured": false
  },
  {
    "id": "multiorgasmico-pocket-pleasure",
    "name": "Multiorgásmico Pocket Pleasure",
    "description": "El Lubricante Íntimo Pleasure de Pocket Pleasure está diseñado para transformar tus encuentros íntimos en una experiencia sensorial única, práctica y altamente estimulante.\n\nSu innovadora fórmula combina una textura suave y liviana que se desliza fácilmente sobre la piel con una aplicación ultra cómoda, potenciando la sensibilidad al máximo y encendiendo la chispa en tus momentos de placer.\n\nBase acuosa, tiene efecto de frio y luego calor, es comestible.",
    "category": "Lubricantes",
    "volume": "4 ml",
    "price": 14000,
    "imageUrl": "/images/products/lubircanteintimomulti.webp",
    "featured": false
  },
  {
    "id": "estrechante-flavor-sex",
    "name": "Estrechante Flavor Sex",
    "description": "Base acuosa.",
    "category": "Lubricantes",
    "volume": "15 g",
    "price": 16000,
    "imageUrl": "/images/products/estrechante_flavour.webp",
    "featured": false
  },
  {
    "id": "ropa-interior-gomita-cereza",
    "name": "Ropa Interior Gomita – Cereza",
    "description": "Los GUMMI CANDIES son “ropa íntima” comestible, sirve para salir de la monotonía con tu pareja y ponerle un toque dulce a tu relación.",
    "category": "Higiene íntima",
    "volume": "1 Caja",
    "price": 18000,
    "imageUrl": "/images/products/ropainteriorgomita_cereza.webp",
    "featured": false
  },
  {
    "id": "ropa-interior-gomita-chocolate",
    "name": "Ropa Interior Gomita – Chocolate",
    "description": "Los GUMMI CANDIES son “ropa íntima” comestible, sirve para salir de la monotonía con tu pareja y ponerle un toque dulce a tu relación.",
    "category": "Higiene íntima",
    "volume": "1 Caja",
    "price": 18000,
    "imageUrl": "/images/products/ropainteriorgomita_chocolate.webp",
    "featured": false
  },
  {
    "id": "lubricante-intimo-electrizante-lychee-sen-intimo",
    "name": "Lubricante Íntimo Electrizante Lychee Sen Íntimo",
    "description": "El Lubricante Íntimo Electrizante Lychee (30 ml) de Sen Íntimo - Edición Especial está diseñado para transformar tus encuentros íntimos en una experiencia sensorial única, frutal y altamente estimulante.\n\nSu innovadora fórmula combina un exótico aroma y sabor a Lychee (Lichi) con una potente Sensación Caliente y Electrizante que genera un cosquilleo vibrante junto con un agradable calor al contacto, elevando la sensibilidad al máximo para encender la chispa en tus momentos de placer.\n\nBase acuosa.",
    "category": "Lubricantes",
    "volume": "30 ml",
    "price": 35200,
    "imageUrl": "/images/products/senintimolychee.webp",
    "featured": false
  },
  {
    "id": "vela-de-masaje-flavor-sex-cereza",
    "name": "Vela de Masaje Flavor Sex – Cereza",
    "description": "La Vela para Masaje Corporal Flavor SX (55 g) - Sabor Cereza está diseñada para transformar tus encuentros íntimos en una experiencia sensorial única, cálida y altamente estimulante.\n\nSu innovadora fórmula se derrite a una temperatura corporal ideal, convirtiéndose en un suave aceite tibio de masaje que se desliza delicadamente sobre la piel, combinando el irresistible aroma frutal de la cereza con una hidratación profunda para encender la chispa en tus momentos de placer.",
    "category": "Higiene íntima",
    "volume": "50 g",
    "price": 23400,
    "imageUrl": "/images/products/vela_cereza.webp",
    "featured": false
  },
  {
    "id": "vela-de-masaje-flavor-sex-chocolate",
    "name": "Vela de Masaje Flavor Sex – Chocolate",
    "description": "La Vela para Masaje Corporal Flavor SX (55 g) - Sabor Chocolate está diseñada para transformar tus encuentros íntimos en una experiencia sensorial única, cálida y altamente estimulante.\n\nSu innovadora fórmula se derrite a una temperatura corporal ideal, convirtiéndose en un suave aceite tibio de masaje que se desliza delicadamente sobre la piel, combinando el irresistible aroma del chocolate con una hidratación profunda para encender la chispa en tus momentos de placer.",
    "category": "Higiene íntima",
    "volume": "50 g",
    "price": 23400,
    "imageUrl": "/images/products/vela_chocolate.webp",
    "featured": false
  },
  {
    "id": "aceite-de-masaje-guia-cereza",
    "name": "Aceite de Masaje Guía Cereza",
    "description": "Transforma cualquier espacio en un oasis de bienestar con nuestro Aceite Corporal para Masajes x 30 ml. Diseñado especialmente para deslizarse suavemente sobre la piel, este aceite es el complemento ideal para momentos de relajación profunda, masajes sensuales o para consentir tu cuerpo después de un largo día. Su textura ligera nutre la piel sin dejar una sensación grasosa o pesada.",
    "category": "Lubricantes",
    "volume": "30 ml",
    "price": 16000,
    "imageUrl": "/images/products/aceiteguiacereza.webp",
    "featured": false
  },
  {
    "id": "lubricante-durex-cosquillas",
    "name": "Lubricante Durex Cosquillas",
    "description": "Base acuosa.",
    "category": "Lubricantes",
    "volume": "50 g",
    "price": 33900,
    "imageUrl": "/images/products/lubricante-durex-cosquillas.webp",
    "featured": false
  },
  {
    "id": "lubricante-menta-sen-intimo",
    "name": "Lubricante Menta Sen Íntimo",
    "description": "El Lubricante Íntimo Edición Especial (30 ml) - Sabor Menta de Sen Íntimo está diseñado para transformar tus encuentros íntimos en una experiencia sensorial única, refrescante y altamente estimulante.\n\nSu innovadora fórmula combina un delicioso y revitalizante aroma a menta con una intensa Sensación Fría que estimula las terminaciones nerviosas al contacto con la piel, potenciando la sensibilidad al máximo y encendiendo la chispa en tus momentos de placer.",
    "category": "Lubricantes",
    "volume": "30 ml",
    "price": 29000,
    "imageUrl": "/images/products/lubricante_senintimo_menta.webp",
    "featured": false
  },
  {
    "id": "lubricante-vibrador-frio-sen-intimo",
    "name": "Lubricante Vibrador Frío Sen Íntimo",
    "description": "Base acuosa.",
    "category": "Lubricantes",
    "volume": "",
    "price": 45000,
    "imageUrl": "/images/products/arde-llama.jpg",
    "featured": false
  },
  {
    "id": "retardante-stud-loo-glass",
    "name": "Retardante Stud Loo Glass",
    "description": "Disfruta de encuentros íntimos mucho más prolongados y placenteros. El Spray Retardante Stud Loo Glass está diseñado específicamente para ayudar a reducir la hipersensibilidad en el miembro masculino de forma temporal, permitiéndote retrasar el clímax y controlar el tiempo de la eyaculación. Es el aliado perfecto para aumentar tu confianza en la cama y llevar el placer en pareja a un nuevo nivel sin preocupaciones.",
    "category": "Lubricantes",
    "volume": "8 ml",
    "price": 28900,
    "imageUrl": "/images/products/studlooglass.webp",
    "featured": false
  } 
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProducts(onlyFeatured = false): Product[] {
  return onlyFeatured ? PRODUCTS.filter((p) => p.featured) : PRODUCTS;
}

export function formatCurrency(price: number, symbol = "$"): string {
  return `${symbol}${price}`;
}
