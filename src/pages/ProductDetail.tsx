import { useState, useMemo } from 'react';
import { Link, useParams } from 'wouter';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Plus,
  Minus,
} from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { OrderFormDialog } from '@/components/products/OrderFormDialog';
import NotFound from '@/pages/not-found';
import { formatPrice } from '@/data/products';
import { useLiveProducts } from '@/lib/admin-store';
import { useCart } from '@/lib/cart-context';

export default function ProductDetail() {
  const [products] = useLiveProducts();
  const { addToCart } = useCart();
  const { slug } = useParams<{ slug: string }>();
  const [orderOpen, setOrderOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const product = products.find((item) => item.slug === slug);

  const allImages = useMemo(() => {
    if (!product) return [];
    const list = [product.image, ...(product.images || [])].filter(
      (img, idx, arr) => Boolean(img) && arr.indexOf(img) === idx
    );
    return list.length > 0 ? list : ['/images/sofa.jpg'];
  }, [product]);

  if (!product) return <NotFound />;

  const currentImage = allImages[activeImageIndex] || allImages[0];
  const hasMultipleImages = allImages.length > 1;

  const sameCategoryProducts = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  );
  const relatedProducts = sameCategoryProducts.length
    ? sameCategoryProducts.slice(0, 3)
    : products.filter((item) => item.slug !== product.slug).slice(0, 3);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, currentImage);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div className="w-full pb-16 sm:pb-24 pt-28 sm:pt-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <Link
          href="/products"
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={15} /> Back to furniture
        </Link>

        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Product Gallery Showcase */}
          <FadeIn>
            <div className="lg:sticky lg:top-28 space-y-3">
              {/* Main Active Image with Slider Controls */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted border border-border group select-none">
                <img
                  src={currentImage}
                  alt={`${product.name} - view ${activeImageIndex + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500"
                />

                {product.badge && (
                  <span className="absolute left-4 sm:left-5 top-4 sm:top-5 border border-border bg-background/90 px-3 py-1.5 text-xs uppercase tracking-widest text-primary backdrop-blur-sm pointer-events-none">
                    {product.badge}
                  </span>
                )}

                {hasMultipleImages && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous angle"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-colors shadow-lg z-10"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next angle"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-colors shadow-lg z-10"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] px-2 py-1 font-mono uppercase tracking-wider backdrop-blur-xs">
                      {activeImageIndex + 1} / {allImages.length}
                    </span>
                  </>
                )}
              </div>

              {/* Thumbnail Strip (Fiverr style image switcher) */}
              {hasMultipleImages && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 sm:w-24 sm:h-20 shrink-0 border-2 overflow-hidden transition-all ${
                        idx === activeImageIndex
                          ? 'border-primary ring-1 ring-primary'
                          : 'border-border/60 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Angle ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Product Details & Actions */}
          <FadeIn delay={0.1}>
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">{product.category}</div>
            <h1 className="font-serif text-3xl sm:text-4xl leading-tight text-foreground md:text-5xl">{product.name}</h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-foreground/70">{product.description}</p>

            <div className="mt-6 sm:mt-7 border-y border-border py-4 sm:py-5">
              <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Sample {product.priceQualifier === 'starting' ? 'starting price' : 'price'} · PKR
              </span>
              <p className="mt-2 font-serif text-2xl sm:text-3xl text-foreground font-semibold">
                {product.priceQualifier === 'starting' ? 'From ' : ''}
                {formatPrice(product.price)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Prices may vary based on your custom choices of materials, sizing, and polish finish.</p>
            </div>

            <div className="mt-4 sm:mt-5 flex items-center gap-2 text-sm">
              {product.stock === 'in-stock' ? (
                <>
                  <Check size={17} className="text-emerald-700 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">In Stock & Ready for Customization</span>
                </>
              ) : (
                <>
                  <X size={17} className="text-rose-700 dark:text-rose-400" />
                  <span className="text-rose-700 dark:text-rose-400 font-medium">Made to Order / Inquire for Timeline</span>
                </>
              )}
            </div>

            {/* Quantity Selector + Add to Cart + Order Now */}
            <div className="mt-6 sm:mt-8 space-y-3.5">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Quantity:
                </span>
                <div className="flex items-center border border-border bg-card">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-semibold text-foreground min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 border px-6 py-3.5 sm:py-4 text-xs uppercase tracking-[0.18em] font-semibold transition-all ${
                    isAddedToCart
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-primary text-primary hover:bg-primary/10'
                  }`}
                >
                  {isAddedToCart ? (
                    <>
                      <Check size={16} />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Instant Order Now Button */}
                <button
                  type="button"
                  onClick={() => setOrderOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90 shadow-md"
                >
                  <span>{product.stock === 'in-stock' ? 'Order Now' : 'Inquire Availability'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  Have custom dimensions or specific polish requirements? <u>Ask the workshop directly</u>
                </Link>
              </div>
            </div>

            <section className="mt-8 sm:mt-10">
              <h2 className="mb-3 sm:mb-4 font-serif text-xl sm:text-2xl text-foreground">Specifications</h2>
              <dl className="divide-y divide-border border-y border-border">
                {product.specs?.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[minmax(6rem,0.7fr)_1.3fr] gap-3 sm:gap-4 py-3 sm:py-3.5 text-sm">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="mt-5 sm:mt-7 border border-border bg-card p-3 sm:p-4 text-sm leading-relaxed text-foreground/70">
              <span className="font-medium text-foreground">Need a custom modification?</span>{' '}
              We carve and manufacture in Peshawar with seasoned solid walnut, rosewood (Sheesham), and mahogany. Every piece can be tailored.
            </div>
          </FadeIn>
        </div>

        {/* Similar Furniture */}
        <section className="mt-14 sm:mt-20 border-t border-border pt-8 sm:pt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-primary">You may also like</span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-foreground">Similar furniture</h2>
            </div>
            <Link href="/products" className="hidden items-center gap-2 text-xs uppercase tracking-widest text-primary hover:text-foreground sm:inline-flex">
              See all furniture <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-5 sm:mt-7 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group flex items-center gap-3 sm:gap-4 border border-border bg-card p-3 transition-colors hover:border-primary/40"
              >
                <img src={item.image} alt="" className="h-16 w-20 sm:h-20 sm:w-24 object-cover shrink-0" loading="lazy" />
                <span>
                  <span className="block font-serif text-base sm:text-lg text-foreground transition-colors group-hover:text-primary">{item.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {item.priceQualifier === 'starting' ? 'Starting Price' : 'Price'}
                  </span>
                  <span className="block text-sm text-muted-foreground font-medium">
                    {item.priceQualifier === 'starting' ? 'From ' : ''}
                    {formatPrice(item.price)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <OrderFormDialog
        product={product}
        open={orderOpen}
        onOpenChange={setOrderOpen}
      />
    </div>
  );
}
