import { OrderItemCard } from '@/components';
import { CreateOrderFormSchema } from '@/lib/form-schema';
import { useCheckVoucherMutation } from '@/services/voucher';
import { useCartStore } from '@/store';
import { formatCurrency } from '@/utils';
import { Button, Chip, Divider, Input } from '@nextui-org/react';
import { X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

const CartList = () => {
  const { orderItems: cart } = useCartStore();
  const { register, setValue } = useFormContext<CreateOrderFormSchema>();

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);

  const checkVoucherMutation = useCheckVoucherMutation();

  const subTotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + (item.product.price * item.quantity || 0),
        0,
      ),
    [cart],
  );

  const discountTotal = useMemo(() => {
    let temp = 0;
    if (appliedDiscount) {
      temp = (appliedDiscount * subTotal) / 100;
    }
    return temp;
  }, [appliedDiscount, subTotal]);

  const SHIPPING = 10;

  const total = subTotal + SHIPPING - discountTotal;

  useEffect(() => {
    setValue('totalAmount', total);
  }, [setValue, total]);

  const isApplyingDiscount = false;

  const onApplyDiscount = useCallback(() => {
    checkVoucherMutation.mutate(discountCode, {
      onSuccess: data => {
        if (data === 0) {
          toast.error('This voucher can not be used');
          return;
        }
        toast.success('Applied voucher successfully');
        setValue('voucherCode', discountCode);
        setAppliedDiscount(data);
      },
      onError: err => {
        setValue('voucherCode', '');
        toast.error(err.message);
      },
    });
  }, [checkVoucherMutation, discountCode, setValue]);

  return (
    <div className="space-y-4 md:max-w-[30rem]">
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={`product-item-cart-${index}`} className="space-y-4">
            <OrderItemCard orderItem={item} />
            {index < cart.length - 1 && <Divider />}
          </div>
        ))
      ) : (
        <p className="text-foreground-500">Cart is empty</p>
      )}
      <Divider />
      <div className="space-y-4">
        {appliedDiscount && appliedDiscount !== 0 ? (
          <div>
            Applied discount:{' '}
            <Chip
              endContent={
                <button
                  onClick={() => {
                    setDiscountCode('');
                    setAppliedDiscount(null);
                  }}>
                  <X size={14} />
                </button>
              }>
              {discountCode} -{appliedDiscount}%
            </Chip>
          </div>
        ) : (
          <div className="flex w-full gap-2">
            <Input
              {...register('voucherCode')}
              labelPlacement="outside-left"
              placeholder="Discount code"
              size="lg"
              classNames={{
                mainWrapper: 'w-full',
              }}
              fullWidth
              className="flex-1"
              value={discountCode}
              onValueChange={setDiscountCode}
            />
            <Button
              type="button"
              size="lg"
              variant="flat"
              onPress={onApplyDiscount}
              isLoading={isApplyingDiscount}
              isDisabled={
                isApplyingDiscount || !discountCode || cart.length === 0
              }>
              Apply
            </Button>
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <p className="text-foreground-500">Subtotal</p>
          <p className="font-semibold">{formatCurrency(subTotal)}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-foreground-500">Shipping estimate</p>
          <p className="font-semibold">{formatCurrency(SHIPPING)}</p>
        </div>
        {appliedDiscount && (
          <div className="flex items-center justify-between gap-2">
            <p className="text-foreground-500">Discount</p>
            <p className="font-semibold">-{formatCurrency(discountTotal)}</p>
          </div>
        )}
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
        color="primary"
        type="submit"
        isDisabled={cart.length === 0}>
        Confirm order
      </Button>
    </div>
  );
};

export default CartList;
