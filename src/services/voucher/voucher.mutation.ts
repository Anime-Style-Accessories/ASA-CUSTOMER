import { useMutation } from '@tanstack/react-query';
import { voucherService } from './voucher.service';

export const useCheckVoucherMutation = () => {
  return useMutation({
    mutationFn: async (code: string) => {
      const res = await voucherService.checkVoucher(code);
      return res.data;
    },
  });
};
