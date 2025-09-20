import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

function RootPage() {
  redirect({
    href: `/`,
    locale: routing.defaultLocale,
  });
}

export default RootPage;
