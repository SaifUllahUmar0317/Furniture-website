import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { Award, Clock, ShieldCheck, Leaf } from 'lucide-react';
import aboutImg from '@assets/generated_images/owner_about.jpg';

export default function WhyUs() {
  const reasons = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Skilled Craft",
      desc: "Our team has years of woodworking experience. We carefully cut, join, and finish each piece."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Made to Last",
      desc: "We combine classic woodworking methods with simple, modern designs."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Quality Checks",
      desc: "We check each piece from the raw wood to the final finish."
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Responsible Wood Choices",
      desc: "We choose durable wood from responsible sources and work to reduce harm to the environment."
    }
  ];

  return (
    <div className="w-full pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeIn className="text-center mb-24">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Why Tehkal Hafsa</span>
          <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Why Choose Us?</h1>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <StaggerContainer className="space-y-12">
            {reasons.map((reason, i) => (
              <StaggerItem key={i} className="flex gap-6">
                <div className="shrink-0 mt-2">
                  <div className="w-16 h-16 rounded-full border border-foreground/10 flex items-center justify-center bg-foreground/[0.02]">
                    {reason.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">{reason.title}</h3>
                  <p className="text-foreground/60 font-light leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <FadeIn direction="left">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm group shadow-2xl">
              <img
                src={aboutImg}
                alt="Tehkal Hafsa Furniture owner and master craftsman at workshop"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <p className="text-white/95 font-serif text-xl leading-snug">Handcrafted in Peshawar</p>
                <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Direct from Our Workshop</p>
              </div>
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-primary/30 pointer-events-none" />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
