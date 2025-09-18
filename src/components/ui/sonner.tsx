'use client';

import {
  CheckCircleIcon,
  CircleNotchIcon,
  InfoIcon,
  WarningCircleIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      icons={{
        success: <CheckCircleIcon size={20} weight='regular' />,
        info: <InfoIcon size={20} weight='regular' />,
        warning: <WarningCircleIcon size={20} weight='regular' />,
        error: <XCircleIcon size={20} weight='regular' />,
        loading: (
          <CircleNotchIcon
            size={20}
            weight='regular'
            className='animate-spin'
          />
        ),
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          success: '!text-success',
          error: '!text-destructive',
          warning: '!text-warning',
          loading: '!text-foreground',
          info: '!text-info',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
