import { CalendarRange, ChevronDown, Moon } from 'lucide-react';
import { useDatePicker } from '../../model/date-picker-context';

// ------------------------------

export default function CalendarTrigger() {
  const { selectedDates, draftNights } = useDatePicker();

  const isSelected = selectedDates?.length === 2;

  return (
    <div className="bg-sidebar relative grid h-14 grid-cols-2 divide-x rounded-xl border">
      <div className="flex-center relative items-center gap-2.5 px-4">
        {isSelected ? (
          <>
            <span className="bg-sidebar text-muted-foreground text-08 absolute -top-2.5 right-1/2 z-10 translate-x-1/2 rounded px-1.5 font-semibold">
              تاریخ ورود
            </span>

            <span className="text-foreground pt-0.5 text-sm font-bold">
              {selectedDates[0].format('dddd DD MMMM')}
            </span>
          </>
        ) : (
          <>
            <CalendarRange className="text-muted-foreground size-4.5" />
            <span className="text-muted-foreground text-09 font-semibold">
              تاریخ ورود
            </span>

            <ChevronDown className="text-muted-foreground mr-auto size-4" />
          </>
        )}
      </div>

      {draftNights > 0 && (
        <div className="bg-primary md absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1">
          <Moon className="size-3 fill-amber-500 text-amber-500" />

          <span className="text-primary-foreground text-xs font-bold whitespace-nowrap">
            {draftNights} شب
          </span>
        </div>
      )}

      <div className="flex-center relative items-center gap-2.5 px-4">
        {isSelected ? (
          <>
            <span className="bg-sidebar text-muted-foreground text-08 absolute -top-2.5 right-1/2 z-10 translate-x-1/2 rounded px-1.5 font-semibold">
              تاریخ خروج
            </span>

            <span className="text-foreground pt-0.5 text-sm font-bold">
              {selectedDates[1].format('dddd DD MMMM')}
            </span>
          </>
        ) : (
          <>
            <CalendarRange className="text-muted-foreground size-4.5" />
            <span className="text-muted-foreground text-09 font-semibold">
              تاریخ خروج
            </span>

            <ChevronDown className="text-muted-foreground mr-auto size-4" />
          </>
        )}
      </div>
    </div>
  );
}
