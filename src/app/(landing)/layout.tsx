import { Header } from '@/components/landing/shared/header/Header';
import { Footer } from '@/components/landing/shared/footer/Footer';
import UserAccount from '@/components/landing/shared/auth/UserAccount';
import { BottomBar } from '@/components/landing/shared/bottom-bar/BottomBar';
import { Metadata } from 'next';

// متا دیتای عمومی برای کل سایت
export const metadata: Metadata = {
  metadataBase: new URL('https://zarvantrip.com'), // آدرس دامنه اصلی
  title: {
    default: 'زروان تریپ | مرجع رزرو آنلاین هتل‌های داخلی و خارجی',
    template: '%s | زروان تریپ', // این باعث می‌شود در صفحات دیگر به صورت "نام صفحه | زروان تریپ" نمایش داده شود
  },
  description: 'با زروان تریپ، بهترین هتل‌ها را با قیمت مناسب رزرو کنید. اقامتی راحت و بی‌دغدغه در هتل‌های منتخب با پشتیبانی ۲۴ ساعته.',
  keywords: ['رزرو هتل', 'زروان تریپ', 'ZarvanTrip', 'بهترین هتل ها', 'رزرو آنلاین هتل'],
  authors: [{ name: 'ZarvanTrip Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'ZarvanTrip',
    locale: 'fa_IR',
  },
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function LandingLayout(props: Props) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <UserAccount />

        <main className="mx-auto max-w-screen-template">
          <Header />
          
          {/* برای بهتر شدن سئو، محتوا را داخل تگ main اصلی قرار دادیم */}
          <section className="mx-5 mb-20">
            {props.children}
          </section>
          
          <BottomBar />
          <Footer />
        </main>
      </body>
    </html>
  );
}