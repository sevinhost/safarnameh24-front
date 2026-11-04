'use client';

import { CSSVars } from '@/types/landing';
import { ArrowLeft } from 'iconsax-react';
import { axiosInstance } from '@/utils/axios';
import { AxiosError } from 'axios';

import loader from '@/styles/loader.module.css';
import { payment } from '../../helpers/constant';
import { useMutation } from '@tanstack/react-query';

import { useRouter, useSearchParams } from 'next/navigation';
import { showCMToast } from '@/components/landing/shared/toast';
import { useReservationStatus } from '../../helpers/useReservationStatus';

type ApiResponse = {
  data: {
    ok: boolean;
    payment_link: string;
  };
};

// ------------------------------

export function SecondStepSubmitButton() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const router = useRouter();
  const { status } = useReservationStatus(trackingCode);

  const { mutate, status: mutateStatus } = useMutation<
    ApiResponse,
    AxiosError<any>
  >({
    mutationFn: () => {
      return axiosInstance.post(`/payment/reservation-check/${trackingCode}/`);
    },
    onSuccess: (response: any) => {
      const res = response?.data?.data || response?.data;

      if (res?.ok && res?.payment_link) {
        // برای لینک‌های بانکی و شاپرک، انتقال با تغییر لوکیشن مرورگر الزامی است
        if (
          res.payment_link.startsWith('http://') ||
          res.payment_link.startsWith('https://')
        ) {
          window.location.href = res.payment_link;
        } else {
          router.push(res.payment_link);
        }
      } else {
        router.push(
          `/payment/watcher-info?${payment.reservationId}=${trackingCode}`,
        );
      }
    },
    onError: (error) => {
      // استخراج پیام خطا از تمام کلیدهای ارسالی بک‌اند (message, detail, error)
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        'متاسفانه در اتصال به درگاه پرداخت خطایی رخ داده است.';

      showCMToast({
        type: 'error',
        title: 'خطا در پرداخت',
        description: errorMsg,
      });
    },
  });

  const isLoading =
    mutateStatus === 'pending' || (mutateStatus as any) === 'loading';

  return (
    <>
      <button
        onClick={() => mutate()}
        disabled={status !== 'confirmed' || isLoading}
        className="h-12 w-full rounded-cs-10 bg-cs-dark-blue disabled:cursor-not-allowed disabled:opacity-90"
      >
        {isLoading ? (
          <div className="full-size flex-center">
            <div
              className={loader.dots}
              style={{ '--dots-color': '#fff' } as CSSVars}
            />
          </div>
        ) : (
          <span className="flex-center gap-2 text-cs85 font-semibold text-zinc-100">
            پرداخت صورتحساب
            <ArrowLeft size={18} color="#fff" />
          </span>
        )}
      </button>
    </>
  );
}