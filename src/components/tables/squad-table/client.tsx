"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Squad } from "@/models/Squad";

interface SquadClientProps {
  data: Squad[];
}

export const SquadClient: React.FC<SquadClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Squadre (${data.length})`}
          description="elenco delle squadre iscritte al torneo"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/admin/squad/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKeyName="name" searchKeyCategory="category" columns={columns} data={data} />
    </>
  );
};
