import Sidebar from "@/components/dashboard/sidebar";
import Providers from "@/components/providers/monitor-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen bg-[#f5f5ef]">
        <Sidebar />

        <main className="ml-[280px] min-h-screen">
          {children}
        </main>
      </div>
    </Providers>
  );
}
