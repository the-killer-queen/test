import DynamicIcon from '@/components/shared/DynamicIcon';
import ErrorState from '@/components/shared/ErrorState';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatNumber, searchParamsCache } from '@/lib/utils';
import { getMenuItemDetails } from '@/supabase/data/menu-service';
import { format } from 'date-fns';
import {
  Calendar,
  ChartColumnStacked,
  DollarSign,
  TagIcon,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';

async function MenuItemDetailsContent() {
  const { menuId } = searchParamsCache.all();
  if (!menuId) return null;

  const t = await getTranslations('menu');
  const { data: details, error } = await getMenuItemDetails(menuId);
  if (error || !details) {
    return (
      <CardContent className='flex flex-col items-center justify-center py-8'>
        <ErrorState
          message={t('messages.error.failedToLoadDetails')}
          iconClassName='h-8 w-8'
        />
      </CardContent>
    );
  }

  return (
    <CardContent className='space-y-2'>
      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <TagIcon className='size-4' />
          {t('cards.details.name')}
        </span>
        <span className='text-sm font-semibold'>{details.name}</span>
      </div>

      <Separator />

      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <DollarSign className='size-4' />
          {t('cards.details.price')}
        </span>
        <span className='text-sm font-semibold'>
          {formatNumber({
            locale: 'en-US',
            number: details.price,
          })}
        </span>
      </div>

      <Separator />

      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <ChartColumnStacked className='size-4' />
          {t('cards.details.category')}
        </span>
        <Badge variant={'secondary'}>
          <DynamicIcon iconName='Sandwich' />
          {details.category}
        </Badge>
      </div>

      <Separator />

      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <Calendar className='size-4' />
          {t('cards.details.created')}
        </span>
        <span className='text-sm'>
          {format(details.created_at, 'dd MMM yyyy')}
        </span>
      </div>
    </CardContent>
  );
}

export default MenuItemDetailsContent;
