
"use client";

import Image from "next/image";
import courtImageFile from "@/components/public/ecmsbanner2-Photoroom.png";
import heroImageFile from "@/components/public/hero-collage-Photoroom.png";
import LogoCarousel from "@/components/public/LogoCarousel";
import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  ClipboardList, 
  FileText, 
  Gavel, 
  Scale, 
  Archive,
  Target,
  History,
  Shield,
  Mail,
  Phone,
  MapPin,
  Send,
  HelpCircle,
  LayoutGrid,
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  Network,
  Settings2,
  CheckCircle
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SITE_DATA } from "@/data/site-data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, any> = {
  FileCheck,
  ClipboardList,
  FileText,
  Gavel,
  Scale,
  Archive
};

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-justice');
  const courtRoomImage = PlaceHolderImages.find(img => img.id === 'court-room');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Your inquiry has been received. Our team will contact you shortly.",
      });
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-[#F8FAF8]">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8 text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">Digital Judiciary Evolution</span>
              </div>
              <h2 className="text-5xl text-[#000] md:text-7xl font-headline font-black leading-[1.1] tracking-tight">
                {SITE_DATA.home.heroTitle}
              </h2>
              <p className="text-2xl text-[#13aa11] md:text-3xl font-headline font-semibold text-accent italic">
                {SITE_DATA.home.heroSubtitle}
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                {SITE_DATA.home.heroDescription}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 h-16 text-lg font-bold shadow-xl shadow-primary/20">
                  <Link href={SITE_DATA.home.demoLink} target="_blank">DEMO</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 rounded-full px-10 h-16 text-lg font-bold">
                  <a href="#about">LEARN MORE</a>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="hover:rotate-0 transition-transform duration-700">
                <Image 
                  src={heroImageFile}
                  alt="ECMS Platform" 
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#000000] text-primary p-8 rounded-[2.5rem] shadow-2xl hidden md:block">
                <p className="text-4xl font-black text-[#fff]">100%</p>
                <p className="font-bold text-xs uppercase tracking-widest text-[#fff] leading-tight">Digital Transparency</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-1/2 -z-0"></div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-32 bg-primary text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-6xl md:text-6xl font-headline font-bold leading-tight">
                    Redefining Justice for the <span className="text-accent">21st Century</span>
                  </h3>
                  <p className="text-primary text-sm text-white/70 leading-relaxed font-medium italic">
                    {SITE_DATA.about.mission}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/10">
                  <div className="space-y-2">
                    <p className="text-5xl font-black text-accent">13+</p>
                    <p className="text-xs uppercase tracking-widest font-bold text-white/60">Years of Judicial Excellence</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-5xl font-black text-accent">100+</p>
                    <p className="text-xs uppercase tracking-widest font-bold text-white/60">Court House Automated</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <History className="text-accent h-6 w-6" />
                  </div>
                  <p className="text-primary text-sm text-white/80 leading-relaxed">
                    {SITE_DATA.about.history}
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className=" overflow-hidden ">
                  <Image 
                    src={courtImageFile} 
                    alt="Modern Courtroom" 
                    width={1200}
                    height={1200}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Module Ecosystem --- */}
        <section id="modules" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full">
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">The Ecosystem</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary">Integrated Solutions</h2>
              <p className="text-muted-foreground text-lg">
                Explore the modular framework that powers modern judicial administration across the continent.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SITE_DATA.modules.map((module, idx) => {
                const Icon = iconMap[module.icon] || LayoutGrid;
                return (
                  <div key={idx} className="group p-10 rounded-[3rem] bg-[#F8FAF8] border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className="h-16 w-16 bg-primary rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent transition-all">
                      <Icon className="h-8 w-8 text-white group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">{module.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{module.desc}</p>
                    <ul className="space-y-3">
                      {module.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-sm font-semibold text-primary/80">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- Technical Architecture --- */}
        <section className="py-32 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full">
                  <Cpu className="h-4 w-4 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">Internal Mechanics</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                  {SITE_DATA.architecture.title}
                </h2>
                <p className="text-xl text-white/70 leading-relaxed max-w-xl">
                  {SITE_DATA.architecture.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                  {SITE_DATA.architecture.features.map((feature, idx) => (
                    <div key={idx} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h4 className="font-bold text-lg mb-2 text-accent">{feature.title}</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6">
                {SITE_DATA.architecture.layers.map((layer, idx) => (
                  <div key={idx} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-accent/30 transition-all">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      {layer.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((item, iIdx) => (
                        <span key={iIdx} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/70">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Implementation Partners --- */}
        <section className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <Network className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">{SITE_DATA.partnerships.title}</h2>
              <p className="text-muted-foreground text-lg">{SITE_DATA.partnerships.description}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-widest text-primary/40 border-b pb-4">Federal Institutions</h3>
                <div className="grid gap-4">
                  {SITE_DATA.partnerships.federal.map((partner, idx) => (
                    <div key={idx} className="p-6 bg-[#F8FAF8] rounded-2xl flex items-center justify-between group hover:bg-primary hover:text-white transition-all duration-300">
                      <div>
                        <p className="font-bold text-lg">{partner.name}</p>
                        <p className="text-sm opacity-60">{partner.role}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-widest text-primary/40 border-b pb-4">State Judiciaries</h3>
                <div className="grid grid-cols-2 gap-4">
                  {SITE_DATA.partnerships.states.map((state, idx) => (
                    <div key={idx} className="p-4 border rounded-2xl flex items-center gap-3 hover:border-primary transition-colors">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      <span className="font-bold text-sm">{state.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <LogoCarousel />
          </div>
        </section>

        {/* --- Security & Compliance --- */}
        <section className="py-32 bg-[#064E3B] text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                  {SITE_DATA.security.title}
                </h2>
                <p className="text-xl text-white/70 leading-relaxed">
                  {SITE_DATA.security.description}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {SITE_DATA.security.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-bold text-accent">
                      <ShieldCheck className="h-5 w-5" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-6">
                {SITE_DATA.security.items.map((item, idx) => (
                  <div key={idx} className="p-8 bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <Lock className="h-12 w-12 text-accent" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Methodology --- */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <Settings2 className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">{SITE_DATA.methodology.title}</h2>
              <p className="text-muted-foreground mt-4">A structured, carefully managed deployment ensuring smooth adoption.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SITE_DATA.methodology.steps.map((step, idx) => (
                <div key={idx} className="relative p-10 bg-[#F8FAF8] rounded-[3rem] border border-transparent hover:border-accent transition-all group">
                  <span className="absolute top-8 right-8 text-5xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
                    {step.id}
                  </span>
                  <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center mb-6">
                    <span className="text-white font-bold">{step.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section id="faq" className="py-32 bg-[#05321B] text-white">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 space-y-4">
              <HelpCircle className="h-12 w-12 text-accent mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Frequently Asked Questions</h2>
              <p className="text-white/60 text-lg">Your technical inquiries answered by our judicial technology experts.</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {SITE_DATA.faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border border-white/10 bg-white/5 rounded-[2rem] px-8 overflow-hidden">
                  <AccordionTrigger className="text-lg font-bold hover:no-underline py-8 text-left group">
                    <span className="group-hover:text-accent transition-colors">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 text-lg pb-8 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary leading-tight">
                    Get in <span className="text-accent italic">Touch</span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Ready to modernize? Contact Century Information Systems for a customized implementation plan.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {[
                    { icon: MapPin, title: "Headquarters", detail: SITE_DATA.settings.address },
                    { icon: Phone, title: "Inquiry Line", detail: SITE_DATA.settings.contactPhone },
                    { icon: Mail, title: "Email Correspondence", detail: SITE_DATA.settings.contactEmail }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/10">
                        <item.icon className="text-accent h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-lg font-bold text-primary">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-[#F8FAF8] p-10 md:p-16 rounded-[4rem] border border-primary/5 shadow-2xl relative overflow-hidden">
                  <form onSubmit={handleContactSubmit} className="space-y-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-primary/60">Full Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required className="h-16 rounded-2xl border-none shadow-sm focus-visible:ring-accent" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-primary/60">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required className="h-16 rounded-2xl border-none shadow-sm focus-visible:ring-accent" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="organization" className="text-xs font-bold uppercase tracking-widest text-primary/60">Judicial Organization</Label>
                      <Input id="organization" name="organization" placeholder="Supreme Court of..." required className="h-16 rounded-2xl border-none shadow-sm focus-visible:ring-accent" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-primary/60">Inquiry Message</Label>
                      <Textarea id="message" name="message" placeholder="How can we assist in your transformation?" required className="min-h-[180px] rounded-2xl border-none shadow-sm focus-visible:ring-accent pt-6" />
                    </div>
                    <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto px-12 h-16 text-lg font-bold rounded-full shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                      {loading ? (
                        <div className="flex items-center gap-2"><Send className="h-5 w-5 animate-pulse" /> Processing...</div>
                      ) : (
                        <div className="flex items-center gap-2"><Send className="h-5 w-5" /> Send Message</div>
                      )}
                    </Button>
                  </form>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-0 translate-x-1/2 translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
