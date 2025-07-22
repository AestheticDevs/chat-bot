import { SidebarComponent } from "@/components/admin/Sidebar";
import { Header } from "@/components/public/Header";
import { Button } from "@/components/ui/button";
// import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <div className="flex h-full flex-col overflow-hidden bg-slate-100 p-6">
        {/* Main Area */}
        <div className="mx-auto flex h-full w-full flex-1">
          {/* Sidebar */}
          <SidebarComponent />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto px-8 py-4">{children}</main>
        </div>
      </div>

      <Button className="absolute right-8 bottom-8">Need help?</Button>
    </>
  );
};

export default layout;
