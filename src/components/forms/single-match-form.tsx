"use client";
// #ZOD
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// #REACT
import { useState } from "react";
import { useForm } from "react-hook-form";
// #NEXT
import { useParams, useRouter } from "next/navigation";
// #UI COMPONENTS
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Match, MatchDatum } from "@/models/Match";
import { getMatchesBySquad, getSquadsByGroup, updateResult } from "@/api/supabase";
import { SquadGroup } from "@/models/SquadGroup";
import { updatePoints } from "@/utils/utils";

const BUTTON_TEXT_INSERT = "Inserisci";
const BUTTON_TEXT_UPDATE = "Aggiorna";

const formSchema = z.object({
  day: z.string(),
  hour: z.string(),
  field: z.string(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface SquadFormProps {
  initialData: MatchDatum;
}

export const SingleMatchForm: React.FC<SquadFormProps> = ({
  initialData,
}) => {

  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Modifica squadra" : "Crea squadra";
  const description = initialData
    ? "Modifica i dati di questa squadra."
    : "Aggiungi una nuova squadra";
  const toastMessage = initialData ? "Squadra aggiornata." : "Squadra creata.";

  const [action, setAction] = useState(
    initialData.score_home ? BUTTON_TEXT_UPDATE : BUTTON_TEXT_INSERT
  );

  const defaultValues = initialData
    ? initialData
    : {
      day: "",
      hour: "",
      field: ""
    };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {

    try {
      setLoading(true);

      if (action == BUTTON_TEXT_INSERT) {
        setAction(BUTTON_TEXT_UPDATE);
      }

    } catch (error: any) {

    } finally {
      setTimeout(() => {
        setLoading(false);
        router.refresh();
      }, 1500);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">

            {/* //TODO: inserire loghi */}
            {/* //TODO: in fase di creazione devono vedersi i campi compilabili */}
            <div>
              {initialData.squad_home.name} {initialData.score_home}
            </div>
            <div>
              {initialData.squad_away.name} {initialData.score_away}
            </div>
            <div>
              {initialData.squad_home.category} | {initialData.squad_home.group}
            </div>

            {/* //TODO: inserire emoji nelle label */}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="hour"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Orario</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        disabled={loading}
                        placeholder="Inserisci l'orario"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Giorno</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        disabled={loading}
                        placeholder="Inserisci il giorno"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* //TODO: inserire select per selezione campo */}
            <FormField
              control={form.control}
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Inserisci il campo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
