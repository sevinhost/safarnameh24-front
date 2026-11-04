'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

import logo from '@/assets';
import { ArrowRight } from 'iconsax-react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

type Data = {
  header_logo: string;
  header_title: string;
  header_sub_title: string;
};

type ApiResponse = {
  data: Data;
};

// --------------------------------

export default function MobileHeader() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['main-configs'],
    queryFn: () => generalInstance('/config/main'),
  });

  const router = useRouter();
  const pathname = usePathname();

  const title = data?.data.header_title;
  const subtitle = data?.data.header_sub_title;

  const noDisplayCondition = useMemo(() => {
    return (
      pathname.includes('/hotel/') ||
      pathname === '/about-us' ||
      pathname === '/contact-us'
    );
  }, [pathname]);

  if (noDisplayCondition) return null;

  return (
    <header className="flex-between mx-5 items-center pt-3 lg:hidden">
      {/* Logo | Titles */}
      <div className="flex items-center gap-3">
        <Link
          href={'/'}
          className="flex-center h-16 w-16 overflow-hidden rounded-lg"
        >
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="aspect-auto w-full"
          />
        </Link>

        {status === 'pending' ? (
          <div className="mt-2 space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </div>
        ) : (
          <div className="space-y-0.5 text-cs85 text-zinc-800">
            <h1 className="font-extrabold">{title}</h1>
            <h2 className="font-inter font-bold capitalize">{subtitle}</h2>
          </div>
        )}
      </div>

      {pathname === '/hotel' && (
        <button
          onClick={() => router.back()}
          className="flex-center mr-auto h-9 w-9 cursor-pointer rounded-lg bg-zinc-200/60"
        >
          <ArrowRight size={20} color="#444" />
        </button>
      )}
    </header>
  );
}
