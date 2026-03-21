
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl">
            <Scale className="text-white h-6 w-6" />
          </div>
          <span className="font-headline font-extrabold text-2xl text-primary tracking-tighter italic">ECMS</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-sm font-bold hover:text-accent transition-colors">Home</Link>
          <Link href="/about" className="text-sm font-bold hover:text-accent transition-colors">About</Link>
          <Link href="/modules" className="text-sm font-bold hover:text-accent transition-colors">Modules</Link>
          <Link href="/faq" className="text-sm font-bold hover:text-accent transition-colors">FAQ</Link>
          <Link href="/contact" className="text-sm font-bold hover:text-accent transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 font-bold hidden md:flex">
            <Link href="https://ecmsfhcadmin.centurycodes.ng/">DEMO</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-20 left-0 right-0 bg-white border-b p-6 space-y-4 transition-all duration-300 origin-top",
        isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
      )}>
        <Link href="/" className="block text-lg font-bold">Home</Link>
        <Link href="/about" className="block text-lg font-bold">About</Link>
        <Link href="/modules" className="block text-lg font-bold">Modules</Link>
        <Link href="/faq" className="block text-lg font-bold">FAQ</Link>
        <Link href="/contact" className="block text-lg font-bold">Contact</Link>
        <Button asChild className="w-full bg-accent text-accent-foreground font-bold">
          <Link href="https://ecmsfhcadmin.centurycodes.ng/">DEMO</Link>
        </Button>
      </div>
    </nav>
  );
}
