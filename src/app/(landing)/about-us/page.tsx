import {
  Gallery,
  OurStory,
  ReasonOfSelection,
  LookingAtServices,
  FrequentlyQuestions,
} from '@/components/landing/modules/about-us';

// تنظیمات سئو و متا دیتا
export const metadata = {
  title: 'درباره زروان تریپ | رزرو هتل‌های خیلی خوب با بهترین قیمت',
  description: 'در زروان تریپ، ما با گلچین کردن بهترین هتل‌ها، تجربه‌ای متفاوت از اقامت را برای شما فراهم می‌کنیم. درباره زروان تریپ و تعهد ما به ارائه خدمات مسافرتی باکیفیت بیشتر بدانید.',
  keywords: 'زروان تریپ, ZarvanTrip, رزرو هتل, هتل خیلی خوب, بهترین هتل‌ها, اقامتگاه ارزان, رزرو آنلاین هتل',
  alternates: {
    canonical: 'https://zarvantrip.com/about-us', // آدرس دقیق این صفحه را اینجا بگذارید
  },
  openGraph: {
    title: 'درباره زروان تریپ | مرجع رزرو هتل‌های باکیفیت',
    description: 'سفر به یادماندنی با رزرو بهترین هتل‌ها در زروان تریپ. ما کیفیت اقامت شما را تضمین می‌کنیم.',
    url: 'https://zarvantrip.com/about-us',
    siteName: 'ZarvanTrip',
    locale: 'fa_IR',
    type: 'website',
  },
};

export default function AboutUs() {
  return (
    <main className="mt-4 flex flex-col gap-14 lg:gap-20 xl:mt-12">
      {/* 
        نکته سئو: مطمئن شوید در کامپوننت OurStory یا ReasonOfSelection 
        یک تگ H1 وجود دارد که شامل کلمه کلیدی اصلی شماست. 
      */}
      <OurStory />
      <ReasonOfSelection />
      <FrequentlyQuestions />
      <Gallery />
      <LookingAtServices />
    </main>
  );
}