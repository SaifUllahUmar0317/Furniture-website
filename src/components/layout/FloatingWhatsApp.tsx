import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '923165960886';
  const defaultMessage = encodeURIComponent(
    'Hello Tehkal Hafsa Furniture, I would like to inquire about your furniture and interior services.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp Chat" className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Tooltip prompt like a chatbot */}
      <div
        className={`mr-3 hidden sm:flex items-center gap-2.5 bg-card/95 backdrop-blur-md border border-border text-foreground px-4 py-2.5 rounded-full shadow-2xl text-xs font-medium transition-all duration-300 pointer-events-none select-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
        <span>Chat on WhatsApp</span>
        <span className="text-[10px] text-muted-foreground font-light font-mono">0316-5960886</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with Tehkal Hafsa Furniture on WhatsApp (03165960886)"
        title="Chat on WhatsApp (03165960886)"
      >
        {/* Soft pulse animation around the button */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* Official WhatsApp Icon */}
        <FaWhatsapp className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-110" />
      </a>
    </aside>
  );
}
