"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  Calendar,
  Home,
  FilePen,
  Inbox,
  Search,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Mail,
  HelpCircle,
  Bell,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";

const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Blog", url: "/blog", icon: FilePen },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { state } = useSidebar();
  const router = useRouter();
  const pathname = usePathname(); // 👈 get current path

  const isCollapsed = state === "collapsed";

  const handleClick = (url: string) => {
    router.push(url);
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: false });
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
    }
  };

  return (
    <>
      <Sidebar
        className={`bg-gray-100 border-r transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
        collapsible="icon"
      >
        <SidebarContent>
          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel>Application</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = pathname.startsWith(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => handleClick(item.url)}
                        tooltip={isCollapsed ? item.title : undefined}
                      >
                        <div className="flex items-center gap-2 cursor-pointer">
                          <item.icon className="h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer with Profile */}
        <SidebarFooter className={isCollapsed ? "p-2" : "p-4"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start h-auto hover:bg-gray-200 transition-colors ${
                  isCollapsed ? "p-2 justify-center" : "p-3"
                }`}
              >
                <div
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "gap-3"
                  } w-full`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/user.png" alt="Profile" />
                    <AvatarFallback className="bg-blue-500 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>

                  {!isCollapsed && (
                    <>
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-medium text-sm truncate">John Doe</p>
                        <p className="text-xs text-gray-500 truncate">
                          admin@example.com
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                    </>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64"
              align={isCollapsed ? "center" : "start"}
              side={isCollapsed ? "right" : "top"}
            >
              <DropdownMenuLabel className="p-0">
                <div className="flex items-center gap-3 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/user.png" alt="Profile" />
                    <AvatarFallback className="bg-blue-500 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">admin@example.com</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleProfile}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </DropdownMenuItem>

              <DropdownMenuItem>
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Documentation
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setIsLogoutDialogOpen(true)}
                className="text-red-600 focus:text-red-600"
                disabled={isLoggingOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the login page. Any unsaved changes may
              be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isLoggingOut}
              onClick={() => setIsLogoutDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
