'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRef } from 'react';
import { Hotel } from '@/types';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Autoplay } from 'swiper/modules';

import { Skeleton } from '@/components/ui/skeleton';
import { SuggestedHotel, TopBarConfig } from '../../shared';
import { isEmptyOrInvalid } from '@/utils/services';
import { axiosInstance } from '@/utils/axios';

type ApiResponse = {
  data: Hotel[];
};

// -----------------------------------------------
export function AmazingHotels() {
  const swiperRef = useRef<SwiperType>(null);

  const { data, status } = useQuery<ApiResponse>({
    staleTime: 1000 * 60 * 5,
    queryKey: ['amazing-hotels'],
    queryFn: () => axiosInstance('/hotel/hotels/amazing-hotels/'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        subtitle="هتل های تخفیف دار رو  از دست نده !"
        viewAllHref="/hotel?amazing-hotels=show"
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        title={{ type: 'double', first: 'هتل های', second: 'شگفت انگیز' }}
      />

      {status === 'pending' ? (
        <>
          <Skeleton className="h-[23.5rem] xl:hidden" />
          <div className="h-[23.5rem] hidden grid-cols-4 gap-5 xl:grid">
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
            data?.data.length && data?.data?.length > 4
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
          {data?.data?.map((hotel, index) => (
            <SwiperSlide
              key={index}
              className="max-w-72 pb-4 select-none xl:max-w-full"
            >
              <SuggestedHotel hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
