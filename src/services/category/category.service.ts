import { API_ROUTES } from '@/constants';
import {
  CategoryDto,
  PageDataCategory,
  PageDataCategoryAndProducts,
  PaginationParams,
} from '@/dto';
import { apiClient } from '@/lib';

export const categoryService = {
  getAllCategories: async ({ page = 0, size = 10 }: PaginationParams) =>
    await apiClient.get<PageDataCategory>(API_ROUTES.CATEGORY.GET_ALL, {
      params: {
        page,
        size,
      },
    }),
  getCategory: async (id: string) =>
    await apiClient.get<CategoryDto>(
      API_ROUTES.CATEGORY.GET.replace(':id', id),
    ),
  getCategoryAndCategoryProducts: async (params: PaginationParams) =>
    await apiClient.get<PageDataCategoryAndProducts>(
      API_ROUTES.CATEGORY.GET_CATEGORY_AND_PRODUCTS,
      {
        params,
      },
    ),
};
