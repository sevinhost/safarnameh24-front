import {
  Services,
  BestHotels,
  HeroSection,
  AmazingHotels,
  SuggestedHotels,
  CustomerReviews,
  InterestingBlogs,
  BestSellingHotels,
  MostVisitedCities,
  AdvertisingBanners,
} from '@/components/landing/modules/home';

import StickyArea from '@/components/landing/shared/StickyArea';

// تنظیمات متادیتای صفحه اصلی (SEO)
export const metadata = {
  title: 'سفرنامه 24 | رزرو آنلاین هتل | بهترین هتل‌های ایران و جهان',
  description: 'در سفرنامه 24 به راحتی هتل‌های خیلی خوب را جستجو و رزرو کنید. ارائه بهترین قیمت هتل‌ها، تخفیف‌های ویژه و پشتیبانی ۲۴ ساعته. سفر خود را با سفرنامه 24 شروع کنید.',
  keywords: 'سفرنامه 24, safarnameh24, رزرو هتل, رزرو آنلاین هتل, هتل خیلی خوب, بهترین هتل ها, سایت رزرو هتل, اقامتگاه ارزان, رزرو هتل خارجی, هتل‌های داخلی',
  alternates: {
    canonical: 'https://safarnameh24.com', // آدرس اصلی سایت
  },
  openGraph: {
    title: 'سفرنامه 24 | مرجع تخصصی رزرو آنلاین هتل',
    description: 'تجربه رزرو سریع و ارزان هتل در سفرنامه 24. با ما هتل‌های خیلی خوب را با بهترین قیمت رزرو کنید.',
    url: 'https://safarnameh24.com',
    siteName: 'safarnameh24',
    locale: 'fa_IR',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      {/* 
        نکته سئو: تگ H1 باید فقط یک بار در صفحه باشد. 
        اگر در HeroSection تگ H1 ندارید، حتما در آنجا اضافه کنید.
      */}
      <StickyArea
        staticClassName="mt-2"
        childrenStatus={{ static: true, fixed: true }}
        searchbarStatus={{ static: true, fixed: true }}
      />

      <main className="mt-5 flex flex-col gap-14 lg:mt-0 lg:gap-20">
        <HeroSection />
        <Services />
        <SuggestedHotels />
        <MostVisitedCities />
        <AmazingHotels />
        <AdvertisingBanners />
        <BestSellingHotels />
        <BestHotels />
        <CustomerReviews />
      </main>
    </>
  );
}