import BreadCrumb from "@/components/Breadcrumb";
import DashboardLayout from "@/components/layouts/AdminLayout";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // TODO: change with the real API
    // const companies = await getAllCompanies();
    const companies: any = [];
    return {
      props: {
        companies,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const breadcrumbItems = [{ title: "Associazioni", link: "/admin/companies" }];

const Companies = () => {
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
    </div>
  );
};

Companies.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Companies;
