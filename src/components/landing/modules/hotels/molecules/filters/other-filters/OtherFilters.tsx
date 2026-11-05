import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import SwitchCase from './SwitchCase';

// --------------------------

export function OtherFilters() {
  return (
    <AccordionItem value="other-filters" className="px-5">
      <AccordionTrigger className="text-[0.85rem] font-bold">
        سایر فیلتر ها
      </AccordionTrigger>

      <AccordionContent className="space-y-4">
        <SwitchCase id="suggested-hotels" title="هتل های پیشنهادی" />
        <SwitchCase id="amazing-hotels" title="هتل های شگفت انگیز" />
      </AccordionContent>
    </AccordionItem>
  );
}
