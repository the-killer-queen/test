import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ProfilePageLoading() {
  return (
    <>
      {/* Header Skeleton */}
      <header className='bg-sidebar/95 flex justify-between border-b px-4 py-[17px] backdrop-blur'>
        <div>
          <Skeleton className='mb-2 h-6 w-48' />
          <Skeleton className='h-4 w-80' />
        </div>
        <Skeleton className='h-7 w-7' />
      </header>

      <div className='flex flex-col gap-6 p-4'>
        {/* Profile Header Card Skeleton */}
        <Card>
          <CardContent className='pt-6'>
            <div className='flex flex-col items-center gap-4 sm:flex-row'>
              <Skeleton className='h-20 w-20 rounded-full' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-6 w-48' />
                <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
                  <div className='flex items-center gap-1'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                  <div className='flex items-center gap-1'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Skeleton className='h-6 w-20 rounded-full' />
                  <Skeleton className='h-6 w-24 rounded-full' />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className='space-y-6'>
          <div className='bg-muted grid h-9 w-full grid-cols-2 rounded-lg p-1'>
            <Skeleton className='h-7 rounded-md' />
            <Skeleton className='h-7 rounded-md' />
          </div>

          {/* Form Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
              <Skeleton className='h-4 w-80' />
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Avatar Upload Skeleton */}
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <div className='max-w-sm'>
                  <Skeleton className='h-48 w-full rounded-xl' />
                </div>
              </div>

              {/* Name Fields Skeleton */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-9 w-full' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-9 w-full' />
                </div>
              </div>

              {/* Phone Field Skeleton */}
              <div className='space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-9 w-full' />
              </div>

              {/* Submit Button Skeleton */}
              <div className='flex justify-end'>
                <Skeleton className='h-9 w-32' />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ProfilePageLoading;
