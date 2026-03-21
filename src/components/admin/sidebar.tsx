
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Grid2X2, 
  FileText, 
  Search, 
  LogOut, 
  Scale,
  Edit3,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Edit3, label: "Content Editor", href: "/admin/content" },
  { icon: Grid2X2, label: "Manage Modules", href: "/admin/modules" },
  { icon: FileText, label: "Blog CMS", href: "/admin/blog" },
  { icon: MessageSquare, label: "Inquiries", href: "/admin/contacts" },
  { icon: Search, label: "SEO CMS", href: "/admin/seo" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("justice_flow_admin");
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 border-r bg-card flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-primary p-2 rounded-lg">
            <Scale className="text-white h-5 w-5" />
          </div>
          <span className="font-headline font-bold text-lg text-primary">ECMS Admin</span>
        </div>

        <nav className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Exit Admin
        </Button>
      </div>
    </aside>
  );
}
