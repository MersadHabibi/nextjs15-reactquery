import { cn } from "@/lib/utils";
import "./globals.css";
import { FIranYekan } from "@/config/fonts";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Providers from "@/providers/providers";

export const metadata: Metadata = {
  title: {
    template: "%s | آذرملک",
    default: "آذرملک",
  },
  description: "آذرملک",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="!scroll-smooth"
      suppressHydrationWarning>
      <body
        className={cn(
          "overflow-y-aut o relative mx-0 min-h-dvh overflow-x-hidden !scroll-smooth font-normal !text-text",
          FIranYekan.className,
          FIranYekan.variable,
        )}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
