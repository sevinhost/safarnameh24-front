// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { SubscriptionPickerPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX, useState } from 'react';
import { addCommas } from '@persian-tools/persian-tools';
import BuySubscriptionDialog from './dialog/buySubscriptionDialog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETSubscriptionPackages } from '@/types/dashboard/api/get';
import { Skeleton } from '@/components/ui/skeleton';

// Creating and exporting SubscriptionPicker component as default
export default function SubscriptionPicker({
  className,
  disabled = false,
}: SubscriptionPickerPropsType): JSX.Element {
  // Defininig hooks
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [activeSwiperSlideIndex, setActiveSwiperSlideIndex] =
    useState<number>(0);

  const getData = useApiQuery<GETSubscriptionPackages[]>({
    url: '/subscription/packages/',
    queryKey: ['subscription-packages'],
    options: {
      staleTime: Infinity,
      refetchInterval: Infinity,
    },
  });

  // Returning JSX
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-black/10 bg-white',
        disabled && 'pointer-events-none select-none opacity-50',
        className,
      )}
    >
      {!getData.isLoading && !getData.isError && getData.data && (
        <BuySubscriptionDialog
          id={getData.data[activeSwiperSlideIndex].id}
          open={modalOpened}
          onOpenChange={setModalOpened}
        />
      )}
      <div className="flex items-center justify-between gap-3 border-b border-b-black/10 p-[14px] lg:p-4">
        <div className="flex flex-1 items-center justify-start gap-3 overflow-hidden">
          <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[10px] border border-black/10 text-black lg:rounded-md">
            <IconsaxIcons
              name="Crown1"
              className="h-[20px] w-[20px]"
              color="currentColor"
            />
          </div>
          <div className="w-full overflow-hidden">
            <span className="mb-1 block truncate text-right text-[12px] font-semibold text-black lg:text-cs75">
              مدیریت و تمدید اشتراک
            </span>
            <p className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
              جهت خرید یا تمدید دوره‌ی اشتراک خود، از این بخش استفاده کنید.
            </p>
          </div>
        </div>
        {getData.isLoading ? (
          <Skeleton className="h-[38px] w-[200px] lg:h-[45px] lg:w-[125px]" />
        ) : (
          <button
            className="flex h-[38px] w-fit shrink-0 items-center justify-center truncate rounded-md border border-green-500 bg-green-500 px-3 text-cs75 text-xs font-medium text-white transition-all duration-500 hover:bg-green-600 disabled:border-black/10 disabled:bg-gray-50 disabled:text-black lg:h-[45px] lg:w-[125px] lg:px-6 lg:text-sm"
            disabled={disabled || getData.isError || !getData.data}
            tabIndex={disabled ? -1 : 0}
            onClick={() => !disabled && setModalOpened(true)}
          >
            خرید اشتراک
          </button>
        )}
      </div>
      <div className="grid gap-4 p-[14px] lg:grid-cols-9 lg:p-4">
        <div className="flex h-[190px] items-center justify-center overflow-hidden rounded-xl bg-gray-200 px-8 lg:col-span-4 lg:h-[230px]">
          {getData.isLoading ? (
            <Skeleton className="h-[175px] w-full bg-black/50" />
          ) : disabled || (!disabled && getData.data?.length === 0) ? (
            <div className="hidden h-[175px] w-full flex-col items-center justify-between gap-3 rounded-xl bg-gray-300 bg-gradient-to-bl from-transparent to-cs-red p-4 text-white">
              <div className="w-full">
                <span className="block flex-1 truncate text-left text-cs75 font-semibold text-white">
                  اشتراک سفرنامه 24
                </span>
              </div>
              <div className="w-full">
                <span className="mb-1.5 block truncate text-left text-cs95 font-medium text-white">
                  _
                </span>
                <span className="block truncate text-left text-cs85 font-semibold text-white">
                  _
                </span>
              </div>
            </div>
          ) : (
            !getData.isError &&
            getData.data && (
              <Swiper
                className="h-[175px] w-full !overflow-visible"
                spaceBetween={20}
                enabled={!disabled}
                onSlideChange={(swiper) => {
                  const activeIndex = swiper.activeIndex;
                  setActiveSwiperSlideIndex(activeIndex);
                }}
              >
                {getData.data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      style={{
                        background: item.color,
                        backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0, 0.5) , ${item.color})`,
                      }}
                      className="flex h-full w-full flex-col items-center justify-between gap-3 rounded-xl bg-gray-300 bg-gradient-to-bl from-transparent p-4 text-white"
                    >
                      <div className="w-full">
                        <span className="block flex-1 truncate text-left text-cs75 font-semibold text-white">
                          اشتراک سفرنامه 24
                        </span>
                      </div>
                      <div className="w-full">
                        <span className="mb-1.5 block truncate text-left text-cs95 font-medium text-white">
                          {item.name}
                        </span>
                        <span className="block truncate text-left text-cs85 font-semibold text-white">
                          {`${addCommas(Number(item.monthly_cost))} تومان`}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )
          )}
        </div>
        <div className="grid gap-4 lg:col-span-5 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-start gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[10px] border border-black/10 text-black lg:rounded-md">
                <IconsaxIcons
                  name="Tag"
                  className="h-[20px] w-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="w-full overflow-hidden">
                <span className="mb-1 block truncate text-right text-[12px] font-semibold text-black lg:text-cs75">
                  نام
                </span>
                {getData.isLoading ? (
                  <Skeleton className="h-[18px] w-full" />
                ) : getData.isError ? (
                  <span className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
                    -
                  </span>
                ) : !getData.isLoading && !getData.isError && getData.data ? (
                  <span className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
                    {activeSwiperSlideIndex !== undefined
                      ? getData.data[activeSwiperSlideIndex].name
                      : '-'}
                  </span>
                ) : (
                  false
                )}
              </div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[10px] border border-black/10 text-black lg:rounded-md">
                <IconsaxIcons
                  name="InfoCircle"
                  className="h-[20px] w-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="w-full overflow-hidden">
                <span className="mb-1 block truncate text-right text-[12px] font-semibold text-black lg:text-cs75">
                  توضیحات
                </span>
                {getData.isLoading ? (
                  <Skeleton className="h-[18px] w-full" />
                ) : getData.isError ? (
                  <span className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
                    -
                  </span>
                ) : !getData.isLoading && !getData.isError && getData.data ? (
                  <span className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
                    {activeSwiperSlideIndex !== undefined
                      ? getData.data[activeSwiperSlideIndex].short_description
                      : '-'}
                  </span>
                ) : (
                  false
                )}
              </div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[10px] border border-black/10 text-black lg:rounded-md">
                <IconsaxIcons
                  name="Money"
                  className="h-[20px] w-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="w-full overflow-hidden">
                <span className="mb-1 block truncate text-right text-[12px] font-semibold text-black lg:text-cs75">
                  هزینه ماهانه
                </span>
                {getData.isLoading ? (
                  <Skeleton className="h-[18px] w-full" />
                ) : getData.isError ? (
                  <span className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
                    -
                  </span>
                ) : !getData.isLoading && !getData.isError && getData.data ? (
                  <span className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
                    {activeSwiperSlideIndex !== undefined
                      ? `${addCommas(Number(getData.data[activeSwiperSlideIndex].monthly_cost))} تومان`
                      : '-'}
                  </span>
                ) : (
                  false
                )}
              </div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[10px] border border-black/10 text-black lg:rounded-md">
                <IconsaxIcons
                  name="ColorSwatch"
                  className="h-[20px] w-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="w-full overflow-hidden">
                <span className="mb-1 block truncate text-right text-[12px] font-semibold text-black lg:text-cs75">
                  رنگ
                </span>
                {getData.isLoading ? (
                  <Skeleton className="h-[18px] w-full" />
                ) : getData.isError ? (
                  <span className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
                    -
                  </span>
                ) : !getData.isLoading && !getData.isError && getData.data ? (
                  <span className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
                    {activeSwiperSlideIndex !== undefined
                      ? getData.data[activeSwiperSlideIndex].upgrade_to_level
                      : '-'}
                  </span>
                ) : (
                  false
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 lg:h-[230px]">
            <div className="flex w-full items-center justify-start gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[10px] border border-black/10 text-black lg:rounded-md">
                <IconsaxIcons
                  name="Grid1"
                  className="h-[20px] w-[20px]"
                  color="currentColor"
                />
              </div>
              <span className="block truncate text-right text-[12px] font-semibold text-black lg:text-cs75">
                اپشن ها
              </span>
            </div>
            {getData.isLoading ? (
              <div className="custom-scrollbar w-full list-inside list-disc space-y-4 overflow-auto lg:h-full">
                {[...new Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-[18px] w-full" />
                ))}
              </div>
            ) : getData.isError ? (
              false
            ) : !getData.isLoading && !getData.isError && getData.data ? (
              activeSwiperSlideIndex !== undefined && (
                <ul className="custom-scrollbar w-full list-inside list-disc space-y-4 overflow-auto lg:h-full">
                  {getData.data[activeSwiperSlideIndex].options.map(
                    (item, index) => (
                      <li
                        className="truncate text-right text-[12px] font-bold text-black/75 lg:text-cs75 lg:font-semibold"
                        key={index}
                      >
                        {item.name}
                      </li>
                    ),
                  )}
                </ul>
              )
            ) : (
              false
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
