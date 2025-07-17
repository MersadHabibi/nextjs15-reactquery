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
  onClick,
  title,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  startsWith?: boolean;
  activeFor?: string[];
  title?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    (startsWith ? pathname.startsWith(href) : pathname === href) ||
    activeFor?.some((item) => pathname.startsWith(item));

  return (
    <Link
      title={title}
      href={href}
      className={cn(isActive && "active", className)}
      onClick={onClick}>
      {children}
    </Link>
  );
}
