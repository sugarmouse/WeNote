import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

interface Props {
  url: string | undefined;
  preview?: boolean;
}

export default function Cover({ url, preview }: Props) {
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const params = useParams()

  const onRemoveCover = async () => {
    // delete from edgestore
    if (url) {
      await edgestore.publicFiles.delete({ url });
    }
    // delete from db
   removeCoverImage({
     id: params.documentId as Id<"documents">
   })
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        url && "bg-muted",
        !url && "h-[12vh]"
      )}
    >
      {/* cover image */}
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}

      {/* cover change buttons */}
      {!!url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onOpen()}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change cover
          </Button>

          <Button
            onClick={onRemoveCover}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
