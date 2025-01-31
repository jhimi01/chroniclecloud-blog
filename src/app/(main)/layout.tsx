import Navbar from "@/components/Navber";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar /> */}
      <main className="flex-1 p-4">{children}</main>
    </>
  );
}