import { parseAsStringEnum } from 'nuqs';
import { Hotel } from '@/types/landing/hotels';

import { DateObject } from 'react-multi-date-picker';
import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';

// ------------------------------

type ApiResponse = {
  data: {
    count: number;
    results: Hotel[];
    total_pages: number;
  };
};

type Options = {
  page: string;
  star: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  endDate?: string;
  province: string;
  startDate?: string;
  passengers: string;
  residenceType: string;
  roomFacilities: string;
  hotelFacilities: string;
};

type Rooms = { adults: number; children: number }[];

// ------------------------------

const options: Options = {
  star: '',
  page: '',
  city: '',
  endDate: '',
  minPrice: '',
  maxPrice: '',
  province: '',
  startDate: '',
  passengers: '',
  residenceType: '',
  roomFacilities: '',
  hotelFacilities: '',
};

const dateInfo = {
  locale: persianLanguage,
  calendar: persianCalendar,
};

const buildQueryString = (options: Options) => {
  return `start-date=${options.startDate}&end-date=${options.endDate}&passengers=${options.passengers}&city=${options.city}&star=${options.star}&min-price=${options.minPrice}&max-price=${options.maxPrice}&residence-type=${options.residenceType}&hotel-facilities=${options.hotelFacilities}&room-facilities=${options.roomFacilities}&page=${options.page}`;
};

const parseAsShowToggle = parseAsStringEnum(['show', 'hide']).withDefault(
  'hide',
);

function encodeRooms(rooms: Rooms) {
  return rooms.map((r) => `${r.adults},${r.children}`).join('-');
}

function getDates(dates: DateObject[] | undefined) {
  const startDate = dates?.[0]
    ?.convert(dateInfo.calendar, dateInfo.locale)
    .format('YYYY-MM-DD');

  const endDate = dates?.[1]
    ?.convert(dateInfo.calendar, dateInfo.locale)
    .format('YYYY-MM-DD');

  return { startDate, endDate };
}

// ------------------------------

export type { ApiResponse, Rooms };
export {
  options,
  dateInfo,
  getDates,
  encodeRooms,
  buildQueryString,
  parseAsShowToggle,
};
