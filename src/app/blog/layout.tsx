"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState("Blog");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-3 mb-4">
            <SidebarTrigger />
            <h1 className="text-sm font-normal">
              Blog &gt; {currentPage}
            </h1>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
