import { getAllDays, getMatchesByDate } from "@/api/supabase";
import DashboardLayout from "@/components/layouts/AdminLayout";
import AppResult from "@/components/AppResult";
import { MatchDatum } from "@/models/Match";
import { dateFormat } from "@/utils/utils";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/components/Breadcrumb";
import { Match } from '../../../models/Match';
import { MatchForm } from "@/components/forms/match-form";

type Props = {
  daysProps: string[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const daysProps = await getAllDays();
    return {
      props: {
        daysProps,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

Update.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default function Update({ daysProps }: Props) {
	const breadcrumbItems = [
    { title: "Match", link: "/admin/match" },
    { title: "Inserisci risultati", link: "/admin/match/update" },
  ];
  

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
				<MatchForm
          days={daysProps}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
    // <div>
    //     <h1>Inserisci risultato</h1>
    //     {/* <pre>{JSON.stringify(days, null, 2)}</pre> */}

    //     <select onChange={handleSelectDay}>
    //         <option value="">Seleziona la giornata</option>
    //         {
    //             days.map(day => {
    //                 return (
    //                     <option key={day} value={day}>{dateFormat(day)}</option>
    //                 )
    //             })
    //         }
    //     </select>
    //     {/* <pre>{JSON.stringify(selectedDay, null, 2)}</pre> */}
    //     {
    //         selectedDay.map((item) => {
    //             return <AppResult key={item.id} item={item} />
    //         })
    //     }
    // </div>
  );
}
