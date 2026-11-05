import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

import { Room } from '@/types/landing';
import CalendarCard from './CalendarCard';
import { numberSeparation } from '@/utils';

type Props = {
  info: {
    roomName: string;
    capacity: number;
    totalPrice: number;
    numberOfNights: number;
    roomType?: 'normal' | 'packed';
    priceCalendar: Room['price_calendar'];
  };
};

// --------------------------------

export default function PriceCalendar(props: Props) {
  const {
    info: {
      capacity,
      roomName,
      totalPrice,
      priceCalendar,
      numberOfNights,
      roomType = 'normal',
    },
  } = props;

  return (
    <Sheet>
      <SheetTrigger className="h-11 rounded-lg bg-cs-blue/10 text-cs-blue md:h-10">
        تقویم قیمتی
      </SheetTrigger>

      <SheetContent
        side={'right'}
        aria-describedby={undefined}
        className="grid w-full grid-rows-[auto_auto_1fr_auto] border-none md:w-[28rem]"
      >
        <SheetTitle className="hidden"></SheetTitle>

        {/* === Logo & Title & Close */}
        <div className="flex gap-4">
          <div className="w-16">
            <Image
              alt="logo"
              width={100}
              height={100}
              src={'/image/logo/red.png'}
              className="full-size object-cover"
            />
          </div>

          <div className="grid text-cs85 font-bold">
            <span>سفرنامه 24</span>
            <span className="capitalize">safarnameh 24</span>
          </div>

          <SheetClose className="mr-auto">
            <IoClose size={20} color="#444" />
          </SheetClose>
        </div>

        {/* === Room-Name */}
        <div className="flex items-center gap-1 border-b border-dashed border-zinc-300 pb-4 pt-3 text-cs08 font-bold">
          <span>اتاق</span>
          <span>{capacity}</span>
          <span>نفره</span>
          <span>{roomName}</span>
        </div>

        {/* === Calendar */}
        <div className="mt-2 space-y-5 overflow-auto">
          {priceCalendar?.map((card, index) => (
            <CalendarCard key={index} info={card} />
          ))}
        </div>

        {/* === Total-Price & Submit-Button */}
        <div className="flex flex-col gap-4 border-t pt-5">
          <div className="flex-between items-center border-zinc-200 text-cs85 font-semibold">
            <div className="flex items-center gap-1">
              <span>مجموع قیمت</span>
              <span>{numberOfNights}</span>
              <span>شب</span>
              <span>اقامت :</span>
            </div>

            <div className="flex-center gap-1">
              <span>{numberSeparation(totalPrice)}</span>
              <span>تومان</span>
            </div>
          </div>

          {roomType === 'normal' && (
            <button className="mt-1 h-11 rounded-cs-10 bg-cs-blue text-cs85 font-semibold text-white">
              <span>تایید رزرو اتاق</span>
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
