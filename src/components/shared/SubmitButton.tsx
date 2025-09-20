'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SpinnerIcon } from '@phosphor-icons/react';
import { ReactNode } from 'react';

type SubmitButtonProps = {
  label: string;
  loadinglabel?: string;
  isLoading: boolean;
  icon?: ReactNode;
  className?: string;
};

function SubmitButton({
  label,
  loadinglabel = 'loading...',
  isLoading,
  icon,
  className,
}: SubmitButtonProps) {
  return (
    <Button
      type='submit'
      className={cn('w-full', className)}
      disabled={isLoading}
    >
      {isLoading ? <SpinnerIcon className='animate-spin' /> : icon}
      {isLoading ? loadinglabel : label}
    </Button>
  );
}

export default SubmitButton;
