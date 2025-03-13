import { cn } from "@/lib/utils";
import Link from "next/link";
import Loader from "../Loader";

export default function Button({
  children,
  className,
  onClick,
  disabled,
  type,
  href,
  isLoading,
  size = "md",
  action = "SUBMIT",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  href?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  action?: "DELETE" | "SUBMIT" | "CANCEL";
}) {
  if (href)
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center justify-center gap-x-1.5 rounded-full bg-primary font-medium text-white transition-all hover:brightness-90 disabled:opacity-80 disabled:hover:brightness-100 dark:disabled:opacity-60",
          size === "sm" && "h-[45px] px-6 text-sm",
          size === "md" &&
            "h-[42px] px-6 text-sm sm:h-[48px] sm:px-8 sm:text-base",
          size === "lg" && "h-[55px] px-10 text-lg",
          action === "DELETE" && "bg-red text-white",
          className,
        )}>
        {children}
      </Link>
    );

  return (
    <button
      className={cn(
        "relative flex items-center justify-center gap-x-1.5 rounded-full bg-primary font-medium text-white transition-all hover:brightness-90 disabled:opacity-80 disabled:hover:brightness-100 dark:disabled:opacity-60",
        size === "sm" && "h-[45px] px-6 text-sm",
        size === "md" &&
          "h-[42px] px-6 text-sm sm:h-[48px] sm:px-8 sm:text-base",
        size === "lg" && "h-[55px] px-10 text-lg",
        action === "DELETE" && "bg-red text-white",
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {isLoading ? <Loader className="absolute inset-0 m-auto" /> : null}
      <div
        className={cn(
          "flex items-center justify-center gap-x-1.5",
          isLoading && "invisible",
        )}>
        {children}
      </div>
    </button>
  );
}
