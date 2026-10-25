import React, { useState } from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { MapPin, Mail, Clock, ArrowRight } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const rawFormId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xzeebqnz';
    const formSlug = rawFormId.replace(/^https?:\/\/formspree\.io\/f\//, '').trim();
    const endpoint = rawFormId.startsWith('http') && !rawFormId.includes('formspree.io/f/')
      ? rawFormId
      : `https://formspree.io/f/${encodeURIComponent(formSlug)}`;

    try {
      const formData = new FormData(e.currentTarget);
      const customerEmail = formData.get('email');
      const customerName = formData.get('name') ?? 'a visitor';
      
      // Formspree special fields
      formData.set('_subject', `New Website Enquiry from ${customerName} — Tehkal Hafsa Furniture`);
      if (typeof customerEmail === 'string' && customerEmail) {
        formData.append('_replyto', customerEmail);
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setFormStatus('success');
    } catch {
      setFormStatus('idle');
      alert('Could not send message. Please reach out to us directly via WhatsApp (+92 316 5960886) or email (Roohk700@gmail.com).');
    }
  };

  return (
    <div className="w-full pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block font-medium">Contact Us</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground mb-4 sm:mb-6">Contact Us</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-base sm:text-lg font-light px-2">
            Visit our showroom or send us a message.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20">
          <FadeIn direction="right" className="space-y-8 sm:space-y-12">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-6 sm:mb-8">Visit Our Workshop</h3>
              <ul className="space-y-6 sm:space-y-8">
                <li className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center shrink-0 bg-card">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground uppercase tracking-widest text-xs font-semibold mb-2">Location</h4>
                    <p className="text-foreground/75 font-light leading-relaxed text-sm sm:text-base">
                      University Road, Tehkal Bala,<br />
                      Tambowano Morh, Peshawar,<br />
                      Khyber Pakhtunkhwa, Pakistan
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center shrink-0 bg-card">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground uppercase tracking-widest text-xs font-semibold mb-2">Email</h4>
                    <a href="mailto:Roohk700@gmail.com" className="text-foreground/75 font-light hover:text-primary transition-colors text-sm sm:text-base break-all">
                      Roohk700@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center shrink-0 bg-card">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground uppercase tracking-widest text-xs font-semibold mb-2">Hours</h4>
                    <p className="text-foreground/75 font-light text-sm sm:text-base">
                      Monday - Saturday<br />
                      10:00 AM - 8:00 PM<br />
                      <span className="text-muted-foreground text-sm italic">Closed on Sundays</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground uppercase tracking-widest text-xs font-semibold mb-4 sm:mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/marketplace/profile/100090837791388"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 border border-border flex items-center justify-center text-foreground/80 hover:border-primary hover:text-primary hover:bg-card transition-all duration-300"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@tehkalhafsafurniture"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 border border-border flex items-center justify-center text-foreground/80 hover:border-primary hover:text-primary hover:bg-card transition-all duration-300"
                >
                  <FaTiktok size={18} />
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="bg-card border border-border shadow-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
              
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-6 sm:mb-8">Send a Message</h3>
              
              {formStatus === 'success' ? (
                <div className="h-full min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-foreground">Message Sent</h4>
                  <p className="text-foreground/75 font-light">We will contact you soon about your project.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-primary text-sm uppercase tracking-widest hover:text-foreground transition-colors font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10">
                  {/* Formspree hidden routing fields */}
                  <input type="hidden" name="_subject" value="New Website Enquiry — Tehkal Hafsa Furniture" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-widest font-medium text-foreground ml-0.5">
                        Full Name *
                      </label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 sm:py-3.5 text-sm text-foreground focus:outline-none transition-all placeholder:text-muted-foreground/70"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-widest font-medium text-foreground ml-0.5">
                        Phone / WhatsApp *
                      </label>
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 sm:py-3.5 text-sm text-foreground focus:outline-none transition-all placeholder:text-muted-foreground/70"
                        placeholder="+92 300 0000000"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-medium text-foreground ml-0.5">
                      Email Address
                    </label>
                    <input 
                      name="email"
                      type="email" 
                      className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 sm:py-3.5 text-sm text-foreground focus:outline-none transition-all placeholder:text-muted-foreground/70"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-medium text-foreground ml-0.5">
                      What do you need? *
                    </label>
                    <textarea 
                      required
                      name="message"
                      rows={4}
                      className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 sm:py-3.5 text-sm text-foreground focus:outline-none transition-all placeholder:text-muted-foreground/70 resize-none"
                      placeholder="Tell us what furniture or room you need help with."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-primary hover:bg-foreground text-primary-foreground hover:text-background py-3.5 sm:py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
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
