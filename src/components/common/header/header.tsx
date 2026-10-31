import Menu from './menu';
import Navbar from './navbar';

import AuthHandler from './auth-handler';
import Brand from '@/components/common/brand';
import { Button } from '@/components/ui/button';

import { ClipboardCheck, Headphones } from 'lucide-react';
import { ThemeSwitcher } from '@/components/common/theme-switcher';

// ------------------------------

export function Header() {
  return (
    <header className="bg-sidebar sticky inset-x-0 top-0 z-40 border-b">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center gap-6 px-4 lg:h-21 lg:rounded-2xl xl:gap-8">
        <Brand showTitle className="gap-3" />
        <Navbar />

        <div className="flex-center mr-auto gap-3">
          <div className="hidden sm:block">
            <Button variant={'ghost'} className={'font-semibold'}>
              <ClipboardCheck />
              <span>پیگیری رزرو</span>
            </Button>

            <Button variant={'ghost'} className={'font-semibold'}>
              <Headphones />
              <span>پشتیبانی</span>
            </Button>
          </div>

          <div className="hidden lg:block">
            <ThemeSwitcher className="rounded-xl" />
          </div>

          <AuthHandler />
          <Menu />
        </div>
      </div>
    </header>
  );
}
