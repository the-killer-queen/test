type OrderPageProps = {
  params: Promise<{ orderId: string }>;
};

async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params;

  return <div>THIS IS THE ORDER {orderId}</div>;
}

export default OrderPage;
