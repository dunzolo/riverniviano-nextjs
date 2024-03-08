"use client";
// #NEXT
import { useRouter } from "next/navigation";
// #ICON
import { Plus } from "lucide-react";
// #MODELS
import { MatchDatum } from "@/models/Match";
// #UTILS
import { dateFormatItalian, timeFormatHoursMinutes, } from "@/utils/utils";
// #UI COMPONENTS
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { MatchForm } from "@/components/forms/match-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      </div>
      <Separator />
      <ScrollArea className="h-[60vh]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {
            //TODO: inserire loghi delle squadre dentro la card
            data &&
            data.map((singleMatch) => {
              return (
                <Dialog key={singleMatch.id}>
                  <DialogTrigger asChild>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          📆&nbsp;{dateFormatItalian(singleMatch.day)}
                          &nbsp;|&nbsp;
                          {timeFormatHoursMinutes(singleMatch.hour)}
                          <p className="text-xs text-muted-foreground pt-1">
                            Categoria:&nbsp;
                            <span className="font-bold">
                              {singleMatch.squad_home.category}
                            </span>
                            &nbsp;-&nbsp;Girone:&nbsp;
                            <span className="font-bold">
                              {singleMatch.squad_home.group}
                            </span>
                          </p>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {singleMatch.squad_home.name}&nbsp;
                          {singleMatch.score_home}
                        </div>
                        <div className="text-2xl font-bold">
                          {singleMatch.squad_away.name}&nbsp;
                          {singleMatch.score_away}
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent
                    className="lg:max-w-[500px] w-[80%] rounded"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <DialogHeader>
                      <DialogTitle>Modifica risultato</DialogTitle>
                      <DialogDescription>
                        In questo pannello puoi modificare il risultato della
                        partita selezionata
                      </DialogDescription>
                    </DialogHeader>
                    <MatchForm
                      initialData={singleMatch}
                      key={singleMatch.id}
                    />
                  </DialogContent>
                </Dialog>
              );
            })
          }
        </div>
      </ScrollArea>
    </>
  );
};
