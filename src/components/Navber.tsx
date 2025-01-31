"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { userStore } from "@/stores/userStore"; // Zustand store for user management
import { useCookie } from "@/hooks/useCookie";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const { getCookie, removeCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });

  const fetchUserInfo = userStore((state) => state.fetchUserInfo);
  const userInfo = userStore((state: any) => state.userInfo);

  useEffect(() => {
    const token = getCookie();
    // Fetch user info using Zustand store
    fetchUserInfo(token);
  }, []);

  // Zustand store for user information

  useEffect(() => {
    // Check if the user is authenticated (based on Zustand store or cookies)
    setIsAuthenticated(!!userInfo); // Adjust logic if needed to check cookies or session
  }, [userInfo]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    // { href: "/blogs/upload-blog", label: "Create Blog" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
  ];

  const categories = [
    { href: "/categories/technology", label: "Technology" },
    { href: "/categories/health", label: "Health" },
    { href: "/categories/travel", label: "Travel" },
    { href: "/categories/fashion", label: "Fashion" },
    { href: "/categories/photography", label: "Photography" },
  ];

  // Add userProfile link conditionally
  if (isAuthenticated && userInfo?.role === "USER") {
    navLinks.push({ href: "/userProfile", label: "My Profile" });
  }

  if (isAuthenticated) {
    navLinks.push({ href: "/blogs/upload-blog", label: "Create Blog" });
  } 

  if (isAuthenticated && userInfo?.role === "ADMIN") {
    navLinks.push({ href: "/dashboard", label: "Dashboard" });
  } 

  const handleLogout = () => {
    removeCookie();

    // Clear user data from Zustand store
    userStore.getState().setUserInfo(null);
    router.push("/");
  };

  return (
    <header
      className={`${
        ["/blogs-admin", "/users", "/dashboard"].includes(pathname)
          ? "hidden"
          : ""
      } container mx-auto text-primary`}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:block">
         {/* <Image
            width={500}
            height={500}
            alt="logo"
            src="/img/logo1.png"
            className="w-20 h-20 mx-auto"
          /> */}
        
        <div className="text-4xl font-semibold py-5  md:text-center flex items-center justify-center">
          Chronicle Cloud
          {/* <Image
            width={500}
            height={500}
            alt="logo"
            src="/img/logo1.png"
            className="w-20 h-20 mx-auto"
          /> */}
        </div>
        <hr className="hidden md:block" />

        {/* Navigation Links */}
        <nav className="md:flex justify-center space-x-3 lg:space-x-10 py-5 bg-white">
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

          {/* logout */}
          {isAuthenticated ? (
            <Button
              className="rounded-none border-primary border-2 hover:text-white bg-transparent text-primary"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          ) : (
            <Link
              href="/login"
              className="rounded-none border-primary border-2 hover:text-white bg-transparent hover:bg-primary px-5  text-primary"
            >
              <div className="mt-[5px]">Login</div>
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <Sheet>
        <div className="flex justify-between px-5 pt-5 items-center md:hidden">
          <div className="text-4xl font-semibold">Chronicle Cloud</div>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="hidden">Menu</SheetTitle>
            <div className="p-4 space-y-4">
              {/* Navigation Links */}
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block text-base hover:bg-gray-300 p-1 ${
                    pathname === href ? "activeLink" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* Dropdown for Categories */}
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
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
