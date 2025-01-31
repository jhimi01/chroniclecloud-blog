"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookie } from "@/hooks/useCookie"; // Import the custom hook
import { userStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
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
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EditModal from "@/components/EditModal";

// Define the type for blogs
interface Blog {
  id: string;
  category: string;
  title: string;
  desc: string;
  date: string; // Stored as an ISO date string
  likes: number;
  image: string; // Stored as an
  file: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

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


  console.log(userInfo)

  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
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

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;
    try {
      const res = await axios.delete(`/api/delete-blog/${id}`);
      console.log(res.data);
      toast("Deleted successfully!");
      window.location.reload();

      // Optional: Update local state to remove the blog dynamically
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog); // Set the blog to edit
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const handleEditSubmit = async (data: any) => {
    try {
      const response = await axios.put(
        `/api/edit-blog/${selectedBlog?.id}`,
        data
      );
      if (response.status === 200) {
        toast("Blog updated successfully!");

        // Refresh or update local state here if needed
        handleModalClose();
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast("Failed to update blog.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="text-center my-5 space-y-3">
        <h2 className="text-4xl">
          Welcome,
          <span className="bg-secondary p-1 capitalize text-white">
            {userInfo?.name || "Guest"}
          </span>
        </h2>
        <p className="text-lg">
          Email:
          <span className="font-bold">
            {userInfo?.email || "No email available"}
          </span>
        </p>
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
              <TableHead className="text-right">Edit</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userInfo?.blogs?.length > 0 ? (
              userInfo.blogs.map((blog, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link href={`/blogs/${blog?.id}`}>
                      <Badge>{blog.category}</Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Image
                      alt="blog image"
                      width={500}
                      height={500}
                      className="w-10 h-10"
                      src={blog?.image}
                    />
                    {blog.title}
                  </TableCell>
                  <TableCell>{blog.desc}</TableCell>
                  <TableCell>{formatDate(blog.date)}</TableCell>
                  <TableCell className="text-right">
                    {blog.likes || 0}
                  </TableCell>
                  <TableCell>
                    <Edit
                      onClick={() => handleEdit(blog)}
                      className="cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="text-right group rounded-full">
                    <Trash2
                      onClick={() => handleDelete(blog?.id)}
                      className="ml-auto w-10 h-10 p-2 group-hover:bg-secondary group-hover:text-white rounded-full cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-xl py-5">
                  No blogs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedBlog && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleEditSubmit}
          defaultValues={{
            ...selectedBlog,
            file: selectedBlog?.file || "", // Provide a default value
          }} // Pass blog details to the modal
        />
      )}
    </div>
  );
}
