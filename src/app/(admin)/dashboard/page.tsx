"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCookie } from "@/hooks/useCookie";
import useBlogStore from "@/stores/blogStore";
import { userStore } from "@/stores/userStore";
import { useEffect, useState, useMemo } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FileTextIcon, ShieldPlus, Users } from "lucide-react";

// **Register required Chart.js components**
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const { blogs } = useBlogStore();
  const { allUsers, fetchAllUsers } = userStore();
  const { getCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });

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

  // Group blogs by user
  const userBlogCounts = useMemo(() => {
    return allUsers.map((user) => ({
      name: user.name || "Unknown User",
      count: blogs.filter((blog) => blog.userId === user.id).length,
    }));
  }, [allUsers, blogs]);

  const labels = userBlogCounts.map((user) => user.name);
  const blogUploads = userBlogCounts.map((user) => user.count);
  const userData = allUsers.map((_, index) => index + 1);

  if (!allUsers || !blogs) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-4">
        <Card className="btn-grad-green text-white">
          <CardHeader></CardHeader>
          <CardContent>
            <CardTitle>Total Users</CardTitle>
            <div className="text-3xl flex items-center gap-1 justify-center font-bold">
              <Users /> {allUsers?.length}
            </div>
          </CardContent>
        </Card>
        <Card className="btn-grad text-white">
          <CardHeader></CardHeader>
          <CardContent>
            <CardTitle>Total Blog Posts</CardTitle>
            <div className="text-3xl flex items-center gap-1 justify-center font-bold">
              <FileTextIcon />
              {blogs?.length}
            </div>
          </CardContent>
        </Card>
        <Card className="btn-grad-blue text-white">
          <CardHeader></CardHeader>
          <CardContent>
            <CardTitle>Active Sessions</CardTitle>
            <div className="text-3xl flex items-center gap-1 justify-center font-bold">
              <ShieldPlus />
              89
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Blogs Uploaded Per User</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: "Blog Uploads",
                    data: blogUploads,
                    backgroundColor: "#23378861",
                    borderColor: "rgba(35,56,136,1)",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <Line
              data={{
                labels: userData,
                datasets: [
                  {
                    label: "New Users",
                    data: userData.map(() => Math.floor(Math.random() * 10)),
                    fill: false,
                    borderColor: "#42A5F5",
                    tension: 0.4,
                  },
                ],
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
