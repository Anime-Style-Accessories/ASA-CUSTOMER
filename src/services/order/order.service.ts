import { API_ROUTES } from '@/constants';
import { CreateOrderRequest, OrderDto, PageDataOrderItem } from '@/dto';
import { apiClient } from '@/lib';

export const orderService = {
  createOrder: async (data: CreateOrderRequest) =>
    await apiClient.post<OrderDto>(API_ROUTES.ORDER.CREATE, data),
  getOrderById: async (id: string) =>
    await apiClient.get<OrderDto>(API_ROUTES.ORDER.GET.replace(':id', id)),
  getOrders: async () =>
    await apiClient.get<OrderDto[]>(API_ROUTES.ORDER.GET_ALL),
  getOrderItems: async (id: string) =>
    await apiClient.get<PageDataOrderItem>(
      API_ROUTES.ORDER.GET_ITEMS.replace(':id', id),
    ),
};
