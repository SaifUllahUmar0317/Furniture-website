import React, { useState } from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { MapPin, Mail, Clock, ArrowRight } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="w-full pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeIn className="text-center mb-24">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Get In Touch</span>
          <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Contact Us.</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg font-light">
            Begin your journey towards bespoke luxury. Visit our showroom or send us a message.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <FadeIn direction="right" className="space-y-12">
            <div>
              <h3 className="font-serif text-3xl text-foreground mb-8">Showroom & Workshop</h3>
              <ul className="space-y-8">
                <li className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground uppercase tracking-widest text-xs mb-2">Location</h4>
                    <p className="text-foreground/60 font-light leading-relaxed">
                      University Road, Tehkal Bala,<br />
                      Tambowano Morh, Peshawar,<br />
                      Khyber Pakhtunkhwa, Pakistan
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground uppercase tracking-widest text-xs mb-2">Email</h4>
                    <a href="mailto:Roohk700@gmail.com" className="text-foreground/60 font-light hover:text-primary transition-colors">
                      Roohk700@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground uppercase tracking-widest text-xs mb-2">Hours</h4>
                    <p className="text-foreground/60 font-light">
                      Monday - Saturday<br />
                      10:00 AM - 8:00 PM<br />
                      <span className="text-foreground/40 text-sm italic">Closed on Sundays</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground uppercase tracking-widest text-xs mb-6">Follow Our Craft</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/marketplace/profile/100090837791388"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 border border-foreground/20 flex items-center justify-center text-foreground/70 hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@tehkalhafsafurniture"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 border border-foreground/20 flex items-center justify-center text-foreground/70 hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <FaTiktok size={20} />
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="bg-card border border-foreground/5 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
              
              <h3 className="font-serif text-3xl text-foreground mb-8">Send an Inquiry</h3>
              
              {formStatus === 'success' ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  </div>
                  <h4 className="font-serif text-2xl text-foreground">Inquiry Received</h4>
                  <p className="text-foreground/60 font-light">Our design team will contact you shortly to discuss your project.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-primary text-sm uppercase tracking-widest hover:text-foreground transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-foreground/50 text-[0.65rem] uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-foreground/[0.02] border-b border-foreground/20 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none placeholder:text-foreground/30"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-foreground/50 text-[0.65rem] uppercase tracking-widest ml-1">Phone / WhatsApp</label>
                      <input 
                        required
                        type="tel" 
                        className="w-full bg-foreground/[0.02] border-b border-foreground/20 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none placeholder:text-foreground/30"
                        placeholder="+92 300 0000000"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-foreground/50 text-[0.65rem] uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-foreground/[0.02] border-b border-foreground/20 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none placeholder:text-foreground/30"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-foreground/50 text-[0.65rem] uppercase tracking-widest ml-1">Project Details</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full bg-foreground/[0.02] border-b border-foreground/20 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none placeholder:text-foreground/30 resize-none"
                      placeholder="Tell us about the furniture piece or interior project you have in mind..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-primary hover:bg-foreground text-primary-foreground hover:text-background py-4 uppercase tracking-widest text-sm font-medium transition-colors flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                    {formStatus !== 'submitting' && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
