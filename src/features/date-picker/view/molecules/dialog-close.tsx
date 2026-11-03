import { cn } from 'cn';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

type Props = {
  className?: string;
};

// ------------------------------

export default function DialogCloseButton(props: Props) {
  const { className } = props;

  return (
    <DialogClose
      render={
        <Button
          size={'icon'}
          variant={'secondary'}
          className={cn('rounded-lg', className)}
        >
          <X />
        </Button>
      }
    ></DialogClose>
  );
}
