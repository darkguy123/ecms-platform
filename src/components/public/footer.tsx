
"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white/10 p-2.5 rounded-xl">
                <Scale className="text-accent h-6 w-6" />
              </div>
              <span className="font-headline font-black text-3xl tracking-tighter">ECMS</span>
            </Link>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm">
              The Digital Foundation for Modern Justice. Empowering global judiciaries with professional electronic management solutions.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent">Navigation</h4>
            <nav className="flex flex-col gap-4">
              <a href="#about" className="text-white/60 hover:text-accent transition-colors">About Us</a>
              <a href="#modules" className="text-white/60 hover:text-accent transition-colors">Modules</a>
              <a href="#faq" className="text-white/60 hover:text-accent transition-colors">FAQ</a>
              <a href="#contact" className="text-white/60 hover:text-accent transition-colors">Contact</a>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent">Legal</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/terms" className="text-white/60 hover:text-accent transition-colors">Terms of Use</Link>
              <Link href="/privacy" className="text-white/60 hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="/admin" className="text-white/20 hover:text-accent transition-colors text-xs">Admin Portal</Link>
            </nav>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40 font-medium">
          <p>{SITE_DATA.settings.footerText}</p>
          <div className="flex gap-8 uppercase tracking-widest text-[10px]">
            <span>Lagos</span>
            <span>Abuja</span>
            <span>London</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
