'use client';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { TopBarConfig } from '../../shared';
import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  image: string;
  title: string;
  description: string;
};

type ApiResponse = {
  data: Data[];
};

// ---------------------------

export function LookingAtServices() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['choose-services'],
    queryFn: () => generalInstance('/config/services'),
  });

  const [activeIndex, setActiveIndex] = useState(0);
  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div>
      <TopBarConfig
        subtitle="یکی از قوی ترین خدمات های هتلداری ایران !"
        title={{ type: 'single', text: 'نگاهی به خدمات سفرنامه 24' }}
      />

      <div className="grid items-start gap-20 lg:grid-cols-[1.2fr_1fr]">
        {status === 'pending' ? (
          <div className="space-y-4">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-14" />
              ))}
          </div>
        ) : (
          <Accordion type="single" collapsible>
            {data?.data.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b last:border-none"
                onClick={() => setActiveIndex(index)}
              >
                <AccordionTrigger className="text-cs85 font-bold text-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="flex-center h-10 w-10 rounded-md border-2 border-zinc-200">
                      <span className="pt-1">{index + 1}</span>
                    </div>

                    <span>{item.title}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-cs08/6">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <div className="hidden h-80 overflow-hidden rounded-2xl bg-zinc-200 lg:block">
          {data?.data[activeIndex].image && (
            <Image
              width={400}
              height={200}
              alt="services"
              src={data?.data[activeIndex].image}
              className="full-size object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
