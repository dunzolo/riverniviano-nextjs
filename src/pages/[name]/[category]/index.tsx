import {
  getAllDistinctSquads,
  getAllMatchFirstGame,
  getAllMatchGroupByDay,
  getAllMatchSecondGame,
  getGroupsByCategory,
  getRankingByGroup,
  getRulesCurrentCategory,
  getSingleCategory,
  getTournament,
} from "@/api/supabase";
import RootLayout from "@/components/layouts/RootLayout";
import RowMatch from "@/components/row-match/row-match";
import { GroupClient } from "@/components/tables/group-table/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/models/Category";
import { MatchDatum, MatchFirstGame, MatchSecondGame } from "@/models/Match";
import { SquadGroup } from "@/models/SquadGroup";
import { Tournament } from "@/models/Tournament";
import {
  dateFormatItalian,
  getBackgroundColorCard,
  timeFormatHoursMinutes,
} from "@/utils/utils";
import clsx from "clsx";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useState } from "react";

type Props = {
  tournament: Tournament[];
  category: Category;
  squads: string[];
  matches: { [key: string]: MatchDatum[] };
  groups: SquadGroup[][];
  matchesFirstGame: MatchFirstGame[];
  matchesSecondGame: MatchSecondGame[];
  rules: any;
};

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.params?.name?.toString();
  const category = context.params?.category?.toString();

  try {
    const groupsCategory = await getGroupsByCategory(category);

    return {
      props: {
        matches: await getAllMatchGroupByDay(
          slug as string,
          category as string
        ),
        category: await getSingleCategory(category as string),
        groups: await getRankingByGroup(groupsCategory),
        squads: await getAllDistinctSquads(slug as string, category as string),
        tournament: await getTournament(slug as string),
        matchesFirstGame: await getAllMatchFirstGame(category as string),
        matchesSecondGame: await getAllMatchSecondGame(category as string),
        rules: await getRulesCurrentCategory(category as string),
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

export default function Home({
  category,
  matches,
  tournament,
  squads,
  groups,
  matchesFirstGame,
  matchesSecondGame,
  rules,
}: Props) {
  const [filterSquad, setFilterSquad] = useState("");
  const customWidthTabs =
    matchesFirstGame.length > 0 &&
    matchesSecondGame.length > 0 &&
    category.name != "2017" &&
    category.name != "2018"
      ? "w-1/4"
      : "w-1/3";

  const handleFilterChangeSquad = (event: any) => {
    if (event === "all") {
      event = "";
    }
    setFilterSquad(event);
  };

  //Filtra i dati in base al campo "name" e "category"
  const filterData = Object.entries(matches).map(([date, matchesForDate]) =>
    matchesForDate.filter(
      (match) =>
        match.squad_home.name
          .toLowerCase()
          .includes(filterSquad.toLowerCase()) ||
        match.squad_away.name.toLowerCase().includes(filterSquad.toLowerCase())
    )
  );

  return (
    <div className="container flex-1 space-y-4 p-4 md:p-8">
      <h1 className="text-center text-2xl font-bold">
        {tournament.at(0)?.name}
      </h1>
      <h3 className="text-center !mt-0">
        Categoria {category.name.toLowerCase()}
      </h3>

      <Tabs defaultValue="partite">
        <div className="bg-white sticky top-[56px] py-2 z-[3]">
          <TabsList className="w-full">
            <TabsTrigger className={customWidthTabs} value="partite">
              Partite
            </TabsTrigger>
            {category.name != "2017" && category.name != "2018" && (
              <TabsTrigger className={customWidthTabs} value="gironi">
                Gironi
              </TabsTrigger>
            )}
            {matchesFirstGame.length > 0 && (
              <TabsTrigger className={customWidthTabs} value="giochi">
                Giochi
              </TabsTrigger>
            )}
            <TabsTrigger className={customWidthTabs} value="info">
              Info
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="partite" className="!mt-0 space-y-4">
          <div className="grid grid-cols-1 w-full items-center gap-1.5 sticky top-[100px] bg-white z-[3] py-2">
            <div className="text-center">
              <Label>Nome squadra</Label>
              <Select onValueChange={handleFilterChangeSquad}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona la squadra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tutte</SelectItem>
                    {squads.map((squad) => {
                      return (
                        <SelectItem key={squad} value={squad}>
                          {squad}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filterData.map((matchesForDate, index) => (
            <div key={index} className="!mt-0">
              {matchesForDate[0]?.day ? (
                <div className="sticky !top-[175px] bg-white z-[2] py-2">
                  <h2 className="text-center text-sm font-bold mb-2">
                    {dateFormatItalian(matchesForDate[0]?.day, options)}
                  </h2>
                  <Separator className="h-[2px] mb-2" />
                </div>
              ) : null}
              <div className="grid gap-2 md:grid-cols-2 place-items-center">
                {matchesForDate.map((match) => (
                  <RowMatch key={match.id} matchProps={match} />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
        {category.name != "2017" && category.name != "2018" && (
          <TabsContent value="gironi" className="space-y-4">
            {Object.entries(groups).map(([group, data]) => (
              <Card key={group}>
                <CardHeader
                  className={clsx(
                    "flex flex-row items-center justify-center space-y-0 p-2 rounded-t-xl opacity-90 text-white",
                    getBackgroundColorCard(data[0].squad_id.category)
                  )}
                >
                  <CardTitle className="text-sm font-medium">
                    {data[0].squad_id.show_label_group
                      ? "GIRONE " + data[0].squad_id.group
                      : "GIRONE"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <GroupClient data={data} />
                </CardContent>
                <div className="flex-1 text-sm text-muted-foreground text-center space-x-2 py-2">
                  Classifica aggiornata
                </div>
              </Card>
            ))}
          </TabsContent>
        )}
        <TabsContent value="giochi" className="space-y-4">
          {matchesFirstGame.length > 0 && (
            <>
              <div className="text-center">
                <h3>GIOCO 1</h3>
                <p>Shoot-out di squadra</p>
                <p>
                  Si sfidano 2 squadre su 2 spazi in contemporanea; ogni
                  giocatore di una squadra, partendo da 15 metri alla porta,
                  deve cercare di fare goal al portiere avversario in massimo 7
                  secondi.
                </p>
              </div>
              <div className="grid gap-2 md:grid-cols-2 place-items-center">
                {matchesFirstGame.map((match) => {
                  const { id, squad_away, squad_home, hour } = match;
                  return (
                    <Card
                      key={id}
                      className={clsx(
                        "rounded-xl w-[99%] mb-2 relative bg-opacity-90"
                      )}
                    >
                      <CardHeader
                        className={clsx(
                          "rounded-t-xl bg-muted px-4 py-2 opacity-90 text-white",
                          getBackgroundColorCard(squad_home.category)
                        )}
                      >
                        <CardTitle className="text-sm font-medium flex justify-between">
                          <div className="flex gap-2">
                            <span>⚽️</span>
                            <span>{squad_home.category}</span>
                          </div>
                          <div className="flex gap-2">
                            <span>Gioco 1</span>
                            <span>⚽️</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <div className="min-h-16 w-full flex items-center justify-between text-xs font-bold">
                        <div className="w-1/3 flex items-center">
                          {squad_home.logo && (
                            <Image
                              src={squad_home.logo}
                              alt={squad_home.name.toLowerCase()}
                              width={512}
                              height={512}
                              className="w-14 h-14"
                            />
                          )}
                          {squad_home.name}
                        </div>
                        <div className="rounded min-w-[55px] max-w-[85px] bg-white bg-opacity-50 text-center p-1">
                          <span className="text-center">
                            {timeFormatHoursMinutes(hour)}
                          </span>
                        </div>
                        <div className="w-1/3 flex items-center justify-end">
                          <span className="text-end">{squad_away.name}</span>
                          {squad_away.logo && (
                            <Image
                              src={squad_away.logo}
                              alt={squad_away.name.toLowerCase()}
                              width={512}
                              height={512}
                              className="w-14 h-14"
                            />
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
          {matchesSecondGame.length > 0 && (
            <>
              <div className="text-center">
                <h3>GIOCO 2</h3>
                <p>Tiro al bersaglio individuale</p>
                <p>
                  Ogni giocatore della squadra ha a disposizione 3 tiri da una
                  distanza pari a 7 metri alla porta (5 metri per scuola calcio)
                  per realizzare il miglior punteggio possibile
                </p>
              </div>
              <div className="grid gap-2 grid-cols-2 place-items-center">
                {matchesSecondGame.map((match) => {
                  const { id, squad, field, hour } = match;
                  return (
                    <Card
                      key={id}
                      className={clsx(
                        "rounded-xl w-[99%] mb-2 relative bg-opacity-90"
                      )}
                    >
                      <CardHeader
                        className={clsx(
                          "rounded-t-xl bg-muted px-4 py-2 opacity-90 text-white",
                          getBackgroundColorCard(squad.category)
                        )}
                      >
                        <CardTitle className="text-sm font-medium flex justify-between">
                          <div className="flex gap-2">
                            <span></span>
                            <span>{timeFormatHoursMinutes(hour)}</span>
                          </div>
                          <div className="flex gap-2">
                            <span>{field}</span>
                            <span>⚽️</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <div className="min-h-16 w-full flex items-center justify-around text-xs font-bold px-2">
                        <div className="flex items-center">
                          {squad.logo && (
                            <Image
                              src={squad.logo}
                              alt={squad.name.toLowerCase()}
                              width={512}
                              height={512}
                              className="w-14 h-14"
                            />
                          )}
                        </div>
                        <div className="w-[50%] text-center">{squad.name}</div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <h3 className="font-bold text-center">REGOLAMENTO</h3>
          <div
            className="px-4 !mt-0 [&_ul]:list-disc [&_li]:pt-2 [&_li]:text-sm"
            dangerouslySetInnerHTML={{
              __html: rules[0].rules_id.text,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
