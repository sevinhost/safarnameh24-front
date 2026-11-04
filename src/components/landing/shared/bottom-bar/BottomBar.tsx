'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { Profile2User } from 'iconsax-react';

import { BottomBarItem } from './BottomBarItem';
import UserFavorites from '../auth/UserFavorites';
import { useCheckAuth, useMediaQuery } from '@/hooks';

import { useUserAccountContext } from '@/context/UserAccountContext';

// -----------------------------

export function BottomBar() {
  const { toggle } = useUserAccountContext();
  const { isAuthenticated } = useCheckAuth();
  const [showNav, setShowNav] = useState(true);

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    const handleScroll = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;

      distanceFromBottom < 100 ? setShowNav(false) : setShowNav(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDesktop) return null;

  return (
    <nav
      className={`flex-between md:flex-center fixed inset-x-0 z-30 h-16 items-center overflow-hidden border-t bg-white px-4 shadow-[0_0_1.5rem_rgba(0,0,0,0.1)] transition-all duration-300 md:gap-8 lg:hidden ${showNav ? 'bottom-0' : '-bottom-16'}`}
    >
      <BottomBarItem title="خانه" href="/" icon={'Home2'} />
      <BottomBarItem icon={'Book'} title="مجله گردشگری" href="/blog" />
      <BottomBarItem icon={'Flash'} href="/hotel" title="بهترین هتل ها" />
      <UserFavorites />

      {isAuthenticated ? (
        <Link
          href={'/dashboard/profile'}
          className="flex flex-col items-center gap-1"
        >
          <Profile2User size={18} color="#71717a" />
          <span className="text-[clamp(0.65rem,3vw,0.75rem)] font-bold text-zinc-500">
            پروفایل کاربری
          </span>
        </Link>
      ) : (
        <button
          className="flex flex-col items-center gap-1"
          onClick={() => toggle()}
        >
          <Profile2User size={18} color="#71717a" />
          <span className="text-[clamp(0.65rem,3vw,0.75rem)] font-bold text-zinc-500">
            حساب کاربری
          </span>
        </button>
      )}
    </nav>
  );
}
