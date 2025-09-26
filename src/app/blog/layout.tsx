// app/blog/layout.tsx (Server Component)
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DynamicHeader } from "@/components/dynamic-header";

export default async function BlogLayout({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">
          <DynamicHeader section="Blog" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}