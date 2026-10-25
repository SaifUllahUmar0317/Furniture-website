import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { ShieldCheck, Lock, Eye, FileText, Mail, MapPin } from 'lucide-react';
import { Link } from 'wouter';

export default function Privacy() {
  return (
    <div className="w-full pt-28 sm:pt-36 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Header Header */}
        <FadeIn className="text-center mb-12 sm:mb-16">
          <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium block mb-3">
            Legal & Transparency
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-foreground/50 text-xs sm:text-sm tracking-widest uppercase font-mono">
            Last Updated: October 2026 · Tehkal Hafsa Furniture
          </p>
        </FadeIn>

        {/* Content Body */}
        <FadeIn delay={0.15}>
          <div className="bg-card border border-border p-6 sm:p-10 md:p-12 shadow-xl space-y-10 rounded-sm">
            
            {/* Intro */}
            <div className="pb-8 border-b border-border/60">
              <p className="text-base sm:text-lg leading-relaxed text-foreground/80 font-light">
                At <span className="font-medium text-foreground">Tehkal Hafsa Furniture</span>, we deeply value your trust and are committed to protecting your privacy. This policy explains what information we collect when you browse our catalog or request a custom order, and how we handle and protect that information.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  1. Information We Collect
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                We only collect information that is genuinely necessary to fulfill your custom furniture orders, provide design consultations, or respond to your inquiries.
              </p>
              <div className="bg-muted/40 border border-border/60 p-4 sm:p-5 rounded-sm space-y-2">
                <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Information You Provide Directly:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/75 leading-relaxed marker:text-primary">
                  <li><strong>Full Name & Contact Details:</strong> Name, phone / WhatsApp number, and email address.</li>
                  <li><strong>Delivery & Room Details:</strong> Delivery address, city, and room dimensions for custom fit-outs.</li>
                  <li><strong>Order Specifications:</strong> Wood preferences (walnut, oak, mahogany), upholstery fabrics, custom sizing, and polish finish notes.</li>
                  <li><strong>Correspondence:</strong> Messages sent through our website contact form or direct email communications.</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  2. How We Use Your Information
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                We use the information collected exclusively for legitimate craftsmanship and customer service purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2.5 text-sm sm:text-base text-foreground/75 leading-relaxed marker:text-primary">
                <li>Providing customized quotes, pricing, and woodwork feasibility assessments.</li>
                <li>Processing, manufacturing, and scheduling delivery or on-site installation of furniture pieces.</li>
                <li>Communicating project milestones, order progress updates, and timeline confirmations.</li>
                <li>Improving our catalog, showroom offerings, and website usability for our clients.</li>
                <li>Direct communication regarding after-sales warranty, wood polishing maintenance, or service inquiries.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  3. Information Security & Website Logs
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                Like most modern web services, our hosting infrastructure maintains standard server logs (such as general browser type, date/time stamps, and page request routes) to maintain uptime and prevent unauthorized system abuse. These technical logs are non-personal and are not linked to your identity.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                We implement industry-standard cryptographic protection (including SHA-256 data protection and encrypted HTTPS transfers) to ensure client records and workshop orders remain strictly confidential. We do not sell, rent, or trade your personal information to third parties.
              </p>
            </section>

            {/* Section 4 */}
            <section className="pt-6 border-t border-border/60 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  4. Contact & Inquiries
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                If you have questions, corrections, or requests regarding this Privacy Policy or how your order details are managed, please reach out to our workshop team:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-muted/30 border border-border/50">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Direct Workshop Email</span>
                  <a href="mailto:Roohk700@gmail.com" className="text-sm font-medium text-primary hover:underline">
                    Roohk700@gmail.com
                  </a>
                </div>
                <div className="p-4 bg-muted/30 border border-border/50">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Showroom Location</span>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    Tambowano Morh, University Road, Tehkal Bala, Peshawar, Pakistan
                  </p>
                </div>
              </div>
            </section>

          </div>
        </FadeIn>
      </div>
    </div>
  );
}
