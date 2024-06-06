import { ProductCard, ScreenLoader } from '@/components';
import { QUERY_KEY } from '@/constants';
import { productService } from '@/services/product';
import { Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

const SimilarProducts = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.PRODUCTS.GET_SIMILAR_PRODUCTS, id],
      queryFn: async page => {
        const res = await productService.getSimilarProducts({
          page: page.pageParam,
          size: 4,
          id: id!,
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
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">Similar products</h2>
      <div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
          {(data?.pages?.[0]?.data?.length || 0) > 0 ? (
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

export default SimilarProducts;
