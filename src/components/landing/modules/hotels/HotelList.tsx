// 'use client';

// import {
//   useHotelQuery,
//   useDatePickerContext,
//   usePassengersContext,
//   useHotelOrCityContext,
// } from '@/context';

// import {
//   options,
//   getDates,
//   ApiResponse,
//   encodeRooms,
//   buildQueryString,
//   parseAsShowToggle,
// } from './helpers/hotel-list';

// import { HotelListContent } from './HotelListContent';

// import { useRouter } from 'next/navigation';
// import { axiosInstance } from '@/utils/axios';
// import { useQuery } from '@tanstack/react-query';
// import { useEffect, useMemo, useState } from 'react';
// import { useQueryState, parseAsArrayOf, parseAsInteger } from 'nuqs';

// // ------------------------------

// export function HotelList() {
//   const router = useRouter();
//   const { handleSetQueryState } = useHotelQuery();

//   const [page] = useQueryState('page', parseAsInteger);
//   const [star] = useQueryState('star', parseAsArrayOf(parseAsInteger));

//   const [amazingHotels] = useQueryState('amazing-hotels', parseAsShowToggle);
//   const [suggestedHotels] = useQueryState(
//     'suggested-hotels',
//     parseAsShowToggle,
//   );

//   const [minPrice] = useQueryState('min-price', parseAsInteger.withDefault(0));
//   const [maxPrice] = useQueryState('max-price', parseAsInteger.withDefault(0));

//   const [residenceType] = useQueryState(
//     'residence-type',
//     parseAsArrayOf(parseAsInteger),
//   );
//   const [hotelFacilities] = useQueryState(
//     'hotel-facilities',
//     parseAsArrayOf(parseAsInteger),
//   );
//   const [roomFacilities] = useQueryState(
//     'room-facilities',
//     parseAsArrayOf(parseAsInteger),
//   );

//   const { confirmedValue: dates } = useDatePickerContext();
//   const { confirmedValue: hotelOrCity } = useHotelOrCityContext();
//   const { rooms, confirmedPassengers: passengers } = usePassengersContext();

//   const [queryOptions, setQueryOptions] = useState(options);
//   const queryString = useMemo(
//     () => buildQueryString(queryOptions),
//     [queryOptions],
//   );

//   const { data, status } = useQuery<ApiResponse>({
//     queryKey: ['hotel-list', queryString],
//     queryFn: () =>
//       axiosInstance(`/hotel/hotels/best-filter?${queryString}`),
//   });

//   // === Update query-state context
//   useEffect(() => {
//     handleSetQueryState(
//       status === 'pending',
//       data?.data ? data?.data.results.length : null,
//     );
//   }, [data]);

//   // === Update query-options & url
//   useEffect(() => {
//     const { startDate, endDate } = getDates(dates);
//     let queryPassengers;
//     if (!passengers.rooms) queryPassengers = '0';
//     else {
//       queryPassengers = rooms
//         .map((item) => item.adults + item.children)
//         .toString();
//     }

//     setQueryOptions({
//       endDate,
//       startDate,
//       city: hotelOrCity.city,
//       passengers: queryPassengers,
//       star: star?.join(',') ?? '',
//       page: page?.toString() ?? '1',
//       province: hotelOrCity.province,
//       minPrice: minPrice ? minPrice.toString() : '',
//       maxPrice: maxPrice ? maxPrice.toString() : '',
//       residenceType: residenceType?.join(',') ?? '',
//       roomFacilities: roomFacilities?.join(',') ?? '',
//       hotelFacilities: hotelFacilities?.join(',') ?? '',
//     });

//     router.replace(
//       `/hotel?${startDate ? `&start-date=${startDate}` : ''}${endDate ? `&end-date=${endDate}` : ''}${hotelOrCity.city ? `&city=${hotelOrCity.city}` : ''}${hotelOrCity.province ? `&province=${hotelOrCity.province}` : ''}${star?.length ? `&star=${star.join(',')}` : ''}${minPrice ? `&min-price=${minPrice}` : ''}${maxPrice ? `&max-price=${maxPrice}` : ''}${!passengers.rooms ? '' : `&passengers=${encodeRooms(rooms)}`}${residenceType?.length ? `&residence-type=${residenceType.join(',')}` : ''}${page ? `&page=${page}` : ''}${suggestedHotels === 'show' ? `&suggested-hotels=${suggestedHotels}` : ''}${amazingHotels === 'show' ? `&amazing-hotels=${amazingHotels}` : ''}${hotelFacilities?.length ? `&hotel-facilities=${hotelFacilities.join(',')}` : ''}${roomFacilities?.length ? `&room-facilities=${roomFacilities.join(',')}` : ''}`,
//       { scroll: true },
//     );
//   }, [
//     star,
//     page,
//     dates,
//     router,
//     minPrice,
//     maxPrice,
//     passengers,
//     hotelOrCity,
//     residenceType,
//     amazingHotels,
//     roomFacilities,
//     suggestedHotels,
//     hotelFacilities,
//   ]);

