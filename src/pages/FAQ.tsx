import React, { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: "Do you offer custom furniture design?",
    a: "Yes. We make furniture to fit your space, style, and needs."
  },
  {
    q: "What types of wood do you use?",
    a: "We use walnut, oak, ash, mahogany, and teak. The right wood depends on the piece, the finish, and what you prefer."
  },
  {
    q: "How long does a custom piece take to make?",
    a: "Most custom pieces take 3 to 8 weeks after you approve the design. Larger or more detailed projects may take longer."
  },
  {
    q: "Do you deliver outside Peshawar?",
    a: "We mainly serve Peshawar and nearby areas. For larger projects, we can arrange delivery to other parts of Pakistan. Contact us for details."
  },
  {
    q: "Can you repair or polish my old furniture?",
    a: "Yes. We repair and polish old or worn furniture to help it look its best again."
  },
  {
    q: "How do I start a custom project?",
    a: "Contact us, email us, or visit our showroom at Tambowano Morh. We will talk about what you need, measure your space, and give you a quote."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full pt-28 sm:pt-32 pb-16 sm:pb-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Questions</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground mb-4 sm:mb-6">Common Questions</h1>
        </FadeIn>

        <StaggerContainer className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, i) => (
            <StaggerItem key={i}>
              <div className="border border-foreground/10 bg-foreground/[0.02]">
                <button
                  className="w-full text-left p-5 sm:p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <h3 className={`font-serif text-lg sm:text-xl md:text-2xl transition-colors ${openIndex === i ? 'text-primary' : 'text-foreground'}`}>
                    {faq.q}
                  </h3>
                  <div className="shrink-0 text-foreground/50">
                    {openIndex === i ? <Minus className="w-5 h-5 sm:w-6 sm:h-6" /> : <Plus className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 sm:px-6 md:px-8 pb-6 sm:pb-8 text-foreground/60 font-light leading-relaxed text-sm sm:text-base">
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
