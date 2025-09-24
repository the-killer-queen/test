'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Suspense } from 'react';
import CategoriesListSkeleton from '../skeletons/CategoriesListSkeleton';
import CategoriesListContent from './CategoriesListContent';
import CreateCategoryDialog from '../dialog/CreateCategoryDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

function ManageCategoriesContent() {
  const t = useTranslations('menu');

  return (
    <div className='space-y-6'>
      <Card>
        <CardContent>
          <Suspense fallback={<CategoriesListSkeleton />}>
            <CategoriesListContent />

            <CreateCategoryDialog>
              <Button size='sm' className='mt-2 w-full'>
                <Plus />
                {t('categories.create.addCategory')}
              </Button>
            </CreateCategoryDialog>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

export default ManageCategoriesContent;
