
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/components/public/3e2185b2-d1fe-4017-b8d4-610c42dd0fd1_removalai_preview.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_DATA } from "@/data/site-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain"
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
          <Button asChild className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20">
            <Link href={SITE_DATA.home.demoLink} target="_blank">DEMO</Link>
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
          <Button asChild className="w-full h-16 text-xl rounded-full" onClick={() => setMobileMenuOpen(false)}>
            <Link href={SITE_DATA.home.demoLink} target="_blank">DEMO</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
