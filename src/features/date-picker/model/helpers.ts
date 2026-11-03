import DateObject from 'react-date-object';

import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { CalendarType } from './types';

// محاسبه تعداد شب‌های اقامت
export const calculateNights = (
  start: DateObject | null,
  end: DateObject | null,
): number => {
  if (!start || !end) return 0;
  const startMs = start.toUnix() * 1000;
  const endMs = end.toUnix() * 1000;
  const diffTime = Math.abs(endMs - startMs);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// تشخیص جمعه یا یکشنبه بر اساس تقویم
export const isWeekendDay = (
  date: DateObject,
  calendarType: 'persian' | 'gregorian',
): boolean => {
  if (calendarType === 'persian') {
    // در شمسی، جمعه تعطیل است (index = 6 در react-date-object)
    return date.weekDay.index === 6;
  } else {
    // در میلادی، یکشنبه تعطیل هفتگی است
    return date.weekDay.index === 0;
  }
};

/**
 * Parses a standard Gregorian YYYY-MM-DD URL string
 * and translates it into the target calendar & locale.
 */
export const parseUrlDateToCalendar = (
  dateString: string | null,
  targetCalendar: any,
  targetLocale: any,
): DateObject | null => {
  if (!dateString) return null;

  try {
    // 1. Parse standard Gregorian date from URL string
    const gDate = new DateObject({
      date: dateString,
      format: 'YYYY-MM-DD',
      calendar: gregorian,
      locale: gregorian_en,
    });

    // 2. Convert and return in the active calendar's format
    return gDate.convert(targetCalendar, targetLocale);
  } catch {
    return null;
  }
};

/**
 * Formats any DateObject back to standard Gregorian YYYY-MM-DD for URL serialization.
 */
export const formatToGregorianUrlString = (
  date: DateObject | null,
): string | null => {
  if (!date) return null;
  const clone = new DateObject(date);
  return clone.convert(gregorian, gregorian_en).format('YYYY-MM-DD');
};

// ---------

export const formatDate = (
  date: DateObject | null,
  calendarType: CalendarType,
) => {
  if (!date) return null;
  const isPersian = calendarType === 'persian';

  // ۱. تقویم و لوکال مقصد بر اساس سوییچ فعال
  const targetCalendar = isPersian ? persian : gregorian;
  const targetLocale = isPersian ? persian_fa : gregorian_en;

  // ۲. کپی کردن تاریخ و تبدیل آن به تقویم مقصد
  const convertedDate = new DateObject(date).convert(
    targetCalendar,
    targetLocale,
  );

  // ۳. فرمت خروجی
  if (isPersian) {
    return convertedDate.format('dddd DD MMMM'); // مثلاً: «چهارشنبه ۱۴ آبان»
  }

  return convertedDate.format('ddd, DD MMM'); // مثلاً: «Wed, 04 Nov»
};
