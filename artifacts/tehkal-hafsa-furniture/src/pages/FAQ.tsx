import React, { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: "Do you offer custom furniture design?",
    a: "Yes, bespoke furniture is our specialty. We work closely with clients to design and craft pieces that perfectly fit their space, style preferences, and functional needs."
  },
  {
    q: "What types of wood do you use?",
    a: "We source only premium, durable woods including Walnut, Oak, Ash, Mahogany, and high-grade Teak. The choice of wood depends on the piece, the desired finish, and the client's preference."
  },
  {
    q: "How long does a custom piece take to make?",
    a: "Depending on the complexity and scale of the project, a bespoke piece typically takes between 3 to 8 weeks from final design approval to delivery. We prioritize uncompromised quality over speed."
  },
  {
    q: "Do you deliver outside Peshawar?",
    a: "While our primary focus is Peshawar and its surrounding areas, we can arrange specialized, secure delivery for major projects across Pakistan upon request."
  },
  {
    q: "Can you restore or polish existing furniture?",
    a: "Yes, our master craftsmen offer premium restoration and polishing services to revive antique or well-worn luxury pieces, bringing back their original luster."
  },
  {
    q: "How do I start a custom project?",
    a: "Simply reach out via our contact form, email, or visit our showroom at Tambowano Morh. We will schedule a consultation to discuss your vision, take measurements, and provide a quotation."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn className="text-center mb-20">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Information</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">FAQ.</h1>
        </FadeIn>

        <StaggerContainer className="space-y-4">
          {FAQS.map((faq, i) => (
            <StaggerItem key={i}>
              <div className="border border-white/10 bg-white/[0.02]">
                <button
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <h3 className={`font-serif text-xl md:text-2xl transition-colors ${openIndex === i ? 'text-primary' : 'text-white'}`}>
                    {faq.q}
                  </h3>
                  <div className="ml-6 shrink-0 text-white/50">
                    {openIndex === i ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 md:px-8 pb-8 text-white/60 font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
