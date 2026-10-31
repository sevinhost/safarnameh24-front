'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { cn } from 'cn';
import { Calendar } from '@/features/calendar/view/organisms/calendar';
import { DateRange } from '@/features/calendar/model/use-calendar';
import { DestinationSearchWrapper } from '@/features/destination-search/view/organisms/destination-search-wrapper';
import DestinationSearchDialog from '@/features/destination-search/view/organisms/destination-search-dialog';
import DestinationSearchTrigger from '@/features/destination-search/view/molecules/destination-search-trigger';
import {
  Destination,
  DestinationState,
} from '@/features/destination-search/model/types';
import DestinationSearch from '@/features/destination-search/view/organisms/destination-search';

// ------------------------------

export default function HeroSearch() {
  const [dates, setDates] = useState<DateRange>([null, null]);
  const [destination, setDestination] = useState<DestinationState | null>(null);

  const [destinationOpen, setDestinationOpen] = useState(false);
  const handleOpenDestinationSearch = () => setDestinationOpen(true);

  // console.log('dates', dates);
  // console.log('destination', destination);

  return (
    <div
      className={cn(
        'relative z-10 grid w-full gap-6 px-4 py-8 sm:rounded-4xl sm:p-8',
        'bg-sidebar mx-auto shadow-xl/5',
        'sm:-mt-28 sm:max-lg:max-w-10/12 lg:mx-auto lg:-mt-20 lg:max-w-[95%] lg:grid-cols-[1fr_1.4fr_auto] lg:items-end lg:gap-4 xl:max-w-10/12 xl:rounded-[1.5rem]',
      )}
    >
      {/* <DestinationSearchTrigger
        destination={destination}
        handleOpenDestinationSearch={handleOpenDestinationSearch}
      />

      <DestinationSearchWrapper
        value={destination}
        open={destinationOpen}
        onOpenChange={setDestinationOpen}
        onValueChange={handleOpenDestinationSearch}
      /> */}

      <DestinationSearch
        open={destinationOpen}
        onOpenChange={setDestinationOpen}

        destination={destination}
        onDestinationChange={(destination) => setDestination(destination)}
      />

      <Calendar initialRange={dates} onChange={(dates) => setDates(dates)} />

      <Button className={'h-12 lg:w-40'}>
        <span className="font-semibold">جستجو</span>
      </Button>
    </div>
  );
}
