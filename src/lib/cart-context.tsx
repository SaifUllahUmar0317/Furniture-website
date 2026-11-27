import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { type Product } from '@/data/products';

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

const CART_STORAGE_KEY = 'thf_cart_items';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist items locally whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

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
