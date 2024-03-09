"use client";

import { toast } from "sonner";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

interface BannerProps {
  documentId: Id<"documents">;
}

export default function Banner({ documentId }: BannerProps) {
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const router = useRouter();

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring page...",
      success: "Page restored!",
      error: "Failed to restore page.",
    });
  };

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting page...",
      success: "Page deleted!",
      error: "Failed to delete page.",
    });

    router.push("/documents");
  };

  return (
    <div className="w-full bg-rose-500 flex items-center justify-center text-white text-sm text-center p-2 gap-x-2">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        variant="outline"
        onClick={onRestore}
        className="border-white bg-transparent hover:bg-primary/5 hover:text-white p-1 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
}
