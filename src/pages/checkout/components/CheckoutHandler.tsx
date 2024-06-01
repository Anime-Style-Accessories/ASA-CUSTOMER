import { ScreenLoader } from '@/components';
import { ROUTES } from '@/constants';
import { apiClient } from '@/lib';
import {
  CreateOrderFormSchema,
  createOrderFormSchema,
} from '@/lib/form-schema';
import { useCreateOrderMutation } from '@/services/order';
import { useCartStore, useCheckoutStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Divider } from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CheckoutCartList } from '.';
import CheckoutInfo from './CheckoutInfo';

const CheckoutHandler = () => {
  const { orderItems, clearCart } = useCartStore();
  const { setInfo, resetInfo } = useCheckoutStore();
  const navigate = useNavigate();
  const methods = useForm<CreateOrderFormSchema>({
    resolver: zodResolver(createOrderFormSchema),
    defaultValues: {
      paymentMethod: 'COD',
    },
  });

  const createOrderMutation = useCreateOrderMutation();

  const onSubmit = async (data: CreateOrderFormSchema) => {
    if (data.paymentMethod === 'VNPAY') {
      setInfo(data);
      const formData = new FormData();
      const VND = 25000;
      formData.append('amount', (data.totalAmount * VND).toString());
      const res = await apiClient.post<{ url: string }>(
        '/payment/create_payment',
        formData,
        {
          headers: {
            'Content-Type': 'application/multipart-form-data',
          },
        },
      );
      if (res.status === 200) {
        location.href = res.data.url;
      }
      return;
    }
    createOrderMutation.mutate(
      {
        ...data,
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
          toast.error(err?.response?.data?.message || err.message);
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      {createOrderMutation.isPending && <ScreenLoader />}
      <form
        className="flex flex-col gap-8 md:flex-row"
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}>
        <CheckoutInfo />
        <Divider
          orientation="vertical"
          className="hidden h-auto min-h-80 md:block"
        />
        <Divider className="block md:hidden" />
        <CheckoutCartList />
      </form>
    </FormProvider>
  );
};

export default CheckoutHandler;
