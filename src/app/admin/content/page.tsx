
"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  Loader2, 
  HelpCircle, 
  FileText, 
  Home, 
  Info, 
  Mail, 
  ShieldAlert, 
  ScrollText,
  Plus,
  Trash2
} from "lucide-react";
import { db } from "@/lib/firebase-config";
import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function ContentEditorPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageData, setPageData] = useState<any>({});
  const [faqs, setFaqs] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const docSnap = await getDoc(doc(db, "content", "pages"));
      if (docSnap.exists()) {
        setPageData(docSnap.data());
      }

      const settingsSnap = await getDoc(doc(db, "settings", "general"));
      if (settingsSnap.exists()) {
        setPageData((prev: any) => ({ ...prev, settings: settingsSnap.data() }));
      }

      const faqSnap = await getDocs(query(collection(db, "content", "faqs", "list"), orderBy("order", "asc")));
      setFaqs(faqSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePage = async (pageKey: string) => {
    setIsSaving(true);
    try {
      if (pageKey === 'settings') {
        await setDoc(doc(db, "settings", "general"), pageData.settings, { merge: true });
      } else {
        await setDoc(doc(db, "content", "pages"), pageData, { merge: true });
      }
      toast({ title: "Content Saved", description: "Changes published successfully." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save content." });
    } finally {
      setIsSaving(false);
    }
  };

  const addFaq = async () => {
    const newFaq = { question: "New Question", answer: "New Answer", order: faqs.length };
    const docRef = await addDoc(collection(db, "content", "faqs", "list"), newFaq);
    setFaqs([...faqs, { id: docRef.id, ...newFaq }]);
  };

  const updateFaq = (id: string, field: string, value: any) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const saveFaqs = async () => {
    setIsSaving(true);
    try {
      const promises = faqs.map(f => setDoc(doc(db, "content", "faqs", "list", f.id), f));
      await Promise.all(promises);
      toast({ title: "FAQs Saved", description: "All questions updated." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save FAQs." });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteFaq = async (id: string) => {
    await deleteDoc(doc(db, "content", "faqs", "list", id));
    setFaqs(faqs.filter(f => f.id !== id));
  };

  if (loading) return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </main>
    </div>
  );

  return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-headline font-bold">Content Editor</h1>
            <p className="text-muted-foreground">Manage the text across all your public pages</p>
          </div>
        </header>

        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="bg-white border p-1 rounded-xl h-auto flex flex-wrap gap-1 w-fit">
            <TabsTrigger value="home" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
              <Home className="h-4 w-4" /> Home
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
              <Info className="h-4 w-4" /> About
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
              <Mail className="h-4 w-4" /> Contact
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
              <HelpCircle className="h-4 w-4" /> FAQ
            </TabsTrigger>
            <TabsTrigger value="legal" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
              <ShieldAlert className="h-4 w-4" /> Legal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Home Page Content</CardTitle>
                  <CardDescription>Main headlines and call-to-action text</CardDescription>
                </div>
                <Button onClick={() => handleSavePage('home')} disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Hero Title</Label>
                  <Input 
                    value={pageData.home?.heroTitle || ""} 
                    onChange={(e) => setPageData({...pageData, home: {...(pageData.home || {}), heroTitle: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hero Subtitle</Label>
                  <Textarea 
                    value={pageData.home?.heroSubtitle || ""} 
                    onChange={(e) => setPageData({...pageData, home: {...(pageData.home || {}), heroSubtitle: e.target.value}})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>About Us Page</CardTitle>
                  <CardDescription>Mission statement and company history</CardDescription>
                </div>
                <Button onClick={() => handleSavePage('about')} disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Mission Statement</Label>
                  <Textarea 
                    className="min-h-[150px]"
                    value={pageData.about?.mission || ""} 
                    onChange={(e) => setPageData({...pageData, about: {...(pageData.about || {}), mission: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>History & Legacy</Label>
                  <Textarea 
                    className="min-h-[150px]"
                    value={pageData.about?.history || ""} 
                    onChange={(e) => setPageData({...pageData, about: {...(pageData.about || {}), history: e.target.value}})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Public contact details shown on the site</CardDescription>
                </div>
                <Button onClick={() => handleSavePage('settings')} disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Support Email</Label>
                    <Input 
                      value={pageData.settings?.contactEmail || ""} 
                      onChange={(e) => setPageData({...pageData, settings: {...(pageData.settings || {}), contactEmail: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Phone</Label>
                    <Input 
                      value={pageData.settings?.contactPhone || ""} 
                      onChange={(e) => setPageData({...pageData, settings: {...(pageData.settings || {}), contactPhone: e.target.value}})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Office Address</Label>
                  <Input 
                    value={pageData.settings?.address || ""} 
                    onChange={(e) => setPageData({...pageData, settings: {...(pageData.settings || {}), address: e.target.value}})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Manage FAQ List</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addFaq}><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
                  <Button onClick={saveFaqs} disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save FAQs
                  </Button>
                </div>
              </div>
              <div className="grid gap-4">
                {faqs.map((f) => (
                  <Card key={f.id} className="border-none shadow-sm relative group">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteFaq(f.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label>Question</Label>
                        <Input value={f.question} onChange={(e) => updateFaq(f.id, 'question', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Answer</Label>
                        <Textarea value={f.answer} onChange={(e) => updateFaq(f.id, 'answer', e.target.value)} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="legal">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Terms of Use</CardTitle>
                    <CardDescription>Legal agreement for platform users</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => handleSavePage('legal')} disabled={isSaving}><Save className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    className="min-h-[400px] font-mono text-xs"
                    value={pageData.legal?.terms || ""} 
                    onChange={(e) => setPageData({...pageData, legal: {...(pageData.legal || {}), terms: e.target.value}})}
                  />
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Privacy Policy</CardTitle>
                    <CardDescription>Data handling and user privacy details</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => handleSavePage('legal')} disabled={isSaving}><Save className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    className="min-h-[400px] font-mono text-xs"
                    value={pageData.legal?.privacy || ""} 
                    onChange={(e) => setPageData({...pageData, legal: {...(pageData.legal || {}), privacy: e.target.value}})}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
