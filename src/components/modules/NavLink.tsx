"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  className,
  children,
  startsWith,
  activeFor,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  startsWith?: boolean;
  activeFor?: string[];
}) {
  const pathname = usePathname();
  const isActive =
    (startsWith ? pathname.startsWith(href) : pathname === href) ||
    activeFor?.some((item) => pathname.startsWith(item));

  return (
    <Link href={href} className={cn(isActive && "active", className)}>
      {children}
    </Link>
  );
}
