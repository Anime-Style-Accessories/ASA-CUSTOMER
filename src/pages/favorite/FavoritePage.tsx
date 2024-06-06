import { ProductCard } from '@/components';
import { QUERY_KEY } from '@/constants';
import { productService } from '@/services/product';
import { useFavoriteStore } from '@/store';
import { Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const FavoritePage = () => {
  const { favorites } = useFavoriteStore();

  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.PRODUCTS.GET_PRODUCTS_BY_LIST_IDS, favorites],
      queryFn: async page => {
        const res = await productService.getProductByListId(favorites, {
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

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Your favorite products</h2>
        <p className="text-foreground-400">
          All your favorite products will be displayed here
        </p>
      </div>
      {isLoading && <Spinner />}
      <div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
          {(data?.pages?.[0]?.data.length || 0) > 0 ? (
            data?.pages.map(pageProduct =>
              pageProduct.data.map(product => (
                <ProductCard product={product} key={product.id} />
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
    </div>
  );
};

export default FavoritePage;
