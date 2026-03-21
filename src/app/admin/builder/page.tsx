
"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  GripVertical, 
  Save, 
  Eye, 
  LayoutTemplate, 
  Plus, 
  Trash2, 
  Loader2,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { db } from "@/lib/firebase-config";
import { collection, query, orderBy, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function PageBuilderPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const q = query(collection(db, "pages", "home", "sections"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setSections(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSection = (id: string, field: string, value: any) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    // Update orders
    const updated = newSections.map((s, idx) => ({ ...s, order: idx }));
    setSections(updated);
  };

  const saveAll = async () => {
    setIsSaving(true);
    try {
      const promises = sections.map(s => 
        setDoc(doc(db, "pages", "home", "sections", s.id), s)
      );
      await Promise.all(promises);
      toast({ title: "Page Saved", description: "All changes published to home page." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save sections." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold">Home Page Builder</h1>
            <p className="text-muted-foreground">Reorder and edit sections of the public landing page</p>
          </div>
          <Button onClick={saveAll} disabled={isSaving} size="lg" className="shadow-lg">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Publish Changes
          </Button>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            sections.map((section, idx) => (
              <Card key={section.id} className="border-none shadow-sm group hover:shadow-md transition-shadow">
                <div className="p-4 bg-muted/20 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-lg cursor-grab active:cursor-grabbing">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Section {idx + 1}</span>
                      <h3 className="font-bold text-sm">{section.type.toUpperCase()} - {section.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveSection(idx, 'up')} disabled={idx === 0}>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveSection(idx, 'down')} disabled={idx === sections.length - 1}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <div className="h-4 w-px bg-border mx-2" />
                    <Label className="text-xs font-medium mr-2">Visible</Label>
                    <Switch 
                      checked={section.isVisible} 
                      onCheckedChange={(val) => handleUpdateSection(section.id, 'isVisible', val)} 
                    />
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input 
                        value={section.title} 
                        onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subtitle / Accent Text</Label>
                      <Input 
                        value={section.subtitle || ""} 
                        onChange={(e) => handleUpdateSection(section.id, 'subtitle', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Main Content / Description</Label>
                    <Textarea 
                      className="min-h-[100px]"
                      value={section.content} 
                      onChange={(e) => handleUpdateSection(section.id, 'content', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          
          {sections.length === 0 && !loading && (
            <div className="text-center py-20 border-2 border-dashed rounded-3xl text-muted-foreground">
              <LayoutTemplate className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No sections found. Use the initialize tool or contact support.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
