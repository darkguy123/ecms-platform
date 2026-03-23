
"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { SITE_DATA } from "@/data/site-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight, Tag } from "lucide-react";

export default function BlogListingPage() {
  const posts = SITE_DATA.blog;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <section className="bg-primary pt-20 pb-20 text-white mb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-black mb-6">Court News & Insights</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed italic">
              Stay updated with the latest in judicial technology, system updates, and legal tech innovations.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group">
                <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-[#F8FAF8]">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-primary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2">
                        <Tag className="h-3 w-3" /> {post.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-widest mb-4">
                      <Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <CardTitle className="text-2xl font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                      Read Article <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
