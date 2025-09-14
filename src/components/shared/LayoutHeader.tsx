import { H4 } from '@/components/typography/H4';
import { P } from '@/components/typography/P';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ReactNode } from 'react';

type LayoutHeaderProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

function LayoutHeader({ title, description, children }: LayoutHeaderProps) {
  return (
    <header className='bg-sidebar/95 flex justify-between border-b px-4 py-4 backdrop-blur'>
      <div>
        <H4>{title}</H4>
        <P>{description}</P>
      </div>

      <div className='flex items-center'>
        {children}
        <SidebarTrigger className='block md:hidden' />
      </div>
    </header>
  );
}

export default LayoutHeader;
