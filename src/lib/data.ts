import { getDictionary, TranslationKey } from "./translations";
import { PRODUCTS, Product, getProductById } from "./products";

// Define type for the localization dictionary with index signature
type Dictionary = {
  [key: string]: string;
};

export type Service = {
  id: string;
  "price-en": number;
  "price-he": number;
  "price-it": number;
  duration: number;
  nameKey: string; // Note: keep as string, as keys are dynamic
  descKey: string;
  imageUrl?: string;
  volumeKey?: string;
  name?: string;
  description?: string;
  category?: string;
  volume?: string;
  featured?: boolean;
  oldPrice?: number;
};

export interface Master {
  id: string;
  nameKey: string;
  specializationKey: string;
  infoKey: string;
  services: string[];
  image: string;
  hint: string;
  name?: string;
  specialization?: string;
  info?: string;
}

// Define your images for masters keyed by id for consistency
const masterImages: Record<string, string> = {
  "aviva-mar": "/images/masters/aviva-mar.webp",
  "sharon-katz": "/images/masters/sharon-katz.webp",
  "mark-franklin": "/images/masters/mark-franklin.webp",
  "maria-garcia": "/images/masters/maria-garcia.webp",
};

// Services are derived from the unified product catalog.
const rawServices: Service[] = PRODUCTS.map((product: Product) => ({
  id: product.id,
  "price-en": product.price,
  "price-he": product.price,
  "price-it": product.price,
  duration: 60,
  nameKey: product.name,
  descKey: product.description,
  volumeKey: product.volume,
  imageUrl: product.imageUrl,
  category: product.category,
  volume: product.volume,
  featured: product.featured,
  oldPrice: product.oldPrice,
}));

export const rawMasters: Master[] = [
  {
    id: "aviva-mar",
    nameKey: "master_aviva_name",
    specializationKey: "master_aviva_specialization",
    infoKey: "master_aviva_info",
    services: ["manicure", "facial", "makeup", "brow_shaping"],
    image: "/images/masters/aviva-mar.webp",
    hint: "Aviva Mar - Nails & Waxing",
  },
  {
    id: "sharon-katz",
    nameKey: "master_sharon_name",
    specializationKey: "master_sharon_specialization",
    infoKey: "master_sharon_info",
    services: [
      "hairdressing",
      "laser_hair_removal",
      "hair_coloring",
      "makeup",
      "facial",
      "manicure",
      "brow_shaping",
    ],
    image: "/images/masters/sharon-katz.webp",
    hint: "Sharon Katz - Cosmetology",
  },
  {
    id: "mark-franklin",
    nameKey: "master_mark_name",
    specializationKey: "master_mark_specialization",
    infoKey: "master_mark_info",
    services: ["hot_stone_massage", "body_wrap", "aromatherapy"],
    image: "/images/masters/mark-franklin.webp",
    hint: "Mark Franklin - Massage & Bodywork",
  },
  {
    id: "maria-garcia",
    nameKey: "master_maria_name",
    specializationKey: "master_maria_specialization",
    infoKey: "master_maria_info",
    services: [
      "laser_hair_removal",
      "makeup",
      "brow_shaping",
      "facial",
      "body_wrap",
      "manicure",
    ],
    image: "/images/masters/maria-garcia.webp",
    hint: "Maria Garcia - Esthetics & Lashes",
  },
];

export async function getLocalizedData(locale: string) {
  const dict = (await getDictionary(locale)) as Dictionary;
  const currencySymbol = dict["currency_symbol"] || "$";

  const services: Service[] = rawServices.map((s) => ({
    ...s,
    name: getProductById(s.id)?.name || s.nameKey || s.id,
    description: getProductById(s.id)?.description || s.descKey || "Description not available",
  }));

  const masters = rawMasters.map((m) => ({
    ...m,
    name: dict[m.nameKey] || m.id,
    specialization: dict[m.specializationKey] || "Specialist",
    info: dict[m.infoKey] || "",
  }));

  return { services, masters, currencySymbol };
}
