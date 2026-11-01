'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';

import { CSSVars } from '@/types/landing';
import { axiosInstance } from '@/utils/axios';
import loader from '@/styles/loader.module.css';
import { useMutation } from '@tanstack/react-query';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallReactions } from '@/components/landing/shared/reaction';
import { payment } from '@/components/landing/modules/payment/helpers/constant';

type Request = {
  room_id: number;
  hotel_id: number;
  room_number: number;
  date: {
    enter: string;
    exit: string;
  };
};

type Props = {
  roomId: number;
  hotelId: number;
  roomNumber: number;
  canBook?: boolean;        // ← فیلد جدید از بک‌اند
  checkAuth?: () => boolean;
};

// -----------------------------

export default function ReserveButton(props: Props) {
  const { roomId, hotelId, roomNumber, canBook = true } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const callReaction = useCallReactions();
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation<any, AxiosError<any>, Request>({
    mutationFn: (data) => {
      setLoading(true);
      return axiosInstance.post('hotel/reservation/create/', data);
    },
    onSuccess: (response) => {
      setLoading(false);
      const trackingCode =
        response?.data?.tracking_code ||
        response?.data?.data?.tracking_code ||
        (response as any)?.tracking_code;

      if (trackingCode) {
        router.push(
          `/payment/complete-passengers-information?${payment.reservationId}=${trackingCode}`,
          { scroll: false },
        );
      } else {
        router.push('/payment/complete-passengers-information', { scroll: false });
      }
    },
    onError: (error) => {
      setLoading(false);

      // پیام خطای استاندارد از بک‌اند
      const errorData = error?.response?.data;
      const errorMessage =
        errorData?.detail ||
        errorData?.error ||
        (typeof errorData === 'object' && errorData?.code === 'no_availability'
          ? 'این اتاق در بازه تاریخی انتخاب‌شده ظرفیت خالی ندارد.'
          : null) ||
        'عملیات رزرو با مشکلی روبرو شده است. لطفاً مجدداً تلاش فرمایید.';

      callReaction({
        type: 'error',
        title: 'امکان رزرو وجود ندارد',
        description: errorMessage,
      });
    },
  });

  function handleClick() {
    // اگر از بک‌اند گفته شده قابل رزرو نیست
    if (!canBook) {
      callReaction({
        type: 'error',
        title: 'ظرفیت تکمیل است',
        description: 'این اتاق در بازه تاریخی انتخاب‌شده ظرفیت خالی ندارد. لطفاً تاریخ دیگری انتخاب کنید.',
      });
      return;
    }

    const exitDate = searchParams.get('end-date');
    const enterDate = searchParams.get('start-date');

    if (!enterDate || !exitDate) {
      callReaction({
        type: 'error',
        title: 'تاریخ ورود و خروج مشخص نشده است',
        description: 'لطفاً ابتدا تاریخ ورود و خروج اقامت خود را مشخص فرمایید.',
      });
      return;
    }

    mutate({
      room_id: roomId,
      hotel_id: hotelId,
      room_number: roomNumber,
      date: {
        enter: enterDate,
        exit: exitDate,
      },
    });
  }

  // اگر قابل رزرو نباشد → دکمه غیرفعال + متن متفاوت
  const isDisabled = isLoading || !canBook;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`col-span-2 flex-center h-11 w-full rounded-cs-10 font-bold ${
        canBook
          ? 'bg-cs-dark-blue text-zinc-100'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      {isLoading ? (
        <span
          className={loader.dots}
          style={{ '--dots-color': '#fff' } as CSSVars}
        />
      ) : canBook ? (
        'رزرو اتاق'
      ) : (
        'ظرفیت تکمیل'
      )}
    </button>
  );
}