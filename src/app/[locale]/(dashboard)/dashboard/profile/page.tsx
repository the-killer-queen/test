import LayoutHeader from '@/components/shared/LayoutHeader';
import { ProfileContent } from '@/features/profile';
import { Suspense } from 'react';
import ProfilePageLoading from './loading';

function ProfilePage() {
  return (
    <>
      <LayoutHeader
        title='Your Profile'
        description='Manage your personal information and account settings.'
      />

      <div className='mx-auto flex max-w-3xl flex-col gap-4 p-4'>
        <Suspense fallback={<ProfilePageLoading />}>
          <ProfileContent />
        </Suspense>
      </div>
    </>
  );
}

export default ProfilePage;
