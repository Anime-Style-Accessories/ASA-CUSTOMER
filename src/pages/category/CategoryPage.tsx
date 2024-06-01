import { CategoryAndProductsCard, ScreenLoader } from '@/components';
import { QUERY_KEY } from '@/constants';
import { categoryService } from '@/services/category';
import { Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const CategoryPage = () => {
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORY_AND_CATEGORY_PRODUCTS],
      queryFn: async page => {
        const res = await categoryService.getCategoryAndCategoryProducts({
          page: page.pageParam,
          size: 10,
        });
        return res.data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasNext ? allPages.length : undefined;
      },
    });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  if (isLoading) {
    return <ScreenLoader />;
  }
  return (
    <div>
      <div>
        {(data?.pages?.[0]?.data?.length || 0) > 0 ? (
          data?.pages.map(pageProduct =>
            pageProduct.data.map(product => (
              <CategoryAndProductsCard
                data={product}
                key={product.categoryData.id}
              />
            )),
          )
        ) : (
          <p className="text-foreground-400">No products found</p>
        )}
      </div>
      <div ref={ref} />
      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
