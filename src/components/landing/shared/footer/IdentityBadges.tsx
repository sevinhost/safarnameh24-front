'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type License = {
  link: string;
  image: string;
};

type Enamad = {
  code: string;
};

export default function IdentityBadges() {
  const licesnsesQuery = useQuery<License[]>({
    queryKey: ["licenses"],
    queryFn: async () => {
      const response = await generalInstance.get('/config/licenses/');
      // اگر پاسخ API شما دارای یک فیلد میانی است (مثلاً data یا results)، 
      // آن را اینجا اصلاح کنید. اگر مستقیماً آرایه است، همین response.data کافیست.
      return Array.isArray(response.data) ? response.data : (response.data?.results || []);
    }
  });

  const enamadQuery = useQuery<Enamad>({
    queryKey: ["enamad"],
    enabled: !!licesnsesQuery.data, // وابستگی به موفقیت کوئری قبلی
    queryFn: async () => {
      const response = await generalInstance.get('/config/enamad/');
      return response.data;
    }
  });

  const pending = licesnsesQuery.isPending || enamadQuery.isPending;
  const isError = licesnsesQuery.isError || enamadQuery.isError;
  
  // بررسی امن برای داده‌ها
  const licenses = Array.isArray(licesnsesQuery.data) ? licesnsesQuery.data : [];

  if (pending) {
    return (
      <div className="w-full h-28 mt-4 mb-2 flex gap-4">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} className="flex-1" />
          ))}
      </div>
    );
  }

  if (isError) return null;

  return (
    <div className="w-full mt-4 mb-2 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4 lg:grid-cols-3">
      {licenses.map((badge, index) => (
        <div
          key={index}
          className="bg-zinc-100 h-28 p-4 flex-center overflow-hidden rounded-cs-10"
        >
          <Image
            width={200}
            height={200}
            src={badge.image}
            alt="identity-badge"
            className="full-size object-contain"
          />
        </div>
      ))}
      
      {enamadQuery.data?.code && (
        <div
          dangerouslySetInnerHTML={{ __html: enamadQuery.data.code }}
        />
      )}
    </div>
  );
}