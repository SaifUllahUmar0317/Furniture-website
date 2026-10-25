import React from 'react';
import { useLiveProjects } from '@/lib/admin-store';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { Link } from 'wouter';

import p1 from '@assets/generated_images/project1.jpg';
import p2 from '@assets/generated_images/project2.jpg';
import kitchen from '@assets/generated_images/kitchen.jpg';

const PROJECTS = [
  {
    id: 1,
    title: "Hayatabad Villa",
    type: "Whole-home furniture",
    desc: "Custom furniture for a modern 2-kanal villa in Hayatabad. It includes walnut wall panels, a dining set, and bedroom furniture.",
    img: p1
  },
  {
    id: 2,
    title: "Executive Office",
    type: "Office furniture",
    desc: "Furniture for a CEO's office in Peshawar, including a large mahogany desk, built-in bookshelves, and leather chairs.",
    img: p2
  },
  {
    id: 3,
    title: "Modern Kitchen",
    type: "Kitchen & cabinets",
    desc: "A modern dark kitchen with gold handles and built-in appliances.",
    img: kitchen
  }
];

export default function Projects() {
  const [projects] = useLiveProjects();
  return (
    <div className="w-full pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-24">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Our Work</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground mb-4 sm:mb-6">Our Projects</h1>
        </FadeIn>

        <StaggerContainer className="space-y-16 sm:space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <StaggerItem key={project.id} className={`flex flex-col gap-8 sm:gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              <div className="w-full lg:w-3/5">
                <div className="relative aspect-[16/9] overflow-hidden group">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-foreground/10 m-4 pointer-events-none" />
                </div>
              </div>
              <div className="w-full lg:w-2/5 space-y-4 sm:space-y-6">
                <span className="text-primary text-xs uppercase tracking-widest">{project.type}</span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground">{project.title}</h2>
                <p className="text-foreground/60 font-light leading-relaxed text-base sm:text-lg">
                  {project.desc}
                </p>
                <div className="pt-4 sm:pt-6">
                  <Link href="/contact" className="inline-block border-b border-primary text-primary pb-1 uppercase tracking-widest text-sm hover:text-foreground hover:border-foreground transition-colors">
                    Ask About a Similar Project
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
