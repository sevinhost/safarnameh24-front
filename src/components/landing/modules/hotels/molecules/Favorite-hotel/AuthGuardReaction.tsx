import { useMediaQuery } from '@/hooks';
import { useUserAccountContext } from '@/context/UserAccountContext';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// ---------------------------------------

export default function AuthGuardReaction(props: Props) {
  const { isOpen, setOpen } = props;

  const { toggle } = useUserAccountContext();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
        <>
          {/* Dialog (Large-Device) */}
          <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="max-w-[500px] text-cs85/6 p-7 font-semibold gap-0">
              <DialogTitle className="text-zinc-800 text-cs95 font-extrabold">
                ورود به حساب کاربری
              </DialogTitle>

              <DialogDescription className="text-zinc-500 mt-4 mb-6 flex flex-col">
                <span>مشتری گرامی</span>
                <span>
                  جهت ذخیره هتل مورد نظر و اضافه شدن ب لیست علاقه مندی ها لطفا
                  ابتدا وارد حساب کاربری خود شوید , از همراهی شما سپاسگذاریم .
                </span>
              </DialogDescription>

              <div className="w-[70%] h-10 text-cs08 grid grid-cols-[1fr_1.5fr] gap-4">
                <DialogClose className="bg-cs-red/90 text-zinc-100 rounded-lg transition-colors duration-200 ease-in-out hover:bg-cs-red/95">
                  انصراف
                </DialogClose>

                <DialogClose
                  className="text-zinc-500 border border-zinc-300 rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-100/50"
                  onClick={() => toggle()}
                >
                  ورود به حساب کاربری
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          {/* Drawer (Small-Device) */}
          <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerContent className="text-cs85/6 font-semibold">
              <DrawerTitle className="text-zinc-800 text-cs95 font-extrabold">
                ورود به حساب کاربری
              </DrawerTitle>

              <DrawerDescription className="text-zinc-500 mt-4 mb-6 flex flex-col">
                <span>مشتری گرامی</span>
                <span>
                  جهت ذخیره هتل مورد نظر و اضافه شدن ب لیست علاقه مندی ها لطفا
                  ابتدا وارد حساب کاربری خود شوید , از همراهی شما سپاسگذاریم .
                </span>
              </DrawerDescription>

              <div className="h-10 text-cs08 grid grid-cols-[1fr_1.5fr] gap-4">
                <DrawerClose className="bg-cs-red/90 text-zinc-100 rounded-lg">
                  انصراف
                </DrawerClose>

                <DrawerClose
                  className="text-zinc-500 border border-zinc-300 rounded-lg"
                  onClick={() => toggle()}
                >
                  ورود به حساب کاربری
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
