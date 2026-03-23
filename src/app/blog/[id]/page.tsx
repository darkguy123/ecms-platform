
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { SITE_DATA } from "@/data/site-data";
import { Calendar, ArrowLeft, Share2, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPostPage() {
  const { id } = useParams();
  const post = SITE_DATA.blog.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <Button asChild className="mt-4"><Link href="/blog">Back to Blog</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary truncate">{post.title}</span>
          </nav>
        </div>

        <article className="max-w-4xl mx-auto px-6">
          <header className="space-y-8 mb-12">
            <div className="flex items-center gap-4">
               <span className="bg-accent text-primary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                {post.category}
              </span>
              <div className="h-px flex-1 bg-border" />
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-headline font-black text-primary leading-[1.1]">
              {post.title}
            </h1>
          </header>

          <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg prose-primary max-w-none">
            <p className="text-xl font-medium text-primary/80 leading-relaxed italic border-l-4 border-accent pl-6 mb-10">
              {post.excerpt}
            </p>
            <div className="text-muted-foreground leading-loose whitespace-pre-wrap text-lg">
              {post.content}
            </div>
          </div>

          <footer className="mt-20 pt-10 border-t flex flex-wrap justify-between items-center gap-6">
            <Button variant="outline" asChild className="rounded-full px-8">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Newsroom
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Share:</span>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent hover:text-primary">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
