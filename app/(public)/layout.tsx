
import React from "react";
import { Navigation } from "./_components/navigation";
import { Footer } from "./_components/footer";
import { ContactForm } from "./_components/contact-form";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <ContactForm />
      <Footer />
    </div>
  );
};

export default PublicLayout;
