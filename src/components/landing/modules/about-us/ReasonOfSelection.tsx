'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { TopBarConfig } from '../../shared';
import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  title: string;
  image: string;
  description: string;
};

type ApiResponse = {
  data: Data[];
};

// -----------------------------

export function ReasonOfSelection() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['choose-reasons'],
    queryFn: () => generalInstance('/config/choose-reasons'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        title={{ type: 'single', text: 'دلایل انتخاب سفرنامه 24' }}
        subtitle="موارد مهم برای اینکه باید سفرنامه 24 اولویت باشه !"
      />

      {status === 'pending' ? (
        <>
          {/* === Small-Screen */}
          <Skeleton className="h-80 rounded-xl xl:hidden" />

          {/* === large-Screen */}
          <div className="hidden h-96 grid-cols-4 gap-6 xl:grid">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="rounded-xl" />
              ))}
          </div>
        </>
      ) : (
        <Swiper
          spaceBetween={25}
          breakpoints={{
            0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
            1280: {
              slidesPerView: 4,
              slidesOffsetAfter: 0,
            },
          }}
        >
          {data?.data.map((item, index) => (
            <SwiperSlide
              key={index}
              className="max-w-72 select-none pb-4 xl:max-w-full"
            >
              <div className="relative h-80 overflow-hidden rounded-2xl bg-zinc-200/70 shadow-[0_0.5rem_1rem_rgb(0,0,0,0.05)] xl:h-96">
                {item.image && (
                  <Image
                    fill
                    sizes="500"
                    src={item.image}
                    alt="image-reason"
                    className="full-size object-cover"
                  />
                )}

                <div className="absolute inset-x-4 bottom-4 top-[12.8rem] flex flex-col items-center gap-2 rounded-xl bg-white px-6 py-4 transition-all duration-500 ease-in-out hover:top-4">
                  <span className="text-cs08 font-bold text-zinc-800">
                    {item.title}
                  </span>

                  <p className="overflow-hidden text-justify text-cs75/5 font-semibold text-zinc-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
