
"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  Star,
  ShieldCheck,
  Play,
  LayoutGrid
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SITE_DATA } from "@/data/site-data";

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-justice');
  const courtRoomImage = PlaceHolderImages.find(img => img.id === 'court-room');
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* --- Hero Section --- */}
        <section className="relative overflow-hidden py-20 lg:py-32 bg-[#F9FAF9]">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">Judiciary Digitalized</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary leading-[1.05]">
                {SITE_DATA.home.heroTitle} <span className="text-primary italic">{SITE_DATA.home.heroSubtitle}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {SITE_DATA.home.heroDescription}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 h-14 text-lg font-bold">
                  <Link href={SITE_DATA.home.demoLink}>DEMO</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 rounded-full px-10 h-14 text-lg font-bold">
                  <Link href="/modules">OUR MODULES</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image 
                  src={heroImage?.imageUrl || "https://picsum.photos/seed/justice1/800/1000"} 
                  alt="Modern Justice" 
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-xl hidden xl:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white overflow-hidden">
                        <Image src={`https://picsum.photos/seed/user${i}/100/100`} width={100} height={100} alt="User" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold">Our Client Impact</span>
                </div>
                <div className="flex items-center gap-1 text-accent mb-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
                </div>
                <p className="text-2xl font-bold">9.8</p>
                <p className="text-xs text-muted-foreground">Trusted by Supreme Courts</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Featured Dark Section --- */}
        <section className="bg-primary py-24 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="rounded-[2.5rem] overflow-hidden">
                <Image 
                  src={courtRoomImage?.imageUrl || "https://picsum.photos/seed/courtroom/800/600"} 
                  alt="Courtroom" 
                  width={800}
                  height={600}
                  className="w-full hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                Maximize Judicial Growth with <span className="text-accent italic">ECMS</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                ECMS represents over two decades of expertise in judicial technology and digital transformation across the globe.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-bold">
                <Link href="/about">Explore More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* --- Stand Out Section --- */}
        <section className="bg-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <span className="text-accent font-bold uppercase tracking-widest text-sm">Features</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">
                Why ECMS Stands Out
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Secure Management", desc: "End-to-end encryption for every filing and judicial record." },
                { title: "Interoperable Modules", desc: "Seamless integration between all judicial business units." },
                { title: "Public Trust", desc: "Real-time tracking for litigants to build sustainable transparency." }
              ].map((card, i) => (
                <div key={i} className="bg-[#F9FAF9] p-10 rounded-[2.5rem] group hover:-translate-y-2 transition-transform border border-border/50">
                  <div className="h-14 w-14 bg-accent rounded-2xl flex items-center justify-center mb-8">
                    <LayoutGrid className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold text-primary mb-4">{card.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
