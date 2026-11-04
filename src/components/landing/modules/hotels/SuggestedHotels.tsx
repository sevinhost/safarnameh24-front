'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useQueryState, parseAsStringEnum } from 'nuqs';

import { Hotel } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { SuggestedHotel, TopBarConfig } from '../../shared';
import { axiosInstance } from '@/utils/axios';

const parseAsShowToggle = parseAsStringEnum(['show', 'hide']).withDefault(
  'hide',
);

type ApiResponse = { data: Hotel[] };

// ----------------------------

export function SuggestedHotels() {
  const [visibleCount, setVisibleCount] = useState(6);

  const [state] = useQueryState('suggested-hotels', parseAsShowToggle);
  const isActive = state === 'show';

  const { data, status } = useQuery<ApiResponse>({
    enabled: isActive,
    queryKey: ['suggested-hotels'],
    queryFn: () => axiosInstance('/hotel/hotels/suggested-hotels'),
  });

  const suggestedHotels = data?.data ?? [];
  if (!isActive) return null;

  return (
    <div>
      <TopBarConfig
        className="mb-3"
        title={{ type: 'single', text: 'هتل های پیشنهادی' }}
      />

      {status !== 'pending' && !suggestedHotels.length && (
        <div className="text-zinc-500 text-cs85 font-semibold">
          * هتلی برای نمایش وجود ندارد !
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {status === 'pending'
          ? Array(6)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-[23.5rem] rounded-xl" />
              ))
          : suggestedHotels.length > 0 &&
            suggestedHotels
              ?.slice(0, visibleCount)
              .map((hotel, index) => (
                <SuggestedHotel
                  key={index}
                  hotel={hotel}
                  bestType="suggested"
                />
              ))}
      </div>

      {visibleCount < suggestedHotels?.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 6)}
          className="w-fit bg-zinc-200/80 text-cs08 font-semibold px-5 py-2 mt-6 rounded-lg"
        >
          مشاهده بیشتر
        </button>
      )}
    </div>
  );
}
