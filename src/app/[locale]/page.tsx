import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default async function Home() {
  redirect({
    href: '/dashboard',
    locale: routing.defaultLocale,
  });
}
