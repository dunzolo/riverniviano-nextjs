import AdminHeader from "@/components/header/AdminHeader";
import { Toaster } from "@/components/ui/toaster";
import AdminSidebar from "../sidebar/AdminSidebar";

const DashboardLayout = ({ children }: any) => {
  return (
    <>
      <AdminHeader />
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="w-full pt-16 mb-16">{children}</main>
        <Toaster />
      </div>
      {/* <AdminFooter items={footerAdminItems} /> */}
    </>
  );
};

export default DashboardLayout;
