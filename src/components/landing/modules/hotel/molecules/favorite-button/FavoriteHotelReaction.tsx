import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerContent,
  DrawerDescription,
} from '@/components/ui/drawer';

import { useMediaQuery } from '@/hooks';
import { hotel } from '@/constants/landing';

type Props = {
  isOpen: boolean;
  type: 'success' | 'error';
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

// -----------------------------

export function FavoriteHotelReaction(props: Props) {
  const { isOpen, onOpenChange, type } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
        <>
          {/* Dialog (Large-Device) */}
          {/* <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[400px] text-cs85 font-semibold p-7 pb-6 gap-0">
              <DialogTitle className="text-zinc-800 text-[0.95rem]/6! font-extrabold">
                {content.title}
              </DialogTitle>

              <DialogDescription className="text-zinc-500 mt-3 mb-6 flex flex-col">
                <span>مشتری گرامی</span>
                <span>{content.desc}</span>
              </DialogDescription>

              <DialogClose
                className={`w-max h-10 text-zinc-100 text-cs08 px-6 rounded-lg ${
                  type === 'fail' ? 'bg-red-500' : 'bg-emerald-500'
                }`}
              >
                {type === 'fail' ? 'تلاش مجدد' : 'متوجه شدم'}
              </DialogClose>
            </DialogContent>
          </Dialog> */}
        </>
      ) : (
        <>
          {/* === (Small-Device) */}
          <Drawer open={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent className="text-cs85/6 font-semibold">
              <DrawerTitle className="text-zinc-800 text-cs95 font-extrabold"></DrawerTitle>
              <DrawerDescription className="text-zinc-500 mt-3 mb-5 flex flex-col"></DrawerDescription>

              <DrawerClose className=""></DrawerClose>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
