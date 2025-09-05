type EditOrderPageProps = {
  params: Promise<{ orderId: string }>;
};

async function EditOrderPage({ params }: EditOrderPageProps) {
  const { orderId } = await params;

  return <div>THIS IS THE ORDER {orderId}</div>;
}

export default EditOrderPage;
