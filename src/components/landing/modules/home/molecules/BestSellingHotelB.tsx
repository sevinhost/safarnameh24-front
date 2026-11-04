import Link from 'next/link';
import Image from 'next/image';
import { Hotel } from '@/types';
import { numberSeparation } from '@/utils';

type Props = { hotel: Hotel & { reservation_count: number } };

// -----------------------------------------------

export default function BestSellingHotelB(props: Props) {
  const {
    hotel: {
      city,
      name,
      slug,
      stars,
      main_image,
      total_price,
      reservation_count,
    },
  } = props;

  return (
    <Link
      href={`/hotel/${slug}`}
      className="relative bg-white h-[21rem] p-3 flex flex-col gap-3 rounded-2xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)]"
    >
      {/* Image */}
      <div className="bg-zinc-100 h-[11.5rem] overflow-hidden rounded-xl">
        {main_image && (
          <Image
            src={main_image}
            width={400}
            height={200}
            alt={'hotel-picture'}
            className="full-size object-cover"
          />
        )}
      </div>

      {/* Hotel-Details */}
      <div className="text-zinc-800 text-cs85 font-bold p-1 px-2 flex-1 flex flex-col gap-2">
        {/* Hotel-Name */}
        <h3 className="text-cs95 font-extrabold flex items-center gap-1">
          <span>هتل</span>
          <span className="truncate">{name}</span>
        </h3>

        {/* Province | City | Stars */}
        <div className="text-zinc-500 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span>استان</span>

            <div className="flex-center gap-0.5">
              <span className="max-w-28 truncate">{city.province}</span>
              <span>,</span>
              <span className="max-w-28 truncate">{city.name}</span>
            </div>
          </div>

          <div className="bg-zinc-300 w-[2px] h-3 rounded"></div>

          <div className="flex items-center gap-1">
            <span>{stars}</span>
            <span>ستاره</span>
          </div>
        </div>

        {/* Hotel-Price */}
        <div className="relative flex-between items-center gap-2 mt-auto">
          <div className="absolute -top-6 left-0 text-cs07 text-zinc-500 font-bold flex-center gap-1">
            <span>بیش از</span>
            <span>{reservation_count}</span>
            <span>رزرو</span>
          </div>

          <span>شروع قیمت اتاق :</span>

          <div className="text-cs09 font-extrabold flex items-center gap-1">
            <span>{numberSeparation(total_price)}</span>
            <span>تومان</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
