import React, { useState } from 'react';
import { Link } from 'wouter';
import { type Product, formatPrice } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Check,
  ArrowRight,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
  onOrderNow: (product: Product) => void;
}

export function ProductCard({ product, index, onOrderNow }: ProductCardProps) {
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Combine primary image and any additional angles/colors into a unique list
  const allImages = React.useMemo(() => {
    const list = [product.image, ...(product.images || [])].filter(
      (img, idx, arr) => Boolean(img) && arr.indexOf(img) === idx
    );
    return list.length > 0 ? list : ['/images/sofa.jpg'];
  }, [product.image, product.images]);

  const hasMultipleImages = allImages.length > 1;
  const currentImage = allImages[activeImageIndex] || allImages[0];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, currentImage);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1800);
  };

  return (
    <article className="group flex h-full flex-col border border-border bg-card transition-colors hover:border-primary/40 relative">
      {/* Product Image Showcase with Left/Right Slider like Fiverr Gig */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted select-none">
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <img
            src={currentImage}
            alt={`${product.name} - view ${activeImageIndex + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading={index > 2 ? 'lazy' : 'eager'}
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 border border-border bg-background/90 px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-primary backdrop-blur-sm pointer-events-none">
            {product.badge}
          </span>
        )}

        {/* Fiverr-Style Left/Right Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous product image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-md focus:outline-none"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next product image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-md focus:outline-none"
            >
              <ChevronRight size={18} />
            </button>

            {/* Slider Dots Indicator */}
            <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
              {allImages.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIdx === activeImageIndex
                      ? 'w-4 bg-primary'
                      : 'w-1.5 bg-white/60 drop-shadow-sm'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.15em] text-primary">{product.category}</span>
          <span
            className={`text-xs ${
              product.stock === 'in-stock'
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-rose-700 dark:text-rose-400'
            }`}
          >
            {product.stock === 'in-stock' ? 'Available' : 'Made to Order'}
          </span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="font-serif text-xl sm:text-2xl leading-snug text-foreground transition-colors hover:text-primary min-h-[3.5rem] sm:min-h-[3.75rem] flex items-center line-clamp-2"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Specs Preview */}
        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-border py-3 text-xs leading-relaxed min-h-[4.5rem] sm:min-h-[4.75rem] content-start">
          {product.specs?.slice(0, 2).map((spec) => (
            <div key={spec.label} className="min-w-0">
              <span className="block uppercase tracking-widest text-muted-foreground truncate">
                {spec.label}
              </span>
              <span className="mt-1 block text-foreground/80 line-clamp-2">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Bottom Area: Pricing, Add to Cart, and Order */}
        <div className="mt-auto pt-4 sm:pt-5 space-y-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                {product.priceQualifier === 'starting' ? 'Starting Price' : 'Price'}
              </span>
              <span className="mt-1 block text-lg sm:text-xl font-medium text-foreground">
                {product.priceQualifier === 'starting' ? 'From ' : ''}
                {formatPrice(product.price)}
              </span>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-primary hover:text-foreground shrink-0"
            >
              Details <ArrowRight size={13} />
            </Link>
          </div>

          {/* Action Buttons: Add to Cart + Order Now */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 py-3 px-2 border text-xs font-medium uppercase tracking-wider transition-all ${
                isAddedToCart
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-border bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {isAddedToCart ? (
                <>
                  <Check size={14} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onOrderNow(product)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-2 text-xs font-medium uppercase tracking-wider transition-colors shadow-sm text-center"
            >
              {product.stock === 'in-stock' ? 'Order Now' : 'Inquire'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
