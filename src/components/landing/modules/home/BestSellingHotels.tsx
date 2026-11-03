'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Hotel } from '@/types';
import { TopBarConfig } from '../../shared';
import { Skeleton } from '@/components/ui/skeleton';

import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Pagination, Navigation } from 'swiper/modules';

import BestSellingHotelA from './molecules/BestSellingHotelA';
import BestSellingHotelB from './molecules/BestSellingHotelB';
import { isEmptyOrInvalid } from '@/utils/services';
import { axiosInstance } from '@/utils/axios';

type ApiResponse = {
  data: (Hotel & { reservation_count: number })[];
};

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

export function BestSellingHotels() {
  const swiperRef = useRef<SwiperType>(null);
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['best-selling-hotels'],
    queryFn: async () => {
      const response = await axiosInstance.get('/hotel/hotels/best-sellers/');
      return response.data;
    },
  });

  const hotels = data?.data ?? [];

  const topHotels = hotels.slice(0, 4);
  const groupedHotels = chunkArray(hotels.slice(4), 2);

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        title={{
          type: 'single',
          text: 'هتل های پرفروش و جذاب سفرنامه ۲۴',
        }}
        arraylength={hotels.length}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        subtitle="هتل های پرفروش و جذاب سفرنامه ۲۴ رو از دست نده !"
      />

      <div className="grid-cols-[30%_67%] justify-between xl:grid">
        {/* --- Mobile (A) --- */}
        <div className="xl:hidden">
          {status === 'pending' ? (
            <Skeleton className="h-40 w-full rounded-xl" />
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView="auto"
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                0: { slidesOffsetAfter: 0 },
                640: { slidesOffsetAfter: 22 },
              }}
              modules={[Pagination, Navigation]}
              className="bestSellingHotelsA-swiper !pb-12 xl:!pb-0"
              watchOverflow
            >
              {hotels.map((hotel, i) => (
                <SwiperSlide key={i} className="max-w-[20rem] select-none">
                  <BestSellingHotelA hotel={hotel} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* --- Desktop (B) --- */}
        <div className="hidden xl:block">
          {status === 'pending' ? (
            <Skeleton className="h-80 rounded-2xl" />
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="bestSellingHotelsB-swiper !pb-12"
              watchOverflow
            >
              {topHotels.map((hotel, i) => (
                <SwiperSlide key={i} className="max-w-full select-none">
                  <BestSellingHotelB hotel={hotel} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* --- Desktop (A)-couple -- */}
        <div className="hidden xl:block">
          {status === 'pending' ? (
            <div className="grid h-80 grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="rounded-xl" />
              ))}
            </div>
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              modules={[Navigation, Navigation]}
              className="bestSellingHotelsA-swiper"
              watchOverflow
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {groupedHotels.map((group, i) => (
                <SwiperSlide key={i} className="max-w-full select-none pb-4">
                  <div className="grid gap-4">
                    {group.map((hotel, j) => (
                      <BestSellingHotelA key={j} hotel={hotel} />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}
