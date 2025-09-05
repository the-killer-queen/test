import { User2, Settings } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export const navLinks = [
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
