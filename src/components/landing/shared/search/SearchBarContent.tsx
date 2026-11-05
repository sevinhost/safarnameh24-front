import Image from 'next/image';
import { ArrowRight } from 'iconsax-react';
import { usePathname } from 'next/navigation';

import SubmitButton from './SubmitButton';
import NumberOfNights from './NumberOfNights';
import Passengers from './passengers/Passengers';

import logo from '@/assets';
import DatePicker from './date-picker/MDatePicker';
import CityOrHotel from './city-hotel/CityOrHotel';

import { useMediaQuery } from '@/hooks';
import { Sheet, SheetTitle, SheetContent } from '@/components/ui/sheet';

type Props = {
  isOpen: boolean;
  setDialogClose: () => void;
};

// -----------------------------

export default function SearchBarContent(props: Props) {
  const { isOpen, setDialogClose } = props;

  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const isBestHotel = pathname === '/hotel';
  const isHotelDetail = pathname.startsWith('/hotel/');

  return (
    <>
      {!isDesktop && (
        <Sheet open={isOpen}>
          <SheetContent
            side={'right'}
            aria-describedby={undefined}
            className="flex h-dvh w-full flex-col gap-0 border-none bg-[#f8f8f8] pt-6"
          >
            {/* === Logo | Title | Close */}
            <div className="relative grid place-items-center">
              <div className="relative aspect-square w-16">
                <Image
                  fill
                  alt="logo"
                  sizes="100%"
                  className="object-contain"
                  src={logo}
                />
              </div>

              <SheetTitle className="mt-2 font-inter text-[clamp(0.95rem,3vw,1rem)] font-bold capitalize">
                safarnameh 24
              </SheetTitle>

              <button
                className="absolute right-0 top-0"
                onClick={setDialogClose}
              >
                <ArrowRight size={22} color="#444" />
              </button>
            </div>

            {/* === Setting */}
            <div className="mt-8 grid gap-4">
              {!isHotelDetail && <CityOrHotel />}

              <DatePicker />
              {/* <Passengers /> */}
              <NumberOfNights />
            </div>

            {/* === Submit */}
            <SubmitButton handleClose={setDialogClose} />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
