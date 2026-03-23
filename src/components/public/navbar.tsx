
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/components/public/ecmslogo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Menu, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_DATA } from "@/data/site-data";
import { db } from "@/lib/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Modules", href: "#modules" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const handleDemoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      organization: formData.get("organization"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      name: formData.get("organization"), // use org name as identifier
      message: "Demo Request",
      type: "demo_request",
      status: "unread",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "contacts"), data);
      toast({
        title: "Demo Request Sent!",
        description: "We've received your request and will be in touch shortly.",
      });
      (e.target as HTMLFormElement).reset();
      setDemoModalOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "py-4 bg-white/90 backdrop-blur-xl shadow-lg border-b border-primary/5" : "py-8 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={logo}
            alt="ECMS Logo"
            width={800}
            height={520}
            className="h-15 w-auto sm:h-17 md:h-16 lg:h-18 object-contain"
          />
          
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold text-primary/70 hover:text-primary uppercase tracking-widest transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20" onClick={() => setDemoModalOpen(true)}>
            REQUEST DEMO
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-primary" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-[88px] bg-white z-40 p-8 transition-all duration-500 ease-in-out",
        mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col gap-8 items-center text-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-black text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button className="w-full h-16 text-xl rounded-full" onClick={() => { setMobileMenuOpen(false); setDemoModalOpen(true); }}>
            DEMO
          </Button>
        </nav>
      </div>

      {/* Request Demo Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Request a Demo</DialogTitle>
            <DialogDescription>
              Fill in your details and our team will reach out to schedule a personalized demo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDemoSubmit} className="space-y-5 mt-2">
            <div className="space-y-2">
              <Label htmlFor="demo-organization">Organization Name</Label>
              <Input
                id="demo-organization"
                name="organization"
                placeholder="Supreme Court of..."
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-email">Email Address</Label>
              <Input
                id="demo-email"
                name="email"
                type="email"
                placeholder="you@organization.com"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-phone">Phone Number</Label>
              <Input
                id="demo-phone"
                name="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                required
                className="h-11"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 text-base font-bold">
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              Submit Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
