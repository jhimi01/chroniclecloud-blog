"use client";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="text-primary container mx-auto">
      <div>
        {/* Header Title */}
        <div className="md:text-center text-4xl font-semibold py-5">
          Chronicle Cloud
        </div>
        <hr className="md:block hidden" />

        {/* Navigation Links */}
        <nav className="flex space-x-10 justify-center pt-5 pb-2">
          {/* <Link href="/">Home</Link> */}
          {/* {projects?.map((project) => ( */}
          <Link
            className={`text-base px-[10px] py-[5px] ${
              pathname === "/" && "activeLink"
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`text-base px-[10px] py-[5px] ${
              pathname === "/blogs" && "activeLink"
            }`}
            href="/blogs"
          >
            Blogs
          </Link>
          {/* <Link href="/blogs">Blogs</Link> */}

          {/* Category NavigationMenu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-0 py-0  h-auto text-base hover:bg-transparent">
                  Category
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-none">
                  <ul className="px-6 py-5 rounded-none space-y-3 bg-[#ffffff2d] text-primary border-none shadow-md">
                    <li>
                      <NavigationMenuLink
                        className="{navigationMenuTriggerStyle()}"
                        asChild
                      >
                        <Link href="/categories/technology">Technology</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        className="{navigationMenuTriggerStyle()}"
                        asChild
                      >
                        <Link href="/categories/health">Health</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        className="{navigationMenuTriggerStyle()}"
                        asChild
                      >
                        <Link href="/categories/travel">Travel</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        className="{navigationMenuTriggerStyle()}"
                        asChild
                      >
                        <Link href="/categories/travel">Nature</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        className="{navigationMenuTriggerStyle()}"
                        asChild
                      >
                        <Link href="/categories/travel">World</Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            className={`text-base px-[10px] py-[5px] ${
              pathname === "/blogs/upload-blog" && "activeLink"
            }`}
            href="/blogs/upload-blog"
          >
            Create Blog
          </Link>
          <Link
            className={`text-base px-[10px] py-[5px] ${
              pathname === "/about" && "activeLink"
            }`}
            href="/about"
          >
            About
          </Link>
          <Link
            className={`text-base px-[10px] py-[5px]  ${
              pathname === "/contact" && "activeLink"
            }`}
            href="/contact"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
