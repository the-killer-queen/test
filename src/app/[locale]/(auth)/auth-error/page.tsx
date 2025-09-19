import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { AlertTriangle } from 'lucide-react';

async function AuthErrorPage({
  searchParams,
}: PageProps<'/[locale]/auth-error'>) {
  const { message } = (await searchParams) as { message: string };

  const titleMap: Record<string, string> = {
    expired_link: 'Expired Link',
    already_used: 'Link Already Used',
    exchange_failed: 'Session Exchange Failed',
    verification_failed: 'Verification Failed',
    invalid_or_missing_token: 'Invalid or Missing Token',
    invalid_or_missing_code: 'Invalid or Missing Code',
  };

  const descriptionMap: Record<string, string> = {
    expired_link: 'Your reset link has expired. Please request a new one.',
    already_used:
      'This link has already been used. Try requesting a new reset link.',
    exchange_failed:
      'Something went wrong while verifying your session. Please try again.',
    verification_failed:
      'We could not verify your request. Double-check your link.',
    invalid_or_missing_token:
      'The token is missing or invalid. Please try again.',
    invalid_or_missing_code:
      'The code is missing or invalid. Please try again.',
  };

  const title = message
    ? (titleMap[message] ?? 'Authentication Error')
    : 'Authentication Error';
  const description = message
    ? (descriptionMap[message] ?? 'An unexpected error occurred.')
    : 'An unexpected error occurred.';

  return (
    <Card className='!border-destructive w-full max-w-sm border-2 text-center'>
      <CardHeader className='flex flex-col items-center space-y-2'>
        <AlertTriangle className='text-destructive h-10 w-10' />
        <CardTitle className='text-destructive text-xl font-bold'>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <p className='text-muted-foreground text-sm'>{description}</p>

        <Link href='/'>
          <Button variant='destructive' className='w-full'>
            Go Back
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default AuthErrorPage;
