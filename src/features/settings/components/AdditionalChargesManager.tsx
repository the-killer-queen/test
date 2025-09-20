'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { formatNumber } from '@/lib/utils';
import { DollarSign, Plus, Settings, Trash2, Wifi } from 'lucide-react';
import { useState } from 'react';
import CreateChargeDialog from './CreateChargeDialog';

type AdditionalCharge = {
  id: string;
  name: string;
  amount: number;
  description: string;
  isEnabled: boolean;
  isCustom: boolean;
  icon: 'Settings' | 'Wifi' | 'DollarSign';
};

const defaultCharges: AdditionalCharge[] = [
  {
    id: '1',
    name: 'Sitting Fee',
    amount: 2.5,
    description: 'Additional charge for dine-in customers',
    isEnabled: true,
    isCustom: false,
    icon: 'Settings',
  },
  {
    id: '2',
    name: 'WiFi Access',
    amount: 1.0,
    description: 'Premium WiFi access fee',
    isEnabled: false,
    isCustom: false,
    icon: 'Wifi',
  },
];

function AdditionalChargesManager() {
  const [charges, setCharges] = useState<AdditionalCharge[]>(defaultCharges);

  const toggleCharge = (id: string) => {
    setCharges((prev) =>
      prev.map((charge) =>
        charge.id === id ? { ...charge, isEnabled: !charge.isEnabled } : charge,
      ),
    );
  };

  const updateChargeAmount = (id: string, amount: number) => {
    setCharges((prev) =>
      prev.map((charge) => (charge.id === id ? { ...charge, amount } : charge)),
    );
  };

  const deleteCharge = (id: string) => {
    setCharges((prev) => prev.filter((charge) => charge.id !== id));
  };

  const addCustomCharge = (newCharge: Omit<AdditionalCharge, 'id'>) => {
    const charge: AdditionalCharge = {
      ...newCharge,
      id: Date.now().toString(),
    };
    setCharges((prev) => [...prev, charge]);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi':
        return <Wifi className='h-4 w-4' />;
      case 'Settings':
        return <Settings className='h-4 w-4' />;
      default:
        return <DollarSign className='h-4 w-4' />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <DollarSign className='h-5 w-5' />
              Additional Charges
            </CardTitle>
            <CardDescription>
              Manage extra fees and charges for your services
            </CardDescription>
          </div>
          <CreateChargeDialog onAdd={addCustomCharge}>
            <Button size='sm' className='[&_span]:hidden sm:[&_span]:inline'>
              <Plus className='h-4 w-4' />
              <span>Add Charge</span>
            </Button>
          </CreateChargeDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {charges.map((charge) => (
            <div
              key={charge.id}
              className={`rounded-lg border p-4 transition-all ${
                charge.isEnabled
                  ? 'border-primary/20 bg-primary/5'
                  : 'border-border bg-card'
              }`}
            >
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-3'>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      charge.isEnabled
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {getIcon(charge.icon)}
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-medium'>{charge.name}</h3>
                      {charge.isEnabled && (
                        <Badge variant='default' className='text-xs'>
                          Active
                        </Badge>
                      )}
                      {charge.isCustom && (
                        <Badge variant='secondary' className='text-xs'>
                          Custom
                        </Badge>
                      )}
                    </div>
                    <p className='text-muted-foreground text-sm'>
                      {charge.description}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2'>
                    <span className='text-muted-foreground text-sm'>$</span>
                    <Input
                      type='number'
                      step='0.01'
                      min='0'
                      max='1000'
                      value={charge.amount}
                      onChange={(e) =>
                        updateChargeAmount(charge.id, +e.target.value)
                      }
                      className='w-20 text-center text-sm'
                      disabled={!charge.isEnabled}
                    />
                  </div>

                  <div className='flex items-center gap-2'>
                    <Switch
                      checked={charge.isEnabled}
                      onCheckedChange={() => toggleCharge(charge.id)}
                    />
                    {charge.isCustom && (
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-destructive hover:text-destructive h-8 w-8'
                        onClick={() => deleteCharge(charge.id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {charges.length === 0 && (
            <div className='text-muted-foreground flex flex-col items-center justify-center py-12 text-center'>
              <DollarSign className='mb-4 h-12 w-12 opacity-50' />
              <h3 className='mb-2 text-lg font-medium'>No charges configured</h3>
              <p className='mb-4 text-sm'>
                Add additional charges to apply to your orders
              </p>
              <CreateChargeDialog onAdd={addCustomCharge}>
                <Button>
                  <Plus className='h-4 w-4' />
                  Add Your First Charge
                </Button>
              </CreateChargeDialog>
            </div>
          )}

          {charges.filter((c) => c.isEnabled).length > 0 && (
            <div className='border-t pt-4'>
              <h4 className='mb-3 text-sm font-medium'>Active Charges Summary</h4>
              <div className='bg-muted/50 rounded-lg p-3'>
                <div className='space-y-2'>
                  {charges
                    .filter((c) => c.isEnabled)
                    .map((charge) => (
                      <div
                        key={charge.id}
                        className='flex items-center justify-between text-sm'
                      >
                        <span className='flex items-center gap-2'>
                          {getIcon(charge.icon)}
                          {charge.name}
                        </span>
                        <span className='font-medium'>
                          {formatNumber({
                            locale: 'en-US',
                            number: charge.amount,
                            options: {
                              style: 'currency',
                              currency: 'USD',
                              maximumFractionDigits: 2,
                            },
                          })}
                        </span>
                      </div>
                    ))}
                  <div className='border-t pt-2'>
                    <div className='flex items-center justify-between font-medium'>
                      <span>Total Additional Charges</span>
                      <span>
                        {formatNumber({
                          locale: 'en-US',
                          number: charges
                            .filter((c) => c.isEnabled)
                            .reduce((sum, c) => sum + c.amount, 0),
                          options: {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 2,
                          },
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AdditionalChargesManager;