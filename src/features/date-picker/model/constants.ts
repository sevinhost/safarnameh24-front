const customWeekDays = {
  short: {
    persian: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    gregorian: ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
  },

  full: {
    persian: [
      'شنبه',
      'یکشنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنجشنبه',
      'جمعه',
    ],
    gregorian: [
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ],
  },
};

// Single source of truth for URL search parameter keys
export const HOTEL_QUERY_KEYS = {
  START_DATE: 'start-date',
  END_DATE: 'end-date',
  CITY: 'city',
  PROVINCE: 'province',
  PASSENGERS: 'passengers',
} as const;

export type HotelQueryKey =
  (typeof HOTEL_QUERY_KEYS)[keyof typeof HOTEL_QUERY_KEYS];

// ------------------------------

export { customWeekDays };
