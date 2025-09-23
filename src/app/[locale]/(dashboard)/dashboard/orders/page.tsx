import LayoutHeader from '@/components/shared/LayoutHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  OrdersActions,
  OrdersFiltersList,
  OrdersTable,
} from '@/features/orders';
import { searchParamsCache } from '@/lib/utils';

async function OrdersPage({
  searchParams,
}: PageProps<'/[locale]/dashboard/orders'>) {
  const params = await searchParams;
  searchParamsCache.parse(params);

  return (
    <>
      <LayoutHeader
        title={'Manage Orders'}
        description={'Track, manage, and process customer orders efficiently.'}
      />

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <CardTitle>Customer Orders</CardTitle>
            <CardDescription>
              Track and manage all customer orders in one place.
            </CardDescription>

            <OrdersActions />
            <OrdersFiltersList />
          </CardHeader>

          <CardContent>
            <OrdersTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default OrdersPage;
