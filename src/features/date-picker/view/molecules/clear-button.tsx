import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import { useDatePicker } from '../../model/date-picker-context';

type Props = {
  className?: string;
};

// ------------------------------

export default function ClearButton(props: Props) {
  const { className } = props;
  const { draftDates, selectedDates, handleClear } = useDatePicker();

  return (
    <Button
      onClick={handleClear}
      variant={'destructive'}
      className={cn('', className)}
      disabled={draftDates.length < 2 || selectedDates.length < 0}
    >
      پاک کردن
    </Button>
  );
}
