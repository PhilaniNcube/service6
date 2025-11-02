
import React from "react";
import { Navigation } from "./_components/navigation";
import { Footer } from "./_components/footer";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
