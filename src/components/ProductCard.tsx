import { ROUTES } from '@/constants';
import { ProductData } from '@/dto';
import { cn } from '@/lib';
import { useCartStore, useFavoriteStore } from '@/store';
import { formatCurrency } from '@/utils';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
} from '@nextui-org/react';
import { Heart, Minus, Plus, ShoppingBasket } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  product: ProductData;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const category = product.categoryDto;
  const { addOrderItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();

  const isLoading = false;

  const onPressAddToCart = () => {
    addOrderItem({
      product,
      productId: product.id,
      quantity,
      size: product.size,
      color: product.color,
    });
  };

  const onPressFavorite = () => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  return (
    <Card
      className="h-full min-w-60 transition-transform hover:scale-[1.008]"
      shadow="sm">
      <CardHeader className="relative">
        <Button
          onPress={onPressFavorite}
          className="group absolute right-4 top-4 z-[2] bg-background"
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
        <Image
          classNames={{
            wrapper: 'w-full !max-w-none -z-[1]',
          }}
          src={product.image || '/product-placeholder.png'}
          alt={product.name}
          className="h-60 w-full rounded-md object-contain bg-white"
        />
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <Link
            to={ROUTES.PRODUCTS.ID.replace(':id', product.id)}
            className="min-h-14 w-fit text-foreground transition-colors hover:text-primary">
            <h3
              className="line-clamp-2 text-xl font-semibold"
              title={product.name}>
              {product.name}
            </h3>
          </Link>
          <Link
            to={ROUTES.CATEGORIES.ID.replace(':id', category.name)}
            className="w-fit text-slate-400 transition-colors hover:text-slate-200">
            {category.name}
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className=" flex-1 text-3xl font-medium text-primary">
            {formatCurrency(product.price * quantity)}
          </h4>
        </div>
      </CardBody>
      <CardFooter className="gap-2">
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
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
