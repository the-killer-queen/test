import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  MapPin,
  Phone,
  User,
} from 'lucide-react';

function OrderDetailsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <FileText className='h-4 w-4' />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <User className='size-4' />
            Customer
          </span>
          <Skeleton className='h-4 w-24' />
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <Phone className='size-4' />
            Contact
          </span>
          <Skeleton className='h-4 w-20' />
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <MapPin className='size-4' />
            Type
          </span>
          <div className='bg-secondary flex items-center gap-1 rounded-full px-2.5 py-0.5'>
            <Skeleton className='h-3 w-3' />
            <Skeleton className='h-3 w-12' />
          </div>
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <CreditCard className='size-4' />
            Status
          </span>
          <div className='bg-secondary flex items-center gap-1 rounded-full px-2.5 py-0.5'>
            <Skeleton className='h-3 w-3' />
            <Skeleton className='h-3 w-10' />
          </div>
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <DollarSign className='size-4' />
            Total
          </span>
          <Skeleton className='h-4 w-16' />
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <Calendar className='size-4' />
            Created
          </span>
          <Skeleton className='h-4 w-24' />
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderDetailsCardSkeleton;
