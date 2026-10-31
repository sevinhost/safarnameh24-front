'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from 'cn';

type Props = {
  className?: string;
};

// ------------------------------

export function ScrollToTop({ className }: Props) {
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            size="icon-lg"
            variant="outline"
            onClick={handleClick}
            className={cn('', className)}
            aria-label="بازگشت به بالای صفحه"
          >
            <ArrowUp className="size-4" />
          </Button>
        }
      />

      <TooltipContent>بازگشت به بالای صفحه</TooltipContent>
    </Tooltip>
  );
}
