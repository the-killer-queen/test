async function EditOrderPage({
  params,
}: PageProps<'/dashboard/orders/edit/[orderId]'>) {
  const { orderId } = await params;

  return <div>THIS IS THE ORDER {orderId}</div>;
}

export default EditOrderPage;
