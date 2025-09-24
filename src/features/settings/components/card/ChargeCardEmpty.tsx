import { DollarSign, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { H3 } from '@/components/typography/H3';
import { P } from '@/components/typography/P';
import CreateChargeDialog from '../dialog/CreateChargeDialog';
import { useTranslations } from 'next-intl';

function ChargeCardEmpty() {
  const t = useTranslations('settings');

  return (
    <CardContent className='text-muted-foreground flex flex-col items-center justify-center py-12 text-center'>
      <DollarSign className='mb-4 h-12 w-12 opacity-50' />
      <H3 className='mb-2 text-lg font-medium'>{t('charges.empty.title')}</H3>
      <P>{t('charges.empty.description')}</P>
      <CreateChargeDialog>
        <Button className='mt-4'>
          <Plus className='h-4 w-4' />
          {t('charges.addFirstCharge')}
        </Button>
      </CreateChargeDialog>
    </CardContent>
  );
}

export default ChargeCardEmpty;
