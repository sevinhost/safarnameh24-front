'use client';

import AdminCreditCardInfo from '@/components/dashboard/financialCartToCart/adminCreditCardInfo';
import CashOut from '@/components/dashboard/financialCartToCart/cashout';
import Details from '@/components/dashboard/financialCartToCart/details';
import EmergencieForm from '@/components/dashboard/financialCartToCart/emergencieForm';
import SelectMode from '@/components/dashboard/financialCartToCart/selectMode';
import UserCreditCard from '@/components/dashboard/financialCartToCart/userCreditCard';
import CartBalance from '@/components/dashboard/profile/cartBalance';
import toast from '@/components/dashboard/ui/customSonner/toast';
import Upload from '@/components/dashboard/upload/upload';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import useUserLegalInfo from '@/hooks/dashboard/useUserLegalInfo';
import { GETPersonalProfile } from '@/types/dashboard/api/get';
import { CartToCartFinancialMode } from '@/types/dashboard/component';
import { zodResolver } from '@hookform/resolvers/zod';
import { removeCommas } from '@persian-tools/persian-tools';
import moment from 'jalali-moment';
import { JSX, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  depositorName: z
    .string({ required_error: 'وارد کردن نام واریز کننده الزامی است' })
    .min(2, { message: 'نام واریز کننده باید حداقل ۲ کاراکتر باشد' }),
  trackingNumber: z
    .string({ required_error: 'لطفا این فیلد را پر کنید.' })
    .length(12, { message: 'شماره پیگیری باید دقیقا ۱۲ رقم باشد' })
    .regex(/^[0-9]+$/, { message: 'شماره پیگیری فقط باید شامل اعداد باشد' }),
  extraAmount: z
    .string({
      required_error: 'وارد کردن مبلغ اضافه الزامی است',
      invalid_type_error: 'مبلغ باید عدد باشد',
    })
    .refine((val) => Number(removeCommas(val)) > 10000, {
      message: 'مبلغ باید بیشتر از 10,000 تومان باشد',
    }),
  depositDate: z
    .string({ required_error: 'لطفا این فیلد را پر کنید.' })
    .min(1, { message: 'تاریخ واریز وجه را وارد نمایید' }),
});

export type cartToCartFormType = z.infer<typeof formSchema>;

export default function CartToCartFinancialPage(): JSX.Element {
  const userInfo = useUserInfo();
  const userLegalInfo = useUserLegalInfo();

  const personalCards = userInfo?.card_numbers || [];
  const legalCards = userLegalInfo?.data?.card_numbers || [];

  const [mode, setMode] = useState<CartToCartFinancialMode>('personal');
  const [image, setImage] = useState<File | undefined>();
  const [selectedCreditCard, setSelectedCreditCard] = useState<
    GETPersonalProfile['card_numbers'][0] | undefined
  >(personalCards[0]);

  const currentCards = mode === 'company' ? legalCards : personalCards;

  const form = useForm<cartToCartFormType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const depositReceipts = useApiMutation({
    method: 'post',
    url: '/finance/deposit-receipts/',
    isFormData: true,
    options: {
      onSuccess: () => {
        (toast as any)({
          title: 'انتقال مبلغ موفقیت آمیز بود!',
          description: 'انتقال مبلغ مد نظر شما با موفقیت انجام شد.',
          theme: 'green' as any,
        });
        form.reset();
        setImage(undefined);
      },
      onError: () => {
        (toast as any)({
          title: 'خطایی رخ داد!',
          description: 'انتقال مبلغ مد نظر شما انجام نشد.',
          theme: 'red' as any,
        });
      },
    },
  });

  const onSubmit: SubmitHandler<cartToCartFormType> = async (data) => {
    if (!image) {
      (toast as any)({ title: 'خطا!', description: 'لطفا عکس فیش را آپلود کنید.', theme: 'red' as any });
      return;
    }
    if (!selectedCreditCard) {
      (toast as any)({ title: 'خطا!', description: 'لطفا کارت را انتخاب کنید.', theme: 'red' as any });
      return;
    }

    await depositReceipts.mutateAsync({
      profile_type: mode === 'personal' ? 'natural' : 'juridical',
      card_object_id: selectedCreditCard.id,
      depositor_name: data.depositorName,
      tracking_number: data.trackingNumber,
      amount: Number(removeCommas(data.extraAmount)),
      deposit_date_jalali: moment(data.depositDate).format('YYYY/MM/DD'),
      receipt_image: image,
    });
  };

  return (
    <main className="flex flex-col gap-[24px] p-5 pb-[50px] lg:gap-5 lg:pb-5">
      <SelectMode
        value={mode}
        submitLoading={depositReceipts.isPending}
        onSubmit={form.handleSubmit(onSubmit)}
        disabled={!selectedCreditCard}
        onValueChange={(val) => {
            setMode(val);
            setImage(undefined);
            form.reset();
            const newCards = val === 'company' ? legalCards : personalCards;
            setSelectedCreditCard(newCards[0]);
        }}
      />
      {/* بقیه JSX بدون تغییر باقی می‌ماند */}
      <div className="grid gap-[24px] lg:grid-cols-3 lg:gap-5">
        <UserCreditCard title={mode === 'company' ? 'حقوقی' : 'حقیقی'} mode={mode} data={currentCards} onValueChange={(card) => setSelectedCreditCard(card)} />
        <div className="flex flex-col items-center justify-between gap-[24px] lg:gap-5">
          <CartBalance hasMobileView className="w-full shrink-0" />
          <div className="h-full w-full"><Upload hideSubmit className="h-full w-full lg:w-full" onChange={setImage} useSingleFile disabled={currentCards.length === 0} /></div>
        </div>
        <EmergencieForm form={form} disabled={currentCards.length === 0} />
      </div>
      <AdminCreditCardInfo className="lg:col-span-4 lg:h-[302px]" />
      <Details className="lg:col-span-2 lg:h-[302px]" />
      <CashOut />
    </main>
  );
}