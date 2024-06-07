import { ROUTES } from '@/constants';
import { useCartStore } from '@/store';
import { formatCurrency } from '@/utils';
import {
  Badge,
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@nextui-org/react';
import { ShoppingCart } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import OrderItemCard from './OrderItemCard';

const CartMenu = () => {
  const { orderItems: cart, clearCart } = useCartStore();
  const { onOpenChange, onClose, isOpen } = useDisclosure();

  const subTotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + (item.quantity * item.product.price || 0),
        0,
      ),
    [cart],
  );
  return (
    <Popover
      showArrow
      placement="bottom-end"
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <button>
          <Badge content={cart.length} color="danger">
            <ShoppingCart size={24} />
          </Badge>
        </button>
      </PopoverTrigger>
      <PopoverContent className="block w-[30rem] overflow-hidden p-0">
        <div className="space-y-2">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold">Shopping cart</h2>
            <button
              onClick={clearCart}
              className="text-danger-500 underline hover:text-danger-700 transition-colors">
              Clear cart
            </button>
          </div>
          <div className="space-y-4 px-4">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={`product-order-item-${index}`} className="space-y-4">
                  <OrderItemCard orderItem={item} hideQuantity />
                  {index < cart.length - 1 && <Divider />}
                </div>
              ))
            ) : (
              <p className="text-foreground-500">Cart is empty</p>
            )}
          </div>
          <div className="space-y-2 overflow-hidden bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold">Subtotal</h4>
                <p className="text-sm text-foreground-500">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
              <h3 className="text-lg font-semibold">
                {formatCurrency(subTotal)}
              </h3>
            </div>
            <div className="flex gap-4 py-2">
              <Button
                variant="light"
                className="flex-1"
                radius="full"
                size="lg">
                <Link
                  to={ROUTES.CART}
                  className="p-3 block w-full"
                  onClick={onClose}>
                  View cart
                </Link>
              </Button>
              <Button
                color="primary"
                className="flex-1"
                radius="full"
                size="lg">
                <Link
                  to={ROUTES.CHECKOUT}
                  className="p-3 block w-full"
                  onClick={onClose}>
                  Check out
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartMenu;
