"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, Save, Plus, Trash2, Edit2, Check, FileJson } from "lucide-react";
import { generateBlogDraft } from "@/ai/flows/generate-blog-draft";
import { db } from "@/lib/firebase-config";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { SITE_DATA } from "@/data/site-data";

export default function AdminBlogPage() {
  const { toast } = useToast();

  // AI
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState<'ideas' | 'outline' | 'summary'>("outline");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState("");

  // Posts
  const [posts, setPosts] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // Editor
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  // JSON Import
  const [jsonInput, setJsonInput] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const dbPosts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const staticPosts = SITE_DATA.blog.map(p => ({ ...p, isStatic: true }));
      setPosts([...dbPosts, ...staticPosts]);
    } catch {
      setPosts(SITE_DATA.blog.map(p => ({ ...p, isStatic: true })));
    }
  };

  // ================= AI =================
  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const result = await generateBlogDraft({ topicOrKeywords: topic, contentType });
      setGeneratedDraft(result.draftContent);
    } catch {
      toast({ variant: "destructive", title: "Error", description: "AI generation failed" });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveAIToDB = async () => {
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
      toast({ title: "Saved", description: "AI draft saved" });
      setGeneratedDraft("");
      setTopic("");
      fetchPosts();
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Save failed" });
    } finally {
      setIsSaving(false);
    }
  };

  // ================= EDITOR =================
  const handleSubmitPost = () => {
    if (!formData.title || !formData.content) return;

    const newPost = {
      id: editingPost?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      excerpt: formData.content.substring(0, 150) + "...",
      category: formData.category || "General",
      image: formData.image || `https://picsum.photos/seed/${Math.random()}/800/500`,
      date: new Date().toISOString().split("T")[0],
      isStatic: true,
    };

    const updated = editingPost
      ? posts.map(p => (p.id === editingPost.id ? newPost : p))
      : [newPost, ...posts];

    setPosts(updated);

    toast({ title: "Saved", description: "Export JSON to persist changes" });

    setIsEditorOpen(false);
    setEditingPost(null);
    setFormData({ title: "", content: "", category: "", image: "" });
  };

  // ================= DELETE =================
  const deletePost = async (id: string, isStatic: boolean) => {
    if (isStatic) {
      toast({ variant: "destructive", title: "Static", description: "Edit via JSON export" });
      return;
    }
    await deleteDoc(doc(db, "blogPosts", id));
    setPosts(posts.filter(p => p.id !== id));
  };

  // ================= EXPORT =================
  const generateJson = () => {
    const formatted = posts.map(p => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      date: p.date,
      image: p.image,
      category: p.category,
    }));

    navigator.clipboard.writeText(JSON.stringify(formatted, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    toast({ title: "Copied", description: "Paste into SITE_DATA.blog" });
  };

  // ================= IMPORT =================
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      const formatted = parsed.map((p: any, i: number) => ({
        ...p,
        id: p.id || Date.now().toString() + i,
        isStatic: true,
      }));

      setPosts(formatted);

      toast({ title: "Imported", description: "Now export to save" });
    } catch {
      toast({ variant: "destructive", title: "Invalid JSON" });
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8">
        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog CMS</h1>
            <p className="text-muted-foreground">Manage blog content</p>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => {
              setIsEditorOpen(true);
              setEditingPost(null);
            }}>
              <Plus className="mr-2 h-4 w-4" /> Write Blog
            </Button>

            <Button variant="outline" onClick={generateJson}>
              {copied ? <Check /> : <FileJson />}
            </Button>
          </div>
        </div>

        {/* JSON IMPORT */}
        <Card>
          <CardHeader>
            <CardTitle>Import JSON</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
            <Button className="mt-3" onClick={handleImportJson}>Import</Button>
          </CardContent>
        </Card>

        {/* AI */}
        <Card>
          <CardHeader>
            <CardTitle>AI Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" />
            <Button onClick={handleGenerate}>
              {isGenerating ? <Loader2 className="animate-spin" /> : "Generate"}
            </Button>
          </CardContent>
        </Card>

        {generatedDraft && (
          <Card>
            <CardContent>
              <Textarea value={generatedDraft} onChange={(e) => setGeneratedDraft(e.target.value)} />
              <Button onClick={saveAIToDB}>Save</Button>
            </CardContent>
          </Card>
        )}

        {/* EDITOR */}
        {isEditorOpen && (
          <Card>
            <CardHeader>
              <CardTitle>{editingPost ? "Edit" : "Write"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <Input placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <Textarea placeholder="Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
              <Button onClick={handleSubmitPost}>Save</Button>
            </CardContent>
          </Card>
        )}

        {/* POSTS */}
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post.id} className="p-4 border rounded-xl bg-white">
              <div className="flex justify-between">
                <h4 className="font-bold">{post.title}</h4>

                <div className="flex gap-2">
                  <Button size="icon" onClick={() => {
                    setEditingPost(post);
                    setIsEditorOpen(true);
                    setFormData(post);
                  }}>
                    <Edit2 />
                  </Button>

                  <Button size="icon" onClick={() => deletePost(post.id, post.isStatic)}>
                    <Trash2 />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}