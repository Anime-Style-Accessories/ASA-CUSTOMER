import { z } from 'zod';

export const createOrderFormSchema = z.object({
  totalAmount: z.number().positive(),
  email: z.string().email(),
  address: z.string(),
  voucherCode: z.string().optional(),
  paymentMethod: z.string(),
});

export type CreateOrderFormSchema = z.infer<typeof createOrderFormSchema>;
