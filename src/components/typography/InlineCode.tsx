import type { ReactNode } from 'react';

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className='bg-muted/80 text-foreground ring-border/50 relative rounded-md px-2 py-1 font-mono text-sm font-medium ring-1 backdrop-blur-sm'>
      {children}
    </code>
  );
}
