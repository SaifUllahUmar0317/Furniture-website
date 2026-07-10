import { useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { Link, useSearch } from 'wouter';

import bedImg from '@assets/generated_images/bed.jpg';
import sofaImg from '@assets/generated_images/sofa.jpg';
import diningImg from '@assets/generated_images/dining.jpg';
import wardrobeImg from '@assets/generated_images/wardrobe.jpg';
import tvUnitImg from '@assets/generated_images/tv_unit.jpg';
import officeImg from '@assets/generated_images/office.jpg';
import kitchenImg from '@assets/generated_images/kitchen.jpg';
import coffeeTableImg from '@assets/generated_images/coffee_table.jpg';
import doorImg from '@assets/generated_images/door.jpg';
import bookshelfImg from '@assets/generated_images/bookshelf.jpg';

const CATEGORIES = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining",
  "Storage",
  "Office",
  "Kitchen",
  "Doors"
];

const PRODUCTS = [
  { id: 1, name: "The Monarch Velvet Sofa", category: "Living Room", img: sofaImg, tag: "Best Seller" },
  { id: 2, name: "Walnut Majesty Dining Table", category: "Dining", img: diningImg, tag: "Bespoke" },
  { id: 3, name: "Royal Oasis King Bed", category: "Bedroom", img: bedImg },
  { id: 4, name: "Executive Obsidian Desk", category: "Office", img: officeImg, tag: "Premium" },
  { id: 5, name: "Luminous Walk-in Wardrobe", category: "Storage", img: wardrobeImg },
  { id: 6, name: "Midnight Marble Kitchen", category: "Kitchen", img: kitchenImg, tag: "Custom" },
  { id: 7, name: "Floating Horizon TV Unit", category: "Living Room", img: tvUnitImg },
  { id: 8, name: "Artisan Glass Coffee Table", category: "Living Room", img: coffeeTableImg },
  { id: 9, name: "Grand Mahagony Entrance", category: "Doors", img: doorImg },
  { id: 10, name: "Scholar's Library Wall", category: "Storage", img: bookshelfImg },
];

const CATEGORY_SLUGS: Record<string, string> = {
  "living-room": "Living Room",
  "sofas": "Living Room",
  "bedroom": "Bedroom",
  "beds": "Bedroom",
  "dining": "Dining",
  "storage": "Storage",
  "wardrobes": "Storage",
  "office": "Office",
  "kitchen": "Kitchen",
  "doors": "Doors",
};

export default function Products() {
  const search = useSearch();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const slug = params.get('category');
    if (slug) {
      const mapped = CATEGORY_SLUGS[slug.toLowerCase()];
      if (mapped) {
        setActiveCategory(mapped);
      }
    }
  }, [search]);

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="w-full pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeIn className="text-center mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">The Collection</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">Our Products.</h1>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-16 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-8 justify-start md:justify-center min-w-max px-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`uppercase tracking-widest text-xs transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'text-primary border-b border-primary pb-1' 
                    : 'text-white/50 hover:text-white pb-1 border-b border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-muted">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 border border-white/10 text-[0.65rem] uppercase tracking-widest text-primary">
                      {product.tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Link href="/contact" className="px-6 py-3 border border-white text-white uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
                      Inquire
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-primary/70 text-xs uppercase tracking-widest mb-2 block">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl text-white group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-white/50">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
