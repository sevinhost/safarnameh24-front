'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Autoplay, Navigation } from 'swiper/modules';

import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import { home } from '@/constants/landing';
import { TopBarConfig } from '../../shared';

// -----------------------------------------------

export function InterestingBlogs() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="-mb-4 -ml-5 lg:ml-0">
      <TopBarConfig
        viewAllHref="/tourism-magazine"
        title={{ type: 'single', text: 'بلاگ های جذاب' }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        subtitle="بلاگ های محبوب و جذاب سفرنامه ۲۴ رو حتما بخون !"
      />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
          1280: { slidesPerView: 4, slidesOffsetAfter: 0 },
        }}
        speed={500}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {home.interestingBLogs.map((blog) => (
          <SwiperSlide
            key={blog.id}
            className="max-w-72 select-none pb-4 xl:max-w-full"
          >
            <div className="h-full rounded-xl bg-white p-2.5 shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)]">
              {/* Image */}
              <div className="relative h-44 overflow-hidden rounded-cs-10 bg-zinc-100">
                {blog.image && (
                  <Image
                    width={300}
                    height={300}
                    alt="blog-post"
                    src={blog.image}
                    className="full-size object-cover"
                  />
                )}

                {blog.mostVisited && (
                  <div className="flex-center absolute right-2.5 top-2.5 h-7 rounded-md bg-[#4B5BCE] px-2.5 text-cs07 font-medium text-zinc-100">
                    پر بازدید !
                  </div>
                )}
              </div>

              {/* Blog-Information */}
              <div className="mt-3 flex flex-col gap-2 px-1.5 py-1 font-semibold text-zinc-900">
                {/* Blog-Title */}
                <h4 className="truncate text-cs85 font-bold">{blog.title}</h4>

                {/* Blog-Description */}
                <p className="line-clamp-4 h-[4.8rem] overflow-hidden text-justify text-cs08/5 font-medium text-zinc-500">
                  {blog.desc}
                </p>

                {/* Read-More | Date */}
                <div className="flex-between mt-2 h-9 items-center text-cs75">
                  <Link
                    href={''}
                    className="flex-center h-full rounded-[7px] bg-zinc-100 px-4 transition-colors duration-200 ease-in-out hover:bg-[#252525] hover:text-zinc-100"
                  >
                    مطالعه بیشتر
                  </Link>

                  <span className="tracking-wider">{blog.date}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
