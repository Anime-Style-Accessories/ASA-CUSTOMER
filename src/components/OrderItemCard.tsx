import { ROUTES } from '@/constants';
import { CreateOrderItemRequest } from '@/dto';
import { cn } from '@/lib';
import { useCartStore } from '@/store';
import { formatCurrency } from '@/utils';
import { Button, Image, Input } from '@nextui-org/react';
import { Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  orderItem: CreateOrderItemRequest;
  hideQuantity?: boolean;
};

const OrderItemCard = ({ orderItem, hideQuantity = false }: Props) => {
  const product = orderItem.product;

  const { changeOrderQuantity, removeOrderItem } = useCartStore();

  const onChangeQuantity = (quantity: number) => {
    changeOrderQuantity(orderItem.productId, quantity);
  };

  const handleRemoveOrderItem = () => {
    removeOrderItem(orderItem.productId);
  };

  return (
    <div className="flex gap-4">
      <div className="grid w-24 place-items-center rounded-lg bg-slate-100 p-2 dark:bg-slate-700">
        <Image
          src={product.image || '/product-placeholder.png'}
          alt={product.name}
          width={100}
          height={100}
          className="w-full object-contain"
        />
      </div>
      <div className="flex-1">
        <div className="flex h-full flex-wrap gap-2">
          <div className="flex flex-1 flex-col flex-wrap justify-between space-y-1">
            <Link
              to={ROUTES.PRODUCTS.ID.replace(':id', product.id)}
              className="line-clamp-2 w-fit">
              <h3 className="font-medium">{product.name}</h3>
            </Link>
            <p className="text-lg font-medium text-primary">
              {formatCurrency(orderItem.product.price * orderItem.quantity)}
            </p>
            <p>Quantity: {orderItem.quantity}</p>
          </div>
          <div
            className={cn(
              'flex flex-col',
              hideQuantity ? 'justify-end' : 'justify-between',
            )}>
            {!hideQuantity && (
              <div className="flex items-center gap-1 self-start">
                <Button
                  type="button"
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => {
                    onChangeQuantity(orderItem.quantity - 1);
                  }}
                  isDisabled={orderItem.quantity <= 1}>
                  <Minus size={16} />
                </Button>
                <Input
                  className="w-10"
                  placeholder="1"
                  classNames={{
                    input: 'text-center',
                  }}
                  value={orderItem.quantity.toString()}
                  onValueChange={v => {
                    onChangeQuantity(Number(v));
                  }}
                />
                <Button
                  type="button"
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => {
                    onChangeQuantity(orderItem.quantity + 1);
                  }}
                  isDisabled={orderItem.quantity >= product.quantity}>
                  <Plus size={16} />
                </Button>
              </div>
            )}
            <button
              type="button"
              className={cn(
                'text-danger-500 transition-colors hover:text-danger-300',
              )}
              onClick={handleRemoveOrderItem}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
