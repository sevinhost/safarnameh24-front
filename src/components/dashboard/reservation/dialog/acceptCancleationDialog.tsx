// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { DialogComponentPropsType } from '@/types/dashboard/component';
import { useMediaQuery } from '@/hooks';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

// Creating and exporting AcceptCanclationDialog component as default
export default function AcceptCanclationDialog({
  closeFn,
  isOpened = false,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Conditional rendering
  if (isMobile) {
    return (
      <Drawer open={isOpened} onClose={closeFn}>
        <DrawerContent>
          <DrawerHeader className="mb-[10px] px-[24px] py-0">
            <DrawerTitle className="block truncate text-right text-[14px] font-bold text-black">
              اطلاعات شما با موفقیت ثبت شد
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-[24px] py-0">
            <DrawerDescription className="text-[12px] font-medium text-gray-500">
              مشترک گرامی عزیز پس از تایید ادمین سفرنامه 24 رزرو شما لغو و با
              شما تماس گرفته خواهد شد از همراهی شما متشکریم.
            </DrawerDescription>
          </div>
          <DrawerFooter className="mt-[10px] px-[24px] py-0">
            <DrawerClose asChild>
              <button className="flex h-[43px] w-fit items-center justify-center rounded-[8px] bg-green-600 px-[50px]">
                <span className="text-[12px] font-semibold text-white">
                  متوجه شدم
                </span>
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpened}>
        <DialogContent className="w-[calc(100vw-25px)] lg:w-auto">
          <DialogHeader>
            <DialogTitle className="text-right text-[12px] font-bold text-black lg:text-[14px]">
              اطلاعات شما با موفقیت ثبت شد
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-right text-sm font-medium text-black">
            مشترک گرامی عزیز پس از تایید ادمین سفرنامه 24 رزرو شما لغو و با شما
            تماس گرفته خواهد شد از همراهی شما متشکریم.
          </DialogDescription>
          <DialogFooter dir="ltr">
            <DialogClose asChild>
              <button
                onClick={closeFn}
                className="flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-cs07 font-medium text-white lg:px-6 lg:py-2.5 lg:text-cs08"
              >
                متوجه شدم
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
