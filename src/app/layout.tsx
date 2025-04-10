import { cn } from "@/lib/utils";
import "./globals.css";
import { FIranYekan } from "@/config/fonts";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Providers from "@/providers/providers";

export const metadata: Metadata = {
  title: {
    template: "%s | انجمن عکس",
    default: "انجمن عکس",
  },
  description: "انجمن عکس",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="!scroll-smooth">
      <body
        className={cn(
          "!text-text-300 relative mx-0 min-h-dvh overflow-y-auto overflow-x-hidden !scroll-smooth font-normal",
          FIranYekan.className,
          FIranYekan.variable,
        )}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
