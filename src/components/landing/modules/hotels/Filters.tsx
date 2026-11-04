'use client';

import {
  Star,
  PriceRange,
  ClearFilters,
  OtherFilters,
  ResidenceType,
  RoomFacilities,
  HotelFacilities,
} from './molecules/filters';

import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion';

import { Suspense } from 'react';
import { IoClose } from 'react-icons/io5';
import { useHotelQuery } from '@/context';
import { Filter, Building } from 'iconsax-react';

// ------------------------------

export function Filters() {
  const {
    queryState: { isPending, totalLength },
  } = useHotelQuery();

  return (
    <Suspense>
      {/* === Small-Screen */}
      <div className="h-9 flex gap-3 lg:hidden">
        <Sheet>
          <SheetTrigger className="bg-white px-4 flex-center gap-2 border rounded-full shadow-light">
            <Filter size="17" color="#52525b" />
            <span className="text-zinc-600 text-cs75 font-bold pt-0.5">
              فیلتر ها
            </span>
          </SheetTrigger>

          <SheetContent className="w-full p-0 grid grid-rows-[auto_1fr_auto]">
            <SheetHeader className="h-16 px-6 flex-row justify-between items-center  border-b shadow-light">
              <SheetTitle className="hidden"></SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>

              <span className="text-cs85 font-bold">فیلتر های جستجو</span>

              <SheetClose>
                <IoClose color="#555" />
              </SheetClose>
            </SheetHeader>

            <div className="divide-y overflow-auto custom-scrollbar">
              <Accordion type="single" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionContent className="pb-0">
                    <Accordion type="multiple" className="divide-y">
                      <Star />
                      <PriceRange />
                      <ResidenceType />
                      <OtherFilters />
                      <HotelFacilities />
                      <RoomFacilities />
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="h-20 px-6 flex items-center justify-between border-t shadow-light">
              <ClearFilters />

              <div className="bg-cs-blue/10 w-36 h-10 text-cs-blue text-cs08 font-semibold flex-center gap-1 rounded-lg">
                {isPending ? (
                  <div className="loader-dots-blue" />
                ) : totalLength ? (
                  <>
                    <span>{totalLength}</span>
                    <span>هتل یافت شد</span>
                  </>
                ) : (
                  'موردی یافت نشد'
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="bg-white px-4 flex-center gap-2 border rounded-full shadow-light">
          <Building size="18" color="#52525b" />

          <div className="text-zinc-600 text-cs75 font-bold pt-0.5 flex-center gap-1">
            <span>نتایج :</span>
            <span>{totalLength}</span>
            <span>هتل</span>
          </div>
        </div>
      </div>

      {/* === Large-Screen */}
      <div className="sticky top-28 bg-white text-zinc-800 hidden rounded-2xl shadow-light lg:block">
        <div className="px-5 py-4 flex-between items-center border-b">
          <span className="text-cs85 font-bold">فیلتر های جستجو</span>
          <ClearFilters />
        </div>

        <div dir="ltr" className="max-h-[60dvh] overflow-auto custom-scrollbar">
          <div dir="rtl">
            <Accordion type="single" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionContent className="pb-0">
                  <Accordion collapsible type="single" className="divide-y">
                    <Star />
                    <PriceRange />
                    <ResidenceType />
                    <OtherFilters />
                    <HotelFacilities />
                    <RoomFacilities />
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="px-5 py-4 flex-between items-center border-t">
          <div className="w-full h-11 bg-cs-dark-blue text-white text-cs08 font-semibold flex-center gap-1 rounded-cs-10">
            {isPending ? (
              <div className="loader-dots" />
            ) : totalLength ? (
              <>
                <span>نتایج :</span>
                <span className="mr-1">{totalLength}</span>
                <span>هتل</span>
              </>
            ) : (
              'نتیجه ای یافت نشد'
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
