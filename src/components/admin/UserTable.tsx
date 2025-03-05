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
import { userStore } from "@/stores/userStore";
import { useCookie } from "@/hooks/useCookie";
import { useEffect, useState } from "react";

export default function UserTable() {
  const { allUsers, fetchAllUsers } = userStore();
  const { getCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  }); // Replace with your token retrieval logic
 const [token, setToken] = useState("");

  useEffect(() => {
    const cookieToken = getCookie();
    setToken(cookieToken);
  }, [getCookie]);

  useEffect(() => {
    if (token && allUsers.length === 0) {
      fetchAllUsers(token);
    }
  }, [token, allUsers, fetchAllUsers]);

  return (
    <div className="p-6 bg-background rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <Table>
        <TableCaption>A list of all registered users.</TableCaption>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">UserId</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Joined</TableHead>
            <TableHead className="text-right text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers?.map((user: any) => (
            <TableRow key={user.id} className="hover:bg-gray-300">
              <TableCell className="font-medium capitalize">
                {user.id}
              </TableCell>
              <TableCell className="font-medium capitalize">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    user.role === "ADMIN"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
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
                      <Edit className="w-4 h-4 mr-2" />
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
    </div>
  );
}
