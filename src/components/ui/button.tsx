import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none ring-2 shadow-sm focus-visible:ring-2 focus-visible:shadow-md aria-invalid:!ring-error/80",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground ring-primary/80 hover:bg-primary/90 hover:ring-primary/50 hover:shadow-md focus-visible:!ring-primary/50 focus-visible:!bg-primary/95',
        destructive:
          'bg-destructive text-white ring-destructive/80 hover:bg-destructive/90 hover:ring-destructive/50 hover:shadow-md focus-visible:!ring-destructive/50 focus-visible:!bg-destructive/95 dark:bg-destructive/60 dark:ring-destructive/60',
        outline:
          '!bg-background/15 ring-border/80 hover:!bg-background/20 hover:ring-border/50 hover:shadow-md focus-visible:!ring-ring/50 focus-visible:!bg-background/20 dark:!bg-input/20',
        secondary:
          'bg-secondary text-secondary-foreground ring-secondary/80 hover:bg-secondary/80 hover:ring-secondary/50 hover:shadow-md focus-visible:!ring-secondary/50 focus-visible:!bg-secondary/85',
        ghost:
          '!bg-transparent ring-transparent hover:!bg-accent/15 hover:ring-accent/50 hover:shadow-md focus-visible:!ring-accent/50 focus-visible:!bg-accent/20 dark:hover:!bg-accent/10',
        link: 'text-primary underline-offset-4 hover:underline !bg-transparent ring-transparent focus-visible:!ring-primary/50 !shadow-none hover:!shadow-none focus-visible:!shadow-none',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
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
