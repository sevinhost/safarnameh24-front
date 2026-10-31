import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import Link from 'next/link';
import { content } from '@/lib/constants/footer';

// ------------------------------

export function AccessLinks() {
  const accessLinks = content.accessLinks;

  return (
    <>
      {/* Small-Screen */}
      <Accordion className="lg:hidden">
        {accessLinks?.map((item, index) => (
          <AccordionItem key={index} value={String('item-' + index)}>
            <AccordionTrigger>{item.title}</AccordionTrigger>

            <AccordionContent className={'grid gap-4'}>
              {item.links.map((link, i) => (
                <Link key={i} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Large-Screen */}
      <div className="hidden justify-evenly text-sm font-medium lg:flex">
        {accessLinks?.map((group, index) => (
          <div key={index}>
            <div className="text-foreground mb-5 border-b pb-4">
              {group.title}
            </div>

            <ul className="grid gap-4">
              {group.links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
