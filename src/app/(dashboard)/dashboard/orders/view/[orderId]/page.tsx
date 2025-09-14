async function OrderPage({
  params,
}: PageProps<'/dashboard/orders/view/[orderId]'>) {
  const { orderId } = await params;

  return <div>THIS IS THE ORDER {orderId}</div>;
}

export default OrderPage;
