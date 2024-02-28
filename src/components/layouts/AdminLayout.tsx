import AdminHeader from '@/components/header/AdminHeader';
import AdminSidebar from '../sidebar/AdminSidebar';

const DashboardLayout = ({ children } : any) => {
    return (
        <>
            <AdminHeader />
            <div className="flex h-screen overflow-hidden">
                <AdminSidebar />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    );
  };
  
  export default DashboardLayout;