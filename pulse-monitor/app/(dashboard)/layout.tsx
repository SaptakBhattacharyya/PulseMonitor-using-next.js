import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf8f2]">
      <Sidebar />

      <main className="ml-[280px] min-h-screen">
        {children}
      </main>
    </div>
  );
}

