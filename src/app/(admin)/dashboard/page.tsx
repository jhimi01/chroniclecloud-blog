"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCookie } from "@/hooks/useCookie";
import useBlogStore from "@/stores/blogStore";
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// **Register required Chart.js components**
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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

  const token = getCookie();

  useEffect(() => {
    if (token) {
      fetchAllUsers(token);
    }
  }, [token, fetchAllUsers]);

  console.log(allUsers);

  // Group blogs by user
  const userBlogCounts = allUsers.map((user) => ({
    name: user.name || "Unknown User",
    count: blogs.filter((blog) => blog.userId === user.id).length,
  }));

  const labels = userBlogCounts.map((user) => user.name);
  const blogUploads = userBlogCounts.map((user) => user.count);

  const userData = allUsers.map((_, index) => index + 1);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-600 text-white ">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{allUsers?.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-green-600 text-white">
          <CardHeader>
            <CardTitle>Total Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{blogs?.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-600 text-white">
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">89</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <Card>
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
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie
              data={{
                labels: ["Active Users", "Inactive Users"],
                datasets: [
                  {
                    data: [allUsers.length, 100 - allUsers.length],
                    backgroundColor: ["#4CAF50", "#F44336"],
                  },
                ],
              }}
            />
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
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
