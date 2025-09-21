'use client';

import { Switch } from '@/components/ui/switch';
import { toggleChargeIsActive } from '@/supabase/data/charges-service';
import { AdditionalChargesRow } from '@/types/tables';
import { Check, X } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { toast } from 'sonner';

type ChargeToggleSwitchProps = {
  charge: AdditionalChargesRow;
};

function ChargeToggleSwitch({ charge }: ChargeToggleSwitchProps) {
  const [, startTransition] = useTransition();
  const [optimisticCharge, setOptimisticCharge] = useOptimistic(
    charge,
    (curCharge, isActive: boolean) => ({
      ...curCharge,
      is_active: isActive,
    }),
  );

  async function handleToggleStatus() {
    startTransition(async () => {
      const { success, error } = await toggleChargeIsActive(
        charge.id,
        !charge.is_active,
      );

      if (!success) toast.error(error || 'Failed to update charge status');
    });
    setOptimisticCharge(!charge.is_active);
  }

  return (
    <Switch
      checkedIcon={<Check width={12} height={12} />}
      uncheckedIcon={<X width={12} height={12} />}
      checked={optimisticCharge.is_active}
      onCheckedChange={handleToggleStatus}
    />
  );
}

export default ChargeToggleSwitch;
