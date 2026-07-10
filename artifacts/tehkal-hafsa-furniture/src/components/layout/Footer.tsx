import React from 'react';
import { Link } from 'wouter';
import { Facebook, MapPin, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background pt-24 pb-12 overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02] z-0">
        <span className="font-serif text-[15vw] whitespace-nowrap tracking-tighter">TEHKAL HAFSA</span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="flex flex-col items-start group inline-block">
              <span className="font-serif text-3xl tracking-widest uppercase text-foreground">
                Tehkal Hafsa
              </span>
              <span className="font-sans text-[0.7rem] tracking-[0.3em] text-primary uppercase mt-1">
                Furniture
              </span>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed mt-4">
              Crafting Premium Furniture for Modern Living. Over a decade of excellence in bespoke woodworking and luxury interior solutions in Peshawar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-foreground tracking-wide">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Products', 'Projects'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-foreground/60 hover:text-primary transition-colors text-sm tracking-wide uppercase"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / More */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-foreground tracking-wide">Information</h4>
            <ul className="space-y-4">
              {[
                { label: 'Gallery', path: '/gallery' },
                { label: 'Why Choose Us', path: '/why-us' },
                { label: 'FAQ', path: '/faq' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms & Conditions', path: '/terms' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-foreground/60 hover:text-primary transition-colors text-sm tracking-wide uppercase"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-foreground tracking-wide">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/60 text-sm leading-relaxed">
                  University Road, Tehkal Bala, Tambowano Morh,<br />Peshawar, Pakistan
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:Roohk700@gmail.com" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                  Roohk700@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-8 flex items-center space-x-4">
              <a
                href="https://www.facebook.com/marketplace/profile/100090837791388"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@tehkalhafsafurniture"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-foreground/40 text-xs tracking-widest uppercase">
            &copy; {currentYear} Tehkal Hafsa Furniture. All rights reserved.
          </p>
          <p className="text-foreground/40 text-xs tracking-widest uppercase mt-4 md:mt-0">
            Crafted with passion in Peshawar
          </p>
        </div>
      </div>
    </footer>
  );
}
