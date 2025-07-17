import { cn } from "@/lib/utils";

export function TableContainer({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div
      className={cn("no-scrollbar w-full overflow-x-auto", containerClassName)}>
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-primary-border",
          className,
        )}>
        {children}
      </div>
    </div>
  );
}

export function TableMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-2">
      {children}
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-4 border-b bg-[#fafafa] px-5 py-5 text-sm text-text/60 sm:px-8 lg:text-base">
      {children}
    </div>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <div className="divide-y">{children}</div>;
}

export function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("", className)}>{children}</div>;
}
