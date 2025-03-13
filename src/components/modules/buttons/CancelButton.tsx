import { cn } from "@/lib/utils";

export default function CancelButton({
  children,
  className,
  onClick,
  disabled,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}) {
  return (
    <button
      className={cn(
        "flex h-11 items-center justify-center gap-x-3 rounded-full bg-[#eeeeee] px-8 text-text-300 transition-all hover:bg-primary-border dark:bg-[#333333] dark:hover:bg-[#606060] md:h-[50px]",
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {children}
    </button>
  );
}
