
"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit2, Loader2, Grid2X2 } from "lucide-react";
import { db } from "@/lib/firebase-config";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function AdminModulesPage() {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [newModule, setNewModule] = useState({ title: "", description: "", features: "" });

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const snap = await getDocs(collection(db, "modules"));
    setModules(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const data = {
        ...newModule,
        featureList: newModule.features.split(",").map(f => f.trim())
      };
      await addDoc(collection(db, "modules"), data);
      toast({ title: "Module Added", description: "New module successfully added to the system." });
      setNewModule({ title: "", description: "", features: "" });
      fetchModules();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to add module." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "modules", id));
      setModules(modules.filter(m => m.id !== id));
      toast({ title: "Deleted", description: "Module removed from the list." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete." });
    }
  };

  return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold">ECMS Module Editor</h1>
            <p className="text-muted-foreground">Manage the technical modules displayed on the public website</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-1 border-none shadow-sm h-fit">
            <CardHeader>
              <CardTitle>Add New Module</CardTitle>
              <CardDescription>Configure a new system capability</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddModule} className="space-y-4">
                <div className="space-y-2">
                  <Label>Module Title</Label>
                  <Input 
                    value={newModule.title}
                    onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                    placeholder="e.g. eProbate"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={newModule.description}
                    onChange={(e) => setNewModule({...newModule, description: e.target.value})}
                    placeholder="Brief overview of the module"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Key Features (comma separated)</Label>
                  <Input 
                    value={newModule.features}
                    onChange={(e) => setNewModule({...newModule, features: e.target.value})}
                    placeholder="Feature 1, Feature 2..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  Add Module
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {modules.map((m) => (
                  <Card key={m.id} className="border-none shadow-sm hover:shadow-md transition-shadow group">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center">
                          <Grid2X2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(m.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{m.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {m.featureList?.map((f: string, i: number) => (
                          <span key={i} className="text-[10px] bg-muted px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                            {f}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {modules.length === 0 && (
                  <div className="col-span-2 text-center py-20 bg-card rounded-2xl border-2 border-dashed border-muted text-muted-foreground">
                    No modules added yet. Use the form on the left to get started.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
