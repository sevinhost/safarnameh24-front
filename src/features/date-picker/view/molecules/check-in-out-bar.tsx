import { Moon } from 'lucide-react';
import { formatDate } from '../../model/helpers';

import { useDatePicker } from '../../model/date-picker-context';

// ------------------------------

export default function CheckInOutBar() {
  const { draftDates, draftNights, calendarType } = useDatePicker();

  const startDate = draftDates[0] || null;
  const endDate = draftDates[1] || null;

  return (
    <div className="bg-sidebar md:mr-auto">
      {/* Small-Screen */}
      <div className="relative grid h-14 grid-cols-2 divide-x rounded-xl border md:hidden">
        <div className="flex-center relative items-center gap-2.5 px-4">
          <span className="bg-sidebar text-muted-foreground text-08 absolute -top-2.5 right-1/2 z-10 translate-x-1/2 rounded px-1.5 font-semibold">
            تاریخ ورود
          </span>

          {startDate ? (
            <>
              <span className="text-foreground pt-0.5 text-sm font-bold">
                {formatDate(startDate, calendarType)}
              </span>
            </>
          ) : (
            <>
              <span className="text-muted-foreground text-09 pt-1 font-semibold">
                ------
              </span>
            </>
          )}
        </div>

        {draftNights > 0 && (
          <div className="bg-primary absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1">
            <Moon className="size-3 fill-amber-500 text-amber-500" />

            <span className="text-primary-foreground text-xs font-bold whitespace-nowrap">
              {draftNights} شب
            </span>
          </div>
        )}

        <div className="flex-center relative items-center gap-2.5 px-4">
          <span className="bg-sidebar text-muted-foreground text-08 absolute -top-2.5 right-1/2 z-10 translate-x-1/2 rounded px-1.5 font-semibold">
            تاریخ خروج
          </span>

          {endDate ? (
            <>
              <span className="text-foreground pt-0.5 text-sm font-bold">
                {formatDate(endDate, calendarType)}
              </span>
            </>
          ) : (
            <>
              <span className="text-muted-foreground text-09 pt-1 font-semibold">
                ------
              </span>
            </>
          )}
        </div>
      </div>

      {/* Large-Screen */}
      <div className="hidden items-center gap-2 text-sm md:flex">
        <span className="text-muted-foreground font-semibold">
          تاریخ ورود :
        </span>

        {startDate ? (
          <>
            <span className="text-foreground font-bold">
              {formatDate(startDate, calendarType)}
            </span>
          </>
        ) : (
          <>
            <span className="text-muted-foreground font-semibold">------</span>
          </>
        )}

        {draftNights > 0 && (
          <div className="bg-primary mx-2 flex items-center gap-1 rounded-full px-2 py-1">
            <Moon className="size-3 fill-amber-500 text-amber-500" />

            <span className="text-primary-foreground text-xs font-bold whitespace-nowrap">
              {draftNights} شب
            </span>
          </div>
        )}

        <span className="text-muted-foreground font-semibold">
          تاریخ خروج :
        </span>

        {endDate ? (
          <>
            <span className="text-foreground font-bold">
              {formatDate(endDate, calendarType)}
            </span>
          </>
        ) : (
          <>
            <span className="text-muted-foreground font-semibold">------</span>
          </>
        )}
      </div>
    </div>
  );
}
