import { ScreenLoader } from '@/components';
import { ROUTES } from '@/constants';
import { useCreateOrderMutation } from '@/services/order';
import { useCartStore, useCheckoutStore } from '@/store';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentProcessing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('vnp_ResponseCode');
  const createOrderMutation = useCreateOrderMutation();
  const { info, resetInfo } = useCheckoutStore();
  const { orderItems, clearCart } = useCartStore();
  const navigate = useNavigate();

  const onPayment = () => {
    createOrderMutation.mutate(
      {
        ...info,
        orderItems,
      },
      {
        onSuccess: data => {
          toast.success('Order created successfully');
          resetInfo();
          clearCart();
          navigate(ROUTES.ORDERS.ID.replace(':id', data.data.id));
        },
        onError: (err: any) => {
          resetInfo();
          toast.error(err?.response?.data?.message || err.message);
        },
      },
    );
  };

  if (code !== '00') {
    return <h1>Payment Failed</h1>;
  }
  return (
    <div className="justify-center flex items-center flex-col h-[80vh] gap-8">
      {createOrderMutation.isPending && <ScreenLoader />}
      <h1 className="text-2xl font-semibold text-success">Payment Success</h1>
      <p>Click Confirm to confirm your order</p>
      <Button color="primary" onClick={onPayment}>
        Confirm
      </Button>
    </div>
  );
};

export default PaymentProcessing;
