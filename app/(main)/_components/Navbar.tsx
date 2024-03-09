"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import Title from "./Title";
import Publish from "./Publish";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export default function Navbar({ isCollapsed, onResetWidth }: Props) {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  // loading
  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
      </nav>
    );
  }

  // not found
  if (document === null) {
    return null;
  }

  return (
    <>
      <nav>
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="w-6 h-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center justify-between w-full">
            <Publish initialData={document} />
          </div>
        </div>
      </nav>
    </>
  );
}
