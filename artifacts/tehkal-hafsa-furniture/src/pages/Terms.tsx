import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';

export default function Terms() {
  return (
    <div className="w-full pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn className="mb-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">Terms & Conditions</h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">Last Updated: October 2023</p>
        </FadeIn>

        <FadeIn delay={0.2} className="prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-headings:font-serif prose-a:text-primary max-w-none">
          <p>
            Welcome to Tehkal Hafsa Furniture. By accessing our services or commissioning bespoke furniture, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2>Bespoke Orders</h2>
          <p>
            All custom furniture orders require a formal quotation approval and an initial deposit before production begins. Once production has commenced, design alterations may incur additional costs and timeline extensions. As bespoke items are crafted specifically for you, they are non-refundable.
          </p>

          <h2>Materials and Finish</h2>
          <p>
            Wood is a natural material. Variations in grain, color, and texture are inherent and are celebrated as characteristics of fine, natural wood. While we strive to match finishes to samples, exact matches cannot be guaranteed. Over time, wood may respond to environmental changes such as humidity and sunlight.
          </p>

          <h2>Delivery and Installation</h2>
          <p>
            Delivery dates provided are estimates. While we make every effort to deliver your luxury pieces on time, Tehkal Hafsa Furniture is not liable for delays outside of our control. The client is responsible for ensuring that the items ordered can fit through doorways, hallways, and staircases.
          </p>

          <h2>Payments</h2>
          <p>
            A 50% deposit is standard for all custom orders. The remaining balance must be cleared prior to or upon delivery/installation. Goods remain the property of Tehkal Hafsa Furniture until full payment has been received.
          </p>

          <h2>Warranty</h2>
          <p>
            We take immense pride in our craftsmanship. Our furniture comes with a structural warranty against manufacturing defects. This warranty does not cover normal wear and tear, damage caused by negligence, improper cleaning, or environmental factors beyond our control.
          </p>

          <h2>Contact</h2>
          <p>
            For any queries regarding these terms, please visit our showroom at University Road, Tehkal Bala, Tambowano Morh, Peshawar, or email us at Roohk700@gmail.com.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
