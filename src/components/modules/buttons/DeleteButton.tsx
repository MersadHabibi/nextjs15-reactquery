import { cn } from "@/lib/utils";
import Link from "next/link";
import Loader from "../Loader";

export default function DeleteButton({
  children,
  className,
  onClick,
  disabled,
  type,
  href,
  isLoading,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  href?: string;
  isLoading?: boolean;
}) {
  if (href)
    return (
      <Link
        href={href}
        className={cn(
          "flex h-11 items-center justify-center gap-x-1.5 rounded-full bg-primary-300 px-6 font-medium text-white transition-all hover:bg-primary-300 hover:brightness-90 disabled:opacity-70 disabled:hover:brightness-100 dark:disabled:opacity-60 md:h-[50px] md:px-8 md:text-lg",
          className,
        )}>
        {children}
      </Link>
    );

  return (
    <button
      className={cn(
        "relative flex h-11 items-center justify-center gap-x-1.5 rounded-full bg-[#ff0000] px-6 font-medium text-white transition-all hover:brightness-90 disabled:opacity-70 disabled:hover:brightness-100 dark:disabled:opacity-60 md:h-[50px] md:px-8 md:text-lg",
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
