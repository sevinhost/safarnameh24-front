import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

import FacilitiesItem from './FacilitiesItem';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';

type ApiResponse = {
  data: { id: number; title: string }[];
};

// ------------------------------

export function RoomFacilities() {
  const [input, setInput] = useState('');

  const { data } = useQuery<ApiResponse>({
    queryKey: ['room-facilities'],
    queryFn: () => generalInstance('hotel/hotels/room-facilities'),
  });

  return (
    <AccordionItem value="room-facilities" className="px-5">
      <AccordionTrigger className="text-[0.85rem] font-bold">
        امکانات اتاق
      </AccordionTrigger>

      <AccordionContent>
        {/* === Search */}
        <div className="bg-zinc-100/60 h-10 mb-4 flex rounded-cs-10">
          <div className="w-12 flex-center">
            <LuSearch color="#999" size={20} />
          </div>

          <input
            type="text"
            value={input}
            placeholder="جستجوی امکانات ..."
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent text-cs08/5 pl-5 flex-1 placeholder:font-medium"
          />
        </div>

        {/* === List */}
        <div className="max-h-60 overflow-auto custom-scrollbar">
          {data?.data
            .filter((item) =>
              item.title.toLowerCase().includes(input.trim().toLowerCase()),
            )
            ?.map((item) => (
              <FacilitiesItem key={item.id} {...item} type="room" />
            ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