//   return (
//     <HotelListContent
//       status={status}
//       city={hotelOrCity.city}
//       data={data?.data.results}
//       totalPages={data?.data.results.length ? data?.data.total_pages : 0}
//     />
//   );
// }

'use client';

import {
  useHotelQuery,
  useDatePickerContext,
  usePassengersContext,
  useHotelOrCityContext,
} from '@/context';

import {
  getDates,
  ApiResponse,
  parseAsShowToggle,
} from './helpers/hotel-list';

import { HotelListContent } from './HotelListContent';
import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useQueryState, parseAsArrayOf, parseAsInteger } from 'nuqs';

export function HotelList() {
  const { handleSetQueryState } = useHotelQuery();

  // فیلترها از URL
  const [page] = useQueryState('page', parseAsInteger);
  const [star] = useQueryState('star', parseAsArrayOf(parseAsInteger));
  const [amazingHotels] = useQueryState('amazing-hotels', parseAsShowToggle);
  const [suggestedHotels] = useQueryState('suggested-hotels', parseAsShowToggle);
  const [minPrice] = useQueryState('min-price', parseAsInteger.withDefault(0));
  const [maxPrice] = useQueryState('max-price', parseAsInteger.withDefault(0));
  const [residenceType] = useQueryState('residence-type', parseAsArrayOf(parseAsInteger));
  const [hotelFacilities] = useQueryState('hotel-facilities', parseAsArrayOf(parseAsInteger));
  const [roomFacilities] = useQueryState('room-facilities', parseAsArrayOf(parseAsInteger));

  // کانتکست‌ها
  const { confirmedValue: dates } = useDatePickerContext();
  const { confirmedValue: hotelOrCity } = useHotelOrCityContext();
  const { rooms, confirmedPassengers: passengers } = usePassengersContext();

  // استخراج مقادیر Primitive برای جلوگیری از تغییر رفرنس آبجکت‌ها
  const { startDate = '', endDate = '' } = getDates(dates) || {};
  const city = hotelOrCity?.city ?? '';
  const province = hotelOrCity?.province ?? '';
  const starString = star?.join(',') ?? '';
  const residenceTypeString = residenceType?.join(',') ?? '';
  const hotelFacilitiesString = hotelFacilities?.join(',') ?? '';
  const roomFacilitiesString = roomFacilities?.join(',') ?? '';
  const pageString = page?.toString() ?? '1';

  const queryPassengers = useMemo(() => {
    if (!passengers?.rooms || !rooms) return '0';
    return rooms.map((item) => item.adults + item.children).toString();
  }, [passengers?.rooms, rooms]);

  // ۱. ساخت مستقیم و پایدار queryString (بدون واسطه آبجکت)
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (startDate) params.set('start-date', startDate);
    if (endDate) params.set('end-date', endDate);
    if (city) params.set('city', city);
    if (province) params.set('province', province);
    if (queryPassengers) params.set('passengers', queryPassengers);
    if (starString) params.set('star', starString);
    if (pageString) params.set('page', pageString);
    if (minPrice) params.set('min-price', minPrice.toString());
    if (maxPrice) params.set('max-price', maxPrice.toString());
    if (residenceTypeString) params.set('residence-type', residenceTypeString);
    if (hotelFacilitiesString) params.set('hotel-facilities', hotelFacilitiesString);
    if (roomFacilitiesString) params.set('room-facilities', roomFacilitiesString);
    if (amazingHotels === 'show') params.set('amazing-hotels', 'show');
    if (suggestedHotels === 'show') params.set('suggested-hotels', 'show');

    return params.toString();
  }, [
    startDate,
    endDate,
    city,
    province,
    queryPassengers,
    starString,
    pageString,
    minPrice,
    maxPrice,
    residenceTypeString,
    hotelFacilitiesString,
    roomFacilitiesString,
    amazingHotels,
    suggestedHotels,
  ]);

  // ۲. فراخوانی API با نگه‌داشتن دیتای قبلی حین لودینگ
  const { data, status, isFetching } = useQuery<ApiResponse>({
    queryKey: ['hotel-list', queryString],
    queryFn: () => axiosInstance(`/hotel/hotels/best-filter?${queryString}`),
    // جلوگیری از خالی شدن دیتا هنگام تعویض فیلتر (جلوگیری از پرش کامپوننت‌ها):
    placeholderData: (previousData) => previousData,
  });

  const isPending = status === 'pending';
  const resultsCount = data?.data?.results?.length ?? null;

  // ۳. آپدیت کانتکست (اگر تست کردی و مشکل از این بود، کامنتش کن)
  useEffect(() => {
    handleSetQueryState(isPending, resultsCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, resultsCount]);

  return (
    <HotelListContent
      status={status}
      city={city}
      isFetching={isFetching}
      data={data?.data?.results}
      totalPages={data?.data?.results?.length ? data.data.total_pages : 0}
    />
  );
}