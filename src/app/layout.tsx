import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import MainWrapper from '@/components/landing/shared/MainWrapper';
import { cn } from '@/utils/utils';

// ---------------------------------------------------

// Local font
const interFont = localFont({
  src: [
    {
      path: '../../public/font/inter/Inter_18pt-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/font/inter/Inter_18pt-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/font/inter/Inter_18pt-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/font/inter/Inter_18pt-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/font/inter/Inter_18pt-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/font/inter/Inter_18pt-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/font/inter/Inter_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/font/inter/Inter_18pt-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/font/inter/Inter_18pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/font/inter/Inter_18pt-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/font/inter/Inter_18pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/font/inter/Inter_18pt-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/font/inter/Inter_18pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/font/inter/Inter_18pt-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/font/inter/Inter_18pt-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/font/inter/Inter_18pt-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },

    {
      path: '../../public/font/inter/Inter_18pt-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/font/inter/Inter_18pt-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
});

const iranSansFont = localFont({
  src: [
    { path: '../../public/font/woff/IRANSansX-LightD4.woff', weight: '400' },
    { path: '../../public/font/woff2/IRANSansX-LightD4.woff2', weight: '400' },
    { path: '../../public/font/woff/IRANSansX-RegularD4.woff', weight: '500' },
    {
      path: '../../public/font/woff2/IRANSansX-RegularD4.woff2',
      weight: '500',
    },
    { path: '../../public/font/woff/IRANSansX-MediumD4.woff', weight: '600' },
    { path: '../../public/font/woff2/IRANSansX-MediumD4.woff2', weight: '600' },
    { path: '../../public/font/woff/IRANSansX-DemiBoldD4.woff', weight: '700' },
    {
      path: '../../public/font/woff2/IRANSansX-DemiBoldD4.woff2',
      weight: '700',
    },
    { path: '../../public/font/woff/IRANSansX-BoldD4.woff', weight: '800' },
    { path: '../../public/font/woff2/IRANSansX-BoldD4.woff2', weight: '800' },
    { path: '../../public/font/woff/IRANSansX-BlackD4.woff', weight: '900' },
    { path: '../../public/font/woff2/IRANSansX-BlackD4.woff2', weight: '900' },
  ],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'سفرنامه 24',
  description: 'رزرواسیون آنلاین هتل به صورت 24 ساعته',
  openGraph: {
    title: 'سفرنامه 24',
    description: 'رزرواسیون آنلاین هتل به صورت 24 ساعته ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="fa" dir="rtl">
      <body
        className={cn(
          interFont.variable,
          iranSansFont.variable,
          'ss01 font-sans antialiased',
        )}
        suppressHydrationWarning
      >
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}
