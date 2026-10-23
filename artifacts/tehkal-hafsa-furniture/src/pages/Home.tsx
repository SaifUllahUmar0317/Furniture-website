import React from 'react';
import { Link } from 'wouter';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { ArrowRight } from 'lucide-react';
import heroImg from '@assets/generated_images/hero.jpg';
import aboutImg from '@assets/generated_images/about.jpg';
import diningImg from '@assets/generated_images/dining.jpg';
import project1Img from '@assets/generated_images/project1.jpg';
import sofaImg from '@assets/generated_images/sofa.jpg';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Luxury Furniture Interior"
            className="w-full h-full object-cover scale-105 animate-in slide-in-from-bottom-2 duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-[#070a12]/65 backdrop-blur-[2px] dark:bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-[#070a12]/25 to-transparent dark:from-background dark:via-background/20" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center mt-20">
          <FadeIn delay={0.2}>
            <span className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-6 block [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              Welcome to Tehkal Hafsa
            </span>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 max-w-5xl mx-auto dark:text-foreground">
              Crafting Premium Furniture for <span className="italic text-white/90 dark:text-foreground/90">Modern Living.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="text-white/75 max-w-2xl mx-auto text-lg mb-12 font-light leading-relaxed dark:text-foreground/70">
              Over a decade of excellence in bespoke woodworking and luxury interior solutions in Peshawar. We don't just build furniture; we curate lifestyles.
            </p>
          </FadeIn>
          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/products"
                className="px-8 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-medium hover:bg-foreground hover:text-background transition-colors duration-500"
              >
                Explore Collection
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-white/40 text-white uppercase tracking-widest text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-500 dark:border-foreground/20 dark:text-foreground"
              >
                Book Consultation
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-32 bg-background relative border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeIn direction="right">
                <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">The Art of Craft</span>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-8">
                  Where tradition meets contemporary luxury.
                </h2>
                <p className="text-foreground/60 text-lg leading-relaxed mb-8 font-light">
                  For over 10 years, Tehkal Hafsa Furniture has been the premier destination for discerning homeowners in Peshawar. Our master craftsmen combine generations of woodworking expertise with modern design sensibilities to create pieces that are as functional as they are breathtaking.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center text-primary uppercase tracking-widest text-sm font-medium hover:text-foreground transition-colors group"
                >
                  Our Story <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </FadeIn>
            </div>
            <div className="relative">
              <FadeIn direction="left">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img src={aboutImg} alt="Craftsmanship" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 border border-border" />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-card p-8 border border-border shadow-2xl glass-panel hidden md:block">
                  <div className="text-primary font-serif text-5xl mb-2">10+</div>
                  <div className="text-foreground/70 uppercase tracking-widest text-xs">Years of Excellence</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-32 bg-muted relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <FadeIn className="text-center mb-20">
            <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Curated Selection</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Signature Collections</h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Living Room', img: sofaImg, path: '/products?category=sofas' },
              { title: 'Dining Space', img: diningImg, path: '/products?category=dining' },
              { title: 'Bespoke Projects', img: project1Img, path: '/projects' },
            ].map((category, i) => (
              <StaggerItem key={i}>
                <Link href={category.path} className="group block relative overflow-hidden aspect-[3/4]">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay stays dark — it sits on top of a photo for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-serif text-2xl text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {category.title}
                    </h3>
                    <div className="h-0 overflow-hidden group-hover:h-6 transition-all duration-500 flex items-center text-primary text-sm uppercase tracking-widest">
                      Explore <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="mt-16 text-center">
            <Link href="/products" className="inline-block border-b border-primary text-primary pb-1 uppercase tracking-widest text-sm hover:text-foreground hover:border-foreground transition-colors">
              View All Categories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
