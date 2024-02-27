"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MatchDatum } from '@/models/Match';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MatchClientProps {
  data: MatchDatum[];
}

export const MatchClient: React.FC<MatchClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Match inseriti (${data.length})`}
          description="elenco dei risultati inseriti nel torneo"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/admin/match/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{
							data && data.map(singleMatch => {
								return(
									<Card key={singleMatch.id}>
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">
												📆 {singleMatch.day} | {singleMatch.hour}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">{singleMatch.squad_home.name} {singleMatch.score_home}</div>
											<div className="text-2xl font-bold">{singleMatch.squad_away.name} {singleMatch.score_away}</div>
											<p className="text-xs text-muted-foreground">
												Categoria: {singleMatch.squad_home.category}
											</p>
										</CardContent>
									</Card>
								)
							})
						}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
