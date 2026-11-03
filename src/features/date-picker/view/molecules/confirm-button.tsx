import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import { useDatePicker } from '../../model/date-picker-context';

type Props = {
  className?: string;
};

// ------------------------------

export default function ConfirmButton(props: Props) {
  const { className } = props;
  const { draftDates, confirmDraft, onOpenChange } = useDatePicker();

  const isCompleted = draftDates.length === 2;

  return (
    <Button
      type="button"
      disabled={!isCompleted}
      className={cn('sm:font-semibold', className)}

      onClick={() => {
        confirmDraft();
        onOpenChange(false);
      }}
    >
      تایید و ادامه
    </Button>
  );
}
