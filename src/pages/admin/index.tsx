import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DashboardLayout from "@/components/layouts/AdminLayout";
import { GetServerSideProps } from "next";
import { getSquadsByGroup } from "@/api/supabase";
import { SquadGroup } from "@/models/SquadGroup";
import { GroupClient } from "@/components/tables/group-table/client";

type Props = {
  squads: SquadGroup[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const squads = await getSquadsByGroup("A");
    return {
      props: {
        squads,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default function page({ squads }: Props) {
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
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-center space-y-0 p-2">
                  <CardTitle className="text-sm font-medium">
                    GIRONE {squads[0].squad_id.group}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <GroupClient data={squads} />
                </CardContent>
                <div className="flex-1 text-sm text-muted-foreground text-center space-x-2 py-4">
                  {/* //TODO: inserire testo in riferimento al girone */}
                  Classifica aggiornata
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
