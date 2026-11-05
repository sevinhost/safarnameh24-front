'use client';

import { memo } from 'react';
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

export const MHotelCard = memo(function MHotelCard(props: Props) {
  const {
    city,
    name,
    slug,
    stars,
    price,
    rating,
    address,
    main_image,
    public_tags,
    night_count,
    average_score,
    discount_percentage,
    price_after_discount,
    index = 0,
  } = props;

  const searchParams = useSearchParams();

  // ۱. ساخت ایمن و استاندارد آدرس بدون تولید مقادیر "null"
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
    <Link
      href={navigationLink}
      prefetch={false} // جلوگیری از دانلود بیهوده دیتای صفحات بعدی در اینترنت موبایل
      className="block bg-white rounded-xl shadow-light overflow-hidden transition-transform active:scale-[0.99]"
    >
      {/* === Image | Discount-Percentage === */}
      <div className="relative bg-zinc-100 h-44 m-2 overflow-hidden rounded-cs-10">
        {main_image ? (
          <Image
            fill
            src={main_image}
            alt={`هتل ${name} در ${city?.name || ''}`}
            priority={index < 2} // کارت‌های اول بلافاصله و با اولویت در موبایل لود شوند
            loading={index < 2 ? undefined : 'lazy'}
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        ) : (
          <div className="full-size flex-center bg-zinc-100 text-xs text-zinc-400">
            تصویر موجود نیست
          </div>
        )}

        {discount_percentage ? (
          <div className="absolute top-3 right-3 h-9 px-2.5 bg-cs-red text-white text-cs08 font-bold pt-0.5 flex-center gap-0.5 rounded-lg shadow-sm">
            <span>%</span>
            <span>{discount_percentage}</span>
          </div>
        ) : null}
      </div>

      {/* === Hotel | Province | City | Stars | Score | Address | Tags === */}
      <div className="relative text-zinc-800 text-cs08 font-bold px-5 mt-4 grid gap-2">
        <h3 className="text-cs09 font-extrabold flex items-center gap-1">
          <span>هتل</span>
          <span className="truncate">{name}</span>
        </h3>

        <div className="flex items-center gap-1 text-zinc-600 text-cs07/5">
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
          <span className="text-zinc-500 font-medium">امتیاز کاربران</span>
        </div>

        <p className="truncate text-zinc-500 font-medium text-cs07/5">{address}</p>

        {/* === Tags */}
        <Tags tags={public_tags} slicedCount={2} />
      </div>

      {/* === Separator === */}
      <div className="h-[1px] my-4 custom-horizontal-dashed-line" />

      {/* NumberOfNights | DiscountedPrice | TotalPrice */}
      <div className="text-cs08/5 font-bold px-5 pb-4 flex items-end">
        <div className="flex items-center gap-1 text-zinc-600 text-cs08">
          <span>قیمت برای</span>
          <span className="text-zinc-900 font-extrabold">{night_count || 1}</span>
          <span>شب اقامت :</span>
        </div>

        <div className="mr-auto flex flex-col items-end gap-1.5">
          {discount_percentage ? (
            <div className="text-zinc-400 text-cs08 line-through">
              {numberSeparation(price)}
            </div>
          ) : null}

          <div className="text-cs85 font-extrabold flex items-center gap-1 text-zinc-900">
            <span>
              {numberSeparation(
                discount_percentage ? price_after_discount : price,
              )}
            </span>
            <span>تومان</span>
          </div>
        </div>
      </div>
    </Link>
  );
});