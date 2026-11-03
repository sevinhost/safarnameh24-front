import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useDatePicker } from '../../model/date-picker-context';

type Props = {
  className?: string;
};

export default function TodayButton({ className = '' }: Props) {
  const { goToToday } = useDatePicker();

  return (
    <Button type="button" variant="secondary" onClick={goToToday}>
      <RefreshCw className="size-4" />
      <span>برو به امروز</span>
    </Button>
  );
}
