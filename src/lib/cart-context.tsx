import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import { type Product } from '@/data/products';
import { useAccount } from './account-context';

export interface CartItem {
  cartId: string;
  productId: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  priceQualifier?: 'starting' | 'fixed';
  image: string;
  quantity: number;
  selected: boolean;
  addedAt: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number, selectedImage?: string) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  toggleItemSelection: (cartId: string) => void;
  selectAllItems: (selected: boolean) => void;
  clearCart: () => void;
  totalItemsCount: number;
  selectedItemsCount: number;
  selectedTotalPrice: number;
  allTotalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getStorageKey(email?: string | null): string {
  if (email) {
    return `thf_cart_${email.trim().toLowerCase()}`;
  }
  return 'thf_cart_guest';
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { account } = useAccount();
  const activeEmail = account?.email || null;
  const storageKey = getStorageKey(activeEmail);

  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When active account changes, load that account's preserved cart
  useEffect(() => {
    const key = getStorageKey(activeEmail);
    let loadedFromLocal: CartItem[] = [];

    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        loadedFromLocal = JSON.parse(stored);
      }
    } catch {}

    setItems(loadedFromLocal);

    // Also fetch cloud preserved cart if user is signed in
    if (activeEmail) {
      fetch(`/api/cart?email=${encodeURIComponent(activeEmail)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && Array.isArray(data.items)) {
            if (data.items.length > 0) {
              setItems(data.items);
              localStorage.setItem(key, JSON.stringify(data.items));
            } else if (loadedFromLocal.length > 0) {
              // Sync local to cloud if cloud was empty
              fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: activeEmail, items: loadedFromLocal }),
              }).catch(() => {});
            }
          }
        })
        .catch(() => {});
    }
  }, [activeEmail]);

  // Persist items locally and sync to cloud
  useEffect(() => {
    const key = getStorageKey(activeEmail);
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {}

    // Debounced cloud sync to Neon PostgreSQL
    if (activeEmail) {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = setTimeout(() => {
        fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: activeEmail, items }),
        }).catch(() => {});
      }, 800);
    }
  }, [items, activeEmail]);

  const addToCart = (product: Product, quantity = 1, selectedImage?: string) => {
    const img = selectedImage || product.image;
    setItems((prev) => {
      // Check if product with same image already exists
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.image === img
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].selected = true;
        return updated;
      }

      const newItem: CartItem = {
        cartId: `cart_${product.id}_${Date.now()}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        price: product.price,
        priceQualifier: product.priceQualifier,
        image: img,
        quantity: Math.max(1, quantity),
        selected: true,
        addedAt: Date.now(),
      };

      return [newItem, ...prev];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const toggleItemSelection = (cartId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectAllItems = (selected: boolean) => {
    setItems((prev) => prev.map((item) => ({ ...item, selected })));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const selectedItemsCount = useMemo(() => {
    return items.filter((i) => i.selected).reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const selectedTotalPrice = useMemo(() => {
    return items.filter((i) => i.selected).reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const allTotalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const value: CartContextType = {
    items,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleItemSelection,
    selectAllItems,
    clearCart,
    totalItemsCount,
    selectedItemsCount,
    selectedTotalPrice,
    allTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
