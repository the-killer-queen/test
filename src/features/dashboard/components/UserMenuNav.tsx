import { User2, Settings, LucideProps } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Route } from 'next';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export const navLinks: {
  title: string;
  url: Route;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    title: 'Profile',
    url: '/dashboard/profile',
    icon: User2,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

function UserMenuNav() {
  return navLinks.map((item) => (
    <Link href={item.url} key={item.title}>
      <DropdownMenuItem>
        <item.icon className='mr-2 h-4 w-4' />
        <span>{item.title}</span>
      </DropdownMenuItem>
    </Link>
  ));
}

export default UserMenuNav;
