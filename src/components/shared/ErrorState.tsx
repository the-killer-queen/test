import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { ReactNode } from 'react';

type ErrorStateProps = {
  message: string;
  containerClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

function ErrorState({
  message,
  containerClassName,
  iconClassName,
  children,
}: ErrorStateProps) {
  return (
    <div className={cn('flex items-center gap-2', containerClassName)}>
      <AlertTriangle
        className={cn('text-destructive h-4 w-4', iconClassName)}
      />
      <span className='text-destructive text-sm'>{message}</span>
      {children}
    </div>
  );
}

export default ErrorState;
