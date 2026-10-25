import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { OrderFormDialog } from '@/components/products/OrderFormDialog';
import NotFound from '@/pages/not-found';
import { formatPrice } from '@/data/products';
import { useLiveProducts } from '@/lib/admin-store';

export default function ProductDetail() {
  const [products] = useLiveProducts();
  const { slug } = useParams<{ slug: string }>();
  const [orderOpen, setOrderOpen] = useState(false);
  const product = products.find((item) => item.slug === slug);

  if (!product) return <NotFound />;

  const sameCategoryProducts = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  );
  const relatedProducts = sameCategoryProducts.length
    ? sameCategoryProducts.slice(0, 3)
    : products.filter((item) => item.slug !== product.slug).slice(0, 3);

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
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden bg-muted lg:sticky lg:top-28">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              {product.badge && (
                <span className="absolute left-4 sm:left-5 top-4 sm:top-5 border border-border bg-background/90 px-3 py-2 text-xs uppercase tracking-widest text-primary backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">{product.category}</div>
            <h1 className="font-serif text-3xl sm:text-4xl leading-tight text-foreground md:text-5xl">{product.name}</h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-foreground/70">{product.description}</p>

            <div className="mt-6 sm:mt-7 border-y border-border py-4 sm:py-5">
              <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Sample {product.priceQualifier === 'starting' ? 'starting price' : 'price'} · PKR
              </span>
              <p className="mt-2 font-serif text-2xl sm:text-3xl text-foreground">
                {product.priceQualifier === 'starting' ? 'From ' : ''}
                {formatPrice(product.price)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Prices may vary based on your custom choices of materials, sizing, and polish finish.</p>
            </div>

            <div className="mt-4 sm:mt-5 flex items-center gap-2 text-sm">
              {product.stock === 'in-stock' ? (
                <>
                  <Check size={17} className="text-emerald-700 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400">Available</span>
                </>
              ) : (
                <>
                  <X size={17} className="text-rose-700 dark:text-rose-400" />
                  <span className="text-rose-700 dark:text-rose-400">Not in stock</span>
                </>
              )}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setOrderOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 bg-primary px-6 py-3.5 sm:py-4 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {product.stock === 'in-stock' ? 'Order Now' : 'Ask When Available'}
                <ArrowRight size={16} />
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-border px-6 py-3.5 sm:py-4 text-sm uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Ask a question
              </Link>
            </div>

            <section className="mt-8 sm:mt-10">
              <h2 className="mb-3 sm:mb-4 font-serif text-xl sm:text-2xl text-foreground">Details</h2>
              <dl className="divide-y divide-border border-y border-border">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[minmax(6rem,0.7fr)_1.3fr] gap-3 sm:gap-4 py-3 sm:py-3.5 text-sm">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="mt-5 sm:mt-7 border border-border bg-card p-3 sm:p-4 text-sm leading-relaxed text-foreground/70">
              <span className="font-medium text-foreground">Need a different size?</span>{' '}
              Contact us to ask about sizes, materials, delivery, or installation.
            </div>
          </FadeIn>
        </div>

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
                  <span className="block text-sm text-muted-foreground">
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
