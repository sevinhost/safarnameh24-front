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

type ApiResponse = [{ data: License[] }, { data: Enamad }];

// ----------------------------------------

export default function IdentityBadges() {
  const licesnsesQuery = useQuery<License[]>({
    queryKey: ["licenses"],
    queryFn: async () => {
      const response = await generalInstance.get('/config/licenses/');

      return response.data; // Data array in api response
    }
  });

  const enamadQuery = useQuery<Enamad>({
    queryKey: ["enamad"],
    enabled: !licesnsesQuery.isPending && licesnsesQuery.data && !licesnsesQuery.isError,
    queryFn: async () => {
      const response = await generalInstance.get('/config/enamad/');

      return response.data; // Data object in api response
    }
  });


  const pending = licesnsesQuery.isPending || enamadQuery.isPending;
  const isError = licesnsesQuery.isError || enamadQuery.isError;
  const success = !pending && !isError && licesnsesQuery.data && enamadQuery.data;

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
  } else if (success) {
    return (
      <div className="w-full mt-4 mb-2 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4 lg:grid-cols-3">
        {licesnsesQuery.data.map(
          (badge, index) => (
            // badge.link && (
            //   <Link
            //     key={index}
            //     href={badge.link}
            //     className="bg-zinc-100 h-28 p-4 flex-center overflow-hidden rounded-cs-10"
            //   >
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
          ),
          //   </Link>
          // ),
        )}
        <div
          dangerouslySetInnerHTML={{ __html: enamadQuery.data.code }}
        />
      </div>
    );
  } else {
    return false;
  }
}
