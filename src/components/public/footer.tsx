
"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/components/public/ecmslogowhite2.png";
import { Scale } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logo}
                alt="ECMS Logo"
                width={800}
                height={520}
                className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain"
              />
            </Link>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm">
              The Digital Foundation for Modern Justice. Empowering global judiciaries with professional electronic management solutions.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                <button key={idx} className="h-10 w-10 bg-white/5 hover:bg-accent hover:text-primary rounded-xl flex items-center justify-center transition-all">
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent">Navigation</h4>
            <nav className="flex flex-col gap-4">
              <a href="#about" className="text-white/60 hover:text-accent transition-colors">About Us</a>
              <a href="#modules" className="text-white/60 hover:text-accent transition-colors">Modules</a>
              <a href="#faq" className="text-white/60 hover:text-accent transition-colors">FAQ</a>
              <a href="#contact" className="text-white/60 hover:text-accent transition-colors">Contact</a>

              {/* Links Col */}
              <div className="space-y-8">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-accent">Navigation</h4>
                <nav className="flex flex-col gap-4 text-sm font-bold">
                  <Link href="/blog" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                    Court News <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Use</Link>
                  <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/admin/login" className="text-white/60 hover:text-white transition-colors">Staff Portal</Link>
            </nav>
          </div>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent">Legal</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/terms" className="text-white/60 hover:text-accent transition-colors">Terms of Use</Link>
              <Link href="/privacy" className="text-white/60 hover:text-accent transition-colors">Privacy Policy</Link>
              
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
