import {
  getAllCategories,
  getAllDistinctFields,
  getAllDistinctSquads,
  getAllMatchFinalPhase,
} from "@/api/supabase";
import BreadCrumb from "@/components/Breadcrumb";
import DashboardLayout from "@/components/layouts/AdminLayout";
import { MatchFinalPhase } from "@/components/tables/final-phase-table";
import { MatchClient } from "@/components/tables/match-table/client";
import { Button } from "@/components/ui/button";
import { MatchDatum } from "@/models/Match";
import { handleRedirect } from "@/utils/supabase/redirect";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";

type Props = {
  matches: MatchDatum[];
  categories: string[];
  squads: string[];
  fields: string[];
  slug: string;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const responseRedirect = await handleRedirect(context);

  if (responseRedirect.redirect) return responseRedirect;

  const slug = context.params?.name?.toString();

  try {
    return {
      props: {
        matches: await getAllMatchFinalPhase(slug as string),
        categories: await getAllCategories(slug as string),
        squads: await getAllDistinctSquads(slug as string),
        fields: await getAllDistinctFields(slug as string),
        slug,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default function page({
  matches,
  categories,
  squads,
  slug,
  fields,
}: Props) {
  const breadcrumbItems = [
    { title: "Fasi finali", link: `/admin/${slug}/final-phase` },
  ];

  return (
    <>
      <div className="flex-1 space-y-4 px-4 md:p-8">
        <div className="flex justify-between">
          <BreadCrumb items={breadcrumbItems} />
          <Link href={`/admin/${slug}/final-phase/create`}>
            <Button>Crea</Button>
          </Link>
        </div>
        <MatchFinalPhase
          data={matches}
          categories={categories}
          squads={squads}
          fields={fields}
          slug={slug}
        />
      </div>
    </>
  );
}
