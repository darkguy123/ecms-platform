
"use client";

import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">Find answers to common inquiries about ECMS.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {SITE_DATA.faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border bg-white rounded-2xl px-6">
                <AccordionTrigger className="text-lg font-bold hover:no-underline py-6">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
