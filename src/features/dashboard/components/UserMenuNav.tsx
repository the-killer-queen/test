'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { Link } from '@/i18n/navigation';
import { Settings, User as User2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

function UserMenuNav() {
  const t = useTranslations('dashboard');
  const { setOpenMobile } = useSidebar();

  const navLinks = [
    {
      title: t('userMenu.profile'),
      url: '/dashboard/profile',
      icon: User2,
    },
    {
      title: t('userMenu.settings'),
      url: '/dashboard/settings',
      icon: Settings,
    },
  ];

  return navLinks.map((item) => (
    <Link href={item.url} key={item.title} onClick={() => setOpenMobile(false)}>
      <DropdownMenuItem>
        <item.icon className='mr-2 h-4 w-4' />
        <span>{item.title}</span>
      </DropdownMenuItem>
    </Link>
  ));
}

export default UserMenuNav;
