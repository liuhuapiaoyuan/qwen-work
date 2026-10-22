import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <img
      src="/sites/qwenwork/mark.svg"
      alt=""
      className={cn("block h-7 w-auto", className)}
    />
  );
}

export function Wordmark({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[#141414]", className)}>
      <Mark className="h-5" />
      <img
        src="/sites/qwenwork/wordmark-zh.svg"
        alt="千问办公"
        className={cn("h-5 w-auto", imageClassName)}
      />
    </span>
  );
}
