import React from 'react';
import { Link } from 'wouter';
import { Facebook, MapPin, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02] z-0">
        <span className="font-serif text-[15vw] whitespace-nowrap tracking-tighter">TEHKAL HAFSA</span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
          
          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1 flex flex-col space-y-4 sm:space-y-6">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
              className="flex flex-col items-start group inline-block"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-widest uppercase text-foreground">
                Tehkal Hafsa
              </span>
              <span className="font-sans text-[0.7rem] tracking-[0.3em] text-primary uppercase mt-1">
                Furniture
              </span>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed mt-2 sm:mt-4">
              We make custom furniture and interiors in Peshawar. We have been doing this for over 10 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg sm:text-xl mb-4 sm:mb-6 text-foreground tracking-wide">Explore</h4>
            <ul className="space-y-3 sm:space-y-4">
              {['Home', 'About', 'Services', 'Products', 'Projects'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
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
            <h4 className="font-serif text-lg sm:text-xl mb-4 sm:mb-6 text-foreground tracking-wide">Information</h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { label: 'Gallery', path: '/gallery' },
                { label: 'Why Choose Us', path: '/why-us' },
                { label: 'Questions', path: '/faq' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms', path: '/terms' },
                { label: 'Admin Portal', path: '/admin' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
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
            <h4 className="font-serif text-lg sm:text-xl mb-4 sm:mb-6 text-foreground tracking-wide">Contact</h4>
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex items-start space-x-3 sm:space-x-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/60 text-sm leading-relaxed">
                  University Road, Tehkal Bala, Tambowano Morh,<br />Peshawar, Pakistan
                </span>
              </li>
              <li className="flex items-center space-x-3 sm:space-x-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                <a href="mailto:Roohk700@gmail.com" className="text-foreground/60 hover:text-primary transition-colors text-sm break-all">
                  Roohk700@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 sm:mt-8 flex items-center space-x-3 sm:space-x-4">
              <a
                href="https://www.facebook.com/marketplace/profile/100090837791388"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@tehkalhafsafurniture"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <FaTiktok size={16} />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <p className="text-foreground/40 text-xs tracking-widest uppercase text-center sm:text-left">
            &copy; {currentYear} Tehkal Hafsa Furniture. All rights reserved.
          </p>
          <p className="text-foreground/40 text-xs tracking-widest uppercase">
            Made in Peshawar
          </p>
        </div>
      </div>
    </footer>
  );
}
