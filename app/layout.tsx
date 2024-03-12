import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/providers/themeProvider";
import { ConvexProvider } from "@/components/providers/convexProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "weNote",
  description: "A note app optimised for reading notes",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="WeNote-theme"
          >
            <Toaster position="bottom-center" />
            <EdgeStoreProvider>
              <ModalProvider />
              {children}
            </EdgeStoreProvider>
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
