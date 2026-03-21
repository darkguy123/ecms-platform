
"use client";

import Link from "next/link";
import { Scale, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-accent p-2 rounded-xl">
                <Scale className="text-primary h-6 w-6" />
              </div>
              <span className="font-headline font-extrabold text-2xl tracking-tighter italic">Digexa</span>
            </Link>
            <p className="text-white/60 leading-relaxed">
              Empowering judiciaries worldwide with secure, transparent, and data-driven electronic court management systems.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Navigation</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/" className="hover:text-accent">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link href="/modules" className="hover:text-accent">Modules</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Quick Link</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-accent">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-accent">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start text-white/60">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <span>Head Office Building, Legal District</span>
              </li>
              <li className="flex gap-4 items-start text-white/60">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span>info@justiceflow.gov</span>
              </li>
              <li className="flex gap-4 items-start text-white/60">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span>+234 800 JUSTICE</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Century Information Systems Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
