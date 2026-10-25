import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { Ruler, Hammer, Paintbrush, Armchair } from 'lucide-react';
import projectImg from '@assets/generated_images/project2.jpg';

export default function Services() {
  const services = [
    {
      icon: <Hammer className="w-8 h-8 text-primary" />,
      title: "Custom Furniture",
      description: "We make furniture to fit your room, style, and needs. Choose from dining tables, storage, and more."
    },
    {
      icon: <Ruler className="w-8 h-8 text-primary" />,
      title: "Room Planning",
      description: "We help plan your room so the furniture fits well and works for the way you use the space."
    },
    {
      icon: <Armchair className="w-8 h-8 text-primary" />,
      title: "Furniture Covers & Fabrics",
      description: "Choose from imported fabrics, velvet, and real leather. We can cover old furniture or make new seats."
    },
    {
      icon: <Paintbrush className="w-8 h-8 text-primary" />,
      title: "Wood Repair & Polish",
      description: "We stain, polish, and repair wood furniture. Our finishes show the wood's natural pattern and help protect it."
    }
  ];

  return (
    <div className="w-full pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-24">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">What We Do</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground mb-4 sm:mb-6">Services.</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-base sm:text-lg font-light px-2">Furniture and woodworking services for your home or business.</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 sm:mb-24 lg:mb-32">
          <FadeIn direction="right">
            <img
              src={projectImg}
              alt="Furniture made for a project"
              className="w-full h-64 sm:h-80 lg:h-[600px] object-cover"
            />
          </FadeIn>
          
          <div className="flex flex-col justify-center">
            <StaggerContainer className="grid gap-8 sm:gap-10">
              {services.map((service, i) => (
                <StaggerItem key={i} className="flex gap-4 sm:gap-6 group">
                  <div className="shrink-0 mt-1 p-3 sm:p-4 bg-foreground/[0.02] border border-foreground/5 rounded-none group-hover:border-primary/50 transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-foreground/60 font-light leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
