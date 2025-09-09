import DynamicIcon from '@/components/shared/DynamicIcon';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/lib/utils';
import { getMenuItemDetails } from '@/supabase/data/menu-service';
import { format } from 'date-fns';
import {
  Calendar,
  ChartColumnStacked,
  DollarSign,
  TagIcon,
} from 'lucide-react';

async function MenuItemDetailsContent({ menuId }: { menuId: string }) {
  const { data: details, error } = await getMenuItemDetails(+menuId);
  if (error || !details) return <p>!!!!</p>;

  return (
    <CardContent className='space-y-2'>
      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <TagIcon className='size-4' />
          Name
        </span>
        <span className='text-sm font-semibold'>{details.name}</span>
      </div>

      <Separator />

      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <DollarSign className='size-4' />
          Price
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
          Category
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
          Created
        </span>
        <span className='text-sm'>
          {format(details.created_at, 'dd MMM yyyy')}
        </span>
      </div>
    </CardContent>
  );
}

export default MenuItemDetailsContent;
