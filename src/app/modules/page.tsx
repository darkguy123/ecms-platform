
"use client";

import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileCheck, ClipboardList, FileText, Gavel, Scale, Archive, Grid2X2
} from "lucide-react";
import { SITE_DATA } from "@/data/site-data";

const iconMap: Record<string, any> = {
  FileCheck,
  ClipboardList,
  FileText,
  Gavel,
  Scale,
  Archive
};

export default function ModulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-primary pt-32 pb-20 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Our Module Ecosystem</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Explore the comprehensive suite of modules that make ECMS the world's most versatile platform.
            </p>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SITE_DATA.modules.map((module, idx) => {
                const Icon = iconMap[module.icon] || Grid2X2;
                return (
                  <Card key={idx} className="border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl group">
                    <CardHeader className="p-8 pb-4">
                      <div className="h-14 w-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-2xl font-bold">{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {module.desc}
                      </p>
                      <ul className="space-y-3">
                        {module.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-sm font-medium">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
