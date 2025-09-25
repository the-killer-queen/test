'use client';

import { formatNumber, getCurrencyFormatOptions } from '@/lib/utils';
import { useLocale } from 'next-intl';
import TomanIcon from '../typography/TomanIcon';

interface CurrencyDisplayProps {
  amount: number;
}

function CurrencyDisplay({ amount }: CurrencyDisplayProps) {
  const locale = useLocale();

  const isFa = locale === 'fa';
  const formatted = formatNumber({
    locale: isFa ? 'fa-IR' : 'en-US',
    number: amount,
    options: getCurrencyFormatOptions(isFa),
  });

  if (isFa) {
    return (
      <span className='flex items-center gap-2'>
        {formatted}
        <TomanIcon />
      </span>
    );
  }

  return <span>{formatted}</span>;
}

export default CurrencyDisplay;
