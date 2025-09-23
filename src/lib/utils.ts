import { clsx, type ClassValue } from 'clsx';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000/';

  url = url.startsWith('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;

  return url;
}

export function formatNumber({
  locale,
  options = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  },
  number,
}: {
  locale: Intl.LocalesArgument;
  options?: Intl.NumberFormatOptions;
  number: number;
}) {
  return Intl.NumberFormat(locale, options).format(number);
}

export const searchParamsCache = createSearchParamsCache({
  selected_date: parseAsString.withDefault(
    new Date().toISOString().split('T')[0],
  ),
});
