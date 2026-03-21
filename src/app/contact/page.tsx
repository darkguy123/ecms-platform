
"use client";

import { useState } from "react";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      organization: formData.get("organization"),
      message: formData.get("message"),
      status: "unread",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "contacts"), data);
      toast({
        title: "Message Sent!",
        description: "We've received your inquiry and will get back to you soon.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about ECMS? Our expert team is ready to help you navigate your digital transformation journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required className="h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization / Court</Label>
                      <Input id="organization" name="organization" placeholder="Supreme Court of..." required className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">How can we help?</Label>
                      <Textarea id="message" name="message" placeholder="Tell us about your needs..." required className="min-h-[150px] pt-4" />
                    </div>
                    <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto px-10 h-14 text-lg">
                      {loading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-5 w-5" />
                      )}
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-headline">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, title: "Our Office", detail: "Century Information Systems Ltd, Head Office Building, Legal District" },
                    { icon: Phone, title: "Phone", detail: "+234 800 JUSTICE" },
                    { icon: Mail, title: "Email", detail: "info@ecms.gov.ng" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="h-12 w-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                        <item.icon className="text-primary h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">{item.title}</h4>
                        <p className="text-lg font-medium">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg border h-64 relative grayscale hover:grayscale-0 transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126844.0634860471!2d3.3364478!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e830e0c1a93d8!2sLagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
