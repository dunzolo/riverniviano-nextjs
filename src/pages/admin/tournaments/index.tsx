import BreadCrumb from "@/components/Breadcrumb";
import DashboardLayout from "@/components/layouts/AdminLayout";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // TODO: change with the real API
    // const tournaments = await getAllTournaments();
    const tournaments: any = [];
    return {
      props: {
        tournaments,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const breadcrumbItems = [{ title: "Tornei", link: "/admin/tournaments" }];

const Tournaments = () => {
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
    </div>
  );
};

Tournaments.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Tournaments;
