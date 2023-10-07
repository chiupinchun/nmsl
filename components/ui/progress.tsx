"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

let progressTimeout: NodeJS.Timeout;
const ApiProgress = (
  { pending, ...props }: Parameters<typeof Progress>[0] & { pending: boolean; }
) => {
  enum ProgressState {
    disable = 0,
    start = 1,
    pending = 66,
    finish = 100
  }
  const [progress, setProgress] = React.useState<number>(ProgressState.disable);

  React.useEffect(() => {
    clearTimeout(progressTimeout);
    if (pending) {
      setProgress(ProgressState.start);
      progressTimeout = setTimeout(() => setProgress(ProgressState.pending), 1);
    } else {
      progressTimeout = setTimeout(() => {
        setProgress(ProgressState.finish);
        setTimeout(() => setProgress(ProgressState.disable), 150);
      }, 150);
    }
  }, [pending]);

  return progress ? <Progress value={progress} {...props} /> : null;
};

export { Progress, ApiProgress };
