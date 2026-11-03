// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import { CardShowCasePropsType } from '@/types/dashboard/component';
import { cn, getRandomTailwind500Color } from '@/utils/utils';
import { JSX, useState } from 'react';
import BankIcon from '../ui/bankIcon';
import { numberSeparation } from '@/utils';

// Creating and exporting CardShowCase component as default
export default function CardShowCase({
  className,
  data,
}: CardShowCasePropsType): JSX.Element {
  // Defining variables
  const [randomColor] = useState(getRandomTailwind500Color());

  // Returning JSX
  return (
    <div
      dir="ltr"
      className={cn(
        'flex flex-col items-center justify-between gap-3 rounded-xl p-4 text-white',
        className,
      )}
      style={{
        background: randomColor,
        backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0, 0.5) , ${randomColor})`,
      }}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <span className="block flex-1 truncate text-left text-cs75 font-semibold text-white">
          {data ? data.bankName : 'سفرنامه ۲۴'}
        </span>
        <BankIcon
          name={data ? data?.bankIcon : 'unknown'}
          className="size-7 shrink-0"
          color="currentColor"
        />
      </div>
      <div className="w-full">
        <span className="mb-1.5 block truncate text-left font-inter text-cs07 font-medium text-white">
          {data
            ? numberSeparation(data.number, ' ', 4)
            : numberSeparation('0000000000000000', ' ', 4)}
        </span>
        <span className="mb-1 block truncate text-left font-inter text-cs07 font-semibold text-white">
          {data
            ? `IR ${numberSeparation(data.iban, ' ', 4)}`
            : `IR ${numberSeparation('000000000000000000000000', ' ', 4)}`}
        </span>
        <span className="block truncate text-left text-cs07 font-medium text-white">
          {data ? data.holderName : '-'}
        </span>
      </div>
    </div>
  );
}
