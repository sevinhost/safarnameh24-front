import {
  useDatePickerContext,
  usePassengersContext,
  useHotelOrCityContext,
} from '@/context';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { dateInfo } from '@/helpers/date-picker';

import NumberOfNights from '@/components/landing/shared/search/NumberOfNights';
import Passengers from '@/components/landing/shared/search/passengers/Passengers';
import CityOrHotel from '@/components/landing/shared/search/city-hotel/CityOrHotel';
import { DDatePicker } from '@/components/landing/shared/search/date-picker/DDatePicker';

type Rooms = { adults: number; children: number }[];

// -----------------------------------

export default function SearchAndFilter() {
  const router = useRouter();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { confirmedValue: dates } = useDatePickerContext();
  const { confirmedValue: cityOrHotel } = useHotelOrCityContext();
  // const { rooms, confirmedPassengers: passengers } = usePassengersContext();

  function handleClickSearch() {
    const stopCondition = !dates?.[0] || !dates?.[1] || !cityOrHotel.city;
    // !passengers.rooms ||
    // !passengers.passengers;

    if (stopCondition) {
      setError(true);
      return;
    }

    setLoading(true);

    function encodeRooms(rooms: Rooms) {
      return rooms.map((r) => `${r.adults},${r.children}`).join('-');
    }

    const startDate = dates[0]
      .convert(dateInfo.calendar, dateInfo.locale)
      .format('YYYY-MM-DD');

    const endDate = dates[1]
      .convert(dateInfo.calendar, dateInfo.locale)
      .format('YYYY-MM-DD');

    // const commonParams = `start-date=${startDate}&end-date=${endDate}&passengers=${encodeRooms(rooms)}`;
    const commonParams = `start-date=${startDate}&end-date=${endDate}`;

    if (cityOrHotel.hotel) {
      router.push(`/hotel/${cityOrHotel.hotelSlug}?${commonParams}`, {
        scroll: true,
      });
    }
    // ===
    else {
      router.push(
        `/hotel?${commonParams}&city=${cityOrHotel.city}&province=${cityOrHotel.province}`,
        { scroll: true },
      );
    }
  }

  // === Setting Error-State
  useEffect(() => {
    if (
      dates?.[0] &&
      dates?.[1] &&
      cityOrHotel.city
      // passengers.rooms &&
      // passengers.passengers
    )
      setError(false);
  }, [cityOrHotel, dates]);

  return (
    <div className="absolute inset-x-6 bottom-6 z-10 flex h-32 items-center gap-6 rounded-2xl bg-[--clr-main-light] px-12 xl:inset-x-36 xl:bottom-10 xl:gap-8">
      <CityOrHotel
        scrollBehavior
        sideOffset={50}
        alignOffset={-30}
        triggerType="home"
        scrollPosition={300}
      />

      <span className="h-6 border-r border-zinc-300"></span>

      <DDatePicker
        scrollBehavior
        sideOffset={50}
        alignOffset={-30}
        triggerType="home"
        scrollPosition={300}
      />

      <span className="h-6 border-r border-zinc-300"></span>

      <NumberOfNights type="home" />

      {/* <span className="h-6 border-r"></span> */}

      {/* <Passengers
        scrollBehavior
        sideOffset={50}
        alignOffset={-30}
        triggerType="home"
        scrollPosition={300}
      /> */}

      <button
        className="flex-center mr-auto h-14 w-36 rounded-cs-10 bg-cs-red text-cs85 font-bold text-zinc-100"
        onClick={handleClickSearch}
      >
        {isLoading ? <div className="loader-dots" /> : <span>جستجو</span>}
      </button>

      <div
        className={`absolute right-0 flex h-8 items-end rounded-t-xl bg-[--clr-main-light] px-8 transition-all duration-200 ease-in-out ${isError ? '-top-4' : 'top-0'}`}
      >
        <span
          className={`text-cs75 font-semibold text-cs-red transition-all duration-200 ease-in-out ${isError ? 'opacity-100' : 'opacity-0'}`}
        >
          * وارد کردن فیلتر های جسجتو الزامی میباشد
        </span>
      </div>
    </div>
  );
}
