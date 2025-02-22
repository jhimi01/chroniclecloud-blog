"use client";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import useBlogStore from "@/stores/blogStore";
import Image from "next/image";

export default function BlogTable() {
  const { blogs } = useBlogStore();
  return (
    <Table>
      <TableCaption>A list of recent blog posts.</TableCaption>
      <TableHeader className="bg-primary ">
        <TableRow>
          <TableHead className="text-white"></TableHead>
          <TableHead className="text-white">Title</TableHead>
          <TableHead className="text-white">Category</TableHead>
          <TableHead className="text-white">Date</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-right text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs.map((blog) => (
          <TableRow key={blog?.id} className="hover:bg-gray-300">
            <TableCell className="font-medium">
              <Image
                width={1000}
                height={1000}
                className="w-12 rounded h-12"
                src={blog?.image}
                alt="img"
              />
            </TableCell>
            <TableCell className="font-medium">{blog?.title}</TableCell>
            <TableCell>{blog?.category}</TableCell>
            <TableCell>{blog?.date}</TableCell>
            <TableCell>
              <Badge variant={"default"}>Published</Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-10 h-10 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
