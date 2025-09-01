import { H2 } from '@/components/typography/H2';
import { P } from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MenuActions from '@/features/menu/components/MenuActions';
import MainTable from '@/features/menu/components/table/MainTable';
import { Plus } from 'lucide-react';
import { PageProps } from '@/types';

async function MenuPage({ searchParams }: PageProps) {
  return (
    <>
      <header className='bg-sidebar/95 border-b px-4 py-[11px] backdrop-blur'>
        <div>
          <H2>Manage Your Menu</H2>
          <P>Create, organize, and manage your menu items in one place.</P>
        </div>
      </header>

      <div className='mx-auto mt-4 flex flex-col gap-4 px-4'>
        <MenuActions />

        <Separator />

        <Card className='!gap-2'>
          <CardHeader className='!gap-0'>
            <CardTitle>Your Menu Items</CardTitle>
            <CardDescription>
              Easily manage and update your menu.
            </CardDescription>

            <CardAction>
              <Button>
                <Plus />
                Add new Item
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <MainTable searchParams={searchParams} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MenuPage;
