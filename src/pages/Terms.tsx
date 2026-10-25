import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { FileText, Hammer, Sparkles, Truck, CreditCard, ShieldAlert, Mail } from 'lucide-react';

export default function Terms() {
  return (
    <div className="w-full pt-28 sm:pt-36 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Header Header */}
        <FadeIn className="text-center mb-12 sm:mb-16">
          <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium block mb-3">
            Service Agreement & Workshop Terms
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
            Terms of Service
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
                Welcome to <span className="font-medium text-foreground">Tehkal Hafsa Furniture</span>. By commissioning bespoke furniture, ordering showroom pieces, or utilizing our interior fit-out services, you agree to the following craftsmanship, delivery, and payment terms outlined below.
              </p>
            </div>

            {/* Section 1: Custom Orders */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Hammer className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  1. Custom Orders & Design Approvals
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                Each bespoke furniture piece is crafted specifically for your home or commercial space according to agreed dimensions, wood selections, and finish specifications:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/75 leading-relaxed marker:text-primary">
                <li>Work begins only after official approval of measurements, material choices, and receipt of the advance commitment deposit.</li>
                <li>Design alterations requested after timber cutting or structural joinery has begun may incur additional costs and adjust estimated completion dates.</li>
                <li>Because custom items are individually tailored to specific client dimensions, custom orders are non-refundable once manufacturing commences.</li>
              </ul>
            </section>

            {/* Section 2: Materials & Finish */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  2. Natural Wood Characteristics & Finishes
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                We work primarily with premium natural solid woods including walnut (اخروٹ), oak, ash, mahogany, and teak:
              </p>
              <div className="bg-muted/40 border border-border/60 p-4 sm:p-5 rounded-sm space-y-2">
                <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Natural Wood Notice:
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed font-light">
                  Solid wood is an organic material exhibiting natural variations in grain texture, knots, and color tones. While our master craftsmen strive to closely replicate showroom samples and color swatches, natural timber will naturally display its unique individual character.
                </p>
              </div>
            </section>

            {/* Section 3: Delivery & Installation */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  3. Delivery, Logistics & On-Site Installation
                </h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/75 leading-relaxed marker:text-primary">
                <li><strong>Delivery Timelines:</strong> Estimated timelines (typically 3 to 8 weeks depending on carving and finishing complexity) are provided in good faith. We endeavor to deliver promptly.</li>
                <li><strong>Site Access:</strong> Clients are responsible for ensuring doorways, hallways, stairwells, and elevators can accommodate the ordered furniture pieces.</li>
                <li><strong>Installation:</strong> For built-in wardrobes, executive desks, and full-room paneling, our workshop team provides on-site fit-out and final adjustment in Peshawar and surrounding regions.</li>
              </ul>
            </section>

            {/* Section 4: Payments */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  4. Payment Schedule & Title of Ownership
                </h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/75 leading-relaxed marker:text-primary">
                <li>Custom orders standardly require an advance deposit (typically 50%) to procure dedicated hardwood stock and initiate workshop labor.</li>
                <li>The remaining balance is payable upon final workshop inspection or upon delivery/installation.</li>
                <li>All products remain the property of Tehkal Hafsa Furniture until total invoice amounts are settled in full.</li>
              </ul>
            </section>

            {/* Section 5: Warranty */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  5. Craftsmanship Guarantee & Warranty
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                We stand behind our workmanship. Our structural warranty covers frame integrity, mortise-and-tenon joints, and manufacturing defects:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/75 leading-relaxed marker:text-primary">
                <li><strong>Covered:</strong> Structural joint loosening, frame warping attributable to improper initial curing, and manufacturing defects.</li>
                <li><strong>Excluded:</strong> Normal cosmetic wear and tear, accidental liquid damage, improper harsh chemical cleaning, or direct exposure to extreme rain/sunlight.</li>
              </ul>
            </section>

            {/* Section 6: Contact */}
            <section className="pt-6 border-t border-border/60 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                  6. Contact & Workshop Location
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                For questions regarding these terms, to inspect wood finishes, or to discuss an upcoming project, visit our workshop or contact us:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-muted/30 border border-border/50">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Showroom & Workshop</span>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    University Road, Tehkal Bala, Tambowano Morh, Peshawar, Khyber Pakhtunkhwa, Pakistan
                  </p>
                </div>
                <div className="p-4 bg-muted/30 border border-border/50">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Direct Communication</span>
                  <a href="mailto:Roohk700@gmail.com" className="text-sm font-medium text-primary hover:underline block">
                    Roohk700@gmail.com
                  </a>
                  <a href="https://wa.me/923165960886" className="text-xs text-muted-foreground hover:text-foreground mt-1 inline-block">
                    WhatsApp: +92 316 5960886
                  </a>
                </div>
              </div>
            </section>

          </div>
        </FadeIn>
      </div>
    </div>
  );
}
