import { OrderItemCard } from '@/components';
import { useCartStore } from '@/store';
import { Divider } from '@nextui-org/react';

const CartList = () => {
  const { orderItems: cart } = useCartStore();
  return (
    <div className="flex-1 space-y-4">
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={`product-cart-order-${index}`} className="space-y-4">
            <OrderItemCard orderItem={item} />
            {index < cart.length - 1 && <Divider />}
          </div>
        ))
      ) : (
        <p className="text-foreground-500">Cart is empty</p>
      )}
    </div>
  );
};

export default CartList;
