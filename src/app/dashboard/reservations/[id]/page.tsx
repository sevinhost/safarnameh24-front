// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, use } from 'react';
import HotelAcceptSection from '@/components/dashboard/reservationFactor/hotelAcceptSection';
import RoomsSection from '@/components/dashboard/reservationFactor/roomsSection';
import RulesSection from '@/components/dashboard/reservationFactor/rulesSection';
import Header from '@/components/dashboard/reservationFactor/header';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import {
  GETReservationFactor,
  GETReservationFactorSettings,
} from '@/types/dashboard/api/get';
import Loading from '@/components/dashboard/ui/loading';
import ErrorTable from '@/components/dashboard/api/errorTable';
import Image from 'next/image';
import TraiangleIcon from '../../../../../public/image/dashboardReservationFactor/traiangles.svg';
import LogoIcon from '../../../../../public/image/dashboardReservationFactor/logo.webp';
import Link from 'next/link';
import localFont from 'next/font/local';
import { cn } from '@/utils/utils';

// Defining fonts
const aubrey = localFont({
  preload: true,
  src: [
    {
      path: '../../../../../public/font/aubrey/Aubrey-Regular.ttf',
      weight: '400',
    },
  ],
});

const sepahboodFont = localFont({
  src: '../../../../../public/font/Sepahbod.otf',
  display: 'block',
  weight: '500',
  preload: true,
});

