import { H4 } from '@/components/typography/H4';
import { P } from '@/components/typography/P';
import { SidebarTrigger } from '@/components/ui/sidebar';

function MenuPageHeader() {
  return (
    <header className='bg-sidebar/95 flex justify-between border-b px-4 py-4 backdrop-blur'>
      <div>
        <H4>Manage Your Menu</H4>
        <P>Create, organize, and manage your menu items in one place.</P>
      </div>

      <SidebarTrigger className='block md:hidden' />
    </header>
  );
}

export default MenuPageHeader;
