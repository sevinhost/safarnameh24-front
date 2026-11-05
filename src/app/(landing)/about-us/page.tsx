import {
  Gallery,
  OurStory,
  ReasonOfSelection,
  LookingAtServices,
  FrequentlyQuestions,
} from '@/components/landing/modules/about-us';

// تنظیمات سئو و متا دیتا
export const metadata = {
  title: 'درباره سفرنامه 24 | رزرو هتل‌های خیلی خوب با بهترین قیمت',
  description: 'در سفرنامه 24، ما با گلچین کردن بهترین هتل‌ها، تجربه‌ای متفاوت از اقامت را برای شما فراهم می‌کنیم. درباره سفرنامه 24 و تعهد ما به ارائه خدمات مسافرتی باکیفیت بیشتر بدانید.',
  keywords: 'سفرنامه 24, safarnameh24, رزرو هتل, هتل خیلی خوب, بهترین هتل‌ها, اقامتگاه ارزان, رزرو آنلاین هتل',
  alternates: {
    canonical: 'https://safarnameh24.com/about-us', // آدرس دقیق این صفحه را اینجا بگذارید
  },
  openGraph: {
    title: 'درباره سفرنامه 24 | مرجع رزرو هتل‌های باکیفیت',
    description: 'سفر به یادماندنی با رزرو بهترین هتل‌ها در سفرنامه 24. ما کیفیت اقامت شما را تضمین می‌کنیم.',
    url: 'https://safarnameh24.com/about-us',
    siteName: 'safarnameh24',
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