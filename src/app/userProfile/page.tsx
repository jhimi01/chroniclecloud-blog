"use client";

import { useCookie } from "@/hooks/useCookie"; // Import the custom hook
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash, Trash2 } from "lucide-react";

// Define the type for blogs
interface Blog {
  category: string;
  title: string;
  desc: string;
  date: string; // Stored as an ISO date string
  likes: number;
}

// Extend the User type
interface User {
  name: string;
  email: string;
  blogs: Blog[];
}

export default function UserProfile() {
  const { getCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });

  const router = useRouter();
  const userInfo = userStore((state) => state.userInfo as User | null);
  const fetchUserInfo = userStore((state) => state.fetchUserInfo);

  useEffect(() => {
    const token = getCookie();
    if (!token) {
      router.push("/login"); // Redirect to login if no token is found
      return;
    }

    // Fetch user info using Zustand store
    fetchUserInfo(token);
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <div className="container mx-auto py-10">
      <div className="text-center my-5 space-y-3">
      <h2 className="text-4xl">Welcome, <span className="bg-secondary p-1 capitalize text-white"> {userInfo?.name || "Guest"}</span></h2>
      <p className="text-lg">Email: <span className="font-bold">{userInfo?.email || "No email available"}</span></p>
      </div>

      <div className="w-full p-7 bg-accent">
        <div className="w-full bg-primary flex items-center py-3 pl-5 font-normal text-lg">
          <h2 className="text-white">Own Blogs</h2>
        </div>
        <Table>
          <TableCaption>A list of your blogs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Desc</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-right">Like</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userInfo?.blogs?.length > 0 ? (
              userInfo.blogs.map((blog, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge>{blog.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.desc}</TableCell>
                  <TableCell>{formatDate(blog.date)}</TableCell>
                  <TableCell className="text-right">
                    {blog.likes || 0}
                  </TableCell>
                  <TableCell className="text-right group  rounded-full">
                    <Trash2 className="ml-auto w-10 h-10 p-2 group-hover:bg-secondary group-hover:text-white rounded-full " />
                    {/* delete */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-xl py-5">
                  No blogs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
