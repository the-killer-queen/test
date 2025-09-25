'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@/i18n/navigation';
import { CheersIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import { Archive, ChartLine } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

function MenuNav() {
  const t = useTranslations('dashboard');
  const pathanme = usePathname();

  const navLinks = [
    {
      label: t('navigation.analytics'),
      href: '/dashboard',
      icon: ChartLine,
    },
    {
      label: t('navigation.menu'),
      href: '/dashboard/menu',
      icon: CheersIcon,
    },
    {
      label: t('navigation.orders'),
      href: '/dashboard/orders',
      icon: ShoppingCartIcon,
    },
    {
      label: t('navigation.reports'),
      href: '/dashboard/reports',
      icon: Archive,
    },
  ];

  return (
    <SidebarMenu>
      {navLinks.map((nav) => (
        <SidebarMenuItem key={nav.href} className='py-0.5'>
          <SidebarMenuButton asChild isActive={pathanme === nav.href}>
            <Link href={nav.href}>
              <nav.icon />
              <span>{nav.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export default MenuNav;
