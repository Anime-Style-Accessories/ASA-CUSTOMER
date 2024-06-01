import { API_ROUTES } from '@/constants';
import { PageDataVoucher, PaginationParams, VoucherDto } from '@/dto';
import { apiClient } from '@/lib';

export const voucherService = {
  getAllVouchers: async ({ page = 0, size = 10 }: PaginationParams) =>
    await apiClient.get<PageDataVoucher>(API_ROUTES.VOUCHER.GET_ALL, {
      params: {
        page,
        size,
      },
    }),
  getVoucher: async (id: string) =>
    await apiClient.get<VoucherDto>(API_ROUTES.VOUCHER.GET.replace(':id', id)),
  checkVoucher: async (code: string) =>
    await apiClient.get<number>(API_ROUTES.VOUCHER.CHECK_CODE, {
      params: {
        voucherCode: code,
      },
    }),
};
