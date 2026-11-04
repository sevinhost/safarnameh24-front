'use client';

import { Room } from '@/types/landing';
import { useRouter } from 'next/navigation';

import { axiosInstance } from '@/utils/axios';
import { Section } from './molecules/Section';
import { useQuery } from '@tanstack/react-query';

import { DateObject } from 'react-multi-date-picker';
import { useEffect, useMemo, useState } from 'react';
import { RoomsContent } from './molecules/rooms/RoomsContent';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';
import { useDatePickerContext, usePassengersContext } from '@/context';

type Props = { hotelSlug: string };
type Rooms = { adults: number; children: number }[];

const dateInfo = {
  calendar: persianCalendar,
  locale: persianLanguage,
};

const buildQueryString = (options: {
  endDate: string;
  startDate: string;
  passengers: string;
}) => {
  return `start-date=${options.startDate}&end-date=${options.endDate}&passengers=${options.passengers}`;
};

// ----------------------------------

export function Rooms({ hotelSlug }: Props) {
  const router = useRouter();

  const { confirmedValue: dates } = useDatePickerContext();
  const { rooms, confirmedPassengers } = usePassengersContext();

  const [queryOptions, setQueryOptions] = useState({
    endDate: '',
    startDate: '',
    passengers: '',
  });

  const queryString = useMemo(
    () => buildQueryString(queryOptions),
    [queryOptions],
  );

  const { data, status } = useQuery<{ data: Room[] }>({
    queryKey: ['hotel-rooms', queryString],
    queryFn: () =>
      axiosInstance(`/hotel/hotels/${hotelSlug}/rooms?${queryString}`),
  });

  // === Update query-options & url
  useEffect(() => {
    const startDate =
      dates?.[0]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') || new DateObject(dateInfo).format('YYYY-MM-DD');

    const endDate =
      dates?.[1]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') ||
      new DateObject(dateInfo).add(1, 'days').format('YYYY-MM-DD');

    let passengers;
    if (!confirmedPassengers.rooms) passengers = '0';
    else {
      passengers = rooms.map((item) => item.adults + item.children).toString();
    }

    setQueryOptions({
      endDate,
      startDate,
      passengers,
    });

    function encodeRooms(rooms: Rooms) {
      return rooms.map((r) => `${r.adults},${r.children}`).join('-');
    }

    router.replace(
      `/hotel/${hotelSlug}?start-date=${startDate}&end-date=${endDate}${passengers === '0' ? '' : `&passengers=${encodeRooms(rooms)}`}`,
      {
        scroll: false,
      },
    );
  }, [dates, confirmedPassengers, router, hotelSlug]);

  return (
    <Section sectionID="rooms">
      <RoomsContent data={data?.data} status={status} />
    </Section>
  );
}
