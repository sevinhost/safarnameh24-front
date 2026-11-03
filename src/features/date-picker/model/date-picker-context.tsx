'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
  useRef,
  RefObject,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { HOTEL_QUERY_KEYS } from '../model/constants';
import {
  parseUrlDateToCalendar,
  formatToGregorianUrlString,
} from '../model/helpers';
import { useCalendar, DateRange } from '../model/use-calendar';
import { CalendarRef, DateObject } from 'react-multi-date-picker';

// ------------------------------

type CalendarHookReturns = ReturnType<typeof useCalendar>;

interface DatePickerContextType extends CalendarHookReturns {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onOpenChange: (open: boolean) => void;
  calendarRef: RefObject<CalendarRef | null>;
  goToToday: () => void;

  // Standardized Gregorian strings ready for URL insertion whenever needed
  gregorianRange: {
    startDate: string | null;
    endDate: string | null;
  };
}

const DatePickerContext = createContext<DatePickerContextType | undefined>(
  undefined,
);

interface ProviderProps {
  children: ReactNode;
  // Optional callback to notify parent components of committed range changes
  onDatesChange?: (dates: DateRange) => void;
}

export function DatePickerProvider({ children, onDatesChange }: ProviderProps) {
  const searchParams = useSearchParams();

  // Unified modal/drawer visibility state
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<CalendarRef>(null);

  // 1. Read URL params using the single source of truth constant
  const rawStartDate = searchParams.get(HOTEL_QUERY_KEYS.START_DATE);
  const rawEndDate = searchParams.get(HOTEL_QUERY_KEYS.END_DATE);

  // 2. Delegate calendar core logic to hook (instantiated once)
  const calendar = useCalendar(undefined, onDatesChange);
  const { currentCalendar, currentLocale, resetDraft, selectedDates } =
    calendar;

  console.log('calendar', calendar);

  const goToToday = useCallback(() => {
    if (calendarRef.current) {
      const today = new DateObject({
        calendar: currentCalendar,
        locale: currentLocale,
      });

      calendarRef.current.set('date', today);
    }
  }, [currentCalendar, currentLocale]);

  // 3. Derive and translate URL dates into active calendar representation
  const urlRange = useMemo<DateRange>(() => {
    const start = parseUrlDateToCalendar(
      rawStartDate,
      currentCalendar,
      currentLocale,
    );
    const end = parseUrlDateToCalendar(
      rawEndDate,
      currentCalendar,
      currentLocale,
    );
    return [start, end];
  }, [rawStartDate, rawEndDate, currentCalendar, currentLocale]);

  // Keep internal calendar in sync whenever the URL changes externally
  useMemo(() => {
    // If dates exist in URL, apply them to selectedDates
    if (urlRange[0] || urlRange[1]) {
      calendar.handleSelectDates(urlRange.filter(Boolean) as any, true);
    }
  }, [urlRange]);

  // Handle open/close state transitions safely
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        // resetDraft();
      }
      setIsOpen(open);
    },
    [resetDraft],
  );

  // 4. Expose clean Gregorian YYYY-MM-DD values for whoever performs search submission
  const gregorianRange = useMemo(
    () => ({
      startDate: formatToGregorianUrlString(selectedDates[0] || null),
      endDate: formatToGregorianUrlString(selectedDates[1] || null),
    }),
    [selectedDates],
  );

  const contextValue = useMemo<DatePickerContextType>(
    () => ({
      ...calendar,
      calendarRef,
      goToToday,

      isOpen,
      setIsOpen,
      onOpenChange,
      gregorianRange,
    }),
    [calendar, isOpen, onOpenChange, gregorianRange],
  );

  return (
    <DatePickerContext.Provider value={contextValue}>
      {children}
    </DatePickerContext.Provider>
  );
}

// ------------------------------

export const useDatePicker = () => {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error('useDatePicker must be used within a DatePickerProvider');
  }
  return context;
};
