import {
  SheetClose,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from '@/components/ui/sheet';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

// ------------------------------

export function PassengersNotebookHeader() {
  return (
    <SheetHeader className="flex-row items-center gap-3 space-y-0">
      <div className="w-16">
        <Image
          alt="logo"
          width={60}
          height={60}
          className="full-size"
          src={'/image/logo/red.png'}
        />
      </div>

      <div className="flex flex-col items-start">
        <SheetTitle className="text-[0.9rem]/5">سفرنامه ۲۴</SheetTitle>

        <SheetDescription className="font-inter text-[0.8rem]/5 font-semibold capitalize text-zinc-800">
          agency safarnameh24
        </SheetDescription>
      </div>

      <SheetClose className="mr-auto rounded-md bg-zinc-100 p-1.5">
        <IoClose color="#666" size={18} />
      </SheetClose>
    </SheetHeader>
  );
}
