"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { ArrowBigDown, ArrowDownUp, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Navbar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const noNavbarPaths = ["/login", "/signup"];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/blogs/upload-blog", label: "Create Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const categories = [
    { href: "/categories/technology", label: "Technology" },
    { href: "/categories/health", label: "Health" },
    { href: "/categories/travel", label: "Travel" },
    { href: "/categories/nature", label: "Nature" },
    { href: "/categories/world", label: "World" },
  ];

  // if (noNavbarPaths.includes(pathname)) return null;

  return (
    <header className="container mx-auto text-primary">
      {/* desktop nav */}
      <div className="hidden md:block">
        <div className="text-4xl font-semibold py-5 md:text-center flex items-center justify-between md:block">
          Chronicle Cloud
          {/* Mobile Drawer Toggle Button */}
        </div>
        <hr className="hidden md:block" />

        {/* Navigation Links for Desktop */}
        <nav className="md:flex justify-center space-x-10 py-5 bg-white">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-base px-3 py-2 ${
                pathname === href ? "activeLink" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Category Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base hover:bg-transparent">
                  Category
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-none">
                  <ul className="bg-[#ffffff] text-primary shadow-md space-y-3">
                    {categories.map(({ href, label }) => (
                      <li key={href} className="py-2 hover:bg-gray-300">
                        <NavigationMenuLink asChild>
                          <Link className="px-10 text-center" href={href}>
                            {label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      {/* mobile nav */}
      {/* mobile nav */}
      <Sheet>
        <div className="flex justify-between px-5 pt-5 items-center md:hidden">
          <div className="text-4xl font-semibold">Chronicle Cloud</div>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
            <div className="p-4 space-y-4">
              {/* Navigation Links */}
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block text-base hover:bg-gray-300 p-1 ${
                    pathname === href ? "activeLink" : ""
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {/* Dropdown for Categories */}
              <div>
                <details className="group">
                  <summary className="cursor-pointer text-base hover:bg-gray-300 p-1">
                    <span>Categories</span>
                  </summary>
                  <ul className="pl-4 space-y-2 mt-2">
                    {categories.map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="block text-base hover:bg-gray-200 p-1"
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
