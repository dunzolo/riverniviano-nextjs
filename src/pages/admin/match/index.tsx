import { getMatchesWithResult } from "@/api/supabase";
import BreadCrumb from "@/components/Breadcrumb";
import DashboardLayout from "@/components/layouts/AdminLayout";
import { MatchClient } from "@/components/tables/match-table/client";
import { Match, MatchDatum } from "@/models/Match";
import { GetServerSideProps } from "next";

type Props = {
  matches: MatchDatum[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const matches = await getMatchesWithResult();
    return {
      props: {
        matches,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

const breadcrumbItems = [{ title: "Match", link: "/admin/match" }];

export default function page({ matches }: Props) {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <MatchClient data={matches} />
      </div>
    </>
  );
}
