import { ROUTES } from '@/constants';
import { useCartStore } from '@/store';
import { formatCurrency } from '@/utils';
import { Button, Divider } from '@nextui-org/react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { orderItems: cart } = useCartStore();
  const subTotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + (item.product.price * item.quantity || 0),
        0,
      ),
    [cart],
  );

  const SHIPPING = subTotal > 0 ? 10 : 0;

  const total = subTotal + SHIPPING;

  return (
    <div className="space-y-8 self-start md:sticky md:top-28 md:min-w-72 lg:min-w-80">
      <h3 className="text-lg font-semibold">Order summary</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-foreground-500">Subtotal</p>
          <p className="font-semibold">{formatCurrency(subTotal)}</p>
        </div>
        <Divider />
        <div className="flex items-center justify-between gap-2">
          <p className="text-foreground-500">Shipping estimate</p>
          <p className="font-semibold">{formatCurrency(SHIPPING)}</p>
        </div>
        <Divider />
        <div className="flex items-center justify-between gap-2">
          <p className="text-lg font-semibold">Order total</p>
          <p className="text-lg font-semibold">{formatCurrency(total)}</p>
        </div>
      </div>
      <Button
        variant="shadow"
        size="lg"
        radius="full"
        fullWidth
        isDisabled={cart.length === 0}
        color="primary">
        <Link to={ROUTES.CHECKOUT} className="w-full block py-4">
          Checkout
        </Link>
      </Button>
    </div>
  );
};

export default Checkout;
