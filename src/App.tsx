import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Noise } from '@/components/layout/Noise';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Gallery from '@/pages/Gallery';
import Projects from '@/pages/Projects';
import WhyUs from '@/pages/WhyUs';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/not-found';
import Admin from '@/pages/Admin';

import { ThemeProvider } from '@/lib/theme-provider';

const queryClient = new QueryClient();

// Automatically scroll to the top of the page on any route navigation
function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Disable smooth scrolling temporarily to jump immediately to the top of the page
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Restore standard smooth scroll behavior for in-page anchors
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 60);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
}

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
      <ScrollToTop />
      <Noise />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/products" component={Products} />
          <Route path="/products/:slug" component={ProductDetail} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/projects" component={Projects} />
          <Route path="/why-us" component={WhyUs} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      {/* Floating WhatsApp Action Button on Every Page */}
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="tehkal-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <WouterRouter>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
