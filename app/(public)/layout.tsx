
import React from "react";
import { Navigation } from "@/features/public/components/navigation";
import { Footer } from "@/features/public/components/footer";
import { ContactForm } from "@/features/public/components/contact-form";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="public-route-wrapper">
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <ContactForm />
      <Footer />
    </div>
  );
};

export default PublicLayout;
