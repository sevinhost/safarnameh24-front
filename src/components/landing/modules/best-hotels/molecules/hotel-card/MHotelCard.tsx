import Tags from './Tags';
import Link from 'next/link';
import Image from 'next/image';

import { numberSeparation } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { Hotel } from '@/types/landing/best-hotels';

type Props = Hotel;

// ----------------------------

export function MHotelCard(props: Props) {
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
  } = props;

  const searchParams = useSearchParams();

  const endDate = searchParams.get('end-date');
  const startDate = searchParams.get('start-date');
  const passengers = searchParams.get('passengers');

  const navigationLink = `/hotel/${slug}?start-date=${startDate}&end-date=${endDate}${passengers ? `&passengers=${passengers}` : ''}`;

  return (
    <Link href={navigationLink} className="bg-white rounded-xl shadow-light">
      {/* === Image | Discount-Percentage */}
      <div className="relative bg-zinc-100 h-44 m-2 overflow-hidden rounded-cs-10">
        {main_image && (
          <Image
            width={500}
            height={300}
            src={main_image}
            alt="hotel-image"
            className="full-size object-cover"
          />
        )}

        {discount_percentage && (
          <div className="absolute top-3 right-3 h-9 px-2.5 bg-cs-red text-white text-cs08 font-bold pt-0.5 flex-center gap-0.5 rounded-lg">
            <span>%</span>
            <span>{discount_percentage}</span>
          </div>
        )}
      </div>

      {/* === Hotel | Province | City | Stars | Score | Address | Tags */}
      <div className="relative text-zinc-800 text-cs08 font-bold px-5 mt-4 grid gap-2">
        <h3 className="text-cs09 font-extrabold flex items-center gap-1">
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

        <p className="truncate">{address}</p>

        {/* === Tags */}
        <Tags tags={public_tags} slicedCount={2} />
      </div>

      {/* === Separator */}
      <div className="h-[1px] my-4 custom-horizontal-dashed-line" />

      {/* NumberOfNights | DiscountedPrice | TotalPrice */}
      <div className="text-cs08/5 font-bold px-5 pb-4 flex items-end">
        <div className="flex items-center gap-1">
          <span>قیمت برای</span>
          <span>{night_count}</span>
          <span>شب اقامت :</span>
        </div>

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
    </Link>
  );
}
