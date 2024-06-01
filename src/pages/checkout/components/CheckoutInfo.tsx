'use client';
import { CreateOrderFormSchema } from '@/lib/form-schema';
import {
  Accordion,
  AccordionItem,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from '@nextui-org/react';
import { ContactRound, CreditCard, Truck } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const CheckoutInfo = () => {
  const {
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext<CreateOrderFormSchema>();

  return (
    <div className="flex-1">
      <Accordion
        defaultExpandedKeys={[
          'contactInformation',
          'shippingAddress',
          'paymentMethod',
        ]}
        selectionMode="multiple">
        <AccordionItem
          title={
            <div>
              <h3 className="text-lg font-semibold">CONTACT INFORMATION</h3>
            </div>
          }
          startContent={<ContactRound size={40} strokeWidth={1} />}
          key={'contactInformation'}>
          <div className="space-y-8">
            <Input
              {...register('email')}
              labelPlacement="outside"
              label="Email"
              placeholder="Email"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              type="email"
            />
          </div>
        </AccordionItem>

        <AccordionItem
          title={<h3 className="text-lg font-semibold">SHIPPING ADDRESS</h3>}
          startContent={<Truck size={40} strokeWidth={1} />}
          key={'shippingAddress'}>
          <Textarea
            {...register('address')}
            label="Address"
            placeholder="Enter your address"
            labelPlacement="outside"
          />
        </AccordionItem>

        <AccordionItem
          title={<h3 className="text-lg font-semibold">PAYMENT METHOD</h3>}
          startContent={<CreditCard size={40} strokeWidth={1} />}
          key={'paymentMethod'}>
          <RadioGroup
            onValueChange={v => setValue('paymentMethod', v)}
            value={watch('paymentMethod')}>
            <Radio
              value={'COD'}
              description="Pay when you receive the product.">
              Cash on delivery
            </Radio>
            <Radio
              value={'VNPAY'}
              description="Using third-party payment gateway to pay.">
              VNPay
            </Radio>
          </RadioGroup>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CheckoutInfo;
