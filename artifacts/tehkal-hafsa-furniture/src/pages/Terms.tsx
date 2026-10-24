import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';

export default function Terms() {
  return (
    <div className="w-full pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn className="mb-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Terms</h1>
          <p className="text-foreground/50 text-sm tracking-widest uppercase">Last Updated: October 2023</p>
        </FadeIn>

        <FadeIn delay={0.2} className="prose prose-p:text-foreground/70 prose-headings:text-foreground prose-headings:font-serif prose-a:text-primary dark:prose-invert max-w-none">
          <p>
            If you use our services or order custom furniture, you agree to these terms.
          </p>

          <h2>Custom Orders</h2>
          <p>
            Before we start work, you must approve a quote and pay a deposit. Changes after work starts may cost extra and take longer. Custom items are made for you and cannot be refunded.
          </p>

          <h2>Materials and Finish</h2>
          <p>
            Wood is natural, so its lines, color, and texture can vary. We try to match the finish to a sample, but an exact match is not guaranteed. Humidity and sunlight may also change the wood over time.
          </p>

          <h2>Delivery and Installation</h2>
          <p>
            Delivery dates are estimates. We will try to deliver on time, but we are not responsible for delays we cannot control. Please make sure the furniture can fit through your doors, hallways, and stairs.
          </p>

          <h2>Payments</h2>
          <p>
            Custom orders usually need a 50% deposit. Pay the rest before or when we deliver or install the furniture. The furniture remains ours until you have paid in full.
          </p>

          <h2>Warranty</h2>
          <p>
            Our warranty covers frame or build problems caused during manufacturing. It does not cover everyday wear, damage caused by carelessness, incorrect cleaning, or conditions outside our control.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about these terms, visit our showroom at University Road, Tehkal Bala, Tambowano Morh, Peshawar, or email us at Roohk700@gmail.com.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
