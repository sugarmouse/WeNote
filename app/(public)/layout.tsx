"use client";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background dark:bg-[#1F1F1F] min-h-screen">
      {children}
    </div>
  );
}
