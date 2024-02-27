"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useToast } from "../ui/use-toast";
import { createSquad, getMatchesByDate } from "@/api/supabase";
import { MatchDatum } from "@/models/Match";
import { dateFormat } from "@/utils/utils";

const formSchema = z.object({
  name: z.string().min(1, { message: "Devi inserire il nome della squadra" }),
  group: z
    .string()
    .min(1, { message: "Devi inserire la lettera del girone" })
    .max(1, { message: "Il girone non può avere più di una lettera" }),
  category: z.string().min(1, { message: "Devi selezionare una categoria" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface MatchFormProps {
  initialData: any | null;
  days: string[];
}

export const MatchForm: React.FC<MatchFormProps> = ({ initialData, days }) => {
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
        name: "",
        category: "",
        group: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [selectedDay, setSelectedDay] = useState<MatchDatum[]>([]);

  const handleSelectDay = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const data = await getMatchesByDate(event.target.value);
    setSelectedDay(data);
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      //recupero anche il numero totale di squadre iscritte per evitare conflitto ID in fare di creazione

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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <select onChange={handleSelectDay}>
        <option value="">Seleziona la giornata</option>
        {days.map((day) => {
          return (
            <option key={day} value={day}>
              {dateFormat(day)}
            </option>
          );
        })}
      </select>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Inserisci il nome della squadra"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Girone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Inserisci il girone"
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
