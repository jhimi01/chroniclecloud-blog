"use client";
import React, { useState } from "react";
import { Plus, Search, Table } from "lucide-react";
import Link from "next/link";
import useBlogStore from "@/stores/blogStore";
import CardBlog from "@/components/CardBlog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Blogs() {
  const { blogs } = useBlogStore();
  const [search, setSearch] = useState("");
  const [grid, setGrid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  type BlogKeys = "title" | "category" | "desc";
  const filteredBlogs = blogs.filter((blog) =>
    (["title", "category", "desc"] as BlogKeys[]).some((key) =>
      blog[key]?.toLowerCase().includes(search)
    )
  );

  // Pagination logic
  const itemsPerPage = 4;
  const totalItems = filteredBlogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // search funtionality
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto container">
      <div className="md:flex items-center gap-5 p-4 md:p-0 md:pt-10 md:pr-4">
        {/* Search bar */}
        <div className="flex md:mb-0 mb-2 items-center border w-full md:w-80 pr-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden">
          <input
            className="w-full h-full pl-5 outline-none placeholder-gray-500 text-sm"
            placeholder="Search for blogs"
            type="text"
            onChange={handleSearchChange}
          />
          {/* SVG icons */}
          <Search />
        </div>

        {/* Upload blog button */}
        <Link href="/blogs/upload-blog">
          <button className="bg-white text-center w-full md:w-48 rounded-2xl h-12 relative border text-black text-base font-normal group">
            <div className="bg-secondary text-white rounded-xl h-10 w-[20%] flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[96%] z-10 duration-500">
              <Plus />
            </div>
            <p className="translate-x-2">Create blog</p>
          </button>
        </Link>

        <div
          className="cursor-pointer hidden md:block"
          onClick={() => setGrid(!grid)}
        >
          <Table size={30} />
        </div>
        <div className="text-xl md:mt-0 mt-4 text-center md:text-start">
          <h2>
            Blogs content:
            <span className="text-white bg-secondary p-1 rounded-full">
              {blogs?.length}
            </span>
          </h2>
        </div>
      </div>
      <hr className="my-5" />

      {/* Blogs section */}
      <div className="w-full my-10 space-y-5 md:space-y-7">
        {currentBlogs.length === 0 ? (
          <div>No blogs available</div>
        ) : (
          <div className={` ${grid ? "gap-3 grid grid-cols-2" : "space-y-5"}`}>
            {currentBlogs.map((blog, index) => (
              <CardBlog key={index} blog={blog} grid={grid} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
