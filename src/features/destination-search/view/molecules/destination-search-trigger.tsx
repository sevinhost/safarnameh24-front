import { MapPin } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DestinationState } from '../../model/types';
import { Button } from '@/components/ui/button';

type Props = {
  destination: DestinationState | null;
  handleOpenDestinationSearch: () => void;
};

// ------------------------------

export default function DestinationSearchTrigger(props: Props) {
  const { destination, handleOpenDestinationSearch } = props;

  return (
    <div className="flex h-14 flex-col gap-4">
      {/* <Label className="gap-1.5 px-1 text-sm/3 font-semibold">
        <MapPin className="size-4.5" />
        <span>انتخاب مقصد</span>
      </Label> */}

      <Input
        onClick={handleOpenDestinationSearch}
        placeholder="هتل یا شهر مقصد را انتخاب کنید"
        className="border-primary/15 bg-input/20 h-12"
      />

      {destination?.name && destination.name}
    </div>
  );
}
