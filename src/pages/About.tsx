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
          <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Furniture Made to Last.</h1>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <FadeIn direction="right">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={aboutImg} alt="Workshop" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn direction="left" className="space-y-8 text-foreground/70 font-light leading-relaxed text-lg">
            <p>
              We started in Peshawar over 10 years ago. Our goal is simple: make well-built furniture that suits each home.
            </p>
            <p>
              Furniture is part of everyday life. It is there for quiet mornings, family meals, and special occasions. We want each piece to be useful and last for years.
            </p>
            <p>
              Our team works from our workshop at Tambowano Morh. We use walnut, oak, and mahogany, and finish each piece to show the wood's natural pattern.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <FadeIn direction="right" className="space-y-8 text-foreground/70 font-light leading-relaxed text-lg order-2 lg:order-1">
            <h2 className="font-serif text-3xl text-foreground mb-4">How We Make Each Piece</h2>
            <p>
              We pay close attention to strong joints, smooth finishes, and careful quality checks.
            </p>
            <p>
              We do not make furniture in large batches. We plan and build each piece for its purpose, from dining tables to simple console tables. We take care with every detail and use finishes made to last.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-foreground/10 mt-8">
              <div>
                <div className="text-primary font-serif text-4xl mb-2">10+</div>
                  <div className="text-foreground/50 text-xs uppercase tracking-widest">Years of Experience</div>
              </div>
              <div>
                <div className="text-primary font-serif text-4xl mb-2">500+</div>
                <div className="text-foreground/50 text-xs uppercase tracking-widest">Homes Furnished</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="left" className="order-1 lg:order-2">
            <div className="relative aspect-square overflow-hidden">
              <img src={galleryImg} alt="Woodworking detail" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
