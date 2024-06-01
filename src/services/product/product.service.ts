import { API_ROUTES } from '@/constants';
import { PageDataProduct, PaginationParams, ProductDto } from '@/dto';
import { apiClient } from '@/lib';

export const productService = {
  getAllProducts: async ({ page, size, name }: PaginationParams) =>
    await apiClient.get<PageDataProduct>(API_ROUTES.PRODUCT.GET_ALL, {
      params: { page, size, name: name || '' },
    }),

  getProductById: async (id: string) =>
    await apiClient.get<ProductDto>(API_ROUTES.PRODUCT.GET.replace(':id', id)),
  getProductsByCategoryAndName: async ({
    category,
    page,
    size,
  }: {
    category: string;
  } & PaginationParams) =>
    await apiClient.get<PageDataProduct>(API_ROUTES.PRODUCT.GET_BY_CATEGORY, {
      params: { category, name: '', page, size },
    }),
  getProductByListId: async (listIds: string[], params: PaginationParams) => {
    return await apiClient<PageDataProduct>({
      method: 'post',
      data: listIds,
      params,
      url: API_ROUTES.PRODUCT.GET_BY_LIST_ID,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
