import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr';
import { Link } from '@/i18n/navigation';

function AuthNotFound() {
  return (
    <div className='w-full max-w-sm'>
      <Card>
        <CardHeader className='text-center'>
          <div className='!bg-muted/50 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full'>
            <MagnifyingGlassIcon className='!text-muted-foreground h-6 w-6' />
          </div>
          <CardTitle>Page Not Found</CardTitle>
          <CardDescription>
            The authentication page you&apos;re looking for doesn&apos;t exist
            or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Button asChild className='w-full'>
            <Link href='/sign-in'>Go to Sign In</Link>
          </Button>
          <Button asChild variant='outline' className='w-full'>
            <Link href='/sign-up'>Create Account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthNotFound;
