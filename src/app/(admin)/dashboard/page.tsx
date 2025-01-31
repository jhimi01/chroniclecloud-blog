'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import useBlogStore from '@/stores/blogStore';

export default function AdminDashboard() {
    const { blogs } = useBlogStore();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{blogs?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">89</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}