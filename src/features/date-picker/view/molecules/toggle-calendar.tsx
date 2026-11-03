import { cn } from 'cn';

import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useDatePicker } from '../../model/date-picker-context';

type Props = {
  className?: string;
};

// ------------------------------

export default function ToggleCalendar(props: Props) {
  const { className } = props;
  const { calendarType, toggleCalendarType } = useDatePicker();

  return (
    <Button
      variant={'secondary'}
      onClick={toggleCalendarType}
      className={cn('px-5', className)}
    >
      <ArrowLeftRight className="size-4" />
      {calendarType === 'persian' ? 'تقویم میلادی' : 'تقویم شمسی'}
    </Button>
  );
}
