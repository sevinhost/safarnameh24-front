'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { IconsName } from '@/types';
import { TopBarConfig } from '../../shared';
import { Skeleton } from '@/components/ui/skeleton';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';
import Image from 'next/image';

type Data = {
  title: string;
  subtitle: string;
  link: string | null;
  value: string | null;
  icon: { link: string };
};

type ApiResponse = { data: Data[] };

// ---------------------------------------

export function ContactUsWays() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['contact-info'],
    queryFn: () => generalInstance('/config/contact-info'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div>
      <TopBarConfig
        title={{ type: 'single', text: 'تماس با ما' }}
        subtitle="راه های ارتباطی با آژانس سفرنامه ۲۴"
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-5">
        {status == 'pending' ? (
          <>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-32 rounded-xl xl:h-44" />
              ))}
          </>
        ) : (
          data?.data.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-xl border-2 border-zinc-100 bg-white p-5 shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)] xl:flex-col"
            >
              {/* Icon */}
              <div className="flex-center h-10 w-10 rounded-md border border-zinc-200">
                {item.icon.link && (
                  <Image
                    alt="icon"
                    width={20}
                    height={20}
                    src={item.icon.link}
                  />
                )}
              </div>

              {/* {/* Title | Subtitle | Detail */}
              <div className="flex flex-1 flex-col gap-3 font-bold text-zinc-800">
                <div className="line-clamp-1 text-cs85 font-extrabold">
                  {item.title}
                </div>

                <div className="line-clamp-1 text-cs75 text-zinc-500">
                  {item.subtitle}
                </div>

                {item.link ? (
                  <Link href={item.link} target="_blank" className="text-cs85">
                    {item.value}
                  </Link>
                ) : (
                  <span dir="ltr" className="text-right font-inter text-cs08">
                    {item.value}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
