'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { logout } from '@/features/auth';

import { SignOutIcon } from '@phosphor-icons/react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

function Logout() {
  const t = useTranslations('auth.logout');
  const [isLoading, startLogout] = useTransition();

  async function handleLogout() {
    startLogout(async () => {
      const { success, error } = await logout();
      if (success) toast.success(t('success'));
      if (!success) toast.error(error);
    });
  }

  return (
    <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
      <SignOutIcon />
      <span>{t('menuItem')}</span>
    </DropdownMenuItem>
  );
}

export default Logout;
