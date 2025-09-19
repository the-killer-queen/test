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

const navLinks = [
  {
    label: 'Analytics',
    href: '/dashboard',
    icon: ChartLine,
  },
  {
    label: 'Menu',
    href: '/dashboard/menu',
    icon: CheersIcon,
  },
  {
    label: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingCartIcon,
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: Archive,
  },
];

function MenuNav() {
  const pathanme = usePathname();

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
