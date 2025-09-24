import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Globe } from 'lucide-react';
import LanguageContent from '../content/LanguageContent';
import { getTranslations } from 'next-intl/server';

async function LanguageCard() {
  const t = await getTranslations('settings');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Globe className='h-5 w-5' />
          {t('language.title')}
        </CardTitle>
        <CardDescription>{t('language.description')}</CardDescription>
      </CardHeader>

      <LanguageContent />
    </Card>
  );
}

export default LanguageCard;
