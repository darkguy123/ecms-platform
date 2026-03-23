"use client";

import { useId, useState, type ComponentProps, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Send } from "lucide-react";
import { db } from "@/lib/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

type RequestDemoButtonProps = Omit<ComponentProps<typeof Button>, "children" | "onClick"> & {
  label?: string;
  onBeforeOpen?: () => void;
};

export function RequestDemoButton({
  label = "REQUEST DEMO",
  onBeforeOpen,
  ...buttonProps
}: RequestDemoButtonProps) {
  const fieldId = useId();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDemoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      organization: formData.get("organization"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      name: formData.get("organization"),
      message: "Demo Request",
      type: "demo_request",
      status: "unread",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "contacts"), data);
      toast({
        title: "Demo Request Sent!",
        description: "We've received your request and will be in touch shortly.",
      });
      (e.target as HTMLFormElement).reset();
      setOpen(false);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        {...buttonProps}
        onClick={() => {
          onBeforeOpen?.();
          setOpen(true);
        }}
      >
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Request a Demo</DialogTitle>
            <DialogDescription>
              Fill in your details and our team will reach out to schedule a personalized demo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDemoSubmit} className="space-y-5 mt-2">
            <div className="space-y-2">
              <Label htmlFor={`${fieldId}-organization`}>Organization Name</Label>
              <Input
                id={`${fieldId}-organization`}
                name="organization"
                placeholder="Supreme Court of..."
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${fieldId}-email`}>Email Address</Label>
              <Input
                id={`${fieldId}-email`}
                name="email"
                type="email"
                placeholder="you@organization.com"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${fieldId}-phone`}>Phone Number</Label>
              <Input
                id={`${fieldId}-phone`}
                name="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                required
                className="h-11"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 text-base font-bold">
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              Submit Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
