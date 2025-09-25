'use client';

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveHorizontal as MoreHorizontalIcon,
} from 'lucide-react';
import * as React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { parseAsInteger, useQueryState } from 'nuqs';
import { RESULT_PER_PAGE } from '@/config/config';
import { P } from '../typography/P';
import { useTranslations } from 'next-intl';

type PaginationContextProps = {
  page: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
};
const PaginationContext = React.createContext<PaginationContextProps | null>(
  null,
);

function Pagination({
  className,
  itemsLength,
  ...props
}: React.ComponentProps<'nav'> & { itemsLength: number }) {
  const t = useTranslations('components');
  const [page, updatePage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1),
  );
  const totalPages = Math.ceil(itemsLength / RESULT_PER_PAGE);

  function handleNext() {
    if (page < totalPages) updatePage(page + 1);
  }
  function handlePrev() {
    if (page > 1) updatePage(page - 1);
  }

  if (itemsLength === 0) return null;

  return (
    <PaginationContext.Provider
      value={{ page, totalPages, handlePrev, handleNext }}
    >
      <div className='flex w-full items-center'>
        <P
          className={cn(
            'w-full',
            itemsLength <= RESULT_PER_PAGE && 'text-center',
          )}
        >
          {t('pagination.showing', {
            start: (page - 1) * RESULT_PER_PAGE + 1,
            end: page === totalPages ? itemsLength : RESULT_PER_PAGE * page,
            total: itemsLength,
          })}
        </P>

        {itemsLength >= RESULT_PER_PAGE && (
          <nav
            role='navigation'
            aria-label='pagination'
            data-slot='pagination'
            className={cn('mx-auto flex w-full justify-end', className)}
            {...props}
          />
        )}
      </div>
    </PaginationContext.Provider>
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='pagination-item' {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<typeof Button>;

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      disabled={!isActive}
      variant={'ghost'}
      aria-current={isActive ? 'page' : undefined}
      data-slot='pagination-link'
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const { page, handlePrev } = usePaginationContext();
  const t = useTranslations();

  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      onClick={handlePrev}
      isActive={page !== 1}
      {...props}
    >
      <ChevronLeftIcon />
      <span className='hidden sm:block'>{t('pagination.previous')}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,

  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const { page, totalPages, handleNext } = usePaginationContext();
  const t = useTranslations();

  return (
    <PaginationLink
      aria-label='Go to next page'
      size='default'
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
      onClick={handleNext}
      isActive={page < totalPages}
    >
      <span className='hidden sm:block'>{t('pagination.next')}</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot='pagination-ellipsis'
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className='size-4' />
      <span className='sr-only'>More pages</span>
    </span>
  );
}

function usePaginationContext() {
  const context = React.use(PaginationContext);
  if (!context)
    throw new Error('usePaginationContext used outside its context');

  return context;
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
