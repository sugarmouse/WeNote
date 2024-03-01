"use client";

import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/modeToggle";

export default function Navbar() {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-1 bg-background/80 dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm backdrop-blur-sm bg-opacity-80",
      )}
    >
      <Logo />
      <div className=" flex w-full gap-x-2 md:ml-auto md:justify-end justify-between">
        <ModeToggle />
      </div>
    </div>
  );
}
