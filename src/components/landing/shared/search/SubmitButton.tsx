import {
  useDatePickerContext,
  usePassengersContext,
  useHotelOrCityContext,
} from '@/context';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';

const dateInfo = {
  calendar: persianCalendar,
  locale: persianLanguage,
};

type Props = { handleClose: () => void };

// -----------------------------

export default function SubmitButton(props: Props) {
  const { handleClose } = props;

  const router = useRouter();
  const pathname = usePathname();

  const isBestHotel = pathname === '/hotel';
  const isHotelDetail = pathname.startsWith('/hotel/');

  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { confirmedValue: dates } = useDatePickerContext();
  const { confirmedValue: cityOrHotel } = useHotelOrCityContext();
  const { confirmedPassengers: passengers } = usePassengersContext();

  // console.log('dates', dates)
  // console.log('cityOrHotel', cityOrHotel);
  // console.log('passengers', passengers);

  function handleSubmit() {
    if (!isHotelDetail) {
      const stopCondition =
        !dates?.[0] ||
        !dates?.[1] 
        !cityOrHotel.city 
        // !passengers.rooms ||
        // !passengers.passengers;

      if (stopCondition) {
        setError(true);
        return;
      }

      setLoading(true);
      const params = new URLSearchParams();

      params.set(
        'start-date',
        dates?.[0]
          ?.convert(dateInfo.calendar, dateInfo.locale)
          .format('YYYY-MM-DD'),
      );

      params.set(
        'end-date',
        dates?.[1]
          ?.convert(dateInfo.calendar, dateInfo.locale)
          .format('YYYY-MM-DD'),
      );

      // params.set('passengers', passengers.passengers.toString());
      // params.set('rooms', passengers.rooms.toString());

      if (cityOrHotel.hotel) {
        router.replace(
          `/hotel/${cityOrHotel.hotelSlug}/?${params.toString()}`,
          { scroll: true },
        );
      }
      // ---
      else {
        params.set('city', cityOrHotel.city);
        params.set('province', cityOrHotel.province);
        router.replace(`/hotel/?${params.toString()}`, { scroll: true });
      }
    }
    // 
     else {
            const stopCondition =
        !dates?.[0] ||
        !dates?.[1] 
        // !passengers.rooms ||
        // !passengers.passengers;

      if (stopCondition) {
        setError(true);
        return;
      }

      setLoading(true);
      const params = new URLSearchParams();

      params.set(
        'start-date',
        dates?.[0]
          ?.convert(dateInfo.calendar, dateInfo.locale)
          .format('YYYY-MM-DD'),
      );

      params.set(
        'end-date',
        dates?.[1]
          ?.convert(dateInfo.calendar, dateInfo.locale)
          .format('YYYY-MM-DD'),
      );

      // params.set('passengers', passengers.passengers.toString());
      // params.set('rooms', passengers.rooms.toString());

      // if (cityOrHotel.hotel) {
      //   router.replace(
      //     `/hotel/${cityOrHotel.hotelSlug}/?${params.toString()}`,
      //     { scroll: true },
      //   );
      // }
      // // ---
      // else {
      //   params.set('city', cityOrHotel.city);
      //   params.set('province', cityOrHotel.province);
      //   router.replace(`/hotel/?${params.toString()}`, { scroll: true });
      // }
    }

    handleClose();
  }

  // === Setting Error-State
  useEffect(() => {
    if (
      dates?.[0] &&
      dates?.[1] &&
      passengers.rooms &&
      cityOrHotel.city &&
      passengers.passengers
    )
      setError(false);
  }, [cityOrHotel, passengers, dates]);

  return (
    <button
      onClick={handleSubmit}
      className={`flex-center mt-auto h-12 rounded-cs-10 text-cs85 font-semibold text-white transition-colors duration-200 ease-in-out ${!isHotelDetail && isError ? 'bg-cs-red' : 'bg-cs-dark-blue'}`}
    >
      {isLoading ? (
        <div className="loader-dots" />
      ) : isHotelDetail ? (
        'مشاهده اتاق ها'
      ) : isError ? (
        'فیلتر های جستجو خالی میباشد !'
      ) : (
        'جستجو شهر یا هتل مقصد'
      )}
    </button>
  );
}
