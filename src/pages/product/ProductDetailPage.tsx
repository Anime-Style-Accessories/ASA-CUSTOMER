import { ScreenLoader } from '@/components';
import { ROUTES } from '@/constants';
import { ProductData } from '@/dto';
import { cn } from '@/lib';
import { useGetProductQuery } from '@/services/product';
import { useCartStore, useFavoriteStore } from '@/store';
import { formatCurrency } from '@/utils';
import { Button, Divider, Image, Input } from '@nextui-org/react';
import { Heart, Minus, Plus, ShoppingBasket } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductQuery(id!);
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const { addOrderItem } = useCartStore();

  const product = data?.data || ({} as ProductData);
  const category = product.categoryDto;
  const [quantity, setQuantity] = useState(1);

  const onPressFavorite = () => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  const onPressAddToCart = () => {
    addOrderItem({
      product,
      color: product.color,
      productId: product.id,
      quantity,
      size: product.size,
    });
  };

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <Image
          src={product.image}
          alt={product.name}
          className="size-full rounded border border-foreground-200 object-contain"
        />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between gap-4 items-center">
          <h1 className="flex-1 text-2xl font-semibold">{product.name}</h1>
          <Button
            onPress={onPressFavorite}
            className="group bg-background"
            radius="full"
            variant="light"
            size="lg"
            isIconOnly>
            <Heart
              size={20}
              className={cn(
                'group-hover:fill-danger-400 group-hover:stroke-danger-400',
                isFavorite(product.id)
                  ? 'fill-danger-400 stroke-danger-400'
                  : 'fill-none stroke-current',
              )}
            />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to={ROUTES.CATEGORIES.ID.replace(':id', category.name)}
            className="w-fit text-slate-400 transition-colors hover:text-slate-200">
            {category.name}
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className=" flex-1 text-3xl font-medium text-primary">
            {formatCurrency(product.price)}
          </h4>
        </div>
        <Divider />
        <p className="whitespace-pre leading-8">{product.description}</p>
        <Divider />
        <div className="flex">
          <div className="flex flex-1 items-center gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => setQuantity(prev => prev - 1)}
              isDisabled={quantity <= 1}>
              <Minus size={16} />
            </Button>
            <Input
              className="w-10"
              placeholder="1"
              classNames={{
                input: 'text-center',
              }}
              value={quantity.toString()}
              onValueChange={v => setQuantity(Number(v))}
            />
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => setQuantity(prev => prev + 1)}
              isDisabled={quantity >= product.quantity}>
              <Plus size={16} />
            </Button>
          </div>
          <Button
            startContent={<ShoppingBasket size={16} />}
            variant="ghost"
            color="primary"
            className="flex-1"
            radius="sm"
            onPress={onPressAddToCart}
            isLoading={isLoading}
            isDisabled={isLoading || product.quantity === 0}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
