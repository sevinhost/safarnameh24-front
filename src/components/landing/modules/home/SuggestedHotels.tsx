'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRef } from 'react';
import { Hotel } from '@/types';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Autoplay } from 'swiper/modules';

import { axiosInstance } from '@/utils/axios';
import { Skeleton } from '@/components/ui/skeleton';
import { isEmptyOrInvalid } from '@/utils/services';
import { SuggestedHotel, TopBarConfig } from '../../shared';

type ApiResponse = {
  data: Hotel[];
};

// ----------------------------

export function SuggestedHotels() {
  const swiperRef = useRef<SwiperType>(null);

  const { data, status } = useQuery<ApiResponse>({
    staleTime: 1000 * 60 * 5,
    queryKey: ['suggested-hotels'],
    queryFn: () => axiosInstance('/hotel/hotels/suggested-hotels'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="-ml-5 xl:ml-0">
      <TopBarConfig
        arraylength={data?.data?.length}
        viewAllHref="/best-hotels?suggested-hotels=show"
        subtitle="هتل های پیشنهادی سفرنامه ۲۴ رو از دست نده !"
        title={{ type: 'single', text: 'هتل های پیشنهادی' }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
      />

      {status === 'pending' ? (
        <>
          <Skeleton className="h-[23.5rem] xl:hidden" />
          <div className="hidden h-[23.5rem] grid-cols-4 gap-5 xl:grid">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="rounded-xl" />
              ))}
          </div>
        </>
      ) : (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
            1280: {
              slidesPerView: 4,
              slidesOffsetAfter: 0,
            },
          }}
          speed={600}
          autoplay={
            data?.data.length && data?.data.length > 4
              ? {
                  delay: 4000,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          modules={[Navigation, Autoplay]}
          className="suggestedHotels-swiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {data?.data.slice(0, 8).map((hotel, index) => (
            <SwiperSlide
              key={index}
              className="max-w-72 select-none pb-4 xl:max-w-full"
            >
              <SuggestedHotel hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
