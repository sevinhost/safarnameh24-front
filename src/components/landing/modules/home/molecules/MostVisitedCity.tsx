import Link from 'next/link';
import Image from 'next/image';

type Props = {
  id: number;
  name: string;
  slug: string;
  image: string;
  province: string;
  hotels_number: number;
};

// ---------------------------

export default function MostVisitedCity(props: Props) {
  const { hotels_number, image, name, province } = props;

  return (
    <Link
      href={`/hotel?city=${name}&province=${province}`}
      className="h-56 relative group cursor-pointer flex flex-col xl:h-60"
    >
      {/* Image */}
      <div className="bg-zinc-200 h-48 overflow-hidden rounded-xl xl:h-52">
        {image && (
          <Image
            alt={name}
            src={image}
            width={300}
            height={300}
            className="full-size object-cover"
          />
        )}
      </div>

      {/* Number of residence */}
      <div className="absolute top-3.5 right-3.5 bg-zinc-100 h-6 px-3 text-zinc-800 text-cs07 font-bold pt-1 flex-center gap-1 opacity-100 rounded-md transition-all duration-200 ease-in-out md:top-0 md:opacity-0 md:group-hover:opacity-100 md:group-hover:top-3 xl:h-7 xl:text-cs75">
        <span>{hotels_number ? hotels_number : 'بدون'}</span>
        <span>اقامتگاه</span>
      </div>

      {/* Province | City */}
      <div className="text-cs08 mt-auto truncate flex items-center gap-1 xl:text-cs85">
        <span className="text-zinc-800 font-extrabold">{province}</span>
        <span>,</span>
        <span className="text-zinc-600 font-semibold">{name}</span>
      </div>
    </Link>
  );
}
