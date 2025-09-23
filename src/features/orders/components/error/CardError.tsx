import ErrorState from '@/components/shared/ErrorState';
import { Card, CardContent } from '@/components/ui/card';

type CardErrorProps = { message: string };

function CardError({ message }: CardErrorProps) {
  return (
    <Card>
      <CardContent className='flex flex-col items-center justify-center py-8'>
        <ErrorState message={message} iconClassName='h-8 w-8' />
      </CardContent>
    </Card>
  );
}

export default CardError;
