import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { Link } from 'wouter';

import p1 from '@assets/generated_images/project1.jpg';
import p2 from '@assets/generated_images/project2.jpg';
import kitchen from '@assets/generated_images/kitchen.jpg';

const PROJECTS = [
  {
    id: 1,
    title: "Hayatabad Luxury Villa",
    type: "Full Home Interior",
    desc: "A complete bespoke furniture solution for a 2-kanal modern luxury villa, featuring custom walnut panelling, grand dining sets, and opulent bedroom suites.",
    img: p1
  },
  {
    id: 2,
    title: "Corporate Executive Suite",
    type: "Commercial Office",
    desc: "Premium executive furniture for a CEO's office in Peshawar. Highlighted by a massive mahogany desk, built-in library shelving, and leather seating.",
    img: p2
  },
  {
    id: 3,
    title: "Modern Minimalist Kitchen",
    type: "Kitchen & Cabinetry",
    desc: "A sleek, functional yet highly luxurious dark-themed kitchen with gold hardware and integrated high-end appliances.",
    img: kitchen
  }
];

export default function Projects() {
  return (
    <div className="w-full pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeIn className="text-center mb-24">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Case Studies</span>
          <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Our Projects.</h1>
        </FadeIn>

        <StaggerContainer className="space-y-32">
          {PROJECTS.map((project, index) => (
            <StaggerItem key={project.id} className={`flex flex-col gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
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
              <div className="w-full lg:w-2/5 space-y-6">
                <span className="text-primary text-xs uppercase tracking-widest">{project.type}</span>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground">{project.title}</h2>
                <p className="text-foreground/60 font-light leading-relaxed text-lg">
                  {project.desc}
                </p>
                <div className="pt-6">
                  <Link href="/contact" className="inline-block border-b border-primary text-primary pb-1 uppercase tracking-widest text-sm hover:text-foreground hover:border-foreground transition-colors">
                    Inquire About Similar Project
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
