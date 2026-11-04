'use client';

import { usePathname } from 'next/navigation';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

type Props = {
  prevClickFunc?: () => void;
  nextClickFunc?: () => void;
};

// -----------------------------------------------

export default function TopBarSwiperNavigation(props: Props) {
  const { prevClickFunc, nextClickFunc } = props;
  const pathname = usePathname();

  return (
    <div
      className={`flex gap-3 ${pathname.includes('/hotel/') ? '' : ''}`}
    >
      {prevClickFunc && nextClickFunc && (
        <>
          <button
            className="bg-zinc-200/50 w-10 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200/70"
            onClick={prevClickFunc}
          >
            <ArrowRight2 size={20} color="#52525b" />
          </button>

          <button
            className="bg-zinc-200/50 w-10 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200/70"
            onClick={nextClickFunc}
          >
            <ArrowLeft2 size={20} color="#52525b" />
          </button>
        </>
      )}
    </div>
  );
}
