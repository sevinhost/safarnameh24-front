import '../../style/calendar-custom.css';

import {
  Sheet,
  SheetClose,
  SheetTitle,
  SheetFooter,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';

import { ArrowRight } from 'lucide-react';

import TodayButton from '../molecules/today-button';
import ClearButton from '../molecules/clear-button';

import { customWeekDays } from '../../model/constants';
import ConfirmButton from '../molecules/confirm-button';
import { CalendarRenderButton } from '../../model/types';
import ToggleCalendar from '../molecules/toggle-calendar';
import CheckInOutBar2 from '../molecules/check-in-out-bar';
import CalendarTrigger from '../molecules/calendar-trigger';

import { Calendar, DateObject } from 'react-multi-date-picker';
import { useDatePicker } from '../../model/date-picker-context';
import CalendarNavButton from '../molecules/calendar-nav-button';

import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

// ------------------------------

export default function CalendarSheet() {
  const {
    isOpen,
    draftDates,
    resetDraft,
    calendarRef,
    onOpenChange,
    calendarType,
    currentLocale,
    currentCalendar,
    handleSelectDates,
  } = useDatePicker();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetDraft();
    }
    onOpenChange(isOpen);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger>
        <CalendarTrigger />
      </SheetTrigger>

      <SheetContent className={'w-full! gap-0'} showCloseButton={false}>
        <SheetHeader className="flex-row gap-2.5 border-b px-4 py-6">
          <SheetClose className={'flex'}>
            <ArrowRight className="size-5" />
          </SheetClose>

          <SheetTitle>
            <span>انتخاب تاریخ اقامت</span>
          </SheetTitle>

          <SheetDescription className="hidden" />
        </SheetHeader>

        <div className="space-y-8 px-4 py-5">
          <div className="flex justify-between">
            <ToggleCalendar />
            <TodayButton />
          </div>

          <CheckInOutBar2 />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Calendar
            renderButton={(
              direction: CalendarRenderButton['direction'],
              handleClick: CalendarRenderButton['handleClick'],
            ) => (
              <CalendarNavButton
                direction={direction}
                handleClick={handleClick}
              />
            )}

            range
            rangeHover
            ref={calendarRef}
            disableYearPicker
            numberOfMonths={1}
            value={draftDates}
            disableMonthPicker
            monthYearSeparator=" "
            locale={currentLocale}
            calendar={currentCalendar}

            weekDays={customWeekDays.short[calendarType]}
            plugins={[weekends(calendarType ? [6] : [0])]}
            onChange={(dates) => handleSelectDates(dates, false)}
            minDate={new DateObject({ calendar: currentCalendar })}
            className={`calendar-custom ${calendarType === 'persian' ? 'font-primary' : 'font-secondary'}`}
          />
        </div>

        <SheetFooter className="p-0">
          <div className="grid grid-cols-[2fr_1fr] gap-3 border-t p-5">
            <ConfirmButton />
            <ClearButton />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
