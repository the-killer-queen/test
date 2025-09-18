'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CheersIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import { Archive, ChartLine, LucideProps } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type NavItem<T extends string = string> = {
  href: T;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};
const navLinks: NavItem<Route>[] = [
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
