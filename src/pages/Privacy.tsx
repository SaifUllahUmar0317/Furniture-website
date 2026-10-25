import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';

export default function Privacy() {
  return (
    <div className="w-full pt-28 sm:pt-32 pb-16 sm:pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <FadeIn className="mb-10 sm:mb-16 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">Privacy Policy</h1>
          <p className="text-foreground/50 text-xs sm:text-sm tracking-widest uppercase">Last Updated: October 2023</p>
        </FadeIn>

        <FadeIn delay={0.2} className="prose prose-p:text-foreground/70 prose-headings:text-foreground prose-headings:font-serif prose-a:text-primary dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed">
          <p>
            We care about your privacy. This policy explains what information Tehkal Hafsa Furniture collects and how we use it.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When we ask for your information, we will explain what we need it for.
          </p>
          <p>
            If you contact us through a form or by email, we may receive your name, email address, phone number, message, any files you attach, and other details you choose to share.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Improve our products and services</li>
            <li>Learn how people use our website</li>
            <li>Plan new products, services, and features</li>
            <li>Contact you about service questions and updates to your custom orders, either ourselves or through our partners</li>
          </ul>

          <h2>Website Logs</h2>
          <p>
            Like many websites, we keep records when people visit. These may include IP addresses (internet addresses), browser type, internet provider, date and time, pages visited, and clicks. We do not link these records to information that identifies you.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this policy, email us at Roohk700@gmail.com.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
