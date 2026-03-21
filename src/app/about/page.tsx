
"use client";

import Image from "next/image";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { History } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SITE_DATA } from "@/data/site-data";

export default function AboutPage() {
  const courtImage = PlaceHolderImages.find(img => img.id === 'court-room');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <section className="bg-primary text-white py-20 lg:py-32 hero-gradient">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-8">
              Building the Bedrock of <span className="text-accent">Modern Justice</span>
            </h1>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-primary font-headline font-bold text-sm uppercase tracking-widest">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {SITE_DATA.about.mission}
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
                  <Image 
                    src={courtImage?.imageUrl || "https://picsum.photos/seed/court/800/600"} 
                    alt="Our Vision" 
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <History className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">A Legacy of Innovation</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {SITE_DATA.about.history}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
