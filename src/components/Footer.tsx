import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-primary py-24 mt-10">
      <div className="text-white container px-5 mx-auto">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-10 mg:gap-5">
          <div className="space-y-5">
            <h2 className="text-xl">Top Products</h2>
            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-white cursor-pointer">
                {" "}
                Manage Website
              </li>
              <li className="hover:text-white cursor-pointer">
                {" "}
                Manage Reputation
              </li>
              <li className="hover:text-white cursor-pointer"> Power Tools</li>
              <li className="hover:text-white cursor-pointer">
                {" "}
                Marketing Service
              </li>
            </ul>
          </div>
          <div className="space-y-5">
            <h2 className="text-xl">Quick Links</h2>
            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-white cursor-pointer"> Jobs</li>
              <li className="hover:text-white cursor-pointer"> Brand Assets</li>
              <li className="hover:text-white cursor-pointer">
                {" "}
                Investor Relations
              </li>
              <li className="hover:text-white cursor-pointer">
                {" "}
                Terms of Service
              </li>
            </ul>
          </div>
          <div className="space-y-5">
            <h2 className="text-xl">Features</h2>
            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-white cursor-pointer"> Jobs</li>
              <li className="hover:text-white cursor-pointer"> Brand Assets</li>
              <li className="hover:text-white cursor-pointer">
                {" "}
                Investor Relations
              </li>
              <li className="hover:text-white cursor-pointer">
                {" "}
                Terms of Service
              </li>
            </ul>
          </div>
          <div className="space-y-5">
            <h2 className="text-xl">Resource</h2>
            <ul className="grid grid-cols-4 gap-2">
              <img src="/img/bg.jpg" className="w-16 h-16" />
              <img src="/img/bg3.jpg" className="w-16 h-16" />
              <img src="/img/bg4.jpg" className="w-16 h-16" />
              <img src="/img/bg5.jpg" className="w-16 h-16" />
              <img src="/img/bg2.jpg" className="w-16 h-16" />
              <img src="/img/bg4.jpg" className="w-16 h-16" />
              <img src="/img/bg3.jpg" className="w-16 h-16" />
              <img src="/img/bg.jpg" className="w-16 h-16" />
            </ul>
          </div>
        </div>
        <hr className="my-5 border-gray-700" />
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Copyright ©2024 All rights reserved | This template is made with 🖤
            by <span className="text-secondary">
            Chronicle Cloud
            </span>
          </p>
          <div className="flex items-center gap-5">
            <Facebook className="cursor-pointer hover:text-secondary" />
            <Twitter className="cursor-pointer hover:text-secondary" />
            <Instagram className="cursor-pointer hover:text-secondary" />
            <Youtube
              size={28}
              className="cursor-pointer hover:text-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
