// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ICChevronBottom } from '@/components/icons/ICChevronBottom';
import { getTodayDate } from '@/utils/date';
import { ReactNode, useState } from 'react';
import * as DropDown from '@/components/ui/dropdown-menu';
import { FilterComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';

// Creating and exporting Filter component as defualt
export default function Filter({
  className,
}: FilterComponentPropsType): ReactNode {
  // Defining current date in tehran
  const date = getTodayDate();

  // Defining states of component
  const [filter, setFilter] = useState<string>('7'); // values: 7, 2, 1

  // Returning JSX
  return (
    <div
      className={cn(
        'block gap-[17px] lg:flex lg:items-center lg:justify-between lg:gap-5',
        className,
      )}
    >
      <span className="hidden w-full truncate text-right text-[16px] font-bold text-black lg:block">
        داشبورد سفرنامه 24
      </span>
      <div className="block lg:flex lg:shrink-0 lg:gap-2">
        <div className="mb-[17px] flex gap-[17px] lg:mb-0 lg:gap-2">
          <div className="flex h-[45px] w-full items-center justify-center rounded-[7px] bg-white px-[20px] lg:h-10 lg:w-auto lg:rounded-md lg:px-3">
            <span className="block truncate whitespace-nowrap text-center text-[12px] font-semibold text-black">
              {date.date}
            </span>
          </div>
          <div className="col-span-1 flex shrink-0 items-center justify-between gap-[5px] lg:shrink lg:gap-2">
            <div className="flex aspect-square h-[45px] w-full items-center justify-center rounded-[7px] bg-white lg:aspect-square lg:h-10 lg:w-10 lg:rounded-md">
              <span className="block text-center text-[12px] font-semibold text-black">
                {date.time.minute}
              </span>
            </div>
            <span className="block shrink-0 text-cs08 font-medium text-black">
              :
            </span>
            <div className="flex aspect-square h-[45px] w-full items-center justify-center rounded-[7px] bg-white lg:h-10 lg:w-10 lg:rounded-md">
              <span className="block text-center text-[12px] font-semibold text-black">
                {date.time.hour}
              </span>
            </div>
          </div>
        </div>
        <DropDown.DropdownMenu>
          <DropDown.DropdownMenuTrigger asChild>
            <button className="group flex h-[45px] w-full items-center justify-between gap-3 rounded-md bg-white px-[20px] text-black lg:h-10 lg:w-auto lg:justify-center lg:px-3">
              <span className="block text-right text-[12px] font-semibold text-black lg:text-center">
                فیلتر تایم لاین
              </span>
              <ICChevronBottom className="h-3 w-3 text-current transition-all duration-500 group-data-[state='close']:rotate-0 group-data-[state='open']:rotate-180" />
            </button>
          </DropDown.DropdownMenuTrigger>
          <DropDown.DropdownMenuContent
            align="start"
            className="w-[200px] rounded-lg shadow-[0_0_2rem_rgba(0,0,0,0.1)]"
          >
            <DropDown.DropdownMenuLabel className="p-3">
              <span className="block truncate text-right text-cs08 font-medium text-black">
                {`تایم لاین : ${filter} روز گذشته`}
              </span>
            </DropDown.DropdownMenuLabel>
            <DropDown.DropdownMenuSeparator className="mx-3 mb-3" />
            <DropDown.DropdownMenuRadioGroup
              value={filter}
              onValueChange={(e) => setFilter(e)}
            >
              <DropDown.DropdownMenuRadioItem
                value="7"
                asChild
                className="block w-full cursor-pointer bg-white p-3 text-gray-600 transition-all duration-500 hover:bg-cs-red/10 hover:text-cs-red data-[active='true']:bg-cs-red/10 data-[active='true']:text-cs-red"
                data-active={filter === '7'}
              >
                <button>
                  <span className="block truncate text-right text-cs08 font-medium text-current">
                    روز گذشته 7
                  </span>
                </button>
              </DropDown.DropdownMenuRadioItem>
              <DropDown.DropdownMenuRadioItem
                asChild
                value="2"
                className="block w-full cursor-pointer bg-white p-3 text-gray-600 transition-all duration-500 hover:bg-cs-red/10 hover:text-cs-red data-[active='true']:bg-cs-red/10 data-[active='true']:text-cs-red"
                data-active={filter === '2'}
              >
                <button>
                  <span className="block truncate text-right text-cs08 font-medium text-current">
                    ماه گذشته 2
                  </span>
                </button>
              </DropDown.DropdownMenuRadioItem>
              <DropDown.DropdownMenuRadioItem
                value="1"
                asChild
                className="block w-full cursor-pointer bg-white p-3 text-gray-600 transition-all duration-500 hover:bg-cs-red/10 hover:text-cs-red data-[active='true']:bg-cs-red/10 data-[active='true']:text-cs-red"
                data-active={filter === '1'}
              >
                <button>
                  <span className="block truncate text-right text-cs08 font-medium text-current">
                    سال گذشته 1
                  </span>
                </button>
              </DropDown.DropdownMenuRadioItem>
            </DropDown.DropdownMenuRadioGroup>
          </DropDown.DropdownMenuContent>
        </DropDown.DropdownMenu>
      </div>
    </div>
  );
}
