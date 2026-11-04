'use client';

import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { TopBarConfig } from '../../shared';
import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  hotel_slug: string;
  image_logo_hotel: string;
};

type ApiResponse = {
  data: Data[];
};

// -----------------------------------------------

export function BestHotels() {
  const swiperRef = useRef<SwiperType>(null);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['best-hotels'],
    queryFn: () => generalInstance('/hotel/best-hotels/'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        maxLength={6}
        arraylength={data?.data.length}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        title={{ type: 'single', text: 'هتل های برتر ایران' }}
        subtitle="گروه هتداری بزرگ ایران که به ما اعتماد کرده اند"
      />

      {status === 'pending' ? (
        <>
          <Skeleton className="w-full h-32 xl:hidden" />

          <div className="hidden gap-5 xl:flex">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="w-full h-32" />
              ))}
          </div>
        </>
      ) : (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
            1280: { slidesPerView: 6, slidesOffsetAfter: 0 },
          }}
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="bestHotels-swiper h-32 lg:h-36"
        >
          {data?.data?.map((hotel, index) => (
            <SwiperSlide
              key={index}
              className="max-w-40 select-none xl:max-w-full"
            >
              <Link
                href={`/hotel/${hotel.hotel_slug}`}
                className="relative bg-white h-28 p-4 group flex-center rounded-xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)] xl:h-32 xl:p-6"
              >
                {hotel && (
                  <Image
                    width={200}
                    height={200}
                    alt={'hotel-logo'}
                    src={hotel.image_logo_hotel}
                    className="full-size object-contain"
                  />
                )}

                <div className="absolute -z-10 bottom-1 left-1/2 -translate-x-1/2 bg-cs-red w-20 h-10 rounded-xl transition-all duration-200 ease-in-out delay-100 group-hover:-bottom-2"></div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
