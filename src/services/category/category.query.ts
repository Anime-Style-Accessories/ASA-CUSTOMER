import { QUERY_KEY } from '@/constants';
import { PaginationParams } from '@/dto';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { categoryService } from './category.service';

export const useGetAllCategoriesQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORIES, params],
    queryFn: async () => {
      const res = await categoryService.getAllCategories(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetCategoryQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORY, id],
    queryFn: async () => {
      const res = await categoryService.getCategory(id);
      return res.data;
    },
  });
};

export const useGetCategoryAndCategoryProducts = (params: PaginationParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORY_AND_CATEGORY_PRODUCTS, params],
    queryFn: async () => {
      const res = await categoryService.getCategoryAndCategoryProducts(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
