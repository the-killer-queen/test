'use client';

import { redirect } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function Home() {
  const locale = useLocale();

  redirect({
    href: '/dashboard',
    locale: locale,
  });
}
