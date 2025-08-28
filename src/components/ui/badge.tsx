import type * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-lg ring-2 px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:shadow-md aria-invalid:ring-destructive/40 dark:aria-invalid:ring-destructive/50 aria-invalid:ring-destructive transition-all duration-300 ease-out overflow-hidden backdrop-blur-sm [a&]:hover:scale-[1.05] [button&]:hover:scale-[1.05] [a&]:active:scale-[0.95] [button&]:active:scale-[0.95]',
  {
    variants: {
      variant: {
        default:
          'ring-primary/30 bg-primary/90 text-primary-foreground [a&]:hover:bg-primary [a&]:hover:ring-primary/50 [a&]:hover:shadow-lg [a&]:hover:shadow-primary/20 [button&]:hover:bg-primary [button&]:hover:ring-primary/50 [button&]:hover:shadow-lg',
        secondary:
          'ring-secondary/40 bg-secondary/80 text-secondary-foreground [a&]:hover:bg-secondary [a&]:hover:ring-secondary/60 [a&]:hover:shadow-md [button&]:hover:bg-secondary [button&]:hover:ring-secondary/60',
        destructive:
          'ring-destructive/30 bg-destructive/90 text-white [a&]:hover:bg-destructive [a&]:hover:ring-destructive/50 [a&]:hover:shadow-lg [a&]:hover:shadow-destructive/20 focus-visible:ring-destructive/40 dark:focus-visible:ring-destructive/50 dark:bg-destructive/70 [button&]:hover:bg-destructive [button&]:hover:ring-destructive/50',
        outline:
          'text-foreground ring-border/60 bg-background/50 [a&]:hover:bg-accent/30 [a&]:hover:text-accent-foreground [a&]:hover:ring-primary/30 [a&]:hover:shadow-md [button&]:hover:bg-accent/30 [button&]:hover:text-accent-foreground [button&]:hover:ring-primary/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
