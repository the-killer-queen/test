import type * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 !outline-none !focus:outline-none !focus-visible:outline-none focus:!outline-0 focus-visible:!outline-0 [&:focus]:!outline-none [&:focus-visible]:!outline-none !border-none !border-0",
  {
    variants: {
      variant: {
        default:
          '!bg-primary !text-primary-foreground ring-2 ring-primary/30 shadow-lg hover:!bg-primary/85 hover:ring-primary/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-primary/70 focus-visible:ring-offset-2 dark:!bg-primary dark:!text-primary-foreground dark:ring-primary/40 dark:hover:!bg-primary/85 dark:hover:ring-primary/60 dark:focus-visible:ring-primary/80',

        destructive:
          '!bg-destructive !text-destructive-foreground ring-2 ring-destructive/30 shadow-lg hover:!bg-destructive/85 hover:ring-destructive/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-destructive/70 focus-visible:ring-offset-2 dark:!bg-destructive dark:!text-destructive-foreground dark:ring-destructive/40 dark:hover:!bg-destructive/85 dark:hover:ring-destructive/60 dark:focus-visible:ring-destructive/80',

        outline:
          '!bg-transparent !text-foreground ring-2 ring-border hover:!bg-accent hover:!text-accent-foreground hover:ring-primary/40 hover:shadow-sm active:scale-[0.98] focus-visible:ring-primary/60 focus-visible:ring-offset-2 dark:!bg-transparent dark:!text-foreground dark:ring-border dark:hover:!bg-accent dark:hover:!text-accent-foreground dark:hover:ring-primary/50 dark:focus-visible:ring-primary/70',

        secondary:
          '!bg-secondary !text-secondary-foreground ring-2 ring-secondary/40 shadow-sm hover:!bg-hover-bg hover:!text-foreground hover:ring-border hover:shadow-md active:scale-[0.98] focus-visible:ring-ring/50 focus-visible:ring-offset-2 dark:!bg-secondary dark:!text-secondary-foreground dark:ring-secondary/60 dark:hover:!bg-hover-bg dark:hover:!text-foreground dark:hover:ring-border dark:focus-visible:ring-ring/60',

        ghost:
          '!bg-transparent !text-muted-foreground ring-2 ring-transparent hover:!bg-muted hover:!text-foreground hover:ring-muted/60 hover:shadow-sm active:scale-[0.98] focus-visible:ring-ring/40 focus-visible:ring-offset-2 dark:!bg-transparent dark:!text-muted-foreground dark:ring-transparent dark:hover:!bg-muted dark:hover:!text-foreground dark:hover:ring-muted/70 dark:focus-visible:ring-ring/50',

        link: '!text-primary hover:!text-primary/80 dark:!text-primary dark:hover:!text-primary/80',

        success:
          '!bg-success !text-success-foreground ring-2 ring-success/30 shadow-lg hover:!bg-success/85 hover:ring-success/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-success/70 focus-visible:ring-offset-2 dark:!bg-success dark:!text-success-foreground dark:ring-success/40 dark:hover:!bg-success/85 dark:hover:ring-success/60 dark:focus-visible:ring-success/80',

        warning:
          '!bg-warning !text-warning-foreground ring-2 ring-warning/40 shadow-lg hover:!bg-warning/85 hover:ring-warning/60 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-warning/70 focus-visible:ring-offset-2 dark:!bg-warning dark:!text-warning-foreground dark:ring-warning/50 dark:hover:!bg-warning/85 dark:hover:ring-warning/70 dark:focus-visible:ring-warning/80',

        error:
          '!bg-error !text-error-foreground ring-2 ring-error/30 shadow-lg hover:!bg-error/85 hover:ring-error/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-error/70 focus-visible:ring-offset-2 dark:!bg-error dark:!text-error-foreground dark:ring-error/40 dark:hover:!bg-error/85 dark:hover:ring-error/60 dark:focus-visible:ring-error/80',

        info: '!bg-info !text-info-foreground ring-2 ring-info/30 shadow-lg hover:!bg-info/85 hover:ring-info/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-info/70 focus-visible:ring-offset-2 dark:!bg-info dark:!text-info-foreground dark:ring-info/40 dark:hover:!bg-info/85 dark:hover:ring-info/60 dark:focus-visible:ring-info/80',

        'habit-complete':
          '!bg-habit-complete !text-white ring-2 ring-habit-complete/40 shadow-lg hover:!bg-habit-complete/90 hover:ring-habit-complete/60 hover:shadow-xl hover:scale-[1.05] active:scale-[0.98] focus-visible:ring-habit-complete/70 focus-visible:ring-offset-2 dark:!bg-habit-complete dark:!text-white dark:ring-habit-complete/50 dark:hover:!bg-habit-complete/90 dark:hover:ring-habit-complete/70 dark:focus-visible:ring-habit-complete/80',

        'habit-incomplete':
          '!bg-habit-incomplete !text-foreground ring-2 ring-habit-incomplete/50 shadow-sm hover:!bg-muted hover:!text-foreground hover:ring-border/60 hover:shadow-md active:scale-[0.98] focus-visible:ring-ring/50 focus-visible:ring-offset-2 dark:!bg-habit-incomplete dark:!text-foreground dark:ring-habit-incomplete/60 dark:hover:!bg-muted dark:hover:ring-border/70 dark:focus-visible:ring-ring/60',

        'habit-streak':
          '!bg-habit-streak !text-white ring-2 ring-habit-streak/40 shadow-lg hover:!bg-habit-streak/90 hover:ring-habit-streak/60 hover:shadow-xl hover:scale-[1.05] active:scale-[0.98] focus-visible:ring-habit-streak/70 focus-visible:ring-offset-2 dark:!bg-habit-streak dark:!text-white dark:ring-habit-streak/50 dark:hover:!bg-habit-streak/90 dark:hover:ring-habit-streak/70 dark:focus-visible:ring-habit-streak/80',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 px-6',
        xl: 'h-12 px-8 text-base',
        icon: 'h-9 w-9',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-10 w-10',
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
