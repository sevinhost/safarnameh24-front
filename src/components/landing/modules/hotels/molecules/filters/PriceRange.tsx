'use client';

import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import ReactSlider from 'react-slider';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useQueryState, parseAsInteger } from 'nuqs';

import { numberSeparation } from '@/utils';
import { axiosInstance } from '@/utils/axios';
import { getDates } from '../../helpers/hotel-list';
import { useDatePickerContext, usePassengersContext } from '@/context';

type ApiResponse = {
  data: {
    min_price: number;
    max_price: number;
  };
};

type Options = {
  endDate?: string;
  startDate?: string;
  passengers: string;
};

const options: Options = {
  endDate: '',
  startDate: '',
  passengers: '',
};

// -------------------------------------

export function PriceRange() {
  const [queryOptions, setQueryOptions] = useState(options);

  const { confirmedValue: dates } = useDatePickerContext();
  const { rooms, confirmedPassengers: passengers } = usePassengersContext();

  const { data } = useQuery<ApiResponse>({
    queryKey: ['hotel-list', queryOptions],
    queryFn: () =>
      axiosInstance(
        `/hotel/hotels/price-range?start-date=${queryOptions.startDate}&end-date=${queryOptions.endDate}&passengers=${queryOptions.passengers}`,
      ),
  });

  const [minPrice, setMinPrice] = useQueryState(
    'min-price',
    parseAsInteger.withDefault(0),
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    'max-price',
    parseAsInteger.withDefault(0),
  );

  const [localRange, setLocalRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    if (data?.data) {
      const apiMin = data.data.min_price;
      const apiMax = data.data.max_price;

      if (!minPrice && !maxPrice) {
        setLocalRange([apiMin, apiMax]);
      }
    }
  }, [data, minPrice, maxPrice, setMinPrice, setMaxPrice]);

  useEffect(() => {
    if (minPrice && maxPrice) {
      setLocalRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  // === Update query-options ...
  useEffect(() => {
    const { startDate, endDate } = getDates(dates);
    let queryPassengers;
    if (!passengers.rooms) queryPassengers = '0';
    else {
      queryPassengers = rooms
        .map((item) => item.adults + item.children)
        .toString();
    }

    setQueryOptions({
      endDate,
      startDate,
      passengers: queryPassengers,
    });
  }, [dates, passengers, rooms]);

  return (
    <AccordionItem value="price-range" className="px-5">
      <AccordionTrigger className="text-[0.85rem] font-bold">
        محدوده قیمت
      </AccordionTrigger>

      <AccordionContent>
        {data?.data && (
          <ReactSlider
            invert
            step={100_000}
            min={data.data.min_price}
            max={data.data.max_price}
            value={localRange}
            onChange={(value: number[]) =>
              setLocalRange(value as [number, number])
            }
            onAfterChange={(value: number[]) => {
              setMinPrice(value[0]);
              setMaxPrice(value[1]);
            }}
            className="w-full h-4 flex-center"
            renderTrack={(props, state) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  className={`h-1 rounded-full ${
                    state.index === 1 ? 'bg-cs-blue' : 'bg-zinc-100'
                  }`}
                />
              );
            }}
            thumbClassName="bg-cs-blue w-3 h-3 rounded-full"
          />
        )}

        <div className="text-zinc-500 text-cs65 font-bold mt-2 mb-4 flex-between">
          <span>حداقل</span>
          <span>حداکثر</span>
        </div>

        <div className="h-9 text-zinc-800 text-cs75 font-extrabold grid grid-cols-[1fr_1.5rem_1fr] gap-2">
          <div className="bg-zinc-100 flex-center gap-1 rounded-lg">
            <span>{localRange[0] ? numberSeparation(localRange[0]) : ''}</span>
          </div>

          <div className="relative text-cs65 pt-2 flex-center">
            <span>توما</span>
            <span className="absolute top-1 left-1">ن</span>
          </div>

          <div className="bg-zinc-100 flex-center gap-1 rounded-lg">
            <span>{localRange[1] ? numberSeparation(localRange[1]) : ''}</span>
            <span>+</span>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
