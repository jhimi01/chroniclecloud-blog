"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Home,
  Icon,
  HomeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { userStore } from "@/stores/userStore";

export default function AdminSidebar() {
  const pathname = usePathname();
  const userInfo = userStore((state: any) => state.userInfo);
  console.log("user info", userInfo);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/users", label: "Users", icon: Users },
    { href: "/blogs-admin", label: "Blogs", icon: FileText },
  ];

  return (
    <div className="flex bg-primary text-white flex-col h-screen fixed w-64 bg-background border-r">
      {/* Sidebar Header */}
      <div className=" text-center py-2 border-b bg-[#0f1634]">
        <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
        <h3 className="text-xs text-gray-400">{userInfo?.email}</h3>
        <h3 className="text-xs text-gray-400">{userInfo?.username}</h3>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center p-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === href
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="px-4 py-6 border-t">
        <ul className="space-y-2">
          <li>
            <Link
              href={"/"}
              className={`flex items-center p-2 text-base font-medium rounded-lg transition-colors ${
                pathname === "/"
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <HomeIcon className="w-5 h-5 mr-3" />
              home
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className={`flex items-center p-2 text-base font-medium rounded-lg transition-colors ${
                pathname === "/setting"
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              setting
            </Link>
          </li>
          <Separator className="my-2" />
          <li>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start p-2 text-base font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Log Out
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
