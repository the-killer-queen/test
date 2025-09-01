'use client';

import type React from 'react';

import {
  CheckCircleIcon,
  CircleNotchIcon,
  InfoIcon,
  WarningCircleIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
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
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'group toast grid w-full grid-cols-[auto_1fr] items-start gap-x-2 rounded-lg ring-2 !ring-border/70 !bg-background p-4 !text-foreground shadow-lg hover:shadow-md hover:!ring-border/80 transition-all duration-200 ease-in-out [&_:is([data-buttons],[data-action])]:col-start-2 [&_:is([data-buttons],[data-action])]:mt-2 [&_:is([data-buttons],[data-action])]:flex [&_:is([data-buttons],[data-action])]:gap-2 !font-semibold',
          title: 'text-sm font-semibold',
          description: 'text-sm !text-muted-foreground/80',
          actionButton:
            'inline-flex h-8 shrink-0 items-center justify-center rounded-md !bg-primary px-3 text-xs font-medium !text-primary-foreground',
          cancelButton:
            'inline-flex h-8 shrink-0 items-center justify-center rounded-md !bg-muted px-3 text-xs font-medium !text-muted-foreground',
          closeButton:
            'absolute right-2 top-2 rounded-full p-1.5 !text-foreground/50 opacity-0 transition-opacity hover:!bg-accent hover:!text-foreground group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2',
          loader:
            'h-5 w-5 animate-spin rounded-full ring-4 ring-muted ring-t-primary',
          success:
            '!border-none !ring-2 !ring-success/70 !bg-success/5 !text-success dark:!bg-success/10 !transition-all !duration-200 !ease-in-out hover:!bg-success/10 dark:hover:!bg-success/15 hover:!shadow-md hover:!ring-success/80 [&>[data-icon]]:!text-success [&>[data-title]]:!text-success [&>[data-description]]:!text-success/80',
          info: '!border-none !ring-2 !ring-info/70 !bg-info/5 !text-info dark:!bg-info/10 !transition-all !duration-200 !ease-in-out hover:!bg-info/10 dark:hover:!bg-info/15 hover:!shadow-md hover:!ring-info/80 [&>[data-icon]]:!text-info [&>[data-title]]:!text-info [&>[data-description]]:!text-info/80',
          warning:
            '!border-none !ring-2 !ring-warning/70 !bg-warning/5 !text-warning dark:!bg-warning/10 !transition-all !duration-200 !ease-in-out hover:!bg-warning/10 dark:hover:!bg-warning/15 hover:!shadow-md hover:!ring-warning/80 [&>[data-icon]]:!text-warning [&>[data-title]]:!text-warning [&>[data-description]]:!text-warning/80',
          error:
            '!border-none !ring-2 !ring-error/70 !bg-error/5 !text-rose-400 dark:!bg-error/10 !transition-all !duration-200 !ease-in-out hover:!bg-error/10 dark:hover:!bg-error/15 hover:!shadow-md hover:!ring-error/80 [&>[data-icon]]:!text-error [&>[data-title]]:!text-error [&>[data-description]]:!text-error',
          icon: 'h-5 w-5 shrink-0',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
