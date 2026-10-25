import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { Award, Clock, ShieldCheck, Leaf } from 'lucide-react';
import aboutImg from '@assets/generated_images/about.jpg';

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
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={aboutImg} alt="Furniture being made" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
