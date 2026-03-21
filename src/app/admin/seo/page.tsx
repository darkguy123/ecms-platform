
"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Save, Search, Globe } from "lucide-react";
import { generateSeoMeta } from "@/ai/flows/generate-seo-meta";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase-config";
import { doc, setDoc } from "firebase/firestore";

export default function AdminSeoPage() {
  const [pageContent, setPageContent] = useState("");
  const [seoData, setSeoData] = useState({ title: "", description: "", keywords: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!pageContent) return;
    setIsGenerating(true);
    try {
      const result = await generateSeoMeta({ pageContent });
      setSeoData({
        title: result.metaTitle,
        description: result.metaDescription,
        keywords: result.keywords.join(", ")
      });
      toast({ title: "SEO Generated", description: "Metadata optimized based on page content." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate SEO meta." });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveSeo = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "settings", "seo"), seoData);
      toast({ title: "SEO Saved", description: "Global SEO settings updated." });
    } catch (error) {
      toast({ variant: "destructive", title: "Save Error", description: "Failed to save SEO settings." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-headline font-bold">SEO Optimization</h1>
          <p className="text-muted-foreground">Improve your search engine ranking with AI-driven meta tags</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Page Content Analysis
              </CardTitle>
              <CardDescription>Paste the main content of a page to generate optimized meta tags</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Page Text</Label>
                <Textarea 
                  className="min-h-[300px]" 
                  placeholder="Paste your page content here..." 
                  value={pageContent}
                  onChange={(e) => setPageContent(e.target.value)}
                />
              </div>
              <Button onClick={handleGenerate} className="w-full" disabled={isGenerating || !pageContent}>
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate SEO Meta Tags
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Metadata Results</CardTitle>
                <CardDescription>Current SEO configuration for search engines</CardDescription>
              </div>
              <Button size="sm" onClick={saveSeo} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="mr-2 h-4 w-4" />}
                Apply Changes
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Meta Title (max 60 chars)</Label>
                <Input 
                  value={seoData.title}
                  onChange={(e) => setSeoData({...seoData, title: e.target.value})}
                  maxLength={60}
                />
                <p className="text-[10px] text-muted-foreground text-right">{seoData.title.length}/60</p>
              </div>
              <div className="space-y-2">
                <Label>Meta Description (max 160 chars)</Label>
                <Textarea 
                  value={seoData.description}
                  onChange={(e) => setSeoData({...seoData, description: e.target.value})}
                  maxLength={160}
                />
                <p className="text-[10px] text-muted-foreground text-right">{seoData.description.length}/160</p>
              </div>
              <div className="space-y-2">
                <Label>Keywords</Label>
                <Input 
                  value={seoData.keywords}
                  onChange={(e) => setSeoData({...seoData, keywords: e.target.value})}
                  placeholder="court, efiling, justice, digital transformation"
                />
              </div>

              <div className="p-4 bg-muted/50 rounded-xl border border-dashed">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1">
                  <Globe className="h-3 w-3" /> Search Preview
                </h4>
                <div className="space-y-1">
                  <p className="text-blue-600 font-medium text-lg hover:underline cursor-pointer leading-tight truncate">
                    {seoData.title || "Your Page Title Appears Here"}
                  </p>
                  <p className="text-green-700 text-sm truncate">https://justiceflow.gov › your-page</p>
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-snug">
                    {seoData.description || "Your page meta description will provide a compelling summary here to encourage search clicks..."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
