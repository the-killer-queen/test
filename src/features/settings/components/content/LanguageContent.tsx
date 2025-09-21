'use client';

import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { CircleCheck } from 'lucide-react';
import { useLocale } from 'next-intl';
import { languages } from '../../constant/constant';

function LanguageContent() {
  const selectedLocale = useLocale();

  return (
    <CardContent>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        {languages.map((locale) => (
          <Link
            locale={locale.code}
            href={'/dashboard/settings'}
            key={locale.code}
            className={`group relative cursor-pointer rounded-lg p-4 ring-2 transition-all ${
              selectedLocale === locale.code
                ? 'ring-primary/20 bg-primary/5'
                : 'ring-border hover:bg-accent/50'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <span className='text-2xl'>{locale.flag}</span>
                <div>
                  <h3 className='font-medium'>{locale.name}</h3>
                  <p className='text-muted-foreground text-sm uppercase'>
                    {locale.code}
                  </p>
                </div>
              </div>
              {selectedLocale === locale.code && (
                <CircleCheck className='text-muted-foreground size-7' />
              )}
            </div>
            {selectedLocale === locale.code && (
              <Badge className='absolute -top-1 -right-1' variant='secondary'>
                Active
              </Badge>
            )}
          </Link>
        ))}
      </div>
    </CardContent>
  );
}

export default LanguageContent;
