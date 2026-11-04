import moment from 'jalali-moment';
import { InfoCircle } from 'iconsax-react';

import { Room } from '@/types/landing';
import { numberSeparation } from '@/utils';

import DeadlineTimer from './DeadlineTimer';
import PriceCalendar from '../price-calendar/PriceCalendar';
import RoomNumber from './RoomNumber';
import { MAX, MIN } from '../NormalRoom';

type Props = {
  room: Room;
  counter: number;
  children: React.ReactNode;
  canBook?: boolean;   // ← اضافه شد
  handleChangeCounter: (type: 'inc' | 'dec') => void;
};

// ------------------------------

export default function NormalPrimaryInfo(props: Props) {
  const {
    room: {
      name,
      capacity,
      night_count,
      price_calendar,
      price: {
        total_price,
        discount_date,
        discount_amount,
        discount_percentage,
        total_price_discount,
        is_fixed_discount_one_time,
      },
    },
    children,
    counter,
    canBook = true,   // پیش‌فرض true
    handleChangeCounter,
  } = props;

  const formattedDeadline = discount_date
    ? moment.from(discount_date, 'fa', 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
    : null;

  // محاسبه قیمت برای نمایش
  const displayPrice = discount_percentage
    ? total_price_discount * counter
    : total_price * counter;

  return (
    <>
      {/* === Small-Screen */}
      <div className="border-t text-cs08 font-bold text-zinc-800 lg:hidden">
        <div className="grid grid-cols-[2fr_1fr] gap-3 p-5">
          {canBook && is_fixed_discount_one_time && (
            <div className="flex-center col-span-2 h-11 gap-1 rounded-lg bg-zinc-100">
              <button className="group relative ml-1 rounded-full">
                <InfoCircle size={16} color="#666" />
                <span className="invisible absolute -top-14 right-0 w-60 rounded-lg bg-cs-dark-blue px-3 py-2 text-right text-cs75/5 font-medium text-zinc-100 opacity-0 transition-all ease-in-out group-hover:visible group-hover:-top-20 group-hover:opacity-100">
                  این مبلغ در مرحله پرداخت از مجموع قیمت فاکتور شما کسر میگردد
                </span>
              </button>
              <span>{numberSeparation(discount_amount)}</span>
              <span>تومن تخفیف هنگام خرید</span>
            </div>
          )}

          {canBook && discount_percentage && !discount_date && (
            <div className="flex-center col-span-2 h-11 gap-1 rounded-lg bg-cs-red/10 text-cs-red">
              <span className="-ml-0.5">%</span>
              <span className="font-extrabold">
                {discount_percentage.toFixed(0)}
              </span>
              <span>تخفیف خرید</span>
            </div>
          )}

          {canBook && discount_percentage && discount_date && (
            <div className="col-span-2 grid grid-cols-[1fr_3fr] gap-3">
              <div className="flex-center h-11 gap-1 rounded-lg bg-cs-red/10 text-cs-red">
                <span className="-ml-0.5">%</span>
                <span className="font-extrabold">
                  {discount_percentage.toFixed(0)}
                </span>
              </div>
              {formattedDeadline && <DeadlineTimer date={formattedDeadline} />}
            </div>
          )}

          <PriceCalendar
            info={{
              capacity,
              roomName: name,
              numberOfNights: night_count,
              priceCalendar: price_calendar,
              totalPrice: total_price_discount,
            }}
          />

          <div className="flex-center h-11 gap-1 rounded-lg bg-zinc-100">
            <span>{night_count}</span>
            <span>شب</span>
          </div>

          <div className="col-span-2 lg:hidden">
            <RoomNumber
              counter={counter}
              handleChangeCounter={handleChangeCounter}
              disabled={{
                increase: counter >= MAX || !canBook,
                decrease: counter <= MIN || !canBook,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-[max-content_1fr] items-center gap-4 rounded-t-[10%] border-t bg-zinc-100/50 p-5 text-cs85 font-extrabold">
          {canBook ? (
            <>
              <span>{discount_percentage ? 'قیمت نهایی :' : 'قیمت کل :'}</span>
              <div className="flex items-center justify-end gap-1">
                <span>{numberSeparation(displayPrice)}</span>
                <span>تومان</span>
              </div>
            </>
          ) : (
            <div className="col-span-2 text-center font-bold text-red-500">
              ظرفیت تکمیل است
            </div>
          )}

          {children}
        </div>
      </div>

      {/* === Large-Screen */}
      <div className="hidden flex-col justify-center gap-4 p-5 text-cs08 font-bold text-zinc-800 lg:flex">
        <div className="flex-between items-center text-cs85 font-extrabold">
          {canBook ? (
            <>
              <span>{discount_percentage ? 'قیمت نهایی :' : 'قیمت کل :'}</span>
              <div className="flex-center gap-1">
                <span className="text-cs09">{numberSeparation(displayPrice)}</span>
                <span>تومان</span>
              </div>
            </>
          ) : (
            <div className="w-full text-center font-bold text-red-500">
              ظرفیت تکمیل است
            </div>
          )}
        </div>

        <div className="mt-1 grid h-10 grid-cols-[2fr_1fr] gap-3">
          <PriceCalendar
            info={{
              capacity,
              roomName: name,
              numberOfNights: night_count,
              priceCalendar: price_calendar,
              totalPrice: total_price_discount,
            }}
          />

          <div className="flex-center gap-1 rounded-lg bg-zinc-100">
            <span>{night_count}</span>
            <span>شب</span>
          </div>
        </div>

        <div className="flex gap-3">
          {canBook && discount_percentage && (
            <div className="flex-center group relative w-12 gap-1 rounded-lg bg-cs-red/10 text-cs08 text-cs-red">
              <span className="-ml-0.5">%</span>
              <span className="font-extrabold">
                {discount_percentage.toFixed(0)}
              </span>

              <div className="pointer-events-none absolute -top-full left-0 z-20 opacity-0 transition-all duration-300 ease-in-out group-hover:-top-[calc(100%+0.6rem)] group-hover:opacity-100">
                <div className="flex-center h-10 w-max gap-1 rounded-lg bg-red-100 px-4 text-cs07 text-cs-red">
                  <span>به ارزش قیمت : </span>
                  <span>{numberSeparation(discount_amount)}</span>
                  <span>تومان</span>
                </div>
                <div className="absolute left-4 h-0 w-0 rounded-[0.2rem] border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-100"></div>
              </div>
            </div>
          )}

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}