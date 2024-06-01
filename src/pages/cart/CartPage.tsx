import { Divider } from '@nextui-org/react';
import { CartList, Checkout } from './components';

const CartPage = () => {
  return (
    <div className="mx-[5%] mt-8">
      <h2 className="mb-12 text-3xl font-semibold">Shopping cart</h2>
      <div className="relative gap-8 md:flex">
        <CartList />
        <Divider orientation="vertical" className="h-auto min-h-80" />
        <Checkout />
      </div>
    </div>
  );
};

export default CartPage;
