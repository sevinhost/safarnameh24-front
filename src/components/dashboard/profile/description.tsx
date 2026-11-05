// Importing part
import { DescriptionProfileComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Creating and exporting Description component as default
export default function Description({
  className,
}: DescriptionProfileComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[14px] border border-black/10 bg-white p-[14px] lg:rounded-[10px] lg:p-4',
        className,
      )}
    >
      <span className="mb-1 block truncate text-right text-[12px] font-semibold text-black lg:text-cs75">
        توضیحات تکمیلی :
      </span>
      <p className="text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
        مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و
        در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید تا مشکلاتان را برطرف
        کنند از همراهی شما سپاسگزاریم.
      </p>
    </div>
  );
}
