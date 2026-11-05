'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRef } from 'react';
import { Hotel } from '@/types';
import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Autoplay } from 'swiper/modules';

import { Section } from './molecules/Section';
import { Skeleton } from '@/components/ui/skeleton';
import { isEmptyOrInvalid } from '@/utils/services';
import { SuggestedHotel, TopBarConfig } from '../../shared';

type Props = { hotelSlug: string };
type ApiResponse = { data: Array<Hotel> };

// ----------------------------

export function SuggestedHotels(props: Props) {
  const { hotelSlug } = props;
  const swiperRef = useRef<SwiperType>(null);

  const { data, status } = useQuery<ApiResponse>({
    staleTime: 1000 * 60 * 5,
    queryKey: ['suggested-hotels'],
    queryFn: () => axiosInstance(`/hotel/hotels/by-hotel-slug/${hotelSlug}`),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  const city = data?.data[0].city.name;
  const province = data?.data[0].city.province;

  const topBarConfigTitle = city
    ? `هتل های پیشنهادی شهر ${city}`
    : 'هتل های پیشنهادی';

  return (
    <Section sectionID="suggested-hotels" className="-ml-5 xl:ml-0">
      <TopBarConfig
        arraylength={data?.data.length}
        subtitle="هتل های پیشنهادی سفرنامه 24 رو از دست نده !"
        title={{ type: 'single', text: topBarConfigTitle }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        viewAllHref={`/hotel?city=${city}&province=${province}`}
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
            data?.data && data?.data?.length > 4
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
              className="max-w-72 select-none pb-4 xl:max-w-full"
            >
              <SuggestedHotel hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
}
