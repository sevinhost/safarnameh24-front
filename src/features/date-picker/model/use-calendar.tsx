import { useState, useCallback, useMemo, useEffect } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { CalendarType } from './types';
import { calculateNights } from './helpers';

export type DateRange = [DateObject | null, DateObject | null];

// ------------------------------

export const useCalendar = (
  initialRange?: DateRange,
  onChange?: (dates: DateRange) => void,
) => {
  const [calendarType, setCalendarType] = useState<CalendarType>('persian');

  // Committed & confirmed dates
  const [selectedDates, setSelectedDates] = useState<DateObject[]>(() =>
    initialRange ? (initialRange.filter(Boolean) as DateObject[]) : [],
  );

  // Transient / draft dates before confirmation
  const [draftDates, setDraftDates] = useState<DateObject[]>(() =>
    initialRange ? (initialRange.filter(Boolean) as DateObject[]) : [],
  );

  // Sync internal states when initialRange changes from outside (e.g., URL / popstate)
  useEffect(() => {
    const validDates = initialRange
      ? (initialRange.filter(Boolean) as DateObject[])
      : [];
    setSelectedDates(validDates);
    setDraftDates(validDates);
  }, [initialRange]);

  // Switch calendar between Jalali and Gregorian
  const toggleCalendarType = useCallback(() => {
    setCalendarType((prev) => (prev === 'persian' ? 'gregorian' : 'persian'));
  }, []);

  // Compute stay duration in nights for preview
  const draftNights = useMemo(() => {
    if (draftDates.length < 2) return 0;
    return calculateNights(draftDates[0], draftDates[1]);
  }, [draftDates]);

  // Persist dates and notify parent
  const commitDates = useCallback(
    (datesToCommit: DateObject[]) => {
      setSelectedDates(datesToCommit);

      if (!onChange) return;

      const startDate = datesToCommit[0] || null;
      const endDate = datesToCommit[1] || null;

      onChange([startDate, endDate]);
    },
    [onChange],
  );

  // Handle day selections in calendar
  const handleSelectDates = useCallback(
    (dates: DateObject[], autoCommit = false) => {
      setDraftDates(dates);

      if (autoCommit && dates.length === 2) {
        commitDates(dates);
      }
    },
    [commitDates],
  );

  // Manually confirm draft state (e.g., mobile drawer button)
  const confirmDraft = useCallback(() => {
    commitDates(draftDates);
  }, [commitDates, draftDates]);

  // Revert draft changes back to last committed state
  const resetDraft = useCallback(() => {
    setDraftDates(selectedDates);
  }, [selectedDates]);

  // Clear all dates
  const handleClear = useCallback(() => {
    setDraftDates([]);
    setSelectedDates([]);
    if (onChange) {
      onChange([null, null]);
    }
  }, [onChange]);

  return {
    calendarType,
    toggleCalendarType,
    // States
    selectedDates,
    draftDates,
    draftNights,
    // Actions
    handleSelectDates,
    confirmDraft,
    resetDraft,
    handleClear,
    // Localization
    currentCalendar: calendarType === 'persian' ? persian : gregorian,
    currentLocale: calendarType === 'persian' ? persian_fa : gregorian_en,
  };
};