// Creating and exporting ReservationFactor page as default
export default function ReservationFactorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): ReactNode {
  // Defining hooks
  const { id } = use(params);
  const factorData = useApiQuery<GETReservationFactor>({
    url: `/hotel/reservation/invoices/${id}/`,
    queryKey: [`reservation-factor-${id}`],
    options: {
      refetchInterval: Infinity,
      staleTime: Infinity,
    },
  });

  const settingsData = useApiQuery<GETReservationFactorSettings>({
    url: '/hotel/reservation/factor/signator/',
    queryKey: [`reservation-factor-settings`],
    options: {
      enabled: !factorData.isLoading,
      refetchInterval: Infinity,
      staleTime: Infinity,
    },
  });

  // Conditional rendering
  if (
    factorData.isLoading ||
    factorData.isRefetching ||
    settingsData.isLoading ||
    settingsData.isRefetching
  ) {
    return (
      <main className="fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center p-5">
        <Loading className="bg-cs-red" />
      </main>
    );
  } else if (factorData.isError || settingsData.isError) {
    return (
      <ErrorTable
        className="h-auto min-h-dvh bg-transparent p-5"
        refetch={factorData.refetch}
      />
    );
  } else if (
    !factorData.isLoading &&
    !factorData.isError &&
    factorData.data &&
    !settingsData.isLoading &&
    !settingsData.isError &&
    settingsData.data
  ) {
    // Defining variables
    const data = factorData.data.reservation;
    const settings = settingsData.data.invoice_settings;

    // Returning JSX
    return (
      <>
        <div className="hidden w-dvw bg-white p-5 text-black print:block">
          <Image
            alt="Traiangle Icon"
            src={TraiangleIcon.src}
            width={500}
            height={500}
            className="pointer-events-none fixed left-0 top-0 z-10 h-auto w-[25%] -translate-y-1/4 select-none"
            priority
            unoptimized
          />
          <Image
            alt="Traiangle Icon"
            src={TraiangleIcon.src}
            width={500}
            height={500}
            className="pointer-events-none fixed bottom-0 right-0 z-10 h-auto w-[25%] translate-y-1/4 rotate-180 select-none"
            priority
            unoptimized
          />
          <div className="pointer-events-none absolute right-5 top-5 z-20 select-none">
            <Image
              alt="لوگو سفرنامه ۲۴"
              priority
              unoptimized
              src={LogoIcon.src}
              width={500}
              height={500}
              className="pointer-events-none mx-auto block w-[65px] select-none"
            />
            <span
              className={cn(
                'block text-center text-cs07 font-medium text-black',
                aubrey.className,
              )}
            >
              safarnameh24
            </span>
            <span
              className={cn(
                'block text-center text-cs07 font-normal text-black',
                sepahboodFont.className,
              )}
            >
              سفرنامه ۲۴
            </span>
            <span
              className={'block text-center text-cs06 font-normal text-black'}
            >
              شماره ثبت: 603443
            </span>
          </div>
          <Image
            alt="لوگو سفرنامه ۲۴"
            priority
            unoptimized
            src={LogoIcon.src}
            width={500}
            height={500}
            className="pointer-events-none fixed left-1/2 top-1/2 z-0 w-[75%] -translate-x-1/2 -translate-y-1/2 select-none opacity-10 contrast-0"
          />
          <div className="absolute bottom-5 left-5 z-20 py-3" dir="ltr">
            <div className="mb-3 h-px w-full bg-gradient-to-r from-transparent via-black to-transparent" />
            <div className="mb-2 flex items-center justify-between gap-5">
              <Link
                href={`tel:${settings.contact_number_1}`}
                className="flex w-fit items-center justify-start gap-2 text-cs-red"
              >
                <IconsaxIcons
                  name="Call"
                  color="currentColor"
                  variant="Bold"
                  className="size-5"
                />
                <span className="block flex-1 truncate text-left text-xs font-light text-black">
                  {settings.contact_number_1}
                </span>
              </Link>
              <Link
                href={`tel:${settings.contact_number_2}`}
                className="flex w-fit items-center justify-start gap-2 text-cs-red"
              >
                <IconsaxIcons
                  name="Call"
                  color="currentColor"
                  variant="Bold"
                  className="size-5"
                />
                <span className="block flex-1 truncate text-left text-xs font-light text-black">
                  {settings.contact_number_2}
                </span>
              </Link>
            </div>
            <div className="flex items-center justify-end gap-2 text-cs-red">
              <span className="block flex-1 truncate text-right text-xs font-light text-black">
                {settingsData.data.invoice_settings.postal_address}
              </span>
              <IconsaxIcons
                name="Location"
                color="currentColor"
                className="size-5 shrink-0"
              />
            </div>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-black to-transparent" />
          </div>
          <div className="absolute right-0 h-auto w-full p-5 pt-[120px]">
            <HotelAcceptSection
              className="relative z-10"
              hotelName={`${settings.title} - هتل ${data.hotel.name}`}
              noMq
              data={{
                codePeigiri: data.tracking_code,
                createdAt: data.created_at,
                enterAt: data.check_in_date,
                exitAt: data.check_out_date,
                phoneNumber: data.reserver_phone,
                reserver: data.reserver_name,
              }}
            />
            <RoomsSection
              className="relative z-10 mt-5 border-t border-t-black/50 pt-5"
              noMq
              data={data.rooms.map((item) => ({
                info: {
                  enteranceHalfCharge: item.half_day_in,
                  exitHalfCharge: item.half_day_out,
                  hotelName: item.room_name,
                  meals: item.services,
                  reserver: data.reserver_name,
                  timeSpan: item.nights,
                },
                passenger: data.passengers
                  .filter((passenger) => passenger.name !== data.reserver_name)
                  .map((passenger) => passenger.name),
              }))}
            />
          </div>
        </div>
        <main className="flex flex-col gap-[25px] bg-white p-[24px] pb-[100px] pt-[calc(28px+24px)] lg:gap-8 lg:p-5 lg:pb-5 lg:pt-5 print:hidden">
          <Header />
          <HotelAcceptSection
            printFn={() => window.print()}
            hotelName={`${settings.title} - هتل ${data.hotel.name}`}
            data={{
              codePeigiri: data.tracking_code,
              createdAt: data.created_at,
              enterAt: data.check_in_date,
              exitAt: data.check_out_date,
              phoneNumber: data.reserver_phone,
              reserver: data.reserver_name,
            }}
          />
          <div className="hidden items-center justify-between gap-5 rounded-lg border border-black/10 bg-[#f8f8f8] p-3 lg:flex lg:h-16">
            <p className="block truncate text-right text-cs75 font-semibold text-[#2c2c2c]">{`هتل ${data.hotel.name} - ${data.hotel.address}`}</p>
          </div>
          <div className="block border-y-[1.5px] border-black/10 py-[20px] lg:hidden">
            <div className="flex items-start justify-start gap-[10px]">
              <div className="flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-[5px] bg-gray-100">
                <IconsaxIcons name="Location" className="h-[17px] w-[17px]" />
              </div>
              <div>
                <span className="mb-1 block truncate text-right text-[12px] font-bold text-black">
                  آدرس هتل
                </span>
                <p className="text-right text-[10px] font-medium text-gray-600">
                  {data.hotel.address}
                </p>
              </div>
            </div>
          </div>
          <RoomsSection
            data={data.rooms.map((item) => ({
              info: {
                enteranceHalfCharge: item.half_day_in,
                exitHalfCharge: item.half_day_out,
                hotelName: item.room_name,
                meals: item.services,
                reserver: data.reserver_name,
                timeSpan: item.nights,
              },
              passenger: data.passengers
                .filter((passenger) => passenger.name !== data.reserver_name)
                .map((passenger) => passenger.name),
            }))}
          />
          <RulesSection
            contactNumber={settings.contact_number_1}
            signatureImage={settings.signature_image}
            hotelName={data.hotel.name}
            rules={data.hotel_rules}
          />
        </main>
      </>
    );
  }
}
