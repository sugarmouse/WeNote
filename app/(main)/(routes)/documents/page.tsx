"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  const { user } = useUser();

  const onCreateNote = () => {
    // create a new note an redirect to it
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        width="300"
        height="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        width="300"
        height="300"
        alt="Empty"
        className="hidden dark:block"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s WeNote
      </h2>

      <Button onClick={onCreateNote}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
}
