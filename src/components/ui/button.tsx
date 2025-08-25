import type * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus:outline-none focus-visible:outline-none aria-invalid:!ring-error/20 dark:aria-invalid:!ring-error/40",
  {
    variants: {
      variant: {
        default:
          '!bg-primary/15 ring-2 ring-primary/80 !text-primary/80 shadow-sm hover:!bg-primary/20 hover:shadow-md hover:ring-primary/50 active:scale-[0.98] focus-visible:!bg-primary/20 focus-visible:shadow-md focus-visible:ring-primary/50',
        destructive:
          '!bg-error/15 ring-2 ring-error/80 !text-error/80 shadow-sm hover:!bg-error/20 hover:shadow-md hover:ring-error/50 active:scale-[0.98] focus-visible:!bg-error/20 focus-visible:shadow-md focus-visible:ring-error/50',
        outline:
          '!bg-background/15 ring-2 ring-border/80 !text-foreground/80 shadow-sm hover:!bg-background/20 hover:shadow-md hover:ring-border/50 active:scale-[0.98] focus-visible:!bg-background/20 focus-visible:shadow-md focus-visible:ring-border/50 dark:!bg-input/20 dark:ring-input dark:hover:!bg-input/40',
        secondary:
          '!bg-secondary/15 ring-2 ring-secondary/80 !text-secondary-foreground/80 shadow-sm hover:!bg-secondary/20 hover:shadow-md hover:ring-secondary/50 active:scale-[0.98] focus-visible:!bg-secondary/20 focus-visible:shadow-md focus-visible:ring-secondary/50',
        ghost:
          '!bg-accent/15 ring-2 ring-accent/80 !text-accent-foreground/80 shadow-sm hover:!bg-accent/20 hover:shadow-md hover:ring-accent/50 active:scale-[0.98] focus-visible:!bg-accent/20 focus-visible:shadow-md focus-visible:ring-accent/50 dark:hover:!bg-accent/50',
        link: '!text-muted-foreground hover:!text-primary',
        success:
          '!bg-success/15 ring-2 ring-success/80 !text-success/80 shadow-sm hover:!bg-success/20 hover:shadow-md hover:ring-success/50 active:scale-[0.98] focus-visible:!bg-success/20 focus-visible:shadow-md focus-visible:ring-success/50 transition-all duration-200 ease-in-out dark:!bg-success/15 dark:hover:!bg-success/20',
        warning:
          '!bg-warning/15 ring-2 ring-warning/80 !text-warning/80 shadow-sm hover:!bg-warning/20 hover:shadow-md hover:ring-warning/50 active:scale-[0.98] focus-visible:!bg-warning/20 focus-visible:shadow-md focus-visible:ring-warning/50 transition-all duration-200 ease-in-out dark:!bg-warning/15 dark:hover:!bg-warning/20',
        info: '!bg-info/15 ring-2 ring-info/80 !text-info/80 shadow-sm hover:!bg-info/20 hover:shadow-md hover:ring-info/50 active:scale-[0.98] focus-visible:!bg-info/20 focus-visible:shadow-md focus-visible:ring-info/50 transition-all duration-200 ease-in-out dark:!bg-info/15 dark:hover:!bg-info/20',
        'habit-complete':
          '!bg-habit-complete/15 ring-2 ring-habit-complete/80 !text-habit-complete/80 shadow-sm hover:!bg-habit-complete/20 hover:shadow-md hover:ring-habit-complete/50 active:scale-[0.98] focus-visible:!bg-habit-complete/20 focus-visible:shadow-md focus-visible:ring-habit-complete/50 transition-all duration-200 ease-in-out dark:!bg-habit-complete/15 dark:hover:!bg-habit-complete/20',
        'habit-incomplete':
          '!bg-habit-incomplete/15 ring-2 ring-habit-incomplete/80 !text-habit-incomplete/80 shadow-sm hover:!bg-habit-incomplete/20 hover:shadow-md hover:ring-habit-incomplete/50 active:scale-[0.98] focus-visible:!bg-habit-incomplete/20 focus-visible:shadow-md focus-visible:ring-habit-incomplete/50 transition-all duration-200 ease-in-out dark:!bg-habit-incomplete/15 dark:hover:!bg-habit-incomplete/20',
        'habit-streak':
          '!bg-habit-streak/15 ring-2 ring-habit-streak/80 !text-habit-streak/80 shadow-sm hover:!bg-habit-streak/20 hover:shadow-md hover:ring-habit-streak/50 active:scale-[0.98] focus-visible:!bg-habit-streak/20 focus-visible:shadow-md focus-visible:ring-habit-streak/50 transition-all duration-200 ease-in-out dark:!bg-habit-streak/15 dark:hover:!bg-habit-streak/20',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-12 rounded-lg px-6 text-base has-[>svg]:px-5',
        xl: 'h-14 rounded-lg px-8 text-lg has-[>svg]:px-6',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
