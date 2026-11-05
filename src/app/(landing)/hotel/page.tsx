import { Metadata } from 'next';
import {
  Filters,
  Setting,
  HotelList,
  AmazingHotels,
  SuggestedHotels,
} from '@/components/landing/modules/hotels'; // ✅ با حرف s اصلاح شد

import { Suspense } from 'react';
import StickyArea from '@/components/landing/shared/StickyArea';

// تنظیم متادیتای صفحه لیست هتل‌ها
export const metadata: Metadata = {
  title: 'لیست هتل‌ها | رزرو بهترین هتل‌های ایران و جهان با سفرنامه 24',
  description: 'مجموعه‌ای از بهترین هتل‌های داخلی و خارجی را در سفرنامه 24 ببینید. مقایسه امکانات، قیمت و رزرو آنلاین هتل‌های خیلی خوب با تخفیف ویژه و واچر آنی.',
  keywords: ['رزرو هتل', 'لیست هتل ها', 'بهترین هتل ها', 'هتل خیلی خوب', 'رزرو آنلاین هتل', 'هتل های ارزان', 'safarnameh24'],
  alternates: {
    canonical: 'https://safarnameh24.com/hotel',
  },
  openGraph: {
    title: 'جستجو و رزرو بهترین هتل‌ها | سفرنامه 24',
    description: 'انتخاب از میان هزاران هتل برتر. همین حالا هتل مورد نظر خود را با بهترین قیمت رزرو کنید.',
    url: 'https://safarnameh24.com/hotel',
    type: 'website',
  },
};

export default function BestHotels() {
  return (
    <>
      <div className="mt-2">
        <StickyArea
          childrenStatus={{ static: true, fixed: true }}
          searchbarStatus={{ static: true, fixed: true }}
        >
          <Filters />
        </StickyArea>
      </div>

      <main className="mt-4 lg:mt-12">
        <Setting />

        <div className="grid gap-10 lg:mt-10 lg:grid-cols-[20rem_1fr]">
          <aside className="hidden lg:block">
            <Filters />
          </aside>

          <div className="space-y-12 lg:space-y-16">
            <Suspense fallback={<div>در حال بارگذاری هتل‌ها...</div>}>
              <SuggestedHotels />
              <AmazingHotels />
              <HotelList />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}