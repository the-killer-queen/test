'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { logout } from '@/features/auth/actions/logout';
import { SignOutIcon } from '@phosphor-icons/react';
import { useTransition } from 'react';
import { toast } from 'sonner';

function LogoutMenuItem() {
  const [isLoading, startLogout] = useTransition();

  async function handleLogout() {
    startLogout(async () => {
      const { success, error } = await logout();
      if (success) toast.success('Successfully logged out!');
      if (!success) toast.error(error);
    });
  }

  return (
    <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
      <SignOutIcon />
      <span>Sign out</span>
    </DropdownMenuItem>
  );
}

export default LogoutMenuItem;
