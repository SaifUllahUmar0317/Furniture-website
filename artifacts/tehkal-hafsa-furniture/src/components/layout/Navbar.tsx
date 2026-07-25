import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/lib/theme-provider';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Projects', href: '/projects' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'FAQ', href: '/faq' },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start z-50 group">
          <span className="font-serif text-2xl tracking-widest uppercase text-foreground group-hover:text-primary transition-colors duration-500">
            Tehkal Hafsa
          </span>
          <span className="font-sans text-[0.65rem] tracking-[0.3em] text-primary uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
            Furniture
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-widest uppercase transition-all duration-300 hover:text-primary ${
                location === link.href ? 'text-primary' : 'text-foreground/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-4 p-2 text-foreground/70 hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            href="/contact"
            className="ml-4 px-6 py-2.5 border border-primary/50 text-primary uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-500"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 lg:hidden z-50">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-foreground/70 hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            className="text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-32 px-6 pb-12 flex flex-col overflow-y-auto lg:hidden"
          >
            <nav className="flex flex-col space-y-6 flex-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-serif text-3xl tracking-wide ${
                    location === link.href ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-8 mt-auto">
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
