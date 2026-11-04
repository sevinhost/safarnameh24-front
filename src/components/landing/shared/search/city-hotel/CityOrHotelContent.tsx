import {
  useHotelOrCityContext,
  useHotelOrCityDispatch,
} from '@/context/HotelOrCityContext';

import { useDebounce } from '@/hooks';
import { City, Hotel } from '@/types/landing';
import { generalInstance } from '@/utils/services';
import { CityOrHotelList } from './CityOrHotelList';

import logo from '@/assets';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, SearchStatus } from 'iconsax-react';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

type ApiResponse = {
  data: {
    cities: Array<City>;
    hotels: Array<Hotel>;
  };
};

// ----------------------------

export default function CityOrHotelContent(props: Props) {
  const { handleClose } = props;

  const pathname = usePathname();
  const { inputValue, value } = useHotelOrCityContext();
  const debouncedInputValue = useDebounce(inputValue, 500);

  const [error, setError] = useState(false);
  const dispatch = useHotelOrCityDispatch();

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['search-hotel-city', debouncedInputValue],
    queryFn: () =>
      generalInstance(
        `/hotel/hotels/search/hotel-city/?query=${debouncedInputValue}`,
      ),
  });

  function handleSubmit() {
    const stopCondition = !value.city;
    if (stopCondition) setError(true);
    else {
      handleClose();
      dispatch({ type: 'confirmed-value' });
    }
  }

  useEffect(() => {
    if (value.city) setError(false);
  }, [value.city]);

  const handleClearInput = () => dispatch({ type: 'clear-input-value' });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'input-value', payload: e.target.value });
  };

  return (
    <>
      {/* === Logo - Title - Close */}
      <div className="relative grid place-items-center lg:hidden">
        <div className="relative aspect-square w-16">
          <Image
            fill
            alt="logo"
            sizes="100%"
            className="object-contain"
            src={logo}
          />
        </div>

        <span className="mt-2 font-inter text-[clamp(0.95rem,3vw,1rem)] font-bold capitalize">
          safarnameh24
        </span>

        <button className="absolute right-0 top-0" onClick={handleClose}>
          <ArrowRight size={22} color="#444" />
        </button>
      </div>

      {/* === Search-Input */}
      <div className="relative mt-8 flex h-11 overflow-hidden rounded-cs-10 bg-zinc-200/50 lg:mx-4 lg:mt-4 lg:h-10 lg:bg-zinc-100">
        <button className="flex-center w-[3rem] pr-0.5">
          <SearchStatus size={16} color="#666" />
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            pathname === '/hotel'
              ? 'جتسجو شهر مقصد ...'
              : 'جستجو شهر یا هتل ...'
          }
          className="flex-1 bg-transparent pl-16 text-cs08 font-semibold text-zinc-600 placeholder:font-semibold placeholder:text-zinc-500"
        />

        <button
          onClick={handleClearInput}
          className={`flex-center absolute inset-y-0 w-12 transition-all duration-300 ease-in-out ${inputValue ? 'left-0 opacity-100' : '-left-full opacity-0'}`}
        >
          <IoClose size={16} color="#888" />
        </button>
      </div>

      <CityOrHotelList
        handleClose={handleClose}
        cities={data?.data.cities}
        hotels={data?.data.hotels}
        isPending={status === 'pending'}
      />

      <button
        onClick={handleSubmit}
        className={`mt-4 h-11 rounded-cs-10 bg-cs-dark-blue text-cs85 font-semibold text-white transition-colors lg:hidden ${error ? 'bg-cs-red' : 'bg-cs-dark-blue'}`}
      >
        {error ? 'مقداری انتخاب نشده است' : 'ثبت و ادامه فرآیند'}
      </button>
    </>
  );
}
