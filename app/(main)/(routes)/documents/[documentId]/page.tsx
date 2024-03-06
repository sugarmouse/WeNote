"use clinent";

import { Id } from "@/convex/_generated/dataModel";

interface Props {
  params: {
    documentId: Id<"documents">;
  };
}

export default function page({params}:Props) {
  return <div>{params.documentId}</div>;
}
