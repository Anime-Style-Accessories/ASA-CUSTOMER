import { ROUTES } from '@/constants';
import { CategoryAndProducts } from '@/dto';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';

type Props = {
  data: CategoryAndProducts;
};

const CategoryAndProductsCard = ({ data }: Props) => {
  return (
    <div>
      <div className="flex justify-between gap-4 items-center">
        <h2 className="text-lg font-semibold">{data.categoryData.name}</h2>
        <Link
          className="font-medium text-primary flex items-center gap-2"
          to={ROUTES.CATEGORIES.ID.replace(':id', data.categoryData.name)}>
          View all <ChevronRight size={20} />
        </Link>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        grid={{
          rows: 1,
        }}
        freeMode
        modules={[Pagination, FreeMode]}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          400: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1100: {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 4,
          },
          1600: {
            slidesPerView: 5,
          },
        }}
        className="py-4 px-1"
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}>
        {data.products.length > 0 ? (
          data.products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} key={product.id} />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-foreground-400">No products found</p>
        )}
      </Swiper>
    </div>
  );
};

export default CategoryAndProductsCard;
