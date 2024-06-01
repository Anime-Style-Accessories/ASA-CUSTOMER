import { ProductCard, ScreenLoader } from '@/components';
import { QUERY_KEY } from '@/constants';
import { productService } from '@/services/product';
import { useSearchStore } from '@/store';
import { Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from 'use-debounce';

const SearchPage = () => {
  const { keyword } = useSearchStore();
  const [value] = useDebounce(keyword, 1000);
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.PRODUCTS.GET_PRODUCTS, value],
      queryFn: async page => {
        const res = await productService.getAllProducts({
          page: page.pageParam,
          size: 10,
          name: value,
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
        {data?.pages.map(pageProduct =>
          pageProduct.data.map(product => (
            <ProductCard product={product} key={product.id} />
          )),
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

export default SearchPage;
