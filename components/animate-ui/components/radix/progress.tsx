import * as React from 'react';

import {
  Progress as ProgressPrimitive,
  ProgressIndicator as ProgressIndicatorPrimitive,
  type ProgressProps as ProgressPrimitiveProps,
} from '@/components/animate-ui/primitives/radix/progress';
import { cn } from '@/lib/utils';

type ProgressProps = ProgressPrimitiveProps;

function Progress({ className, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive
      className={cn(
        'bg-foreground/10 dark:bg-foreground/15 relative h-[1.5px] w-full overflow-hidden',
        className,
      )}
      {...props}
    >
      <ProgressIndicatorPrimitive className="bg-foreground h-full w-full flex-1" />
    </ProgressPrimitive>
  );
}

export { Progress, type ProgressProps };
