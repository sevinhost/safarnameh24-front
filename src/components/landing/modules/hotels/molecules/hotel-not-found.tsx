import Image from 'next/image';

// ------------------------------

export default function HotelNotFound() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Image
        width={200}
        height={200}
        alt="not-found"
        src={'/image/logo/not-found.svg'}
        className="max-w-[50%] md:max-w-[30%]"
      />

      <div className="text-center space-y-2">
        <span className="text-cs09 font-bold lg:text-base">
          موردی یافت نشد !
        </span>

        <p className="text-zinc-500 text-cs08 font-semibold lg:text-cs85">
          مشتری عزیز متاسفانه هتل مورد نظرتان یافت نشد , لطفا مجدد تلاش فرمایید
          .
        </p>
      </div>
    </div>
  );
}
