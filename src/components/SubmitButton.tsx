'use client';

import { Button } from '@/components/ui/button';
import { SpinnerIcon } from '@phosphor-icons/react';
import { ReactNode } from 'react';

type SubmitButtonProps = {
  label: string;
  loadinglabel?: string;
  isLoading: boolean;
  icon?: ReactNode;
};

function SubmitButton({
  label,
  loadinglabel = 'loading...',
  isLoading,
}: SubmitButtonProps) {
  return (
    <Button type='submit' className='w-full' disabled={isLoading}>
      {isLoading ? loadinglabel : label}
      {isLoading ? <SpinnerIcon className='animate-spin' /> : null}
    </Button>
  );
}

export default SubmitButton;
