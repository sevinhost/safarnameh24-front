// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import IconsaxIcons from '../icons/iconsaxIcons';
import { IconsName } from '@/types';
import MobileProfile from './mobileProfile';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/utils';

// Defining data to render in navigation bar
const data: {
  icon: IconsName;
  title: string;
  href?: `/${string}` | '/';
  type: 'link' | 'profile-toggler';
}[] = [
  {
    icon: 'Home2',
    title: 'خانه',
    href: '/dashboard',
    type: 'link',
  },
  {
    icon: 'Heart',
    title: 'علاقه مندی ها',
    href: '/dashboard/favorites',
    type: 'link',
  },
  {
    icon: 'Flash',
    title: 'بهترین هتل ها',
    href: '/hotel',
    type: 'link',
  },
  {
    icon: 'Messages3',
    title: 'چت تایم ',
    href: '/dashboard/tickets',
    type: 'link',
  },
  {
    icon: 'Profile2User',
    title: 'پروفایل کاربری',
    type: 'profile-toggler',
  },
];

// Creating and exporting MobileNav component as defualt
export default function MobileNav(): ReactNode {
  // Defining hooks
  const pathname = usePathname();
  const showNavInUrls = ['/dashboard'];

  // Defining states of component
  const [profileOpened, setProfileOpened] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('');

  // Check Scroll-Direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  // returning JSX
  return (
    <nav
      className={cn(
        'fixed z-50 inset-x-0 print:hidden bg-white h-[4.5rem] px-6 flex-between items-center border-t shadow-[0_0_2rem_rgba(0,0,0,0.1)] transition-all duration-500 delay-100 ease-in-out md:flex-center md:gap-8 lg:hidden bottom-0',
        isAtBottom || scrollDirection === 'down' ? '-bottom-20' : 'bottom-0',
      )}
    >
      {data.map((item, index) =>
        item.type === 'link' ? (
          <Link
            key={index}
            data-active={pathname === item.href && !profileOpened}
            className="flex flex-col items-center justify-center gap-[5px] transition-all duration-500 data-[active='false']:text-gray-400 data-[active='true']:text-black shrink"
            href={item.href || '#'}
          >
            <IconsaxIcons
              name={item.icon}
              className="w-[17px] h-[17px]"
              color="currentColor"
              variant={
                pathname === item.href && !profileOpened ? 'Bold' : 'Outline'
              }
            />
            <span className="block w-full truncate text-center text-[10px] font-semibold text-current">
              {item.title}
            </span>
          </Link>
        ) : (
          <div key={index}>
            {createPortal(
              <MobileProfile
                isOpened={profileOpened}
                closeFn={() => setProfileOpened(false)}
              />,
              document.body,
            )}
            <button
              data-active={profileOpened}
              className="flex flex-col items-center justify-center gap-1.5 transition-all duration-500 data-[active='false']:text-gray-400 data-[active='true']:text-black shrink"
              onClick={() => setProfileOpened((prev) => !prev)}
            >
              <IconsaxIcons
                name={item.icon}
                className="w-[17px] h-[17px]"
                color="currentColor"
                variant={profileOpened ? 'Bold' : 'Outline'}
              />
              <span className="block w-full truncate text-center text-[10px] font-semibold text-current">
                {item.title}
              </span>
            </button>
          </div>
        ),
      )}
    </nav>
  );
}
