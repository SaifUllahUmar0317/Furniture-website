import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';

export default function Privacy() {
  return (
    <div className="w-full pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn className="mb-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Privacy Policy</h1>
          <p className="text-foreground/50 text-sm tracking-widest uppercase">Last Updated: October 2023</p>
        </FadeIn>

        <FadeIn delay={0.2} className="prose prose-p:text-foreground/70 prose-headings:text-foreground prose-headings:font-serif prose-a:text-primary dark:prose-invert max-w-none">
          <p>
            At Tehkal Hafsa Furniture, accessible from our showroom and website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Tehkal Hafsa Furniture and how we use it.
          </p>

          <h2>Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly via our website forms or email, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul>
            <li>Provide, operate, and maintain our services</li>
            <li>Improve, personalize, and expand our offerings</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to your custom orders.</li>
          </ul>

          <h2>Log Files</h2>
          <p>
            Tehkal Hafsa Furniture follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at Roohk700@gmail.com.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
