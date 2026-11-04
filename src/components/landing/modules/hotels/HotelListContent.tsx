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
  isFetching?: boolean; // ۱. اضافه شدن پراپ
};

// ------------------------------

export function HotelListContent(props: Props) {
  const { data, status, city, totalPages, isFetching } = props;

  // ۲. تعریف وضعیت لودینگ (چه در اولین لود چه حین تغییر فیلترها)
  const isLoading = status === 'pending' || isFetching;

  if (!isLoading && (!data || !data?.length)) {
    return (
      <>
        <TopBarConfig
          className="mb-3"
          title={{
            type: 'single',
            text: `هتل های شهر ${city ? city : 'های مختلف ایران'}`,
          }}
        />

        <HotelNotFound />
      </>
    );
  }

  return (
    <div>
      <TopBarConfig
        className="mb-3"
        title={{
          type: 'single',
          text: `هتل های شهر ${city ? city : 'های مختلف ایران'}`,
        }}
      />

      {/* === Small-Screen */}
      <div className="grid gap-6 md:grid-cols-2 xl:hidden">
        {isLoading
          ? Array(8)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-[23.5rem] rounded-xl" />
              ))
          : data?.map((hotel, index) => <MHotelCard key={index} {...hotel} />)}
      </div>

      {/* === Large-Screen */}
      <div className="hidden gap-6 xl:grid">
        {isLoading
          ? Array(8)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-[14rem] rounded-2xl" />
              ))
          : data?.map((hotel, index) => <DHotelCard key={index} {...hotel} />)}
      </div>

      <Pagination pageCount={totalPages} />
    </div>
  );
}