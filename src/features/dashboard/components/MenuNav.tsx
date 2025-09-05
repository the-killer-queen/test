'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ChartLineIcon, CheersIcon } from '@phosphor-icons/react';
import { Archive, CalendarCheckIcon, CalendarPlus2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    title: 'Analytics',
    url: '/dashboard',
    icon: ChartLineIcon,
  },
  {
    title: 'Menu',
    url: '/dashboard/menu',
    icon: CheersIcon,
  },
  {
    title: 'Orders',
    url: '/dashboard/orders',
    icon: CalendarCheckIcon,
  },
  {
    title: 'New Order',
    url: '/dashboard/orders/new',
    icon: CalendarPlus2Icon,
  },
  {
    title: 'Reports',
    url: '/dashboard/reports',
    icon: Archive,
  },
];

function MenuNav() {
  const pathanme = usePathname();

  return (
    <SidebarMenu>
      {navLinks.map((nav) => (
        <SidebarMenuItem key={nav.url} className='py-0.5'>
          <SidebarMenuButton asChild isActive={pathanme === nav.url}>
            <Link href={nav.url}>
              <nav.icon />
              <span>{nav.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export default MenuNav;
