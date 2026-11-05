// Importing part
import { ReactNode } from 'react';
import ProfileDropdown from './profileDropdown';
import { ICLogOut } from '@/components/icons/ICLogOut';
import { ICArrowFlashRight } from '@/components/icons/ICArrowFlashRight';
import Logo from '../ui/logo';
import { usePathname, useRouter } from 'next/navigation';
import Notification from './notification';
import useLogout from '@/hooks/dashboard/useLogout';

type urlTitleType =
  | {
      type: 'normal';
      href: `/dashboard/${string}` | '/dashboard';
      title: string;
    }
  | {
      type: 'regexp';
      regexp: RegExp;
      title: string;
    };

const urlTitles: urlTitleType[] = [
  {
    type: 'normal',
    href: '/dashboard',
    title: 'داشبورد سفرنامه 24',
  },
  {
    type: 'normal',
    href: '/dashboard/reservations',
    title: 'لیست رزروهای هتل من',
  },
  {
    type: 'normal',
    href: '/dashboard/reservations',
    title: 'لیست رزرو هتل‌های من',
  },
  {
    type: 'normal',
    href: '/dashboard/financial/wallet',
    title: 'بخش مالی - شارژ کیف پول',
  },
  {
    type: 'normal',
    href: '/dashboard/financial/detailed-report',
    title: 'بخش مالی - لیست ریز گزارشات',
  },
  {
    type: 'normal',
    href: '/dashboard/financial/cart-to-cart',
    title: 'بخش مالی - کارت به کارت',
  },
  {
    type: 'normal',
    href: '/dashboard/financial/take-out',
    title: 'بخش مالی - برداشت وجه',
  },
  {
    type: 'normal',
    href: '/dashboard/customer-club/gifts',
    title: 'باشگاه مشتریان - جوایز مرکز خرید',
  },
  {
    type: 'normal',
    href: '/dashboard/customer-club/list',
    title: 'باشگاه مشتریان - لیست جوایز دریافتی',
  },
  {
    type: 'normal',
    href: '/dashboard/profile',
    title: 'پروفایل کاربری مشتری',
  },
  {
    type: 'normal',
    href: '/dashboard/favorites',
    title: 'بازگشت به صفحه قبلی',
  },
  {
    type: 'regexp',
    regexp: /^\/dashboard\/favorites\/\d+$/,
    title: 'بازگشت به صفحه قبلی',
  },
  {
    type: 'normal',
    href: '/dashboard/passengers',
    title: 'لیست مسافران من',
  },
];

// Creating and exporting TopSide component of header as default
export default function TopSide(): ReactNode {
  // Defining hooks
  const router = useRouter();
  const pathname = usePathname();
  const logOut = useLogout();

  // Using iseMemo
  const matched = urlTitles.find((item) => {
    if (item.type === 'normal') {
      return item.href === pathname;
    } else if (item.type === 'regexp') {
      return item.regexp.test(pathname);
    }
  });

  // Returning JSX
  return (
    <div className="border-b-[1.4px] border-b-black/10 bg-transparent transition-all duration-500">
      <div className="mx-auto hidden max-w-screen-template items-center justify-between p-5 lg:flex">
        <Logo />
        <div className="flex items-center justify-between gap-4">
          <button
            className="flex aspect-square h-12 w-12 items-center justify-center rounded-lg bg-cs-red/5 text-cs-red transition-all duration-500 hover:bg-cs-red/10 disabled:opacity-50"
            disabled={logOut.loading}
            onClick={logOut.mutate}
          >
            <ICLogOut className="h-5 w-5 text-current" />
          </button>
          <Notification />
          <ProfileDropdown />
        </div>
      </div>
      <div className="block px-[24px] py-[16px] lg:hidden">
        <button
          onClick={() => router.back()}
          className="flex w-full items-center justify-start gap-[10px] overflow-hidden"
        >
          <ICArrowFlashRight className="aspect-square h-[24px] w-[24px] shrink-0" />
          <span className="block w-full truncate text-right text-[14px] font-bold text-black">
            {matched?.title || 'بازگشت به صفحه'}
          </span>
        </button>
      </div>
    </div>
  );
}
