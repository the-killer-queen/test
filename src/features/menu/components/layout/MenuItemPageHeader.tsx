import { H4 } from '@/components/typography/H4';
import { P } from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function MenuItemPageHeader() {
  return (
    <header className='bg-sidebar/95 flex justify-between border-b px-4 py-4 backdrop-blur'>
      <div>
        <H4>Menu Item Preview</H4>
        <P>Preview and manage your menu item details</P>
      </div>

      <div className='flex items-center'>
        <Button variant='link' size='sm' asChild>
          <Link href={'/dashboard/menu'}>
            <ArrowLeft />
            <span className='hidden sm:block'>Go Back</span>
          </Link>
        </Button>
        <SidebarTrigger className='block md:hidden' />
      </div>
    </header>
  );
}

export default MenuItemPageHeader;
