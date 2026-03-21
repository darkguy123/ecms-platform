
"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { db } from "@/lib/firebase-config";
import { collection, query, orderBy, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, Trash2, Loader2, Eye, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const markAsResponded = async (id: string) => {
    try {
      await updateDoc(doc(db, "contacts", id), { status: "responded" });
      setMessages(messages.map(m => m.id === id ? { ...m, status: "responded" } : m));
      toast({ title: "Updated", description: "Message marked as responded." });
      setSelectedMsg(null);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to update status." });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setMessages(messages.filter(m => m.id !== id));
      toast({ title: "Deleted", description: "Message removed from system." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete." });
    }
  };

  return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-headline font-bold">Contact Submissions</h1>
          <p className="text-muted-foreground">Manage inquiries from the public website</p>
        </header>

        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-bold">Sender</TableHead>
                    <TableHead className="font-bold">Organization</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="text-right font-bold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow key={msg.id} className="hover:bg-muted/20">
                      <TableCell>
                        <div className="font-bold">{msg.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {msg.email}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{msg.organization}</TableCell>
                      <TableCell>
                        <Badge variant={msg.status === 'responded' ? 'default' : 'secondary'} className="rounded-full px-3">
                          {msg.status === 'responded' ? 'Responded' : 'Unread'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {msg.createdAt?.toDate().toLocaleDateString() || 'Recently'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSelectedMsg(msg)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive" onClick={() => deleteMessage(msg.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {messages.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">
                        No messages found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Message Viewer Dialog */}
        <Dialog open={!!selectedMsg} onOpenChange={() => setSelectedMsg(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline font-bold">Inquiry Details</DialogTitle>
              <DialogDescription className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {selectedMsg?.createdAt?.toDate().toLocaleDateString()}</span>
                <Badge variant={selectedMsg?.status === 'responded' ? 'default' : 'secondary'}>
                  {selectedMsg?.status === 'responded' ? 'Responded' : 'Needs Response'}
                </Badge>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 my-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">From</p>
                  <p className="font-bold">{selectedMsg?.name}</p>
                  <p className="text-sm">{selectedMsg?.email}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Organization</p>
                  <p className="font-bold">{selectedMsg?.organization}</p>
                </div>
              </div>
              <div className="p-6 border rounded-xl bg-card">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-3">Message Content</p>
                <p className="text-lg leading-relaxed whitespace-pre-wrap">{selectedMsg?.message}</p>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setSelectedMsg(null)}>Close</Button>
              {selectedMsg?.status !== 'responded' && (
                <Button onClick={() => markAsResponded(selectedMsg.id)} className="gap-2">
                  <CheckCircle className="h-4 w-4" /> Mark as Responded
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
