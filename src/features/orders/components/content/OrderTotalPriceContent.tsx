import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { searchParamsCache } from '@/lib/utils';
import { getOrderTotalPrice } from '@/supabase/data/orders-service';
import { getTranslations } from 'next-intl/server';

async function TotalPriceContent() {
  const { orderId } = searchParamsCache.all();
  if (!orderId) return null;

  const { data: totalPrice, error } = await getOrderTotalPrice(orderId);

  // ---> MUST CHANGE <---
  if (error || !totalPrice) return <p>Error!!!</p>;

  const t = await getTranslations('orders');

  return (
    <div className='flex items-center justify-between'>
      <span className='text-base font-semibold'>{t('cards.items.total')}</span>
      <span className='text-lg font-bold'>
        <CurrencyDisplay amount={totalPrice} />
      </span>
    </div>
  );
}

export default TotalPriceContent;
