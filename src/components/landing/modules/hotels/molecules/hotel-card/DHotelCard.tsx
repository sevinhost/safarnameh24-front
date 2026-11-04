import Tags from './Tags';
import Link from 'next/link';
import Image from 'next/image';

import { numberSeparation } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { Hotel } from '@/types/landing/hotels';
import { useState } from 'react';

type Props = Hotel;

// ----------------------------

export function DHotelCard(props: Props) {
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
  } = props;

  const searchParams = useSearchParams();

  const [isClicked, setClicked] = useState(false)


  const endDate = searchParams.get('end-date');
  const startDate = searchParams.get('start-date');
  const passengers = searchParams.get('passengers');

  const navigationLink = `/hotel/${slug}?start-date=${startDate}&end-date=${endDate}${passengers ? `&passengers=${passengers}` : ''}`;

  return (
    <div className="bg-white grid grid-cols-[1fr_2px_17rem] overflow-hidden rounded-2xl shadow-light">
      <div className="p-4 grid grid-cols-[16rem_1fr] gap-5">
        {/* === Image */}
        <div className="relative bg-zinc-100 h-48 overflow-hidden rounded-xl">
          {main_image && (
            <Image
              width={500}
              height={400}
              src={main_image}
              alt="hotel-image"
              className="full-size object-cover"
            />
          )}
        </div>

        {/* HotelName | Province | City | Stars | Score | Address | NumberOfNights */}
        <div className="text-zinc-800 text-cs85 font-bold pt-2 pb-1 flex flex-col gap-2 overflow-hidden">
          <h3 className="text-cs95 font-extrabold mb-0.5 flex items-center gap-1 overflow-hidden">
            <span>هتل</span>
            <span>{name}</span>
          </h3>

          <div className="flex items-center gap-1">
            <span>استان</span>
            <span>{city.province}</span>
            <span>,</span>
            <span>{city.name}</span>
            <span className="mx-0.5">|</span>
            <span>{stars}</span>
            <span>ستاره</span>
          </div>

          <div className="flex items-center gap-1">
            {average_score > 1 ? average_score : rating}
            <span>امتیاز کاربران</span>
          </div>

          <p className="text-zinc-600 text-cs08/5 font-semibold">{address}</p>

          <div className="h-9 text-cs75 mt-auto flex gap-3">
            <div className="bg-zinc-100 px-4 flex items-center gap-1 rounded-lg">
              <span>{night_count}</span>
              <span>شب اقامت</span>
            </div>

            {comment_count > 0 && (
              <div className="bg-green-100 text-green-600 px-4 flex items-center gap-1 rounded-lg">
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
            {discount_percentage && (
              <div className="text-zinc-400 text-cs08 line-through">
                {numberSeparation(price)}
              </div>
            )}

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

        <Link
          href={navigationLink}
          onClick={() => setClicked(true)}
          className="bg-cs-dark-blue text-white text-cs08 font-semibold h-10 flex-center rounded-cs-10"
        >
             {isClicked ? <div className="loader-dots" /> : <span>مشاهده اتاق ها</span>}
          
        </Link>
      </div>
    </div>
  );
}
