// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { CustomersClubTablePropsType } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
import { cn } from '@/utils/utils';
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { handleZeroBeforeNumber } from '@/utils/string';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import Image from 'next/image';
import { numberSeparation } from '@/utils';
import Tooltip from '../ui/tooltip';
import TakeGiftRuleDialog from './dialog/takeGiftRuleDialog';
import GiftGainErrorDialog from './dialog/giftGainErrorDialog';
import GiftGainedDialog from './dialog/giftGainedDialogOpened';
import { Skeleton } from '@/components/ui/skeleton';
import zarvantripLogo from '../../../../public/image/logo/white.webp';
import CustomPagination from '../ui/customPagination';
import EmptyTable from '../api/emptyTable';
import useCustomerClubPoints from '@/hooks/dashboard/useCustomerClubPoints';
import toast from '../ui/customSonner/toast';

// Creating and exporting CustomersClubTable component as default
export default function CustomersClubTable({
  className,
  data,
  loading = false,
  paginationCount = 12,
  refetch,
  paginationActiveIndex,
  setPaginationActiveIndex,
}: CustomersClubTablePropsType): ReactNode {
  // Defining hooks
  const [rules, setRules] = useState<string | undefined>();
  const [code, setCode] = useState<string | undefined>();
  const [acceptRulesDialogOpened, setAcceptRulesDialogOpened] =
    useState<boolean>(false);
  const [giftGainedDialogOpened, setGiftGainedDialogOpened] =
    useState<boolean>(false);
  const [giftGainErrorDialogOpened, setGiftGainErrorDialogOpened] =
    useState<boolean>(false);

  const customerClubPoints = useCustomerClubPoints();

  // Returning JSX
  return (
    <section
      className={cn(
        'lg:bg-white bg-transparent overflow-hidden lg:rounded-lg lg:px-0 px-[24px]',
        data?.length !== 0 && 'lg:border border-black/10',
        className,
      )}
    >
      <GiftGainErrorDialog
        isOpened={giftGainErrorDialogOpened}
        refetch={() => refetch && refetch()}
        closeFn={() => {
          setGiftGainErrorDialogOpened(false);
          setRules(undefined);
          setCode(undefined);
        }}
      />
      <GiftGainedDialog
        code={code || ''}
        isOpened={giftGainedDialogOpened}
        closeFn={() => {
          setGiftGainedDialogOpened(false);
          setRules(undefined);
          setCode(undefined);
        }}
      />
      <TakeGiftRuleDialog
        isOpened={acceptRulesDialogOpened}
        refetch={() => refetch && refetch()}
        setGiftGainErrorDialogOpened={setGiftGainErrorDialogOpened}
        setGiftGainedDialogOpened={setGiftGainedDialogOpened}
        rules={rules}
        type="shoppingCentre"
        code={code || ''}
        closeFn={() => {
          setAcceptRulesDialogOpened(false);
          setRules(undefined);
        }}
      />
      {loading ? (
        <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-3">
          <span
            onClick={() => setGiftGainedDialogOpened(true)}
            className="block truncate text-right w-full font-bold lg:text-cs85 text-black"
          >
            مشتری گرامی در این لیست امتیازاتی که به شما تعلق میگیرد قرار میگیرد.
          </span>
          <CustomPagination loading count={2} />
        </div>
      ) : data && data.length !== 0 ? (
        <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-3">
          <span
            onClick={() => setGiftGainedDialogOpened(true)}
            className="block truncate text-right w-full font-bold lg:text-cs85 text-black"
          >
            مشتری گرامی در این لیست امتیازاتی که به شما تعلق میگیرد قرار میگیرد.
          </span>
          <CustomPagination
            loading={loading}
            count={paginationCount}
            activeIndex={paginationActiveIndex}
            setActiveIndex={setPaginationActiveIndex}
          />
        </div>
      ) : (
        false
      )}
      {loading ? (
        <>
          <Table dir="rtl" className="border-none lg:table hidden">
            <TableHeader className="bg-gray-100 border-y border-y-black/10">
              <TableRow className="border-none">
                <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
                  ردیف
                </TableHead>
                <TableHead className="p-3 w-16" />
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  عنوان
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  کد تخفیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  مبلغ تخفیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  امتیاز مورد نیاز
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  تاریخ انقضای کد تخفیف
                </TableHead>
                <TableHead className="w-[30%] text-right truncate text-xs font-medium" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...new Array(3)].map((_, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    'bg-white hover:bg-white',
                    index + 1 !== 3
                      ? 'border-b border-b-black/10'
                      : 'border-b-0',
                  )}
                >
                  <TableCell className="p-3 w-[30px]">
                    <Skeleton className="rounded-[5px] h-[30px] w-full" />
                  </TableCell>
                  <TableCell className="p-3 w-[50px]">
                    <Skeleton className="rounded-[5px] size-[50px]" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-start gap-2">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                    <Skeleton className="rounded-full w-3 h-3 " />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-end gap-3">
                    <Skeleton className="rounded-[5px] h-[40px] w-[125px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="lg:hidden block mt-5">
            <div className="flex flex-col">
              {[...new Array(3)].map((item, index) => (
                <div
                  key={index}
                  className={
                    'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
                  }
                >
                  <div className="flex items-center justify-between gap-3 mb-[25px]">
                    <div className="flex items-center justify-start gap-[12px]">
                      <Skeleton className="rounded-[8px] h-[60px] w-[60px]" />
                      <div>
                        <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                        <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                      </div>
                    </div>
                    <Skeleton className="rounded-[8px] h-[40px] w-[105px]" />
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <div className="flex items-center justify-start gap-[10px]">
                        <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                        <Skeleton className="rounded-full h-[14px] w-[14px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[12px] mb-[25px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[12px] mb-[25px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[12px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : data?.length === 0 ? (
        <EmptyTable
          title="لیست جوایز خالی است"
          description="متاسفانه هیچ ایتمی برای نمایش پیدا نشد !"
        />
      ) : (
        <>
          <Table dir="rtl" className="border-none lg:table hidden">
            <TableHeader className="bg-gray-100 border-y border-y-black/10">
              <TableRow className="border-none">
                <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
                  ردیف
                </TableHead>
                <TableHead className="p-3 w-16" />
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  عنوان
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  کد تخفیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  مبلغ تخفیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  امتیاز مورد نیاز
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  تاریخ انقضای کد تخفیف
                </TableHead>
                <TableHead className="w-[30%] text-right truncate text-xs font-medium" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    'bg-white hover:bg-white',
                    index + 1 !== data.length
                      ? 'border-b border-b-black/10'
                      : 'border-b-0',
                  )}
                >
                  <TableCell className="p-3 w-[30px]">
                    <div className="rounded-[5px] bg-gray-100 flex items-center justify-center h-[30px] w-full">
                      <span className="font-normal text-[12px] text-black block text-num-en">
                        {handleZeroBeforeNumber(index + 1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 w-[50px]">
                    <div className="rounded-[5px] border border-black/10 bg-gray-100 flex items-center justify-center size-[50px] shrink-0 overflow-hidden p-1 relative">
                      <Image
                        alt={item.shopping_center_name}
                        width={40}
                        height={40}
                        src={item.shopping_center_image || zarvantripLogo.src}
                        className="w-full h-full absolute top-0 left-0 object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="p-3">
                    <Tooltip content={item.shopping_center_name}>
                      <span className="text-xs font-medium text-gray-600 truncate block text-right max-w-[30ch]">
                        {item.shopping_center_name}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      ********
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${numberSeparation(item.discount_value)} تومان`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${numberSeparation(item.required_points)} امتیاز`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.expires_at}
                    </span>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        if (customerClubPoints.points >= item.required_points) {
                          setAcceptRulesDialogOpened(true);
                          setRules(item.activation_rules);
                          setCode(item.code);
                        } else {
                          toast({
                            title: 'امتیاز کافی نیست',
                            description: `برای فعال‌سازی این آیتم به ${item.required_points} امتیاز نیاز دارید.`,
                            theme: 'theme',
                          });
                        }
                      }}
                      className={
                        'w-[125px] h-[40px] transition-all duration-500 rounded-md flex items-center justify-center disabled:text-gray-600 disabled:bg-gray-100 text-black bg-white border border-black/20 hover:bg-gray-100'
                      }
                    >
                      <span className="text-xs text-current font-medium">
                        دریافت جایزه
                      </span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="lg:hidden block mt-5">
            <div className="flex flex-col">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className={
                    'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
                  }
                >
                  <div className="flex items-center justify-between gap-3 mb-[25px]">
                    <div className="flex items-center justify-start gap-[12px]">
                      <div className="rounded-[8px] shrink-0 border border-black/10 bg-gray-100 flex items-center justify-center w-[60px] h-[60px] overflow-hidden p-1 relative">
                        <Image
                          alt={item.shopping_center_name}
                          width={60}
                          height={60}
                          src={item.shopping_center_image || zarvantripLogo.src}
                          className="w-full h-full absolute top-0 left-0 object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-black truncate block w-full mb-2 text-right font-semibold text-[12px]">
                          نام :
                        </span>
                        <span className="text-gray-500 truncate block w-full text-right font-semibold text-[10px]">
                          {item.shopping_center_name}
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-[105px] h-[40px] transition-all duration-500 shrink-0 rounded-[7px] flex items-center justify-center disabled:text-gray-600 disabled:bg-gray-100 text-black bg-white border border-black/20 hover:bg-gray-100"
                      onClick={() => {
                        if (customerClubPoints.points >= item.required_points) {
                          setAcceptRulesDialogOpened(true);
                          setRules(item.activation_rules);
                          setCode(item.code);
                        } else {
                          toast({
                            title: 'امتیاز کافی نیست',
                            description: `برای فعال‌سازی این آیتم به ${item.required_points} امتیاز نیاز دارید.`,
                            theme: 'theme',
                          });
                        }
                      }}
                    >
                      <span className="text-[10px] text-current font-semibold">
                        دریافت جایزه
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="DocumentText"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        عنوان :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {item.shopping_center_name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="DiscountShape"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        کد تخفیف :
                      </span>
                      <div>
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          ********
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Money"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        مبلغ تخفیف :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {`${numberSeparation(item.discount_value)} تومان`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Star1"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        امتیاز مورد نیاز :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {`${numberSeparation(item.required_points)} امتیاز`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Calendar"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        تاریخ اعتبار کد تخفیف :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {item.expires_at}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CustomPagination
            count={paginationCount}
            activeIndex={paginationActiveIndex}
            setActiveIndex={setPaginationActiveIndex}
          />
        </>
      )}
    </section>
  );
}
