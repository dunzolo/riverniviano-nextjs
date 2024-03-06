"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { SquadGroup } from "@/models/SquadGroup";

interface GroupClientProps {
  data: SquadGroup[];
}

export const GroupClient: React.FC<GroupClientProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} isRanking={true} />;
};
