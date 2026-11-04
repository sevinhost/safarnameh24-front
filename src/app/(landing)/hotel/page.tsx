import {
  Filters,
  Setting,
  HotelList,
  AmazingHotels,
  SuggestedHotels,
} from '@/components/landing/modules/best-hotels';

import { Suspense } from 'react';
import StickyArea from '@/components/landing/shared/StickyArea';

// -------------------------------------

export default function BestHotels() {
  return (
    <>
      <div className="mt-2">
        <StickyArea
          childrenStatus={{ static: true, fixed: true }}
          searchbarStatus={{ static: true, fixed: true }}
        >
          <Filters />
        </StickyArea>
      </div>

      <div className="mt-4 lg:mt-12">
        <Setting />

        <div className="grid gap-10 lg:mt-10 lg:grid-cols-[20rem_1fr]">
          <div className="hidden lg:block">
            <Filters />
          </div>

          <div className="space-y-12 lg:space-y-16">
            <Suspense>
              <SuggestedHotels />
              <AmazingHotels />
              <HotelList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
