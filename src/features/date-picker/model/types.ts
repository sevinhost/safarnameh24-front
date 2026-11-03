import DateObject from 'react-date-object';

// ------------------------------

type CalendarType = 'persian' | 'gregorian';

type DateRangeState = {
  startDate: DateObject | null;
  endDate: DateObject | null;
};

type HotelCalendarProps = {
  initialRange?: [DateObject | null, DateObject | null];
  onChange?: (range: {
    startDate: DateObject | null;
    endDate: DateObject | null;
    nights: number;
  }) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
};

type CalendarRenderButton = {
  handleClick: () => void;
  direction: 'right' | 'left';
};

// ------------------------------

export type {
  CalendarType,
  DateObject,
  DateRangeState,
  HotelCalendarProps,
  CalendarRenderButton,
};
