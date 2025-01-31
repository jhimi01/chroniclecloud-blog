import BlogTable from '@/components/admin/BlogTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
        <Button asChild>
          <Link href="/blogs/upload-blog">Create New Post</Link>
        </Button>
      </div>
      <BlogTable />
    </div>
  );
}