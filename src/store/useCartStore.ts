import { STORAGE } from '@/constants';
import { CreateOrderItemRequest } from '@/dto';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  orderItems: CreateOrderItemRequest[];
  addOrderItem: (orderItem: CreateOrderItemRequest) => void;
  changeOrderQuantity: (orderItemId: string, quantity: number) => void;
  removeOrderItem: (orderItemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      orderItems: [],
      addOrderItem: orderItem => {
        const existingOrderItem = get().orderItems.find(
          o => o.productId === orderItem.productId,
        );
        if (existingOrderItem) {
          set(state => ({
            orderItems: state.orderItems.map(o =>
              o.productId === orderItem.productId
                ? { ...o, quantity: o.quantity + orderItem.quantity }
                : o,
            ),
          }));
        } else {
          set(state => ({
            orderItems: [...state.orderItems, orderItem],
          }));
        }
        toast.success('Added to cart');
      },
      changeOrderQuantity: (orderItemId, quantity) => {
        set(state => ({
          orderItems: state.orderItems.map(orderItem =>
            orderItem.productId === orderItemId
              ? { ...orderItem, quantity }
              : orderItem,
          ),
        }));
      },
      removeOrderItem: orderItemId => {
        set(state => ({
          orderItems: state.orderItems.filter(
            orderItem => orderItem.productId !== orderItemId,
          ),
        }));
        toast.success('Removed from cart');
      },
      clearCart: () => {
        set({
          orderItems: [],
        });
        toast.success('Cart cleared');
      },
    }),
    {
      name: STORAGE.CART,
    },
  ),
);
