// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReservationsFilterComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import IconInput from '../ui/iconInput';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

// Creating and exporting Filter component as default
export default function Filter({
  className,
  dataNotEmpty,
  onChange,
  loading,
  filterValue,
}: ReservationsFilterComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <section>
      <div
        className={cn(
          'lg:flex block lg:items-center lg:justify-between lg:gap-5 gap-[14px]',
          className,
        )}
      >
        <span className="lg:block hidden truncate text-right w-full font-bold text-[16px] text-black">
          لیست رزرو هتل های من
        </span>
        <div className="flex items-center justify-end lg:gap-4 gap-[14px]">
          {loading ? (
            <>
              <Skeleton className="lg:w-[200px] w-full lg:h-10 h-[45px] lg:rounded-md rounded-[7px]" />
              <Skeleton className="lg:w-[100px] w-[100px] lg:h-10 h-[45px] lg:rounded-md rounded-[7px] lg:shrink shrink-0" />
            </>
          ) : (
            <>
              {dataNotEmpty && (
                <IconInput
                  wholeClassName="lg:bg-white bg-gray-100 lg:hover:bg-white hover:bg-gray-100 lg:w-[220px] w-full"
                  icon="SearchStatus"
                  className="lg:h-10 h-[45px]"
                  placeholder="جستجو رزرو ها"
                  value={filterValue && filterValue}
                  onClear={() => onChange && onChange('')}
                  onChange={(e) => onChange && onChange(e.target.value)}
                />
              )}
              <Button
                asChild
                className="flex items-center justify-center gap-[5px] lg:h-10 h-[45px] lg:bg-white lg:hover:bg-white hover:bg-gray-100 bg-gray-100 lg:rounded-md rounded-[7px] lg:px-3 px-[10px] lg:shrink shrink-0 text-[#2b2b2b]"
              >
                <Link href="/hotel">
                  <IconsaxIcons
                    name="Add"
                    className="w-[18px] h-[18px]  shrink-0 text-current"
                  />
                  <span className="block text-right truncate font-semibold whitespace-nowrap text-[12px] text-current">
                    ثبت رزرو
                  </span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
