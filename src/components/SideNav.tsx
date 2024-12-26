"use client";
import Link from "next/link";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "./ui/sidebar";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const projects = [
    { name: "Home", href: "/" },
    { name: "Category", href: "/category" },
    { name: "Travel", href: "/login" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const pathname = usePathname();

  return (
    <Sidebar className="md:w-[25%]">
      <SidebarContent className="py-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="text-center space-y-1 my-5">
              {projects?.map((project) => (
                <Link
                  className={`text-lg font-semibold ${
                    pathname === project.href && "activeLink"
                  }`}
                  href={project?.href}
                  key={project?.href}
                >
                  {project?.name}
                </Link>
              ))}
            </SidebarMenu>

            {/* Text with Image Background */}
            <div className="text-with-image">Chronicle Cloud</div>

            {/* input field */}
            <div>
              <h3 className="text-[18px] font-serif text-center">
                Subscribe for newsletter
              </h3>

              <div className="input-container mt-3 mx-auto">
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="Enter your email"
                />
                <span className="icon">
                  <svg
                    width="19px"
                    height="19px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        opacity="1"
                        d="M14 5H20"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        opacity="1"
                        d="M14 8H17"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                        stroke="#000"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        opacity="1"
                        d="M22 22L20 20"
                        stroke="#000"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <p className="text-xs p-5 text-center">
        Copyright ©2025 All rights reserved | This template is made with 🖤 by
        Colorlib
      </p>
    </Sidebar>
  );
}
