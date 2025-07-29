import { SidebarComponent } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
// import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex h-screen flex-col">
      <Header />
      <div className="flex grow flex-col overflow-y-auto bg-slate-100 p-6">
        {/* Main Area */}
        <div className="mx-auto flex h-full w-full flex-1">
          {/* Sidebar */}
          <SidebarComponent />

          {/* Page Content */}
          <main className="flex flex-1 flex-col overflow-y-auto ml-8">
            {children}
          </main>
        </div>
      </div>
      {/* <Button className="absolute right-8 bottom-8">Need help?</Button> */}
    </main>
  );
};

export default layout;
