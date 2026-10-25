import React from 'react';
import { Link } from 'wouter';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { ArrowRight } from 'lucide-react';
import heroImg from '@assets/generated_images/hero.jpg';
import aboutImg from '@assets/generated_images/owner_about.jpg';
import diningImg from '@assets/generated_images/dining.jpg';
import project1Img from '@assets/generated_images/project1.jpg';
import sofaImg from '@assets/generated_images/sofa.jpg';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Furniture in a living room"
            className="w-full h-full object-cover scale-105 animate-in slide-in-from-bottom-2 duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-black/15 dark:bg-background/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent dark:from-background/60 dark:via-background/10 dark:to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center mt-16 sm:mt-20">
          <FadeIn delay={0.2}>
            <span className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-[#B88D3B] dark:text-primary mb-4 sm:mb-6 block">
              Welcome to Tehkal Hafsa
            </span>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-serif text-balance text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#FAF7EF] dark:text-foreground leading-tight mb-6 sm:mb-8 max-w-5xl mx-auto">
              Furniture Made for <span className="italic text-[#F2EBDD] dark:text-foreground/90">Modern Homes.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="text-[#F7F3E8]/85 dark:text-foreground/75 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg mb-8 sm:mb-12 font-light leading-relaxed px-2">
              We have made furniture and designed rooms in Peshawar for over 10 years. We build pieces that fit your home and the way you use it.
            </p>
          </FadeIn>
          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-medium hover:bg-foreground hover:text-background transition-colors duration-500 text-center"
              >
                Browse Furniture
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 border border-[#F7F3E8]/50 text-[#F7F3E8] dark:border-foreground/35 dark:text-foreground uppercase tracking-widest text-sm font-medium hover:border-[#B88D3B] hover:text-[#C6A45C] dark:hover:border-primary dark:hover:text-primary transition-colors duration-500 text-center"
              >
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 lg:py-32 bg-background relative border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <FadeIn direction="right">
                <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Our Craft</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6 sm:mb-8">
                  Skilled woodworking with a modern style.
                </h2>
                <p className="text-foreground/60 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-light">
                  For over 10 years, our team has made furniture in Peshawar. We use skilled woodworking and modern designs to make useful pieces that last.
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
                  <img
                    src={aboutImg}
                    alt="Master craftsman at Tehkal Hafsa Furniture workshop"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-border" />
                </div>
                <div className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-10 bg-card p-5 sm:p-8 border border-border shadow-2xl glass-panel hidden md:block">
                  <div className="text-primary font-serif text-4xl sm:text-5xl mb-2">10+</div>
                  <div className="text-foreground/70 uppercase tracking-widest text-xs">Years of Experience</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Our Collection</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">Furniture for Every Room</h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { title: 'Living Room', img: sofaImg, path: '/products?category=sofas' },
              { title: 'Dining Space', img: diningImg, path: '/products?category=dining' },
              { title: 'Custom Projects', img: project1Img, path: '/projects' },
            ].map((category, i) => (
              <StaggerItem key={i}>
                <Link href={category.path} className="group block relative overflow-hidden aspect-[3/4] sm:aspect-[3/4]">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay stays dark — it sits on top of a photo for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <h3 className="font-serif text-xl sm:text-2xl text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
          
          <div className="mt-10 sm:mt-16 text-center">
            <Link href="/products" className="inline-block border-b border-primary text-primary pb-1 uppercase tracking-widest text-sm hover:text-foreground hover:border-foreground transition-colors">
              View All Furniture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
