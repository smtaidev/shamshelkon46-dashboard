import NextAuthSessionProvider from "@/lib/NextAuthSessionProvider";

import { ReduxProvider } from "@/components/redux-provider";
import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Shamselkon Dashboard",
  description: "Admin Dashboard for Shamselkon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${readexPro.className} antialiased`}>
        <Toaster position="bottom-right" richColors />
        <NextAuthSessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
