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
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Define paths where navbar should not appear
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

  return (
    <header className="container mx-auto text-primary">
      {/* Header Title */}
      <div className="text-4xl font-semibold py-5 md:text-center">
        Chronicle Cloud
      </div>
      <hr className="hidden md:block" />

      {/* Navigation Links */}
      <nav className="md:flex justify-center space-x-10 py-5 hidden">
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
                  {/* <hr /> */}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}
