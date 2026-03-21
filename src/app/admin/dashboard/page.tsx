
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Eye, 
  ArrowUpRight,
  LayoutGrid,
  Database,
  CheckCircle,
  FileJson
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const DATA = [
  { name: 'Mon', visits: 400 },
  { name: 'Tue', visits: 300 },
  { name: 'Wed', visits: 200 },
  { name: 'Thu', visits: 278 },
  { name: 'Fri', visits: 189 },
  { name: 'Sat', visits: 239 },
  { name: 'Sun', visits: 349 },
];

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("justice_flow_admin") === "true";
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold">ECMS Portal Management</h1>
            <p className="text-muted-foreground">Self-contained Project Control</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="bg-white border-primary/20">
              <FileJson className="h-4 w-4 mr-2" />
              Project File Mode Active
            </Button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Site Status", val: "Operational", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
            { label: "Storage Mode", val: "Local File", icon: Database, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Modules", val: "6 Active", icon: LayoutGrid, color: "text-purple-600", bg: "bg-purple-100" },
            { label: "Portability", val: "GitHub Ready", icon: FileText, color: "text-orange-600", bg: "bg-orange-100" },
          ].map((stat, idx) => (
            <Card key={idx} className="border-none shadow-sm overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={cn("p-3 rounded-xl", stat.bg)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
                  <p className="text-2xl font-bold mt-1">{stat.val}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Local Data Notice</CardTitle>
            <CardDescription>All changes should be made directly to src/data/site-data.ts for GitHub deployment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To ensure full portability and GitHub compatibility, this project uses a local data store instead of an external database. 
              This makes the site ultra-fast and easy to host on any server or control panel.
            </p>
            <div className="p-4 bg-muted rounded-xl font-mono text-xs">
              src/data/site-data.ts
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
