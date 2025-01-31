import Link from 'next/link';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function AdminSidebar() {
  return (
    <div className="flex flex-col h-screen w-64 bg-background border-r">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-semibold text-primary">Admin Panel</h1>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className="flex items-center p-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/blogs-admin"
              className="flex items-center p-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <FileText className="w-5 h-5 mr-3" />
              Blogs
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="px-4 py-6 border-t">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center p-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Home className="w-5 h-5 mr-3" />
              Home
            </Link>
          </li>
          <Separator className="my-2" />
          <li>
            <Link
              href="/admin/settings"
              className="flex items-center p-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </li>
          <Separator className="my-2" />
          <li>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start p-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Log Out
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}