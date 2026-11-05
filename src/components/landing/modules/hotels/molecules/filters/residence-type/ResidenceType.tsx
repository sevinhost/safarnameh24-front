import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import SwitchCase from './SwitchCase';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';

type ApiResponse = {
  data: { id: number; title: string }[];
};

// -------------------------------------

export function ResidenceType() {
  const { data } = useQuery<ApiResponse>({
    queryKey: ['residence-type'],
    queryFn: () => generalInstance('hotel/types'),
  });

  return (
    <AccordionItem value="residence-type" className="px-5">
      <AccordionTrigger className="text-[0.85rem] font-bold">
        نوع اقامتگاه
      </AccordionTrigger>

      <AccordionContent className="space-y-4">
        {data?.data?.map((residence) => (
          <SwitchCase key={residence.id} {...residence} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
