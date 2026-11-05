import { Header } from '@/components/landing/shared/header/Header';
import { Footer } from '@/components/landing/shared/footer/Footer';
import UserAccount from '@/components/landing/shared/auth/UserAccount';
import { BottomBar } from '@/components/landing/shared/bottom-bar/BottomBar';
import { Metadata } from 'next';

// متا دیتای عمومی برای صفحات لندینگ
export const metadata: Metadata = {
  metadataBase: new URL('https://safarnameh24.com'),
  title: {
    default: 'سفرنامه 24 | مرجع رزرو آنلاین هتل‌های داخلی و خارجی',
    template: '%s | سفرنامه 24',
  },
  description: 'با سفرنامه 24، بهترین هتل‌ها را با قیمت مناسب رزرو کنید. اقامتی راحت و بی‌دغدغه در هتل‌های منتخب با پشتیبانی ۲۴ ساعته.',
  keywords: ['رزرو هتل', 'سفرنامه 24', 'safarnameh 24', 'بهترین هتل ها', 'رزرو آنلاین هتل'],
  authors: [{ name: 'safarnameh 24 Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'safarnameh 24',
    locale: 'fa_IR',
  },
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function LandingLayout(props: Props) {
  return (
    <>
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
    </>
  );
}