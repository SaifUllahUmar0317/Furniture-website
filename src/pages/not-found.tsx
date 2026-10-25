import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] z-0">
        <span className="font-serif text-[30vw] whitespace-nowrap tracking-tighter">404</span>
      </div>
      
      <FadeIn className="relative z-10">
        <h1 className="font-serif text-6xl md:text-8xl text-foreground mb-6">404</h1>
        <h2 className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-8 block">Page Not Found</h2>
        <p className="text-foreground/60 mb-12 max-w-md mx-auto font-light leading-relaxed">
          We cannot find this page. It may have moved, or the address may be wrong.
        </p>
        <Link 
          href="/" 
          className="px-8 py-4 border border-foreground/20 text-foreground uppercase tracking-widest text-sm font-medium hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500 inline-block"
        >
          Go to Home
        </Link>
      </FadeIn>
    </div>
  );
}
