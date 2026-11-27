import { useEffect, useMemo, useState } from 'react';
import { useSearch } from 'wouter';
import { Search } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { OrderFormDialog } from '@/components/products/OrderFormDialog';
import { ProductCard } from '@/components/products/ProductCard';
import { productCategories, type Product } from '@/data/products';
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
  }, [activeCategory, searchQuery, sortOrder, products]);

  return (
    <div className="w-full pt-28 sm:pt-32 pb-16 sm:pb-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn className="mb-8 sm:mb-12 text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-primary">Our Furniture</span>
          <h1 className="mb-4 sm:mb-5 font-serif text-4xl sm:text-5xl text-foreground md:text-7xl">Furniture for Your Home</h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-foreground/65 md:text-lg px-2">
            Browse our furniture and ask the workshop for a quote.
          </p>
        </FadeIn>

        <div className="mb-6 sm:mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category tabs — horizontally scrollable on mobile */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 lg:pb-0 -mx-4 sm:-mx-0 px-4 sm:px-0">
            {productCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`shrink-0 border-b px-1 py-2 text-xs uppercase tracking-[0.16em] transition-colors whitespace-nowrap ${
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
                className="bg-transparent py-3 text-sm text-foreground outline-none flex-1"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>

        <p className="mb-4 sm:mb-6 text-sm text-muted-foreground">
          Showing {visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}
        </p>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-7 sm:gap-y-10">
            {visibleProducts.map((product, index) => (
              <FadeIn key={product.slug} delay={Math.min(index * 0.04, 0.2)}>
                <ProductCard
                  product={product}
                  index={index}
                  onOrderNow={(p) => setOrderProduct(p)}
                />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="border border-border bg-card px-6 py-12 sm:py-16 text-center">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground">No furniture found</h2>
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
