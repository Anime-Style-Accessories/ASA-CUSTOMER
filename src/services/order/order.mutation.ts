import { CreateOrderRequest } from '@/dto';
import { useMutation } from '@tanstack/react-query';
import { orderService } from './order.service';

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateOrderRequest) => {
      const res = await orderService.createOrder(data);
      return res.data;
    },
  });
};
