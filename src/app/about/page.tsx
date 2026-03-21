
"use client";

import Image from "next/image";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { History, Target, Shield } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SITE_DATA } from "@/data/site-data";

export default function AboutPage() {
  const courtImage = PlaceHolderImages.find(img => img.id === 'court-room');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <section className="bg-primary text-white py-24 lg:py-32 hero-gradient">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-headline font-black mb-8">
              {SITE_DATA.about.title}
            </h1>
            <p className="text-xl md:text-2xl text-accent font-headline font-bold max-w-3xl mx-auto italic">
              {SITE_DATA.about.subtitle}
            </p>
          </div>
        </section>

        <section className="py-24 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Target className="h-8 w-8 text-accent" />
                    <h2 className="text-primary font-headline font-bold text-lg uppercase tracking-widest">Our Mission</h2>
                  </div>
                  <p className="text-2xl text-muted-foreground leading-relaxed font-medium italic">
                    {SITE_DATA.about.mission}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 pt-8 border-t">
                  <div className="space-y-2">
                    <p className="text-4xl font-black text-primary">99.9%</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Uptime Reliable</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-black text-primary">500k+</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Cases Managed</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image 
                    src={courtImage?.imageUrl || "https://picsum.photos/seed/court/800/1000"} 
                    alt="Our Vision" 
                    width={800}
                    height={1000}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -top-10 -left-10 bg-accent p-8 rounded-[2rem] shadow-xl hidden xl:block">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <div className="h-20 w-20 bg-primary rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                <History className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">A Legacy of Innovation</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {SITE_DATA.about.history}
              </p>
              <div className="pt-10">
                <div className="h-1 w-24 bg-accent mx-auto"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
