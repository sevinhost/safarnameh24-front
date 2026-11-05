'use client';

import { useHotelQuery } from '@/context';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

import { DDatePicker } from '../../shared/search/date-picker';
import NumberOfNights from '../../shared/search/NumberOfNights';
import Passengers from '../../shared/search/passengers/Passengers';
import CityOrHotel from '../../shared/search/city-hotel/CityOrHotel';

// ---------------------------

export function Setting() {
  const {
    queryState: { isPending },
  } = useHotelQuery();

  const [hasMounted, setHasMounted] = useState(false);

  // === Handle Mount-Step
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="hidden grid-cols-[1fr_9rem] items-end gap-20 text-cs75 font-bold text-zinc-800 lg:grid">
      <div className="grid grid-cols-[1.2fr_1.2fr_0.6fr_1fr] gap-4">
        {hasMounted ? (
          <>
            <CityOrHotel
              scrollBehavior
              sideOffset={15}
              scrollPosition={0}
              triggerType="else"
            />

            <DDatePicker
              scrollBehavior
              sideOffset={15}
              scrollPosition={0}
              triggerType="else"
            />

            <NumberOfNights type="else" />

            {/* <Passengers
              scrollBehavior
              sideOffset={15}
              scrollPosition={0}
              triggerType="else"
            /> */}
          </>
        ) : (
          <>
            {[1, 2, 3, 4].map((_) => (
              <div key={_} className="grid gap-2">
                <Skeleton className="h-6 w-1/2 rounded-md" />
                <Skeleton className="h-12 rounded-lg" />
              </div>
            ))}
          </>
        )}
      </div>

      <button className="flex-center h-12 rounded-lg bg-cs-dark-blue text-cs85 text-zinc-100">
        {isPending ? <div className="loader-dots" /> : <span>جستجو</span>}
      </button>
    </div>
  );
}
