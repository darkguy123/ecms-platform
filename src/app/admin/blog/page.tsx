
"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, Save, Plus, Trash2, Edit2 } from "lucide-react";
import { generateBlogDraft } from "@/ai/flows/generate-blog-draft";
import { db } from "@/lib/firebase-config";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function AdminBlogPage() {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState<'ideas' | 'outline' | 'summary'>('outline');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
        createdAt: serverTimestamp(),
      });
      toast({ title: "Draft Saved", description: "Your blog post draft has been saved." });
      setGeneratedDraft("");
      setTopic("");
      fetchPosts();
    } catch (error) {
      toast({ variant: "destructive", title: "Save Error", description: "Failed to save post." });
    } finally {
      setIsSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, "blogPosts", id));
      setPosts(posts.filter(p => p.id !== id));
      toast({ title: "Deleted", description: "Post has been removed." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete." });
    }
  };

  return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-headline font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Draft news and court updates using AI assistant</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <section className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Writing Assistant
                </CardTitle>
                <CardDescription>Generate high-quality blog drafts in seconds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Topic or Keywords</Label>
                  <Input 
                    placeholder="e.g., Benefits of eFiling in Lagos State courts" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <Select value={contentType} onValueChange={(v: any) => setContentType(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ideas">Post Ideas</SelectItem>
                      <SelectItem value="outline">Detailed Outline</SelectItem>
                      <SelectItem value="summary">Article Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleGenerate} className="w-full" disabled={isGenerating || !topic}>
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate Draft
                </Button>
              </CardContent>
            </Card>

            {generatedDraft && (
              <Card className="border-none shadow-sm animate-in fade-in duration-500">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Generated Content</CardTitle>
                  <Button size="sm" onClick={savePost} disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save to Collection
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    className="min-h-[400px] font-mono text-sm" 
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
                <CardTitle>Existing Posts</CardTitle>
                <CardDescription>Manage your drafted or published articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4 rounded-xl border group hover:border-primary/30 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold line-clamp-1">{post.title}</h4>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deletePost(post.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                      <div className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        Created: {post.createdAt?.toDate().toLocaleDateString() || 'Just now'}
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                      No blog posts yet. Start by generating one with AI!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
