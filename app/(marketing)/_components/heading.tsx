"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightCircle } from "lucide-react";

export default function heading() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Notes, Ideas. Welcome to <span className="underline">WeNote</span>
      </h1>

      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        WeNote is a note app, which
        <br />
        is optimised for book-reading notes.
      </h3>

      <Button>
        Enter WeNote <ArrowRightCircle className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
