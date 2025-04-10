import { cn } from "@/lib/utils";

export default function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("loader", className)}>
      <span/>
      <span/>
      <span/>
    </div>
  );
}
