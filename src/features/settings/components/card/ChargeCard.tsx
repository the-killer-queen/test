import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Plus } from 'lucide-react';
import { Suspense } from 'react';
import ChargeContent from '../content/ChargeContent';
import CreateChargeDialog from '../dialog/CreateChargeDialog';
import ChargeCardSkeleton from '../skeletons/ChargeCardSkeleton';
import { getTranslations } from 'next-intl/server';

async function ChargeCard() {
  const t = await getTranslations('settings');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base'>
          <DollarSign className='h-5 w-5' />
          {t('charges.title')}
        </CardTitle>
        <CardDescription>{t('charges.description')}</CardDescription>
        <CardAction>
          <CreateChargeDialog>
            <Button>
              <Plus />
              <span className='hidden md:inline-block'>
                {t('charges.addNewCharge')}
              </span>
            </Button>
          </CreateChargeDialog>
        </CardAction>
      </CardHeader>

      <Suspense fallback={<ChargeCardSkeleton />}>
        <ChargeContent />
      </Suspense>
    </Card>
  );
}

export default ChargeCard;
