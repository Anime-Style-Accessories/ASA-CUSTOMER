import { OrderItemCardCheckout, ScreenLoader } from '@/components';
import { OrderData, OrderItemData } from '@/dto';
import { useGetOrderItemsQuery, useGetOrderQuery } from '@/services/order';
import { formatCurrency } from '@/utils';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const OrderDetailPage = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetOrderQuery(id!);
  const { isLoading: orderItemLoading, data: orderItemsData } =
    useGetOrderItemsQuery(id!);
  const order = data?.data || ({} as OrderData);
  const orderItems = orderItemsData?.data || ([] as OrderItemData[]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <div>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-background border border-foreground-200 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
            <p className="text-foreground-700">
              Date: {dayjs(order.createdAt).format('DD/MM/YYYY HH:mm')}
            </p>
            <p className="text-foreground-700">
              Payment Status: {order.paymentStatus}
            </p>

            <p className="text-foreground-700">
              Shipping Status: {order.shippingStatus || 'N/A'}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Items</h2>
            <ul className="space-y-4 mt-4">
              {orderItems.map(item => (
                <OrderItemCardCheckout key={item.id} orderItem={item} />
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <p className="text-foreground-700">{order.address || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Total</h2>
            <p className="text-foreground-700">
              {formatCurrency(order.totalAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
