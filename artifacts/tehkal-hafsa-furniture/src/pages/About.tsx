import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import aboutImg from '@assets/generated_images/about.jpg';
import galleryImg from '@assets/generated_images/gallery1.jpg';

export default function About() {
  return (
    <div className="w-full pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeIn className="text-center mb-24">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Our Story</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">A Legacy of Wood.</h1>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <FadeIn direction="right">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={aboutImg} alt="Workshop" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn direction="left" className="space-y-8 text-white/70 font-light leading-relaxed text-lg">
            <p>
              Founded over a decade ago in the heart of Peshawar, Tehkal Hafsa Furniture began with a simple yet ambitious vision: to elevate the standard of bespoke furniture in Pakistan. 
            </p>
            <p>
              We believe that furniture is the soul of a home. It witnesses your quiet mornings, hosts your grandest celebrations, and holds the quiet moments in between. That is why every piece we create is treated not as a product, but as a legacy.
            </p>
            <p>
              Our master artisans bring generations of woodworking heritage to our modern facility at Tambowano Morh. We source only the finest timbers — rich walnuts, sturdy oaks, and resilient mahoganies — treating them with the respect they deserve to bring out their innate beauty.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <FadeIn direction="right" className="space-y-8 text-white/70 font-light leading-relaxed text-lg order-2 lg:order-1">
            <h2 className="font-serif text-3xl text-white mb-4">The Craftsmanship</h2>
            <p>
              True luxury lies in the details that others overlook. At Tehkal Hafsa, we pride ourselves on our meticulous joinery, hand-finished surfaces, and uncompromising quality control.
            </p>
            <p>
              We don't mass-produce. We design, we refine, and we craft. Whether it's a monumental dining table or a subtle minimalist console, the dedication remains absolute. Our gold accents are precise, our glassmorphism is flawless, and our wood stains are rich and enduring.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-8">
              <div>
                <div className="text-primary font-serif text-4xl mb-2">10+</div>
                <div className="text-white/50 text-xs uppercase tracking-widest">Years Experience</div>
              </div>
              <div>
                <div className="text-primary font-serif text-4xl mb-2">500+</div>
                <div className="text-white/50 text-xs uppercase tracking-widest">Homes Furnished</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="left" className="order-1 lg:order-2">
            <div className="relative aspect-square overflow-hidden">
              <img src={galleryImg} alt="Craftsmanship Detail" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
