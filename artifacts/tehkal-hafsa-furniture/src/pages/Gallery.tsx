import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';

import g1 from '@assets/generated_images/gallery1.jpg';
import g2 from '@assets/generated_images/gallery2.jpg';
import g3 from '@assets/generated_images/gallery3.jpg';
import g4 from '@assets/generated_images/gallery4.jpg';
import g5 from '@assets/generated_images/gallery5.jpg';
import hero from '@assets/generated_images/hero.jpg';

const IMAGES = [
  { src: g1, className: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" },
  { src: g2, className: "aspect-square" },
  { src: g3, className: "aspect-[3/4]" },
  { src: hero, className: "md:col-span-2 aspect-[21/9]" },
  { src: g4, className: "aspect-square" },
  { src: g5, className: "aspect-square" },
];

export default function Gallery() {
  return (
    <div className="w-full pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeIn className="text-center mb-24">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Visual Showcase</span>
          <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Gallery.</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg font-light">
            A glimpse into our workshop's finest creations and meticulous details.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[300px]">
          {IMAGES.map((img, i) => (
            <StaggerItem key={i} className={`relative overflow-hidden group ${img.className}`}>
              <img 
                src={img.src} 
                alt={`Gallery image ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Overlay sits on photo — keep dark for legibility */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
