'use client';

import { useMediaQuery } from '@/hooks';
import { TopBarConfig } from '../../shared';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  title: string;
  image: string;
  description: string;
  items: { title: string; subtitle: string }[];
};

type ApiResponse = {
  data: Data;
};

// -----------------------------------------------

export function OurStory() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-statistics'],
    queryFn: () => generalInstance('/config/statistics'),
  });

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div>
      <TopBarConfig
        title={{ type: 'single', text: 'درباره ما' }}
        subtitle="داستان مجموعه سفرنامه 24 از کجا شروع شد ؟"
      />

      <div className="grid gap-8 lg:grid-flow-col-dense lg:grid-cols-[1fr_1.2fr]">
        {/* Story */}
        <div className="space-y-3 rounded-xl border-2 border-zinc-200 bg-white px-3 py-6 shadow-[0_0.5rem_1.5rem_rgb(0,0,0,0.05)] lg:order-2 lg:space-y-3 lg:rounded-2xl lg:py-8">
          {status === 'pending' ? (
            <Skeleton className="h-6 w-1/3" />
          ) : (
            <h2 className="px-4 text-base font-extrabold text-zinc-800 lg:text-xl">
              {data?.data.title}
            </h2>
          )}

          {status === 'pending' ? (
            Array(11)
              .fill(null)
              .map((_, index) => <Skeleton key={index} className="h-4" />)
          ) : (
            <p
              dir={isDesktop ? 'rtl' : 'ltr'}
              className="custom-scrollbar h-72 overflow-auto px-4 text-justify text-cs85/[1.6rem] font-semibold text-zinc-600 lg:h-[26rem]"
            >
              {data?.data.description}
            </p>
          )}
        </div>

        {/* Image | Information */}
        <div className="flex flex-col gap-8 lg:order-1">
          <div className="h-64 overflow-hidden rounded-xl bg-zinc-200 shadow-[0_0.5rem_1.5rem_rgb(0,0,0,0.05)] lg:h-72 lg:rounded-2xl">
            {data?.data.image && (
              <Image
                width={400}
                height={200}
                alt="our-story"
                src={data?.data.image}
                className="full-size object-cover"
              />
            )}
          </div>

          <div className="grid gap-3 rounded-xl border-2 border-zinc-200 bg-white p-4 shadow-[0_0.5rem_1.5rem_rgb(0,0,0,0.05)] lg:flex-1 lg:grid-cols-2 lg:rounded-2xl">
            {status === 'pending'
              ? Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="h-[5.4rem]" />
                  ))
              : data?.data.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-[5.4rem] flex-col justify-center gap-1.5 rounded-cs-10 bg-zinc-100 px-5 lg:h-auto"
                  >
                    <span className="font-extrabold text-zinc-800">
                      {item.title}
                    </span>
                    <span className="text-cs08 font-semibold text-zinc-600">
                      {item.subtitle}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
