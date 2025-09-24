import ErrorState from '@/components/shared/ErrorState';
import { getMenuItemImage } from '@/supabase/data/menu-service';
import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

async function MenuItemImageContent({ menuId }: { menuId: string }) {
  const t = await getTranslations('menu');
  const { data: menuItem, error } = await getMenuItemImage(+menuId);
  if (error || !menuItem)
    return (
      <ErrorState
        message={t('messages.error.failedToLoadImage')}
        containerClassName='bg-muted h-full w-full flex-col justify-center'
        iconClassName='mb-2 h-16 w-16'
      />
    );

  return (
    <div className='bg-muted flex h-full w-full items-center justify-center'>
      {menuItem.image_url ? (
        <Image
          src={menuItem.image_url}
          alt={menuItem.name}
          width={800}
          height={600}
          quality={100}
          className='h-full w-full object-cover'
        />
      ) : (
        <div className='text-muted-foreground flex flex-col items-center gap-2'>
          <ImageOff className='h-16 w-16' />
          <p className='text-sm'>{t('cards.image.noImage')}</p>
        </div>
      )}
    </div>
  );
}

export default MenuItemImageContent;
