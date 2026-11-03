import '../../style/calendar-custom.css';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import TodayButton from '../molecules/today-button';
import ClearButton from '../molecules/clear-button';

import { customWeekDays } from '../../model/constants';
import ConfirmButton from '../molecules/confirm-button';
import { CalendarRenderButton } from '../../model/types';
import ToggleCalendar from '../molecules/toggle-calendar';
import DialogCloseButton from '../molecules/dialog-close';
import CheckInOutBar from '../molecules/check-in-out-bar';

import CalendarTrigger from '../molecules/calendar-trigger';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useDatePicker } from '../../model/date-picker-context';
import CalendarNavButton from '../molecules/calendar-nav-button';

import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

// ------------------------------

export default function CalendarDialog() {
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
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <CalendarTrigger />
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className={'max-w-220! rounded-3xl p-7'}
      >
        <DialogHeader>
          <DialogTitle className={'hidden'}></DialogTitle>
          <DialogDescription className={'hidden'}></DialogDescription>

          <div className="flex gap-3">
            <ToggleCalendar />
            <TodayButton />

            <DialogCloseButton className="mr-auto" />
          </div>
        </DialogHeader>

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
          numberOfMonths={2}
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

        <div className="flex items-center gap-3">
          <ConfirmButton className="px-8" />
          <ClearButton />

          <CheckInOutBar />
        </div>
      </DialogContent>
    </Dialog>
  );
}
