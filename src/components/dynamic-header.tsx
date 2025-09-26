// components/dynamic-header.tsx
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface DynamicHeaderProps {
  section: string;
}

export function DynamicHeader({ section }: DynamicHeaderProps) {
  const [currentPage, setCurrentPage] = useState(section);
  const pathname = usePathname();

  useEffect(() => {
    // Extract the current page from the URL path
    const segments = pathname.split('/').filter(Boolean);
    const page = segments[segments.length - 1] || section;
    
    // Format the page name (e.g., "dashboard" -> "Dashboard")
    const formattedPage = page
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    setCurrentPage(formattedPage);
  }, [pathname, section]);

  return (
    <div className="flex items-center gap-3 mb-4">
      <SidebarTrigger />
      <h1 className="text-sm font-normal">
        {section} &gt; {currentPage}
      </h1>
    </div>
  );
}