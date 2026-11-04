import { Metadata } from 'next';
import {
  SendTicket,
  SocialMedias,
  ContactUsWays,
} from '@/components/landing/modules/contact-us';

export const metadata: Metadata = {
  title: 'تماس با زروان تریپ | پشتیبانی و ارتباط با ما',
  description: 'برای ارتباط با تیم پشتیبانی زروان تریپ، پیگیری رزرو هتل و ارسال تیکت با ما در تماس باشید. ما آماده پاسخگویی به سوالات شما هستیم.',
  keywords: ['تماس با زروان تریپ', 'پشتیبانی زروان تریپ', 'شماره تماس زروان تریپ', 'ارسال تیکت به زروان تریپ', 'خدمات مشتریان زروان تریپ'],
  alternates: {
    canonical: 'https://zarvantrip.com/contact-us',
  },
  openGraph: {
    title: 'تماس با ما | زروان تریپ - همراه شما در سفر',
    description: 'راهنمای ارتباط با زروان تریپ؛ پشتیبانی آنلاین و شماره تماس برای رزرو هتل.',
    url: 'https://zarvantrip.com/contact-us',
    type: 'website',
  },
};

export default function ContactUs() {
  return (
    <main className="mt-4 flex flex-col gap-12 lg:gap-20 xl:mt-12">
      {/* 
         نکته سئو: حتماً در کامپوننت ContactUsWays یک تگ <h1> قرار دهید
         مثلاً: <h1>تماس با پشتیبانی زروان تریپ</h1>
      */}
      <ContactUsWays />
      <SocialMedias />
      <SendTicket />
    </main>
  );
}