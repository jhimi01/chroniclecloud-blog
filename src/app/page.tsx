"use client";
import BlogSection from "@/components/BlogSection";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
export default function Home() {


  return (
    <div>
      <div>
        <Hero />
      </div>
      <div></div>
      <div>
        <BlogSection />
      </div>
      <Testimonials />
    </div>
  );
}
