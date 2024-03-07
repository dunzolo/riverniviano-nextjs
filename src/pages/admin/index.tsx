import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DashboardLayout from "@/components/layouts/AdminLayout";
import { GetServerSideProps } from "next";
import { getRankingByGroup, getSquadsByGroup } from "@/api/supabase";
import { SquadGroup } from "@/models/SquadGroup";
import { GroupClient } from "@/components/tables/group-table/client";

type Props = {
  groups: SquadGroup[][]
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const groups = await getRankingByGroup(['A', 'B', 'C', 'D']);
    return {
      props: {
        groups
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default function page({ groups }: Props) {
  const allData = (groups as SquadGroup[][]).flat().reduce<SquadGroup[]>((acc, curr) => acc.concat(curr), []);

  // TODO: inserire all'interno di una funzione passando i parametri 
  // Filtra gli oggetti in base al campo "category"
  const groupedDataEsordienti = allData.reduce<{ [key: string]: SquadGroup[] }>((acc, curr) => {
    if (curr.squad_id.category === "ESORDIENTI") {
      const group = curr.squad_id.group;
      // Verifica se acc[group] è già definito, altrimenti inizializza come array vuoto
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(curr);
    }
    return acc;
  }, {});

  const groupedData2013 = allData.reduce<{ [key: string]: SquadGroup[] }>((acc, curr) => {
    if (curr.squad_id.category === "2013") {
      const group = curr.squad_id.group;
      // Verifica se acc[group] è già definito, altrimenti inizializza come array vuoto
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(curr);
    }
    return acc;
  }, {});

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="esordienti" className="space-y-4">
          <TabsList>
            {/* //TODO: inserire tabs in base alle categorie essendo presenti più gironi per categorie */}
            <TabsTrigger value="esordienti">Esordienti</TabsTrigger>
            <TabsTrigger value="pulcini_2013">2013</TabsTrigger>
            <TabsTrigger value="pulcini_2014">2014</TabsTrigger>
          </TabsList>
          <TabsContent value="esordienti" className="space-y-4">
            {Object.entries(groupedDataEsordienti).map(([group, data]) => (
              <div key={group} className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-center space-y-0 p-2">
                    <CardTitle className="text-sm font-medium">
                      GIRONE {group}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <GroupClient data={data} />
                  </CardContent>
                  <div className="flex-1 text-sm text-muted-foreground text-center space-x-2 py-4">
                    {/* //TODO: inserire testo in riferimento al girone */}
                    Classifica aggiornata
                  </div>
                </Card>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="pulcini_2013" className="space-y-4">
            {Object.entries(groupedData2013).map(([group, data]) => (
              <div key={group} className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-center space-y-0 p-2">
                    <CardTitle className="text-sm font-medium">
                      GIRONE {group}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <GroupClient data={data} />
                  </CardContent>
                  <div className="flex-1 text-sm text-muted-foreground text-center space-x-2 py-4">
                    {/* //TODO: inserire testo in riferimento al girone */}
                    Classifica aggiornata
                  </div>
                </Card>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
