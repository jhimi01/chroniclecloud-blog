import SideNav from "@/components/SideNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface SideNavLayoutProps {
  children: ReactNode;
}

export default function SideNavLayout({ children }: SideNavLayoutProps) {
  return (
    <SidebarProvider>
      <SideNav />
      <main className="pt-5 pl-5 w-full md:w-[75%] ml-auto">
        <SidebarTrigger className="md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}
