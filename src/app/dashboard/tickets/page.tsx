// Forcing next.js to render this component as client side component
'use client';

// Importing part
import TicketsContext from '@/components/dashboard/ticket/ticketsContext';
import { ReactNode, useEffect, useState } from 'react';
import Avatar from '../../../../public/image/avatar/1.jpg';
import { TicketsContextPropsType } from '@/types/dashboard/component';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import Loading from '@/components/dashboard/ui/loading';

const tickets: TicketsContextPropsType['tickets'] = {
  currentTickets: [
    {
      id: 1,
      status: 'open',
      user: {
        img: Avatar.src,
        name: 'رضا احمدی',
        status: 'منتظر پاسخ',
        lastSeen: new Date().toISOString(),
        role: 'کاربر',
      },
      messages: [
        {
          createdAt: new Date().toISOString(),
          from: 'user',
          message: 'سلام، من مشکلی در ورود دارم.',
          type: 'text',
          answererName: 'رضا احمدی',
        },
        {
          createdAt: new Date().toISOString(),
          from: 'answerer',
          message: 'سلام رضا جان، دقیقا چه خطایی دریافت می‌کنید؟',
          type: 'text',
          answererName: 'پشتیبانی',
        },
      ],
      files: {
        documents: [],
        images: [],
        videos: [],
        voices: [],
      },
    },
    {
      id: 2,
      status: 'open',
      user: {
        img: Avatar.src,
        name: 'محمد علی کلی',
        status: 'صحبتی ایجاد نشده',
        lastSeen: new Date().toISOString(),
        role: 'مدیر',
      },
      messages: [
        {
          createdAt: new Date().toISOString(),
          from: 'user',
          message: 'سلام جناب وقتتون بخیر .',
          type: 'text',
          answererName: 'محمد علی کلی',
        },
        {
          createdAt: new Date().toISOString(),
          from: 'answerer',
          message: 'سلام روز شما هم بخیر, جانم .',
          type: 'text',
          replyMessage: 'سلام جناب وقتتون بخیر .',
          answererName: 'محمد علی کلی',
        },
        {
          createdAt: new Date().toISOString(),
          from: 'user',
          type: 'voice',
          message:
            'https://ia801900.us.archive.org/19/items/randommusic2016_201610/01%20Rude.mp3',
          replyMessage: 'سلام روز شما هم بخیر, جانم .',
          answererName: 'محمد علی کلی',
        },
      ],
      files: {
        documents: ['/ticketFakeFiles/randomPDF.pdf'],
        images: ['/ticketFakeFiles/randomImage.jpg'],
        videos: ['/ticketFakeFiles/randomVideo.mp4'],
        voices: [
          'https://ia801900.us.archive.org/19/items/randommusic2016_201610/01%20Rude.mp3',
        ],
      },
    },
  ],
  previousTickets: [
    {
      date: '2025-07-10',
      tickets: [
        {
          status: 'closed',
          id: 101,
          user: {
            img: Avatar.src,
            name: 'سارا محمدی',
            status: 'بسته شده',
            lastSeen: new Date().toISOString(),
            role: 'کاربر',
          },
          messages: [
            {
              createdAt: new Date().toISOString(),
              from: 'user',
              message: 'لطفا صورتحساب ماه پیش منو ارسال کنید.',
              type: 'text',
              answererName: 'سارا محمدی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              message: 'حتما، فایل PDF برای شما ارسال شد.',
              type: 'text',
              answererName: 'پشتیبانی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              type: 'file',
              message: '/ticketFakeFiles/invoice.pdf',
              answererName: 'پشتیبانی',
            },
          ],
          files: {
            documents: ['/ticketFakeFiles/invoice.pdf'],
            images: [],
            videos: [],
            voices: [],
          },
        },
        {
          status: 'closed',
          id: 105,
          report: 'best',
          user: {
            img: Avatar.src,
            name: 'سارا محمدی',
            status: 'بسته شده',
            lastSeen: new Date().toISOString(),
            role: 'کاربر',
          },
          messages: [
            {
              createdAt: new Date().toISOString(),
              from: 'user',
              message: 'لطفا صورتحساب ماه پیش منو ارسال کنید.',
              type: 'text',
              answererName: 'سارا محمدی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              message: 'حتما، فایل PDF برای شما ارسال شد.',
              type: 'text',
              answererName: 'پشتیبانی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              type: 'file',
              message: '/ticketFakeFiles/invoice.pdf',
              answererName: 'پشتیبانی',
            },
          ],
          files: {
            documents: ['/ticketFakeFiles/invoice.pdf'],
            images: [],
            videos: [],
            voices: [],
          },
        },
      ],
    },
    {
      date: '2025-08-01',
      tickets: [
        {
          id: 202,
          status: 'closed',
          user: {
            img: Avatar.src,
            name: 'حسین مرادی',
            status: 'بسته شده',
            lastSeen: new Date().toISOString(),
            role: 'کاربر',
          },
          messages: [
            {
              createdAt: new Date().toISOString(),
              from: 'user',
              message: 'ویدئو تبلیغاتی من آپلود نمی‌شود.',
              type: 'text',
              answererName: 'حسین مرادی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              message: 'بررسی شد، لطفا حجم فایل را کمتر از 50MB کنید.',
              type: 'text',
              answererName: 'پشتیبانی',
            },
          ],
          files: {
            documents: [],
            images: [],
            videos: [],
            voices: [],
          },
        },
      ],
    },
  ],
};

// Creating and exporting tickets page as default
export default function TicketsPage(): ReactNode {
  // Defining hooks
  const [isLoading, setLoading] = useState<boolean>(true);

  // Using useEffect to show and hide loading animateion of tickets page
  // TODO: Remove on fetchings
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Conditional rendering
  if (isLoading) {
    return (
      <main className="flex h-dvh items-center justify-center overflow-hidden p-5">
        <div className="text-[#292D32]">
          <IconsaxIcons
            name="DeviceMessage"
            className="mx-auto mb-5 block size-28"
            color="currentColor"
          />
          <span className="mb-2 block truncate text-center text-cs95 font-bold text-current">
            در حال اتصال به تیکت سفرنامه ۲۴ ۲۴
          </span>
          <span className="text-current/50 mb-5 block truncate text-center text-cs85 font-medium">
            لطفا منتظر بمانید...
          </span>
          <div className="flex w-full items-center justify-center">
            <Loading className="bg-cs-red" />
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <TicketsContext tickets={tickets} />
      </main>
    );
  }
}
