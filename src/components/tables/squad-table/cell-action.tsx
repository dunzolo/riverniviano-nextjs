"use client";
// import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { Squad } from "@/models/Squad";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: Squad;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => { };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      /> */}

      <div className="flex">
        <Button className="mr-2" onClick={() => router.push(`/dashboard/user/${data.id}`)}>
          <Edit className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:!hidden">Update</span>
        </Button>
        <Button className="bg-red-700" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:!hidden">Delete</span>
        </Button>
      </div>
    </>
  );
};
