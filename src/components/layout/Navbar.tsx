import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/lib/theme-provider';
import { Sun, Moon, Menu, X, Shield, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const PRIMARY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
];

const ABOUT_LINKS = [
  { label: 'About Us', href: '/about', desc: 'Craftsmanship & workshop heritage in Peshawar' },
  { label: 'Our Services', href: '/services', desc: 'Bespoke furniture, carving & interior fit-outs' },
  { label: 'Why Choose Us', href: '/why-us', desc: 'Seasoned solid wood & guaranteed durability' },
  { label: 'Questions & FAQ', href: '/faq', desc: 'Orders, custom sizing, polish & delivery' },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { theme, setTheme } = useTheme();
  const isAboutActive = ABOUT_LINKS.some((item) => location === item.href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
  }, [location]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-border py-3 sm:py-3.5 shadow-sm'
          : 'bg-background/80 backdrop-blur-xl border-border/50 py-3 sm:py-3.5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="z-50 flex shrink-0 flex-col items-start whitespace-nowrap group">
          <span className="font-serif text-xl tracking-[0.08em] uppercase whitespace-nowrap transition-colors duration-300 xl:text-2xl text-foreground group-hover:text-primary">
            Tehkal Hafsa
          </span>
          <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-primary">
            Furniture
          </span>
        </Link>

        {/* Clean, Decongested Desktop Navigation */}
        <nav className="hidden items-center gap-6 whitespace-nowrap lg:flex xl:gap-8">
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 whitespace-nowrap text-xs tracking-[0.14em] uppercase transition-all duration-300 hover:text-primary ${
                location === link.href || (link.href === '/products' && location.startsWith('/products/'))
                  ? 'text-primary font-medium'
                  : 'text-foreground/75'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* About / Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setAboutDropdownOpen((prev) => !prev)}
              className={`shrink-0 flex items-center gap-1.5 text-xs tracking-[0.14em] uppercase transition-all duration-300 hover:text-primary focus:outline-none ${
                isAboutActive
                  ? 'text-primary font-medium'
                  : 'text-foreground/75'
              }`}
              aria-expanded={aboutDropdownOpen}
            >
              <span>About</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180 text-primary' : ''}`}
              />
            </button>

            <AnimatePresence>
              {aboutDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 z-50"
                >
                  <div className="bg-card/95 backdrop-blur-2xl border border-border shadow-2xl p-2 rounded-none">
                    {ABOUT_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setAboutDropdownOpen(false)}
                        className={`block p-2.5 transition-colors group ${
                          location === item.href
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <div className="text-xs uppercase tracking-wider font-medium group-hover:text-primary transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-muted-foreground/80 font-light mt-0.5 line-clamp-1">
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3 border-l border-border/40 pl-5">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 transition-colors focus:outline-none rounded-full hover:bg-muted/50 text-foreground/70 hover:text-primary"
              aria-label="Toggle Theme"
              title="Toggle dark/light theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Admin Portal Icon */}
            <Link
              href="/admin"
              title="Admin Workshop Portal"
              aria-label="Admin Portal"
              className={`p-2 transition-colors focus:outline-none rounded-full hover:bg-muted/50 ${
                location === '/admin'
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground/70 hover:text-primary'
              }`}
            >
              <Shield size={17} />
            </Link>

            {/* Contact Us CTA Button */}
            <Link
              href="/contact"
              className="shrink-0 whitespace-nowrap px-4 py-2 text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contact Us
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle & Admin Link */}
        <div className="flex items-center space-x-2 lg:hidden z-50">
          <Link
            href="/admin"
            className={`p-1.5 transition-colors ${
              location === '/admin'
                ? 'text-primary'
                : 'text-foreground/80 hover:text-primary'
            }`}
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <Shield size={19} />
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 transition-colors focus:outline-none text-foreground/80 hover:text-primary"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            className="p-1.5 transition-colors text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-28 px-6 pb-12 flex flex-col overflow-y-auto lg:hidden"
          >
            <nav className="flex flex-col space-y-5 flex-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">
                Navigation
              </span>

              {PRIMARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-serif text-2xl tracking-wide ${
                    location === link.href ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-border/50">
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium block mb-3">
                  Company & Craft
                </span>
                <div className="space-y-3">
                  {ABOUT_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block font-serif text-lg tracking-wide ${
                        location === link.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Admin Link in Mobile Drawer */}
              <Link
                href="/admin"
                className={`flex items-center gap-2.5 font-serif text-xl tracking-wide pt-4 border-t border-border/50 ${
                  location === '/admin' ? 'text-primary' : 'text-foreground/60'
                }`}
              >
                <Shield size={20} />
                <span>Admin Portal</span>
              </Link>

              <div className="pt-6 mt-auto">
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3.5 bg-primary text-primary-foreground uppercase tracking-widest text-xs font-semibold hover:bg-primary/90 transition-colors"
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
