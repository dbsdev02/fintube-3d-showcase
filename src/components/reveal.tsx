import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-scroll-anim";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-[6px]",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
