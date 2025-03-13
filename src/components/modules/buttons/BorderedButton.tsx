import { cn } from "@/lib/utils";
import Loader from "../Loader";
import NavLink from "../NavLink";

export default function BorderedButton({
  children,
  className,
  onClick,
  disabled,
  type,
  href,
  size = "md",
  isLoading,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  href?: string;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}) {
  if (href)
    return (
      <NavLink
        href={href}
        className={cn(
          "flex items-center justify-center gap-x-1.5 rounded-full border border-primary-border transition-all hover:brightness-90 disabled:opacity-70 disabled:hover:brightness-100 dark:disabled:opacity-60",
          size === "sm" && "h-[45px] px-6 text-sm",
          "h-[42px] px-6 text-sm sm:h-[48px] sm:px-8 sm:text-base",
          size === "lg" && "h-[55px] px-10 text-lg",
          className,
        )}>
        {children}
      </NavLink>
    );

  return (
    <button
      className={cn(
        "relative flex items-center justify-center gap-x-1.5 rounded-full border border-primary-border transition-all hover:brightness-90 disabled:opacity-70 disabled:hover:brightness-100 dark:disabled:opacity-60",
        size === "sm" && "h-[45px] px-6 text-sm",
        "h-[42px] px-6 text-sm sm:h-[48px] sm:px-8 sm:text-base",
        size === "lg" && "h-[55px] px-10 text-lg",
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
