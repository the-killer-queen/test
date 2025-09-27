import LayoutHeader from '@/components/shared/LayoutHeader';
import { ProfileContent } from '@/features/profile';
import { Suspense } from 'react';
import ProfilePageLoading from './loading';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // const t = await getTranslations();
  return {
    title: 'Profile',
  };
}

async function ProfilePage() {
  const t = await getTranslations('profile');

  return (
    <>
      <LayoutHeader
        title={t('page.title')}
        description={t('page.description')}
      />

      <div className='flex flex-col justify-center gap-4 p-4'>
        <Suspense fallback={<ProfilePageLoading />}>
          <ProfileContent />
        </Suspense>
      </div>
    </>
  );
}

export default ProfilePage;
