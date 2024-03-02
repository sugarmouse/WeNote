"use client";

import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";

// because this is a real-time app

export default function MainLayout({ children }: NextLayoutProps) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      // TODO: replace this with skeleton loading page
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // all the route under "/" can only be accessed if the user is authenticated
  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <main className="flex-1 h-full overflow-auto">{children}</main>
    </div>
  );
}
