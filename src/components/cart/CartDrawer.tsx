import React, { useState } from 'react';
import { useCart, type CartItem } from '@/lib/cart-context';
import { formatPrice } from '@/data/products';
import { CartCheckoutDialog } from './CartCheckoutDialog';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CheckSquare,
  Square,
  ArrowRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    toggleItemSelection,
    selectAllItems,
    clearCart,
    totalItemsCount,
    selectedItemsCount,
    selectedTotalPrice,
    allTotalPrice,
  } = useCart();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutType, setCheckoutType] = useState<'selected' | 'all'>('selected');

  const allSelected = items.length > 0 && items.every((i) => i.selected);
  const selectedItems = items.filter((i) => i.selected);

  const handleStartCheckout = (type: 'selected' | 'all') => {
    setCheckoutType(type);
    setCheckoutModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="relative w-full max-w-md bg-card border-l border-border h-full shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between shrink-0 bg-background/50">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={20} className="text-primary" />
                  <h2 className="font-serif text-lg text-foreground font-medium">
                    Your Shopping Cart ({totalItemsCount})
                  </h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Preservation Banner */}
              <div className="px-4 py-2 bg-muted/30 border-b border-border/50 text-[11px] text-muted-foreground flex items-center justify-between shrink-0">
                <span>Items preserved automatically on this device</span>
                <span className="text-primary font-medium">{items.length} item{items.length === 1 ? '' : 's'}</span>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground mb-4">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-1">Your cart is empty</h3>
                  <p className="text-xs text-muted-foreground max-w-xs mb-6 font-light">
                    Browse our bespoke furniture pieces and add items to your cart to prepare a quote or direct order.
                  </p>
                  <button
                    onClick={closeCart}
                    className="border border-primary px-6 py-2.5 text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                  >
                    Browse Furniture
                  </button>
                </div>
              ) : (
                <>
                  {/* Select All Toggle Bar */}
                  <div className="px-4 py-2 border-b border-border/50 flex items-center justify-between text-xs bg-card/60 shrink-0">
                    <button
                      onClick={() => selectAllItems(!allSelected)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {allSelected ? (
                        <CheckSquare size={16} className="text-primary" />
                      ) : (
                        <Square size={16} />
                      )}
                      <span>Select All Items ({items.length})</span>
                    </button>

                    <button
                      onClick={clearCart}
                      className="text-[11px] text-muted-foreground hover:text-destructive transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Scrollable Items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-border/40">
                    {items.map((item) => (
                      <div key={item.cartId} className="pt-3.5 first:pt-0 flex items-start gap-3 group">
                        {/* Checkbox */}
                        <button
                          onClick={() => toggleItemSelection(item.cartId)}
                          className="pt-1 text-muted-foreground hover:text-primary transition-colors shrink-0"
                          aria-label={`Select ${item.name}`}
                        >
                          {item.selected ? (
                            <CheckSquare size={17} className="text-primary" />
                          ) : (
                            <Square size={17} />
                          )}
                        </button>

                        {/* Image Thumbnail */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-border bg-muted shrink-0"
                        />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-primary font-medium">
                            {item.category}
                          </span>
                          <h4 className="font-serif text-sm text-foreground truncate">{item.name}</h4>
                          <p className="text-xs font-semibold text-foreground mt-0.5">
                            {formatPrice(item.price)}
                          </p>

                          {/* Quantity & Delete Controls */}
                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center border border-border bg-background">
                              <button
                                onClick={() => updateQuantity(item.cartId, -1)}
                                className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-2 text-xs font-medium text-foreground min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.cartId, 1)}
                                className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.cartId)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Order Summary & Actions */}
                  <div className="p-4 sm:p-5 border-t border-border bg-background/80 shrink-0 space-y-3">
                    <div className="space-y-1.5 text-xs">
                      {selectedItemsCount > 0 && selectedItemsCount !== totalItemsCount && (
                        <div className="flex justify-between text-muted-foreground">
                          <span>Selected ({selectedItemsCount} pcs):</span>
                          <span className="font-medium text-foreground">{formatPrice(selectedTotalPrice)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-medium text-foreground">
                        <span>Total Estimated:</span>
                        <span className="font-serif text-base text-primary font-bold">
                          {formatPrice(allTotalPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {/* Button 1: Order Selected */}
                      <button
                        type="button"
                        disabled={selectedItems.length === 0}
                        onClick={() => handleStartCheckout('selected')}
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 py-3 px-3 text-[11px] uppercase tracking-wider font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 border border-border"
                      >
                        <span>Order Selected ({selectedItemsCount})</span>
                      </button>

                      {/* Button 2: Order All */}
                      <button
                        type="button"
                        disabled={items.length === 0}
                        onClick={() => handleStartCheckout('all')}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-3 text-[11px] uppercase tracking-wider font-semibold transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <span>Order All ({totalItemsCount})</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <p className="text-[10px] text-muted-foreground text-center font-light pt-1">
                      Direct WhatsApp order confirmation & custom invoice generation available.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CartCheckoutDialog
        open={checkoutModalOpen}
        onOpenChange={setCheckoutModalOpen}
        orderItems={checkoutType === 'selected' ? selectedItems : items}
        orderType={checkoutType}
        onOrderCompleted={() => {
          if (checkoutType === 'all') {
            clearCart();
          } else {
            selectedItems.forEach((i) => removeFromCart(i.cartId));
          }
          closeCart();
        }}
      />
    </>
  );
}
