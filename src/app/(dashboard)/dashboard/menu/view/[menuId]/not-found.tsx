import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

function MenuItemNotFound() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader className='text-center'>
            <div className='bg-muted/50 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full'>
              <MagnifyingGlassIcon className='text-muted-foreground h-6 w-6' />
            </div>
            <CardTitle>Menu Item Not Found</CardTitle>
            <CardDescription>
              The menu item you&apos;re looking for doesn&apos;t exist or has
              been removed from the menu.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Button asChild className='w-full'>
              <Link href='/dashboard/menu'>View All Menu Items</Link>
            </Button>
            <Button asChild variant='outline' className='w-full'>
              <Link href='/dashboard'>Dashboard Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MenuItemNotFound;
