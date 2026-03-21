
"use client";

import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { ScrollText } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <ScrollText className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-headline font-bold">Terms of Use</h1>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {SITE_DATA.legal.terms}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
