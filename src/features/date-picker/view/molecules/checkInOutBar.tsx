// features/calendar/ui/molecules/check-in-out-bar.tsx

import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { CalendarType } from '../../model/types';
import { Moon } from 'lucide-react';
import { useDatePicker } from '../../model/date-picker-context';
import { formatDate } from '../../model/helpers';

type Props = {
  className?: string;
};

export default function CheckInOutBar({ className = '' }: Props) {
  const { draftDates, calendarType, draftNights } = useDatePicker();

  const startDate = draftDates[0] || null;
  const endDate = draftDates[1] || null;

  const isSelectingCheckout = startDate && !endDate;

  return (
    <div
      className={`bg-secondary/80 relative grid h-15 grid-cols-2 rounded-xl border text-center transition-all divide-x-reverse md:flex md:h-auto md:items-center md:gap-4 md:border-none md:bg-transparent md:text-start ${className}`}
    >
      {/* باکس تاریخ ورود */}
      <div
        className={`flex flex-col items-center justify-center gap-1.5 rounded-s-xl transition-colors md:flex-row md:gap-2 md:rounded-none md:border-none ${
          !startDate ? 'border-2 md:border-none' : ''
        }`}
      >
        <div className="text-muted-foreground flex-center gap-0.5 text-xs font-medium md:text-sm">
          <span>تاریخ ورود</span>
          <span className="hidden md:block">:</span>
        </div>

        <span className="text-primary text-sm font-bold">
          {formatDate(startDate, calendarType) ?? 'انتخاب کنید'}
        </span>
      </div>

      {/* بج شب‌های اقامت */}
      {draftNights > 0 && (
        <div className="bg-primary absolute top-1.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1 md:static md:translate-x-0 md:px-2.5">
          <Moon className="size-3 fill-amber-500 text-amber-500" />

          <span className="text-primary-foreground text-xs font-bold whitespace-nowrap">
            {draftNights} شب
          </span>
        </div>
      )}

      {/* باکس تاریخ خروج */}
      <div
        className={`flex flex-col items-center justify-center gap-1.5 rounded-e-xl transition-colors md:flex-row md:gap-2 md:rounded-none md:border-none ${
          isSelectingCheckout ? 'border-2 md:border-none' : ''
        }`}
      >
        <div className="text-muted-foreground flex-center gap-0.5 text-xs font-medium md:text-sm">
          <span>تاریخ خروج</span>
          <span className="hidden md:block">:</span>
        </div>

        <span
          className={`text-sm font-bold ${
            endDate
              ? 'text-primary'
              : isSelectingCheckout
                ? 'text-primary animate-pulse'
                : 'text-muted-foreground'
          }`}
        >
          {formatDate(endDate, calendarType) ??
            (isSelectingCheckout ? 'انتخاب خروج ...' : '---')}
        </span>
      </div>
    </div>
  );
}
