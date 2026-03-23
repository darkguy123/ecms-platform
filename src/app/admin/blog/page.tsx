
"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, Save, Plus, Trash2, Edit2, Copy, Check, FileJson } from "lucide-react";
import { generateBlogDraft } from "@/ai/flows/generate-blog-draft";
import { db } from "@/lib/firebase-config";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { SITE_DATA } from "@/data/site-data";

export default function AdminBlogPage() {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState<'ideas' | 'outline' | 'summary'>('outline');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const dbPosts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Combine with static data for management
      const staticPosts = SITE_DATA.blog.map(p => ({ ...p, isStatic: true }));
      setPosts([...dbPosts, ...staticPosts]);
    } catch (e) {
      setPosts(SITE_DATA.blog.map(p => ({ ...p, isStatic: true })));
    }
  };

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const result = await generateBlogDraft({ topicOrKeywords: topic, contentType });
      setGeneratedDraft(result.draftContent);
    } catch (error) {
      toast({ variant: "destructive", title: "AI Generation Error", description: "Failed to generate draft." });
    } finally {
      setIsGenerating(false);
    }
  };

  const savePost = async () => {
    if (!generatedDraft) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, "blogPosts"), {
        title: topic || "Generated Draft",
        content: generatedDraft,
        excerpt: generatedDraft.substring(0, 150) + "...",
        date: new Date().toISOString(),
        image: `https://picsum.photos/seed/${Math.random()}/800/500`,
        category: "Update",
        createdAt: serverTimestamp(),
      });
      toast({ title: "Draft Saved", description: "Your blog post draft has been saved to Firestore." });
      setGeneratedDraft("");
      setTopic("");
      fetchPosts();
    } catch (error) {
      toast({ variant: "destructive", title: "Save Error", description: "Failed to save post." });
    } finally {
      setIsSaving(false);
    }
  };

  const deletePost = async (id: string, isStatic: boolean) => {
    if (isStatic) {
      toast({ variant: "destructive", title: "Static Content", description: "Cannot delete static file content from admin panel. Edit src/data/site-data.ts instead." });
      return;
    }
    try {
      await deleteDoc(doc(db, "blogPosts", id));
      setPosts(posts.filter(p => p.id !== id));
      toast({ title: "Deleted", description: "Post has been removed from database." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete." });
    }
  };

  const generateJson = () => {
    const formatted = posts.map(p => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt || p.content?.substring(0, 150) + "...",
      content: p.content,
      date: p.date || new Date().toISOString().split('T')[0],
      image: p.image || `https://picsum.photos/seed/${p.id}/800/500`,
      category: p.category || "General"
    }));
    navigator.clipboard.writeText(JSON.stringify(formatted, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "JSON Copied", description: "Paste this into the 'blog' array in SITE_DATA." });
  };

  return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-headline font-bold">Blog & News CMS</h1>
            <p className="text-muted-foreground">Draft news and court updates using ECMS AI assistant</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={generateJson} className="bg-white">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <FileJson className="h-4 w-4 mr-2" />}
              Export for GitHub
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <section className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  ECMS AI Writing Assistant
                </CardTitle>
                <CardDescription>Generate high-quality judicial blog drafts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Article Topic</Label>
                  <Input 
                    placeholder="e.g., Implementing Virtual Hearings in the Supreme Court" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Draft Strategy</Label>
                  <Select value={contentType} onValueChange={(v: any) => setContentType(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ideas">Headline Ideas</SelectItem>
                      <SelectItem value="outline">Structured Outline</SelectItem>
                      <SelectItem value="summary">Public Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleGenerate} className="w-full" disabled={isGenerating || !topic}>
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate AI Content
                </Button>
              </CardContent>
            </Card>

            {generatedDraft && (
              <Card className="border-none shadow-sm animate-in fade-in duration-500">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>AI Output</CardTitle>
                  <Button size="sm" onClick={savePost} disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save to Preview
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    className="min-h-[400px] font-mono text-sm leading-relaxed" 
                    value={generatedDraft}
                    onChange={(e) => setGeneratedDraft(e.target.value)}
                  />
                </CardContent>
              </Card>
            )}
          </section>

          <section>
            <Card className="border-none shadow-sm h-full">
              <CardHeader>
                <CardTitle>Article Library</CardTitle>
                <CardDescription>All posts currently in site-data.ts or database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4 rounded-xl border group hover:border-primary/30 transition-all bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <h4 className="font-bold line-clamp-1">{post.title}</h4>
                          <span className="text-[10px] uppercase font-black text-accent">{post.category}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!post.isStatic && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deletePost(post.id, false)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                          {post.isStatic && (
                            <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded">STATIC</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt || post.content}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                          {post.date || 'Static Content'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
