import { getAllDays, getMatchesByDate } from "@/api/supabase";
import DashboardLayout from "@/components/layouts/AdminLayout";
import { MatchDatum } from "@/models/Match";
import { dateFormat } from "@/utils/utils";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/components/Breadcrumb";
import { MatchForm } from "@/components/forms/match-form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [selectedDay, setSelectedDay] = useState<MatchDatum[]>([]);

  const handleSelectDay = async (event: any) => {
    const data = await getMatchesByDate(event);
    setSelectedDay(data);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between">
          <Heading title="title" description="description" />
        </div>
        <Separator />

        <Select onValueChange={handleSelectDay}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleziona la giornata" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {daysProps.map((day) => {
                return (
                  <SelectItem key={day} value={day}>
                    {dateFormat(day)}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="md:grid md:grid-cols-4 gap-8">
          {selectedDay.map((item) => {
            return <MatchForm initialData={item} key={item.id} />;
          })}
        </div>
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
