import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Plus } from 'lucide-react';
import CreateChargeDialog from '../dialog/CreateChargeDialog';
import ChargeContent from '../content/ChargeContent';
import { Suspense } from 'react';

function ChargeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base'>
          <DollarSign className='h-5 w-5' />
          Additional Charges
        </CardTitle>
        <CardDescription>
          Manage extra fees and charges for your services
        </CardDescription>
        <CardAction>
          <CreateChargeDialog>
            <Button>
              <Plus />
              <span className='hidden md:inline-block'>Add new charge</span>
            </Button>
          </CreateChargeDialog>
        </CardAction>
      </CardHeader>

      <Suspense>
        <ChargeContent />
      </Suspense>
    </Card>
  );
}

export default ChargeCard;
