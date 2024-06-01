import { STORAGE } from '@/constants';
import { CreateOrderRequest } from '@/dto';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckoutStore {
  info: Omit<CreateOrderRequest, 'orderItems'>;
  setInfo: (info: Omit<CreateOrderRequest, 'orderItems'>) => void;
  resetInfo: () => void;
}

export const useCheckoutStore = create(
  persist<CheckoutStore>(
    (set, get) => ({
      info: {
        address: '',
        email: '',
        totalAmount: 0,
        voucherCode: '',
      },
      setInfo: info => {
        set({ info });
      },
      resetInfo: () => {
        set({
          info: {
            address: '',
            email: '',
            totalAmount: 0,
            voucherCode: '',
          },
        });
      },
    }),
    {
      name: STORAGE.CHECKOUT,
    },
  ),
);
