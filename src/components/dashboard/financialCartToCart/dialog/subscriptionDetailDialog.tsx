// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SubscriptionDetailsDialogPropsType } from '@/types/dashboard/component';
import { getPercentage } from '@/utils/utils';
import { addCommas } from '@persian-tools/persian-tools';
import { JSX } from 'react';

// Creating and exporting SubscriptionDetailsDialog component as default
export default function SubscriptionDetailsDialog({
  open,
  onOpenChange,
  data,
}: SubscriptionDetailsDialogPropsType): JSX.Element {
  // Returning JSX
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-full gap-0 rounded-none p-0 lg:max-w-[550px] lg:rounded-xl">
        <div className="scrollbar-hide max-h-dvh space-y-5 overflow-auto p-4 lg:max-h-[calc(100dvh-50px-25px)] lg:p-5">
          <div>
            <DialogTitle className="mb-1 block truncate text-right text-[12px] font-bold text-black lg:text-[14px]">
              کارت اشتراک خرید
            </DialogTitle>
            <DialogDescription className="block text-right text-sm font-light leading-6 text-black/70">
              مشتری گرامی عزیز برای دریافت کد تخفیف کارت اشتراکی باید به سطح
              خرید های که پایین قرار داده شده رعایت بفرمایید و لذا سیستم با توجه
              به خرید های مدام شما از سفرنامه 24 روند خرید شما اتومات حساب میشود
              و بعد از هر استفاده سطح بعدی شروع میشه.
            </DialogDescription>
          </div>
          <div className="space-y-6">
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex-1 overflow-hidden">
                  <span className="mb-1 block truncate text-right text-[12px] font-bold text-black lg:text-[14px]">{`کارت اشتراک ${data.next_level}`}</span>
                  <span className="block truncate text-right text-[12px] font-normal text-black/70 lg:text-[14px]">{`خرید بالای به مبلغ ${addCommas(data.target)} تومان`}</span>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="block truncate text-right text-[12px] font-normal text-black/70">{`روند خرید شما : ${addCommas(data.current)} تومان`}</span>
                  <span className="block truncate text-left text-[12px] font-normal text-black/70">{`${getPercentage(data.target, data.current)}%`}</span>
                </div>
                <div className="h-[5px] w-full overflow-hidden rounded-3xl bg-black/10">
                  <div
                    className="h-[5px] rounded-3xl bg-cs-red"
                    style={{
                      width: `${getPercentage(data.target, data.current)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter dir="ltr">
            <DialogClose asChild>
              <button className="flex items-center justify-center rounded-md bg-black/5 px-4 py-2 text-cs07 font-medium text-black transition-all duration-500 hover:bg-black/10 lg:px-6 lg:py-2.5 lg:text-cs08">
                متوجه شدم
              </button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
