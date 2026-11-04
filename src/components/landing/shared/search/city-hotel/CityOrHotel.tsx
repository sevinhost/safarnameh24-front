import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';

import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks';
import { usePathname } from 'next/navigation';

import logo from '@/assets';
import CityOrHotelContent from './CityOrHotelContent';
import CityOrHotelTrigger from './CityOrHotelTrigger';

import { useHotelOrCityContext, useHotelOrCityDispatch } from '@/context';

type CommonProps = {
  sideOffset?: number;
  triggerType?: 'home' | 'else';
  alignOffset?: number | undefined;
};

type Props =
  | ({
      scrollBehavior?: false;
    } & CommonProps)
  | ({
      scrollBehavior?: true;
      scrollPosition?: number;
    } & CommonProps);

// -----------------------------------

export default function CityOrHotel(props: Props) {
  const {
    sideOffset,
    alignOffset,
    scrollBehavior,
    triggerType = 'else',
  } = props;

  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  const dispatch = useHotelOrCityDispatch();

  const isBestHotel = pathname === '/hotel';
  const isHotelDetail = pathname.startsWith('/hotel/');

  const { confirmedValue } = useHotelOrCityContext();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      {!isDesktop ? (
        // === Small-Device
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger className="h-12 rounded-cs-10 bg-zinc-200/50 px-5 text-cs08 font-semibold text-zinc-600">
            {confirmedValue.city ? (
              <div className="flex items-center gap-1">
                {confirmedValue.hotel ? (
                  <>
                    <span>هتل</span>
                    <span>{confirmedValue.hotel}</span>
                    <span>-</span>
                    <span>{confirmedValue.city}</span>
                  </>
                ) : (
                  <>
                    <span>{confirmedValue.city}</span>
                    <span>-</span>
                    <span>استان</span>
                    <span>{confirmedValue.province}</span>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                {isBestHotel ? <span>شهر مقصد</span> : <span>شهر یا هتل</span>}
                <span>(داخلی , خارجی)</span>
              </div>
            )}
          </SheetTrigger>

          <SheetContent
            side={'left'}
            aria-describedby={undefined}
            className="grid h-dvh w-full grid-rows-[auto_auto_1fr_auto] gap-0 border-none bg-[#f8f8f8]"
          >
            <SheetTitle className="hidden" />
            <CityOrHotelContent
              isOpen={isOpen}
              handleClose={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      ) : (
        // === Large-Device
        <DropdownMenu
          dir="rtl"
          modal={false}
          open={isOpen}
          onOpenChange={setOpen}
        >
          <CityOrHotelTrigger
            isOpen={isOpen}
            type={triggerType}
            scrollBehavior={scrollBehavior}
            handleSetOpen={() => setOpen(true)}
            scrollPosition={scrollBehavior ? props.scrollPosition : undefined}
          />

          <DropdownMenuContent
            align="start"
            side="bottom"
            sideOffset={sideOffset}
            avoidCollisions={false}
            alignOffset={alignOffset}
            className="z-10 max-h-[28rem] w-[21rem] rounded-xl shadow-[0_0.5rem_2rem_rgba(0,0,0,0.06)]"
          >
            <CityOrHotelContent
              isOpen={isOpen}
              handleClose={() => setOpen(false)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
