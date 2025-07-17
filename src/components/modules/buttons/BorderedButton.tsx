import { cn } from "@/lib/utils";
import Loader from "../Loader";
import NavLink from "../NavLink";
import Spinner from "./Spinner";

export default function BorderedButton({
  children,
  className,
  onClick,
  disabled,
  type,
  href,
  size = "md",
  isLoading,
  spinnerLoading,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  href?: string;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  spinnerLoading?: boolean;
  variant?: "blue" | "red" | "green";
}) {
  if (href)
    return (
      <NavLink
        href={href}
        className={cn(
          "flex items-center justify-center gap-x-1.5 rounded-full border border-primary-border transition-all hover:brightness-90 disabled:opacity-70 disabled:hover:brightness-100 dark:disabled:opacity-60",
          variant === "blue" &&
            "border-primary/50 bg-primary/10 text-primary hover:border-primary/70 hover:bg-primary/20 hover:text-primary",
          variant === "red" &&
            "border-red/50 bg-red/10 text-red hover:border-red/70 hover:bg-red/20 hover:text-red",
          variant === "green" &&
            "border-primary-green/50 bg-primary-green/10 text-primary-green hover:border-primary-green/70 hover:bg-primary-green/20 hover:text-primary-green",
          size === "sm" && "h-[45px] px-6 text-sm",
          size === "md" &&
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
        size === "md" &&
          "h-[42px] px-6 text-sm sm:h-[48px] sm:px-8 sm:text-base",
        size === "lg" && "h-[55px] px-10 text-lg",
        variant === "blue" &&
          "border-primary/50 bg-primary/10 text-primary hover:border-primary/70 hover:bg-primary/20 hover:text-primary",
        variant === "red" &&
          "border-red/50 bg-red/10 text-red hover:border-red/70 hover:bg-red/20 hover:text-red",
        variant === "green" &&
          "border-primary-green/50 bg-primary-green/10 text-primary-green hover:border-primary-green/70 hover:bg-primary-green/20 hover:text-primary-green",
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {isLoading && spinnerLoading ? (
        <Spinner className="absolute inset-0 m-auto" />
      ) : isLoading ? (
        <Loader className="absolute inset-0 m-auto" />
      ) : null}
      <div
        className={cn(
          "flex items-center justify-center gap-x-2",
          isLoading && "invisible",
        )}>
        {children}
      </div>
    </button>
  );
}
