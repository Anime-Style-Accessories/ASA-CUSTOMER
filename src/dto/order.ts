import { IBaseResponse } from '@/utils';
import { ProductData } from './product';
import { UserData } from './user';

export type CreateOrderItemRequest = {
  product: ProductData;
  productId: string;
  quantity: number;
  size: string;
  color: string;
};

export type CreateOrderRequest = {
  totalAmount: number;
  email: string;
  address: string;
  voucherCode?: string;
  orderItems: CreateOrderItemRequest[];
};

export type OrderData = {
  id: string;
  user: UserData;
  createdAt: string;
  totalAmount: number;
  paymentStatus: string;
  shippingStatus: string;
};

export type OrderItemData = {
  id: string;
  quantity: number;
  pricePerUnit: number;
  size: string;
  color: string;
  productData: {
    createdAt: string;
    updatedAt: string;
    productName: string;
    productImage: string;
    productPrice: number;
    productQuantity: number;
    productColor: string;
    productSize: string;
    category: {
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type OrderDto = IBaseResponse<OrderData>;
