import moment from 'jalali-moment';
import { InfoCircle } from 'iconsax-react';

import { numberSeparation } from '@/utils';
import { Room as Room } from '@/types/landing';
import { SecondaryInfo } from './atoms/SecondaryInfo';

import ReserveButton from './atoms/ReserveButton';
import { DeadlineTimer } from './atoms/DeadlineTimer';
import NormalPrimaryInfo from './atoms/NormalPrimaryInfo';
import { useState } from 'react';
import RoomNumber from './atoms/RoomNumber';

type Props = {
  room: Room & {
    can_book?: boolean;
    is_available?: boolean;
    availability_status?: 'open' | 'close';
  };
  checkAuth: () => boolean;
};

export const MIN = 1;
export const MAX = 10;

// -------------------------------------

export default function NormalRoom(props: Props) {
  const {
    room: {
      hotel,
      id,
      name,
      price,
      capacity,
      room_number,
      descriptions,
      room_services,
      extra_capacity,
      customer_club_points,
      can_book,
      is_available,
    },
    checkAuth,
  } = props;

  // اگر فیلد از بک‌اند نیامده باشد، پیش‌فرض قابل رزرو است
  const canBook = can_book !== false && is_available !== false;

  const [counter, setCounter] = useState(1);

  const formattedDeadline = price?.discount_date
    ? moment.from(price.discount_date, 'fa', 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
    : null;

  function handleChangeCounter(type: 'inc' | 'dec') {
    if (!canBook) return;

    if (type === 'inc') {
      counter < MAX && setCounter((prev) => prev + 1);
    } else {
      counter > MIN && setCounter((prev) => prev - 1);
    }
  }

  return (
    <div className="grid overflow-hidden rounded-xl border bg-white shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.03)] lg:grid-cols-[1fr_17rem] lg:rounded-2xl">
      <div className="relative gap-3 overflow-hidden p-3 text-[clamp(0.8rem,3vw,0.85rem)] font-semibold text-zinc-800 lg:flex lg:border-l lg:p-4">
        <div className="p-2 lg:mt-0 lg:flex lg:flex-1 lg:flex-col">
          <div className="text-[clamp(0.85rem,3vw,0.9rem)] font-extrabold">
            {name}
          </div>

          <div className="mt-2 text-cs08 text-zinc-500 lg:line-clamp-1">
            {descriptions}
          </div>

          <div className="mt-4 flex items-end gap-4 lg:mt-auto">
            <SecondaryInfo
              info={{
                capacity,
                services: room_services,
                extraCapacity: extra_capacity,
                customerClub: customer_club_points,
              }}
            />

            <div className="mr-auto hidden lg:block">
              <RoomNumber
                counter={counter}
                handleChangeCounter={handleChangeCounter}
                disabled={{
                  increase:
                    !canBook ||
                    (room_number < MAX ? counter >= room_number : counter >= MAX),
                  decrease: !canBook || counter <= MIN,
                }}
              />
            </div>
          </div>

          {canBook && (price.is_fixed_discount_one_time || price.discount_date) ? (
            <div className="absolute left-5 top-5 hidden h-10 xl:flex">
              {price.is_fixed_discount_one_time && (
                <div className="text-zin-800 flex-center gap-1 rounded-lg bg-zinc-100 px-4 text-cs08 font-bold">
                  <button className="group relative ml-1 rounded-full">
                    <InfoCircle size={16} color="#666" />
                    <span className="invisible absolute -right-4 top-8 w-60 rounded-cs-10 bg-cs-dark-blue px-3 py-2 text-right text-cs75/5 font-medium text-zinc-100 opacity-0 transition-all ease-in-out group-hover:visible group-hover:top-9 group-hover:opacity-100 lg:w-52">
                      این مبلغ در مرحله پرداخت از مجموع قیمت فاکتور شما کسر
                      میگردد
                    </span>
                  </button>
                  <span>{numberSeparation(price.discount_amount)}</span>
                  <span>تومن تخفیف هنگام خرید</span>
                </div>
              )}

              {price.discount_percentage && formattedDeadline && (
                <div className="grid w-48">
                  <DeadlineTimer date={formattedDeadline} />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <NormalPrimaryInfo
        room={props.room}
        counter={counter}
        handleChangeCounter={handleChangeCounter}
        canBook={canBook}
      >
        <ReserveButton
          roomId={id}
          hotelId={hotel}
          roomNumber={counter}
          canBook={canBook}
          checkAuth={checkAuth}
        />
      </NormalPrimaryInfo>
    </div>
  );
}