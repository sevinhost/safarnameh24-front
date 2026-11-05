import { Pagination } from './Pagination';
import { TopBarConfig } from '../../shared';

import { Skeleton } from '@/components/ui/skeleton';
import { Hotel } from '@/types/landing/hotels';

import HotelNotFound from './molecules/hotel-not-found';
import { DHotelCard, MHotelCard } from './molecules/hotel-card';

type Props = {
  city?: string;
  data?: Hotel[];
  totalPages?: number;
  status: 'error' | 'success' | 'pending';
  isFetching?: boolean;
};

// ------------------------------

export function HotelListContent(props: Props) {
  const { data, status, city, totalPages, isFetching = false } = props;

  // ۱. تفکیک لود اولیه از آپدیت‌های پس‌زمینه فیلترها
  // اسکلتون فقط زمانی نشان داده می‌شود که هیچ دیتایی روی صفحه نباشد
  const isInitialLoading = status === 'pending' && (!data || data.length === 0);
  const isUpdating = isFetching && !!data && data.length > 0;

  // ۲. نمایش حالت خالی بودن یا خطا (تنها در صورتی که دیتایی نباشد و در حال لود هم نباشد)
  if (!isInitialLoading && (!data || data.length === 0)) {
    return (
      <div>
        <TopBarConfig
          className="mb-3"
          title={{
            type: 'single',
            text: `هتل‌های ${city ? `شهر ${city}` : 'شهرهای مختلف ایران'}`,
          }}
        />

        <HotelNotFound />
      </div>
    );
  }

  return (
    <div className="relative">
      <TopBarConfig
        className="mb-3"
        title={{
          type: 'single',
          text: `هتل‌های ${city ? `شهر ${city}` : 'شهرهای مختلف ایران'}`,
        }}
      />

      {/* ۳. حالت موبایل و تبلت (Small-Screen) */}
      <div
        className={`grid gap-6 md:grid-cols-2 xl:hidden transition-opacity duration-200 ${
          isUpdating ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
      >
        {isInitialLoading
          ? Array(8)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-[23.5rem] w-full rounded-xl bg-zinc-200/70" />
              ))
          : data?.map((hotel, index) => (
              <MHotelCard
                key={hotel.slug || (hotel as any).id || index}
                {...hotel}
                index={index} // فعال‌سازی لود با اولویت تصویر برای ۲ کارت اول
              />
            ))}
      </div>

      {/* ۴. حالت دسکتاپ (Large-Screen) */}
      <div
        className={`hidden gap-6 xl:grid transition-opacity duration-200 ${
          isUpdating ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
      >
        {isInitialLoading
          ? Array(8)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-[14rem] w-full rounded-2xl bg-zinc-200/70" />
              ))
          : data?.map((hotel, index) => (
              <DHotelCard
                key={hotel.slug || (hotel as any).id || index}
                {...hotel}
                index={index} // فعال‌سازی لود با اولویت تصویر برای ۲ کارت اول
              />
            ))}
      </div>

      {/* ۵. صفحه‌بندی */}
      <div className="mt-8">
        <Pagination pageCount={totalPages} />
      </div>
    </div>
  );
}