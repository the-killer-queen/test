import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr';

function RootNotFound() {
  return (
    <div className='flex h-dvh w-full flex-col items-center justify-center'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader className='text-center'>
            <div className='bg-muted/50 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full'>
              <MagnifyingGlassIcon className='text-muted-foreground h-6 w-6' />
            </div>
            <CardTitle>Page Not Found</CardTitle>
            <CardDescription>
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Button asChild className='w-full'>
              <Link href='/dashboard'>Go to Dashboard</Link>
            </Button>
            <Button asChild variant='outline' className='w-full'>
              <Link href='/'>Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RootNotFound;
