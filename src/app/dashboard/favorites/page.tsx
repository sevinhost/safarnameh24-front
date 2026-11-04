'use client';

import Filter from '@/components/dashboard/favoritesId/filter';
import { ReactNode, useState } from 'react';
import CustomPagination from '@/components/dashboard/ui/customPagination';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETFavoritesSingle } from '@/types/dashboard/api/get';
import ErrorTable from '@/components/dashboard/api/errorTable';
import EmptyTable from '@/components/dashboard/api/emptyTable';
import { useParams } from 'next/navigation';
import { SuggestedHotel } from '@/components/landing/shared';
import Blog from '@/components/dashboard/favoritesId/blog';
import { Skeleton } from '@/components/ui/skeleton';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import DeleteItemDialog from '@/components/dashboard/favoritesId/dialog/deleteItemDialog';

export default function FavoritesPage(): ReactNode {
  // Defining states of component
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const [deleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
  const [deleteDialogId, setDeleteDialogId] = useState<number | undefined>(undefined);
  const [savedType, setSavedType] = useState<'savedHotels' | 'savedBlogs'>('savedHotels');
  
  const params = useParams();
  const id = params.id as string;

  // ۱. متغیرهای id و paginationNumber به queryKey اضافه شدند و useEffect حذف شد
  const getData = useApiQuery<GETFavoritesSingle>({
    url: `/favorite/collections/${id}?p=${paginationNumber + 1}`,
    queryKey: ['favorites', 'list', String(id), String(paginationNumber)],
    options: {
      staleTime: 30000, // 30 Sec
      enabled: !!id,
    },
  });

  const itemToRender = !getData.data
    ? []
    : savedType === 'savedHotels'
      ? getData.data.results.items.filter((item) => item.type === 'hotel')
      : getData.data.results.items.filter((item) => item.type === 'article');

  // ۲. توابع کمکی برای تمیز کردنِ JSX
  const renderLoading = () => (
    <>
      <Filter loading favName="X" />
      <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]">
        {[...new Array(12)].map((_, index) => (
          <Skeleton key={index} className="h-[200px] rounded-lg" />
        ))}
      </div>
    </>
  );

  const renderEmpty = () => (
    <EmptyTable
      className="lg:col-span-4 col-span-1 lg:bg-transparent border-none"
      title="هیچ آیتمی فعلا ندارید!"
      description="مشتری گرامی، برای ثبت آیتم می‌توانید از وبسایت اقدام نمایید. از همراهی شما متشکریم."
    />
  );

  const renderContent = () => {
    if (getData.data!.count === 0) return renderEmpty();

    return (
      <>
        <Filter
          favName={getData.data!.results.title}
          loading={false}
          onChange={setSavedType}
        />
        
        {itemToRender.length === 0 ? (
          renderEmpty()
        ) : (
          <>
            <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]">
              {deleteDialogId && (
                <DeleteItemDialog
                  isOpened={deleteDialogOpened}
                  id={deleteDialogId}
                  refetch={getData.refetch}
                  type={savedType === 'savedHotels' ? 'hotel' : 'article'}
                  closeFn={() => {
                    setDeleteDialogOpened(false);
                    setDeleteDialogId(undefined);
                  }}
                />
              )}
              
              {/* منطق شرطی رندر کردن آیتم‌ها ساده‌تر شد */}
              {itemToRender.map((item, index) => {
                if (savedType === 'savedHotels' && item.type === 'hotel') {
                  return (
                    <div className="relative" key={index}>
                      <button
                        className="absolute left-[18px] top-[18px] z-10 flex size-[40px] items-center justify-center rounded-lg backdrop-blur-xl p-2 text-white"
                        onClick={() => {
                          setDeleteDialogOpened(true);
                          setDeleteDialogId(item.actual_id);
                        }}
                      >
                        <IconsaxIcons
                          className="w-full aspect-square"
                          color="currentColor"
                          variant="Bold"
                          name="Heart"
                        />
                      </button>
                      <SuggestedHotel
                        showDiscount={true}
                        showTimer={false}
                        hotel={{
                          average_score: item.average_score ? Number(item.average_score.toFixed(1)) : item.rating,
                          city: item.city,
                          discount_expiry: item.discount_date || '-',
                          discount_percentage: item.discount_percentage,
                          id: item.id,
                          main_image: item.main_image,
                          name: item.name,
                          original_total_price: item.price,
                          rating: item.rating,
                          slug: item.slug,
                          stars: item.stars,
                          total_price: item.price_after_discount,
                        }}
                      />
                    </div>
                  );
                }

                if (savedType === 'savedBlogs' && item.type === 'article') {
                  return (
                    <Blog
                      key={index}
                      desc={item.summary}
                      actualId={item.id}
                      onLikeClick={() => {
                        setDeleteDialogOpened(true);
                        setDeleteDialogId(item.actual_id);
                      }}
                      createdAt={item.published_date}
                      image={item.thumbnail}
                      title={item.title}
                    />
                  );
                }

                return null;
              })}
            </div>

            {getData.data!.count > 18 && (
              <div className="flex items-center justify-center lg:justify-end">
                <CustomPagination
                  count={getData.data!.count}
                  activeIndex={paginationNumber}
                  setActiveIndex={setPaginationNumber}
                />
              </div>
            )}
          </>
        )}
      </>
    );
  };

  // ۳. مدیریت خروجی نهایی به شدت تمیز شد
  const renderMainState = () => {
    if (getData.isLoading || getData.isRefetching) return renderLoading();
    if (getData.isError) return <ErrorTable refetch={getData.refetch} />;
    if (getData.data) return renderContent();
    return null;
  };

  return (
    <main className="flex flex-col gap-[24px] p-0 px-[24px] pt-[24px] pb-[50px] lg:p-5 lg:pb-5 lg:gap-5 lg:px-5">
      {renderMainState()}
    </main>
  );
}