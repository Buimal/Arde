
"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { getDictionary, TranslationKey, Dictionary } from "@/lib/translations";
import { dir } from 'i18next';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface CartLine {
  id: string;
  title: string;
  price: string;
  image?: string;
  qty: number;
}

interface AppContextType {
  lang: string;
  setLang: (lang: string) => void;
  dictionary: Dictionary;
  t: (key: TranslationKey | string) => string;
  isHydrated: boolean;
  cart: CartLine[];
  cartCount: number;
  addToCart: (product: Omit<CartLine, "qty"> & { qty?: number }) => void;
  setCartQty: (id: string, qty: number) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CART_STORAGE_KEY = "arde-cart";

const loadCart = (): CartLine[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentLang = searchParams.get('lang') || 'es';
  
  const [lang, setInternalLang] = useState(currentLang);
  const [dictionary, setDictionary] = useState<Dictionary>({} as Dictionary);
  const [isHydrated, setIsHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>(() => loadCart());

  const addToCart = useCallback((product: Omit<CartLine, "qty"> & { qty?: number }) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === product.id);
      const next = existing
        ? prev.map((line) =>
            line.id === product.id
              ? { ...line, qty: line.qty + (product.qty ?? 1) }
              : line
          )
        : [...prev, { ...product, qty: product.qty ?? 1 }];
      return next;
    });
  }, []);

  const setCartQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((line) => line.id !== id)
        : prev.map((line) => (line.id === id ? { ...line, qty } : line))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  useEffect(() => {
    if(currentLang !== lang) {
      setInternalLang(currentLang);
    }
  }, [currentLang, lang]);

  const setLang = useCallback((newLang: string) => {
    setInternalLang(newLang);
    
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (newLang === 'es') {
        current.delete('lang');
    } else {
        current.set('lang', newLang);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    
    router.push(`${pathname}${query}`, { scroll: false });
  }, [pathname, router, searchParams]);
  
  useEffect(() => {
    const fetchDictionary = async () => {
      const d = await getDictionary(lang);
      setDictionary(d);
      if (!isHydrated) {
        setIsHydrated(true);
      }
    };
    fetchDictionary();
  }, [lang, isHydrated]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir(lang);
  }, [lang]);

  const t = useCallback((key: TranslationKey | string): string => {
    const keys = Object.keys(dictionary);
    if (keys.length > 0) {
        return dictionary[key as TranslationKey] || String(key);
    }
    return String(key);
  }, [dictionary]);
  
  const value = {
    lang,
    setLang,
    dictionary,
    t,
    isHydrated,
    cart,
    cartCount,
    addToCart,
    setCartQty,
    clearCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const useTranslation = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within an AppProvider");
  }
  return context.t;
}
