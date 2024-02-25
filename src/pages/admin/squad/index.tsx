import BreadCrumb from "@/components/Breadcrumb";
import { UserClient } from "@/components/tables/squad-table/client";
import { users } from "@/constants/data";

import DashboardLayout from '@/components/layouts/AdminLayout';

page.getLayout = (page : any) => (
    <DashboardLayout>{page}</DashboardLayout>
);

const breadcrumbItems = [{ title: "Squadre", link: "/admin/squad" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}