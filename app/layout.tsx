import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react"

import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { Loading } from "@/components/auth/loading"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ミロ",
  description: "ミロのクローンアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
