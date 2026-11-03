import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarRenderButton } from '../../model/types';

type Props = CalendarRenderButton;

// ------------------------------

export default function CalendarNavButton(props: Props) {
  const { direction, handleClick } = props;

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={'secondary'}
      className={'size-9 rounded-lg'}
    >
      {direction === 'right' ? <ChevronLeft /> : <ChevronRight />}
    </Button>
  );
}
