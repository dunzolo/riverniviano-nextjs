"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import { useToast } from "../ui/use-toast";
import { MatchDatum } from "@/models/Match";
import { updateResult } from "@/api/supabase";

const formSchema = z.object({
  score_home: z.string(),
  score_away: z.string(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface MatchFormProps {
  //per togliere errore mettere any | lasciare per vedere suggerimenti
  initialData: any;
}

export const MatchForm: React.FC<MatchFormProps> = ({ initialData }) => {
  const { day, squad_home, squad_away, score_home, score_away, hour, field } =
    initialData;

  const params = useParams();
  const router = useRouter();
  // const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Modifica risultati" : "Inserisci risultati";
  const description = initialData
    ? "Modifica i risultati."
    : "Inserisci i nuovi risultati";
  const toastMessage = initialData
    ? "Risultati aggiornati."
    : "Risultati inseriti.";
  const action = initialData ? "Modifica" : "Inserisci";

  const defaultValues = initialData
    ? initialData
    : {
        score_home: "",
        score_away: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    const outcome = `${data.score_home} - ${data.score_away}`;

    try {
      setLoading(true);

      await updateResult(
        initialData.id,
        parseInt(data.score_home),
        parseInt(data.score_away),
        outcome
      );

      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      //TODO: gestire le notifiche toast all'inserimento/modifica/cancellazione di una squadra
      // router.refresh();
      // router.push(`/admin/squad`);
      // toast({
      //   variant: "destructive",
      //   title: "Uh oh! Something went wrong.",
      //   description: "There was a problem with your request.",
      // });
    } catch (error: any) {
      console.log(error);
      // toast({
      //   variant: "destructive",
      //   title: "Uh oh! Something went wrong.",
      //   description: "There was a problem with your request.",
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <Card key={null}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                📆 {hour} | {squad_home.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex w-full items-center justify-between space-x-2 mb-3">
                <span>{squad_home.name}</span>
                <FormField
                  control={form.control}
                  name="score_home"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" className="w-[5rem]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full items-center justify-between space-x-2 mb-3">
                <span>{squad_away.name}</span>
                <FormField
                  control={form.control}
                  name="score_away"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" className="w-[5rem]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full" type="submit">
                {action}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};
