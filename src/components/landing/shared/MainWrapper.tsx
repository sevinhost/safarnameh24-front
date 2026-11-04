'use client';

import {
  DatePickerProvider,
  PassengersProvider,
  HotelOrCityProvider,
  HotelQueryProvider,
} from '@/context';

import { ToastContainer } from 'react-toastify';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthHandler from './AuthHandler';
import { Toaster } from '@/components/ui/sooner';
import { generalInstance } from '@/utils/services';

import { ServerError } from './ServerError';
import { UserAccountProvider } from '@/context/UserAccountContext';
import { ComingSoon } from '@/components/landing/modules/coming-soon';

type ApiResponse = {
  data?: {
    is_active?: boolean;
    data?: { is_active?: boolean };
  };
};

type Props = {
  children: React.ReactNode;
};

// ------------------------------

export default function MainWrapper(props: Props) {
  const [isError, setError] = useState(false);
  const [isActive, setActive] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5, // دیتا تا ۵ دقیقه تازه در نظر گرفته شود (جلوگیری از فچ و لودینگ مجدد)
            gcTime: 1000 * 60 * 15,   // نگه‌داری دیتا در رم تا ۱۵ دقیقه (کش طولانی‌مدت)
            refetchOnWindowFocus: false, // جلوگیری از لودینگ مجدد با هر بار کلیک کاربر روی تب مرورگر
            refetchOnMount: false,    // اگر دیتا در کش هست، هنگام برگشت به صفحه لودینگ نزند
            refetchOnReconnect: false, // جلوگیری از ریکوئست‌های ناگهانی با قطع و وصل اینترنت
          },
        },
      })
  );

  // === Check Activate-Status
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response: ApiResponse = await generalInstance(
          '/config/coming-soon/',
        );

        // بررسی ایمن ساختار خروجی بدون احتمال بروز کرش
        const activeStatus =
          response?.data?.data?.is_active ??
          response?.data?.is_active ??
          false;

        if (isMounted) {
          setActive(Boolean(activeStatus));
        }
      } catch (error) {
        console.warn('Coming soon config check failed:', error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isError ? (
        <ServerError />
      ) : isActive ? (
        <ComingSoon />
      ) : (
        <UserAccountProvider>
          <HotelOrCityProvider>
            <DatePickerProvider>
              <PassengersProvider>
                <Suspense fallback={null}>
                  <AuthHandler />
                </Suspense>

                <HotelQueryProvider>
                  <NuqsAdapter>{props.children}</NuqsAdapter>

                  <ToastContainer newestOnTop style={{ zIndex: 99999 }} />
                </HotelQueryProvider>
              </PassengersProvider>
            </DatePickerProvider>
          </HotelOrCityProvider>
        </UserAccountProvider>
      )}
    </QueryClientProvider>
  );
}