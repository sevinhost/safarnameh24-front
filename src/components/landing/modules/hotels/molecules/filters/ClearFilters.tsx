import {
  useDatePickerContext,
  usePassengersContext,
  useHotelOrCityContext,
} from '@/context';

import { Trash } from 'iconsax-react';
import { useRouter } from 'next/navigation';

import { parseAsInteger, useQueryState } from 'nuqs';
import { DateObject } from 'react-multi-date-picker';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';

type Rooms = { adults: number; children: number }[];

const dateInfo = {
  locale: persianLanguage,
  calendar: persianCalendar,
};

// ------------------------------

export function ClearFilters() {
  const router = useRouter();
  const [page] = useQueryState('page', parseAsInteger);

  const { confirmedValue: dates } = useDatePickerContext();
  const { confirmedValue: hotelOrCity } = useHotelOrCityContext();
  const { rooms, confirmedPassengers: passengers } = usePassengersContext();

  function encodeRooms(rooms: Rooms) {
    return rooms.map((r) => `${r.adults},${r.children}`).join('-');
  }

  function handleClearFilters() {
    const startDate =
      dates?.[0]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') || new DateObject(dateInfo).format('YYYY-MM-DD');

    const endDate =
      dates?.[1]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') ||
      new DateObject(dateInfo).add(1, 'days').format('YYYY-MM-DD');

    router.replace(
      `/hotel?start-date=${startDate}&end-date=${endDate}${hotelOrCity.city ? `&city=${hotelOrCity.city}` : ''}${hotelOrCity.province ? `&province=${hotelOrCity.province}` : ''}${!passengers.rooms ? '' : `&passengers=${encodeRooms(rooms)}`}${page ? `&page=${page}` : ''}`,
      {
        scroll: true,
      },
    );
  }

  return (
    <button
      onClick={handleClearFilters}
      className="h-10 bg-cs-red/10 text-cs-red text-cs75 font-bold px-3.5 flex-center gap-1.5 rounded-lg lg:h-9"
    >
      <span>حذف فیلترها</span>
      <Trash size={18} color="currentColor" className="text-cs-red" />
    </button>
  );
}
