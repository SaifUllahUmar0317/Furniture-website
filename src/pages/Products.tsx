import { useEffect, useMemo, useState } from 'react';
import { Link, useSearch } from 'wouter';
import { ArrowRight, Search } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { OrderFormDialog } from '@/components/products/OrderFormDialog';
import { formatPrice, productCategories, type Product } from '@/data/products';
import { useLiveProducts } from '@/lib/admin-store';

const CATEGORY_SLUGS: Record<string, string> = {
  'living-room': 'Living Room',
  sofas: 'Living Room',
  bedroom: 'Bedroom',
  beds: 'Bedroom',
  dining: 'Dining',
  storage: 'Storage',
  wardrobes: 'Storage',
  office: 'Office',
  kitchen: 'Kitchen',
  doors: 'Doors',
};

export default function Products() {
  const [products] = useLiveProducts();
  const searchParams = useSearch();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);

  useEffect(() => {
    const slug = new URLSearchParams(searchParams).get('category');
    setActiveCategory(slug ? CATEGORY_SLUGS[slug.toLowerCase()] ?? 'All' : 'All');
  }, [searchParams]);

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = products.filter((product) => {
      const categoryMatches = activeCategory === 'All' || product.category === activeCategory;
      const searchMatches =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.specs.some((spec) => spec.value.toLowerCase().includes(query));
      return categoryMatches && searchMatches;
    });

    if (sortOrder === 'price-low') return result.sort((a, b) => a.price - b.price);
    if (sortOrder === 'price-high') return result.sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, searchQuery, sortOrder]);

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto max-w-7xl px-6">
        <FadeIn className="mb-12 text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-primary">Our Furniture</span>
          <h1 className="mb-5 font-serif text-5xl text-foreground md:text-7xl">Furniture for Your Home</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg">
            Browse our furniture and ask the workshop for a quote.
          </p>
        </FadeIn>

        <div className="mb-10 border border-primary/30 bg-card/70 px-5 py-4 text-sm leading-relaxed text-foreground/75">
          <span className="font-medium text-primary">Sample product list.</span>{' '}
          Prices, details, and availability are examples only. The workshop will confirm the final price and stock.
        </div>

        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
            {productCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`shrink-0 border-b px-1 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
                  activeCategory === category
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground/55 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex min-w-0 items-center gap-2 border border-border bg-card px-3 sm:w-64">
              <Search size={16} className="shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Search products</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
            <label className="flex items-center gap-3 border border-border bg-card px-3">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Sort</span>
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value as typeof sortOrder)}
                className="bg-transparent py-3 text-sm text-foreground outline-none"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          Showing {visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}
        </p>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product, index) => (
              <FadeIn key={product.slug} delay={Math.min(index * 0.04, 0.2)}>
                <article className="group flex h-full flex-col border border-border bg-card transition-colors hover:border-primary/40">
                  <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading={index > 2 ? 'lazy' : 'eager'}
                    />
                    {product.badge && (
                      <span className="absolute left-4 top-4 border border-border bg-background/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-widest text-primary backdrop-blur-sm">
                        {product.badge}
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.15em] text-primary">{product.category}</span>
                      <span
                        className={`text-xs ${
                          product.stock === 'in-stock' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                        }`}
                      >
                        {product.stock === 'in-stock' ? 'Available' : 'Not available'} · sample
                      </span>
                    </div>

                    <Link href={`/products/${product.slug}`} className="font-serif text-2xl leading-snug text-foreground transition-colors hover:text-primary">
                      {product.name}
                    </Link>

                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-border py-3 text-xs leading-relaxed">
                      {product.specs.slice(0, 2).map((spec) => (
                        <div key={spec.label}>
                          <span className="block uppercase tracking-widest text-muted-foreground">{spec.label}</span>
                          <span className="mt-1 block text-foreground/80">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div>
                        <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                          Sample {product.priceQualifier === 'starting' ? 'starting price' : 'price'}
                        </span>
                        <span className="mt-1 block text-xl font-medium text-foreground">
                          {product.priceQualifier === 'starting' ? 'From ' : ''}
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-primary hover:text-foreground"
                      >
                        View details <ArrowRight size={14} />
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOrderProduct(product)}
                      className="mt-5 w-full bg-primary px-5 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      {product.stock === 'in-stock' ? 'Order Now' : 'Request Availability'}
                    </button>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="border border-border bg-card px-6 py-16 text-center">
            <h2 className="font-serif text-2xl text-foreground">No furniture found</h2>
            <p className="mt-2 text-sm text-muted-foreground">Try another search or choose a different category.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-5 text-xs uppercase tracking-widest text-primary hover:text-foreground"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <OrderFormDialog
        product={orderProduct}
        open={Boolean(orderProduct)}
        onOpenChange={(open) => {
          if (!open) setOrderProduct(null);
        }}
      />
    </div>
  );
}
