import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="p-4 w-[81%] ml-auto bg-gray-100">{children}</main>
    </div>
  );
}
