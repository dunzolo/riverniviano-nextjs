import {
  getAllCategoriesTournament,
  getSquadsByCategory,
  getTournament,
} from "@/api/supabase";
import RootLayout from "@/components/layouts/RootLayout";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/models/Category";
import { Tournament } from "@/models/Tournament";
import { count } from "console";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TournamentCard } from "..";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  tournament: Tournament[];
  categories: Category[];
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.params?.name?.toString();

  try {
    return {
      props: {
        tournament: await getTournament(slug as string),
        categories: await getAllCategoriesTournament(slug as string),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

Home.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default function Home({ tournament, categories }: Props) {
  return (
    <div className="container flex-1 space-y-4 p-4 md:p-8">
      <div className="mt-4">
        <Link href={`/${tournament.at(0)?.slug}/calendario`}>
          <div className="flex items-center gap-4 space-y-1">
            <Image
              src={tournament.at(0)?.logo ?? ""}
              alt="logo"
              width={512}
              height={512}
              className="w-14 h-14"
            />
            <div>
              <h4 className="text-base font-semibold leading-none">
                CALENDARIO COMPLETO
              </h4>
              <p className="text-sm text-muted-foreground">
                Elenco di tutte le partite del torneo
              </p>
            </div>
          </div>
        </Link>
        <Separator className="!my-2" />
      </div>

      {categories.map((category) => {
        return (
          <div className="mt-4" key={category.id}>
            <Link
              href={`/${tournament.at(0)?.slug}/${category.name.toLowerCase()}`}
            >
              <div className="flex items-center gap-4 space-y-1">
                <Image
                  src={tournament.at(0)?.logo ?? ""}
                  alt="logo"
                  width={512}
                  height={512}
                  className="w-14 h-14"
                />
                <div>
                  <h4 className="text-base font-semibold leading-none">
                    {category.description}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {category.type}
                  </p>
                </div>
              </div>
            </Link>
            <Separator className="!my-2" />
          </div>
        );
      })}
    </div>
  );
}
