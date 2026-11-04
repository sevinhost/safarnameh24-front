import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { FaCheck } from 'react-icons/fa6';
import { ICStar } from '@/components/icons';
import { useQueryState, parseAsArrayOf, parseAsInteger } from 'nuqs';

// -----------------------------

export function Star() {
  const [star, setStar] = useQueryState('star', parseAsArrayOf(parseAsInteger));

  function handleSetStar(item: number) {
    if (star?.includes(item)) {
      setStar(star.filter((s) => s !== item));
    } else {
      setStar([...(star ?? []), item]);
    }
  }

  return (
    <AccordionItem value="star" className="px-5">
      <AccordionTrigger className="text-[0.85rem] font-bold">
        ستاره هتل
      </AccordionTrigger>

      <AccordionContent className="space-y-4">
        {[1, 2, 3, 4, 5].map((number) => (
          <div
            key={number}
            onClick={() => {
              handleSetStar(number);
              console.log('star')
            }}
            className="text-zinc-800 text-cs08 font-bold flex items-center select-none cursor-pointer"
          >
            <div className="relative bg-zinc-200/50 w-5 h-5 overflow-hidden rounded-[0.3rem]">
              <div
                className={`absolute inset-0 bg-cs-blue flex-center transition-all duration-200 ease-in-out ${star?.includes(number) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
              >
                <FaCheck color="#fff" size={12} />
              </div>
            </div>

            <span className="mr-3 ml-1">{number}</span>
            <span>ستاره</span>

            <div className="mr-auto flex items-center gap-2">
              {Array.from({ length: number }, (_, i) => i).map((_) => (
                <ICStar key={_} className="w-4 h-4" fill="#444" />
              ))}
            </div>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
