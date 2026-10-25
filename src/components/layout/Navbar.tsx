import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/lib/theme-provider';
import { Sun, Moon, Menu, X, Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Projects', href: '/projects' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Questions', href: '/faq' },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isTransparentHero = location === '/' && !isScrolled;
  const isLightHero = isTransparentHero && theme === 'light';

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
        <Link href="/" className="z-50 flex shrink-0 flex-col items-start whitespace-nowrap group">
          <span className={`font-serif text-xl tracking-[0.08em] uppercase whitespace-nowrap transition-colors duration-500 2xl:text-2xl ${
            isLightHero ? 'text-[#FAF7EF] group-hover:text-[#C6A45C]' : 'text-foreground group-hover:text-primary'
          }`}>
            Tehkal Hafsa
          </span>
          <span className={`font-sans text-[0.65rem] tracking-[0.3em] uppercase ${
            isLightHero ? 'text-[#B88D3B]' : 'text-primary'
          }`}>
            Furniture
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-3 whitespace-nowrap lg:flex xl:gap-4 2xl:gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 whitespace-nowrap text-[0.7rem] tracking-[0.12em] uppercase transition-all duration-300 hover:text-primary xl:text-xs 2xl:text-sm ${
                location === link.href || (link.href === '/products' && location.startsWith('/products/'))
                  ? isLightHero ? 'text-[#B88D3B]' : 'text-primary'
                  : isLightHero ? 'text-[#FAF7EF]/85' : 'text-foreground/70'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`shrink-0 p-2 transition-colors focus:outline-none ${
              isLightHero ? 'text-[#FAF7EF]/85 hover:text-[#C6A45C]' : 'text-foreground/70 hover:text-primary'
            }`}
            aria-label="Toggle Theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Admin Portal Button */}
          <Link
            href="/admin"
            title="Admin Management Portal"
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 border text-[0.7rem] tracking-[0.12em] uppercase transition-all duration-300 xl:text-xs ${
              location === '/admin'
                ? 'border-primary bg-primary text-primary-foreground font-semibold'
                : isLightHero
                ? 'border-[#FAF7EF]/40 text-[#FAF7EF] hover:border-[#C6A45C] hover:text-[#C6A45C]'
                : 'border-border text-foreground/80 hover:border-primary hover:text-primary'
            }`}
          >
            <Shield size={14} className="text-primary" />
            <span>Admin</span>
          </Link>

          <Link
            href="/contact"
            className={`shrink-0 whitespace-nowrap px-4 py-2.5 text-xs uppercase tracking-[0.1em] transition-all duration-500 2xl:px-6 ${
              isTransparentHero && theme === 'light'
                ? 'border border-primary bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Toggle & Admin Link */}
        <div className="flex items-center space-x-3 lg:hidden z-50">
          <Link
            href="/admin"
            className={`p-1.5 transition-colors ${
              location === '/admin' ? 'text-primary' : isLightHero && !mobileMenuOpen ? 'text-[#FAF7EF]/85' : 'text-foreground/70'
            }`}
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <Shield size={20} />
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-1.5 transition-colors focus:outline-none ${
              isLightHero && !mobileMenuOpen
                ? 'text-[#FAF7EF]/85 hover:text-[#C6A45C]'
                : 'text-foreground/70 hover:text-primary'
            }`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`p-1.5 transition-colors ${
              isLightHero && !mobileMenuOpen
                ? 'text-[#FAF7EF] hover:text-[#C6A45C]'
                : 'text-foreground hover:text-primary'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
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

              {/* Admin Link in Mobile Drawer */}
              <Link
                href="/admin"
                className={`flex items-center gap-3 font-serif text-3xl tracking-wide pt-4 border-t border-border ${
                  location === '/admin' ? 'text-primary' : 'text-primary/80'
                }`}
              >
                <Shield size={24} />
                <span>Admin Portal</span>
              </Link>

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
