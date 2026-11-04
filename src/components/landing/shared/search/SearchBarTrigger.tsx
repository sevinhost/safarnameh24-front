'use client';

import {
  usePassengersContext,
  useDatePickerContext,
  useHotelOrCityContext,
} from '@/context';

import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, SearchStatus } from 'iconsax-react';
import { usePathname, useRouter } from 'next/navigation';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_fa';

type Props = { setDialogOpen: () => void };

// --------------------------------

export default function SearchBarTrigger(props: Props) {
  const { setDialogOpen } = props;

  const router = useRouter();
  const pathname = usePathname();

  const { confirmedValue } = useDatePickerContext();
  const { confirmedPassengers } = usePassengersContext();
  const { confirmedValue: hotelCity } = useHotelOrCityContext();

  const numberOfNights = useMemo(() => {
    const confirmedCheck = confirmedValue?.[0] && confirmedValue?.[1];
    if (!confirmedCheck) return 0;

    return (confirmedValue[1].unix - confirmedValue[0].unix) / 86400;
  }, [confirmedValue]);

  const calendarDetail = useMemo(() => {
    const formattedCalendar = [
      confirmedValue?.[0].convert(persianCalendar, persianLanguage),
      confirmedValue?.[1].convert(persianCalendar, persianLanguage),
    ];

    if (formattedCalendar?.[0] && formattedCalendar?.[1]) {
      return {
        startDate: {
          day: formattedCalendar?.[0].day,
          year: formattedCalendar?.[0].year,
          month: formattedCalendar?.[0].month.name,
        },
        endDate: {
          day: formattedCalendar?.[1].day,
          year: formattedCalendar?.[1].year,
          month: formattedCalendar?.[1].month.name,
        },
      };
    }
  }, [confirmedValue]);

  return (
    <>
      {pathname === '/' ? (
        <button
          className="bg-zinc-200/50 h-12 text-zinc-700 text-cs08 font-semibold px-5 flex items-center gap-3 rounded-cs-10"
          onClick={setDialogOpen}
        >
          <SearchStatus size={19} color="#555" />
          <span>جستجو شهر یا هتل ...</span>
        </button>
      ) : pathname === '/hotel' ? (
        confirmedValue?.[0] ? (
          <div className="bg-zinc-200/50 h-14 px-[1.1rem] flex items-center gap-4 rounded-cs-10">
            <div className="font-semibold grid gap-1">
              <div className="text-cs75 flex gap-1">
                {hotelCity.city ? (
                  <>
                    <span>هتل های</span>
                    <span>{hotelCity.city}</span>
                  </>
                ) : (
                  <span>شهر مقصد انتخاب نشده است</span>
                )}
              </div>

              <div className="text-cs07 text-zinc-500 flex gap-0.5">
                <span>{calendarDetail?.startDate.day}</span>
                <span>{calendarDetail?.startDate.month}</span>
                <span>تا</span>
                <span>{calendarDetail?.endDate.day}</span>
                <span>{calendarDetail?.endDate.month}</span>
                <span>,</span>
                <span>{numberOfNights} شب اقامت</span>

                {confirmedPassengers.passengers > 0 ? (
                  <>
                    <span>,</span>
                    <span>{confirmedPassengers.passengers} مسافر</span>
                    <span>,</span>
                    <span>{confirmedPassengers.rooms} اتاق</span>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>

            <SearchStatus
              size={19}
              color="#222"
              onClick={setDialogOpen}
              className="mr-auto cursor-pointer"
            />
          </div>
        ) : (
          <Skeleton className="h-14 rounded-cs-10" />
        )
      ) : confirmedValue?.[0] ? (
        <div className="h-10 flex items-center gap-4">
          <ArrowRight
            size={20}
            color="#555"
            className="cursor-pointer"
            onClick={() => router.back()}
          />

          <div className="text-cs75 font-semibold grid gap-1">
            <div className="flex gap-1">
              <span>{calendarDetail?.startDate.day}</span>
              <span>{calendarDetail?.startDate.month}</span>
              <span>{calendarDetail?.startDate.year}</span>
              <span>-</span>
              <span>{calendarDetail?.endDate.day}</span>
              <span>{calendarDetail?.endDate.month}</span>
              <span>{calendarDetail?.endDate.year}</span>
            </div>

            <div className="text-zinc-500 flex gap-1">
              <span>{numberOfNights} شب اقامت</span>

              {confirmedPassengers.passengers > 0 ? (
                <>
                  <span>,</span>
                  <span>{confirmedPassengers.passengers} مسافر</span>
                  <span>,</span>
                  <span>{confirmedPassengers.rooms} اتاق</span>
                </>
              ) : (
                ''
              )}
            </div>
          </div>

          <SearchStatus
            color="#555"
            onClick={setDialogOpen}
            className="bg-zinc-200/50 w-9 h-9 p-2 mr-auto cursor-pointer rounded-lg"
          />
        </div>
      ) : (
        <Skeleton className="h-10 rounded-lg" />
      )}
    </>
  );
}
