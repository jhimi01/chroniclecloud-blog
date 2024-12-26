import Image from "next/image";
import SideNavLayout from "./sidenav/layout";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <SideNavLayout>
      <h1>Welcome to the Blog</h1>
      <p>Explore the latest articles and updates.</p>
    </SideNavLayout>
  );
}
