'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import Tags from './Tags';
import { numberSeparation } from '@/utils';
import { Hotel } from '@/types/landing/hotels';

type Props = Hotel & {
  index?: number;
};

// ----------------------------

export const DHotelCard = memo(function DHotelCard(props: Props) {
  const {
    city,
    name,
    slug,
    price,
    stars,
    rating,
    address,
    main_image,
    night_count,
    public_tags,
    average_score,
    comment_count,
    reservation_count,
    discount_percentage,
    price_after_discount,
    index = 0,
  } = props;

  const searchParams = useSearchParams();
  const [isClicked, setClicked] = useState(false);

  // ۱. ساخت کاملاً ایمن و داینامیک لینک بدون تولید مقادیر "null"
  const startDate = searchParams.get('start-date');
  const endDate = searchParams.get('end-date');
  const passengers = searchParams.get('passengers');

  const queryParams = new URLSearchParams();
  if (startDate) queryParams.set('start-date', startDate);
  if (endDate) queryParams.set('end-date', endDate);
  if (passengers) queryParams.set('passengers', passengers);

  const queryString = queryParams.toString();
  const navigationLink = `/hotel/${slug}${queryString ? `?${queryString}` : ''}`;

  // ۲. استخراج ایمن نام استان
  const provinceName =
    typeof city?.province === 'object' && city?.province !== null
      ? (city.province as any)?.name
      : city?.province || '';

  return (
    <div className="bg-white grid grid-cols-[1fr_2px_17rem] overflow-hidden rounded-2xl shadow-light transition-shadow duration-300 hover:shadow-md">
      <div className="p-4 grid grid-cols-[16rem_1fr] gap-5">
        {/* === Image === */}
        <div className="relative bg-zinc-100 h-48 w-full overflow-hidden rounded-xl">
          {main_image ? (
            <Image
              fill
              src={main_image}
              alt={`هتل ${name} در ${city?.name || ''}`}
              priority={index < 2} // فقط ۲ کارت اول با اولویت بالا برای بهبود LCP
              loading={index < 2 ? undefined : 'lazy'}
              sizes="256px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="full-size flex-center bg-zinc-100 text-xs text-zinc-400">
              تصویر موجود نیست
            </div>
          )}
        </div>

        {/* HotelName | Province | City | Stars | Score | Address | NumberOfNights */}
        <div className="text-zinc-800 text-cs85 font-bold pt-2 pb-1 flex flex-col gap-2 overflow-hidden">
          <h3 className="text-cs95 font-extrabold mb-0.5 flex items-center gap-1 overflow-hidden">
            <span>هتل</span>
            <span className="truncate">{name}</span>
          </h3>

          <div className="flex items-center gap-1 text-zinc-600 text-cs08">
            {provinceName && (
              <>
                <span>استان</span>
                <span>{provinceName}</span>
                <span>,</span>
              </>
            )}
            <span>{city?.name}</span>
            <span className="mx-0.5">|</span>
            <span>{stars}</span>
            <span>ستاره</span>
          </div>

          <div className="flex items-center gap-1 text-cs08">
            <span className="text-cs-blue font-extrabold">
              {average_score > 1 ? average_score : rating || 0}
            </span>
            <span className="text-zinc-500">امتیاز کاربران</span>
          </div>

          <p className="text-zinc-600 text-cs08/5 font-semibold line-clamp-1">{address}</p>

          <div className="h-9 text-cs75 mt-auto flex gap-3">
            <div className="bg-zinc-100 text-zinc-600 px-4 flex items-center gap-1 rounded-lg">
              <span>{night_count || 1}</span>
              <span>شب اقامت</span>
            </div>

            {comment_count > 0 && (
              <div className="bg-green-100 text-green-700 px-4 flex items-center gap-1 rounded-lg">
                <span>{comment_count}</span>
                <span>دیدگاه</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* V-Separator */}
      <div className="custom-vertical-dashed-line"></div>

      {/* Discount-Percentage | DiscountedPrice | TotalPrice | Tags */}
      <div className="relative text-zinc-800 font-bold p-5 flex flex-col">
        {/* === Discount | Reservation-Count */}
        {discount_percentage ? (
          <div className="h-9 bg-cs-red/10 text-cs-red text-cs75/5 font-extrabold px-4 pt-0.5 mr-auto flex-center gap-0.5 border-2 border-cs-red border-dashed rounded-lg">
            <span>%</span>
            <span>{discount_percentage}</span>
            <span className="mr-0.5">تخفیف</span>
          </div>
        ) : reservation_count ? (
          <div className="h-9 bg-zinc-100 text-cs07/5 font-extrabold px-3.5 mr-auto flex-center gap-1 rounded-lg">
            <span>رزرو</span>
            <span>{reservation_count} +</span>
          </div>
        ) : null}

        {/* === Tags */}
        <Tags tags={public_tags} />

        {/* === Price */}
        <div className="text-cs08/5 font-bold mt-auto mb-3 flex items-end">
          <span>شروع قیمت :</span>

          <div className="mr-auto flex flex-col items-end gap-1.5">
            {discount_percentage ? (
              <div className="text-zinc-400 text-cs08 line-through">
                {numberSeparation(price)}
              </div>
            ) : null}

            <div className="text-cs85 font-extrabold flex items-center gap-1">
              <span>
                {numberSeparation(
                  discount_percentage ? price_after_discount : price,
                )}
              </span>
              <span>تومان</span>
            </div>
          </div>
        </div>

        {/* دکمه انتقال با پیش‌بارگذاری فقط در زمان Hover برای جلوگیری از اشغال پهنای باند */}
        <Link
          href={navigationLink}
          prefetch={false}
          onClick={() => setClicked(true)}
          className="bg-cs-dark-blue text-white text-cs08 font-semibold h-10 flex-center rounded-cs-10 transition-colors hover:bg-cs-dark-blue/90"
        >
          {isClicked ? <div className="loader-dots" /> : <span>مشاهده اتاق ها</span>}
        </Link>
      </div>
    </div>
  );
});