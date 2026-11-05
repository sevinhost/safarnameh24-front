// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ICX } from '@/components/icons/ICX';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  MessageItemPropsType,
  TicketsSettingItemPropsType,
} from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import FileItem from './fileItem';
import useLocalStorageState from 'use-local-storage-state';
import MessageItem from './messageItem';
import TicketsNavBar from './ticketsNavBar';
import { useMediaQuery } from '@/hooks';

// Defining data's
const walpaperData = [
  { label: 'برفاب', color: '#BCBCBC' }, // Light Gray
  { label: 'مهتاب', color: '#F3F3F3' }, // Moonlight
  { label: 'سحر', color: '#F3F3F3' }, // Dawn
  { label: 'شبگیر', color: '#2A2A2A' }, // Dark Night
  { label: 'آسمان', color: '#CEDEEE' }, // Sky
  { label: 'ابرنقره', color: '#F7F8F9' }, // Silver Cloud
];

const themeData = [
  { label: 'کهکشان', color: '#7B61C8' }, // Galaxy
  { label: 'آتشفشان', color: '#EF384A' }, // Volcano
  { label: 'جنگل', color: '#309B62' }, // Forest
  { label: 'سیاهچال', color: '#232323' }, // Dungeon
  { label: 'دریاچه', color: '#548BF6' }, // Lake
  { label: 'سنگواره', color: '#4C4C4C' }, // Fossil / Stone
];

const fakeMessages: MessageItemPropsType['data'][] = [
  {
    createdAt: new Date().toISOString(),
    from: 'user',
    message:
      'سلام خوبی.. من یه سوال خیلی مبهم داشتم درمورد سیستم عملکردی سفرنامه 24 اگر بتونی کمک کنی ممنونت میشم.',
    type: 'text',
    answererName: 'شما',
  },
  {
    createdAt: new Date().toISOString(),
    from: 'answerer',
    message:
      'سلام خوبی من یه سوال خیلی مبهم داشتم درمورد سیستم عملکردی سفرنامه 24 اگر بتونی کمک کنی ممنونت میشم. ',
    type: 'text',
    answererName: 'محمد علی کلی',
  },
  {
    createdAt: new Date().toISOString(),
    from: 'user',
    type: 'voice',
    message: '/randomMusic.mp3',
    answererName: 'شما',
  },
];

// Creating and exporting Tikcets settingItem component as default
export default function SettingItem({
  subTitle,
  title,
  className,
  disabled = false,
  onClick,
  size = 'lg',
  icon,
  type = 'files',
  files,
  mobileActiveTab,
  setMobileActiveTab,
}: TicketsSettingItemPropsType): ReactNode {
  // Defining hooks
  const [theme, setTheme] = useLocalStorageState<string>('ticketTheme');
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [walpaper, setWalpaper] =
    useLocalStorageState<string>('ticketWalpaper');

  // Defining inner component
  function SettingButton() {
    return (
      <DialogTrigger asChild disabled={disabled}>
        <button
          onClick={() => !disabled && onClick && onClick()}
          className={cn(
            'flex w-full cursor-pointer items-center justify-between gap-3 bg-white transition-all duration-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-white',
            size === 'lg' ? 'rounded-lg p-[12px]' : 'py-2',
            className,
          )}
        >
          <div
            className={cn(
              'flex items-center gap-3 overflow-hidden',
              size === 'lg' ? 'justify-start' : 'w-full justify-center',
            )}
          >
            <div
              className={
                'flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-200 text-black'
              }
            >
              <IconsaxIcons
                name={icon}
                className="size-5"
                color="currentColor"
              />
            </div>
            {size === 'lg' && (
              <div className="overflow-hidden">
                <span className="mb-1 block truncate text-right text-cs75 font-medium text-black">
                  {title}
                </span>
                <span className="block truncate text-right text-cs75 font-medium text-black/70">
                  {type === 'files'
                    ? subTitle
                      ? subTitle
                      : 'فایل ها'
                    : type === 'walpaper'
                      ? subTitle
                        ? subTitle
                        : walpaperData.find((item) => item.color === walpaper)
                            ?.label
                      : subTitle
                        ? subTitle
                        : themeData.find((item) => item.color === theme)?.label}
                </span>
              </div>
            )}
          </div>
          {size === 'lg' && (
            <div className="shrink-0 text-black">
              <IconsaxIcons
                name={disabled ? 'Lock' : 'ArrowLeft2'}
                className="size-4"
                color="currentColor"
              />
            </div>
          )}
        </button>
      </DialogTrigger>
    );
  }

  // Conditiaonl rendering
  if (type === 'files') {
    return (
      <Dialog>
        <SettingButton />
        <DialogPortal>
          <DialogContent className="custom-scrollbar block h-dvh w-full max-w-[100vw] gap-0 overflow-auto !rounded-none p-0 lg:h-[50dvh] lg:max-w-[400px] lg:!rounded-2xl">
            <div className="flex h-[50px] w-full shrink-0 items-center justify-between gap-3 border-b border-b-black/10 bg-white px-6 py-5 lg:h-auto">
              <div className="flex items-center justify-start gap-3">
                <DialogClose asChild className="block lg:hidden">
                  <button className="shrink-0" type="button">
                    <IconsaxIcons
                      name="ArrowRight"
                      className="h-5 w-5 text-black"
                    />
                  </button>
                </DialogClose>
                <DialogTitle className="w-full truncate text-right text-[14px] font-bold text-[#2b2b2b]">
                  لیست فایل های ذخیره شده
                </DialogTitle>
              </div>
              <DialogClose asChild className="hidden lg:block">
                <button className="shrink-0" type="button">
                  <ICX className="h-3 w-3 text-black" fill="currentColor" />
                </button>
              </DialogClose>
            </div>
            <div
              className="custom-scrollbar flex h-[calc(100dvh-50px)] w-full flex-col justify-between gap-3 overflow-y-auto overflow-x-hidden bg-gray-100 p-6 lg:block lg:h-[calc(50dvh-62px)]"
              dir="ltr"
            >
              <div className="flex flex-col gap-4" dir="rtl">
                {files?.map((item, index) => (
                  <FileItem file={item} key={index} />
                ))}
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  } else if (type === 'walpaper') {
    return (
      <Dialog>
        <SettingButton />
        <DialogPortal>
          <DialogContent className="custom-scrollbar block h-dvh w-full max-w-[100vw] gap-0 overflow-auto !rounded-none p-0 lg:h-auto lg:max-w-[400px] lg:!rounded-2xl">
            <div className="flex h-[50px] w-full shrink-0 items-center justify-between gap-3 border-b border-b-black/10 bg-white px-6 py-5 lg:h-auto">
              <div className="flex items-center justify-start gap-3">
                <DialogClose asChild className="block lg:hidden">
                  <button className="shrink-0" type="button">
                    <IconsaxIcons
                      name="ArrowRight"
                      className="h-5 w-5 text-black"
                    />
                  </button>
                </DialogClose>
                <div>
                  <DialogTitle className="w-full truncate text-right text-[14px] font-bold text-[#2b2b2b]">
                    والپیپر
                  </DialogTitle>
                  <span className="mt-1 hidden truncate text-right text-[12px] font-normal text-[#2b2b2b] lg:block">
                    {walpaperData.find((item) => item.color === walpaper)
                      ?.label || '-'}
                  </span>
                </div>
              </div>
              <DialogClose asChild className="hidden lg:block">
                <button className="shrink-0" type="button">
                  <ICX className="h-3 w-3 text-black" fill="currentColor" />
                </button>
              </DialogClose>
            </div>
            <div className="flex h-[calc(100dvh-50px)] flex-col justify-between gap-3 p-0 lg:block lg:h-auto lg:p-6">
              <div className="flex w-full flex-col justify-between">
                <div className="flex w-full items-center justify-between gap-3 p-6 lg:hidden">
                  <div>
                    <span className="w-full truncate text-right text-[16px] font-bold text-[#2b2b2b]">
                      والپیپر
                    </span>
                    <span className="mt-1 block truncate text-right text-[14px] font-normal text-[#2b2b2b]">
                      {walpaperData.find((item) => item.color === walpaper)
                        ?.label || '-'}
                    </span>
                  </div>
                  <DialogClose asChild>
                    <button className="w-fit rounded-md bg-black px-4 py-3 text-center text-cs07 font-medium text-white">
                      ذخیره اطلاعات
                    </button>
                  </DialogClose>
                </div>
                <div
                  className="rounded-0 custom-scrollbar mb-7 flex h-[200px] w-full flex-col gap-4 overflow-x-hidden overflow-y-scroll bg-gray-100 p-[24px] lg:rounded-lg lg:bg-white"
                  style={{ background: walpaper }}
                >
                  {fakeMessages.map((item, index) => (
                    <MessageItem data={item} key={index} />
                  ))}
                </div>
                <div className="grid shrink-0 grid-cols-6 gap-7 px-6 lg:gap-3 lg:px-0">
                  {walpaperData.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setWalpaper(item.color)}
                      data-active={item.color === walpaper}
                      className="group relative flex aspect-square shrink-0 overflow-hidden rounded-lg p-1 lg:p-1.5"
                    >
                      <div
                        className="absolute left-0 top-0 h-full w-full transition-all duration-500 group-data-[active=false]:opacity-10 group-data-[active=true]:opacity-50"
                        style={{ background: item.color }}
                      />
                      <div
                        className="z-10 w-full cursor-pointer rounded-md"
                        style={{ background: item.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {isMobile && mobileActiveTab && setMobileActiveTab && (
                <TicketsNavBar
                  className="shrink-0"
                  activeTabState={mobileActiveTab}
                  setActiveTabState={setMobileActiveTab}
                />
              )}
              <div className="mt-5 hidden lg:block">
                <DialogClose asChild>
                  <button className="w-fit rounded-md bg-black px-5 py-2.5 text-center text-cs07 font-medium text-white">
                    ذخیره اطلاعات
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  } else if (type === 'theme') {
    return (
      <Dialog>
        <SettingButton />
        <DialogPortal>
          <DialogContent className="custom-scrollbar block h-dvh w-full max-w-[100vw] gap-0 overflow-auto !rounded-none p-0 lg:h-auto lg:max-w-[400px] lg:!rounded-2xl">
            <div className="flex h-[50px] w-full shrink-0 items-center justify-between gap-3 border-b border-b-black/10 bg-white px-6 py-5 lg:h-auto">
              <div className="flex items-center justify-start gap-3">
                <DialogClose asChild className="block lg:hidden">
                  <button className="shrink-0" type="button">
                    <IconsaxIcons
                      name="ArrowRight"
                      className="h-5 w-5 text-black"
                    />
                  </button>
                </DialogClose>
                <div>
                  <DialogTitle className="w-full truncate text-right text-[14px] font-bold text-[#2b2b2b]">
                    رنگ چت تایم
                  </DialogTitle>
                  <span className="mt-1 hidden truncate text-right text-[12px] font-normal text-[#2b2b2b] lg:block">
                    {themeData.find((item) => item.color === theme)?.label ||
                      '-'}
                  </span>
                </div>
              </div>
              <DialogClose asChild className="hidden lg:block">
                <button className="shrink-0" type="button">
                  <ICX className="h-3 w-3 text-black" fill="currentColor" />
                </button>
              </DialogClose>
            </div>
            <div className="flex h-[calc(100dvh-50px)] flex-col justify-between gap-3 p-0 lg:block lg:h-auto lg:p-6">
              <div className="flex w-full flex-col justify-between">
                <div className="flex w-full items-center justify-between gap-3 p-6 lg:hidden">
                  <div>
                    <span className="w-full truncate text-right text-[16px] font-bold text-[#2b2b2b]">
                      رنگ چت تایم
                    </span>
                    <span className="mt-1 block truncate text-right text-[14px] font-normal text-[#2b2b2b]">
                      {themeData.find((item) => item.color === theme)?.label ||
                        '-'}
                    </span>
                  </div>
                  <DialogClose asChild>
                    <button className="w-fit rounded-md bg-black px-4 py-3 text-center text-cs07 font-medium text-white">
                      ذخیره اطلاعات
                    </button>
                  </DialogClose>
                </div>
                <div
                  className="rounded-0 custom-scrollbar mb-7 flex h-[200px] w-full flex-col gap-4 overflow-x-hidden overflow-y-scroll bg-gray-100 p-[24px] lg:rounded-lg"
                  style={{ background: walpaper }}
                >
                  {fakeMessages.map((item, index) => (
                    <MessageItem data={item} key={index} />
                  ))}
                </div>
                <div className="grid shrink-0 grid-cols-6 gap-7 px-6 lg:gap-3 lg:px-0">
                  {themeData.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setTheme(item.color)}
                      data-active={item.color === theme}
                      className="group relative flex aspect-square shrink-0 overflow-hidden rounded-lg p-1 lg:p-1.5"
                    >
                      <div
                        className="absolute left-0 top-0 h-full w-full transition-all duration-500 group-data-[active=false]:opacity-10 group-data-[active=true]:opacity-50"
                        style={{ background: item.color }}
                      />
                      <div
                        className="z-10 w-full cursor-pointer rounded-md"
                        style={{ background: item.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {isMobile && mobileActiveTab && setMobileActiveTab && (
                <TicketsNavBar
                  className="shrink-0"
                  activeTabState={mobileActiveTab}
                  setActiveTabState={setMobileActiveTab}
                />
              )}
              <div className="mt-5 hidden lg:block">
                <DialogClose asChild>
                  <button className="w-fit rounded-md bg-black px-5 py-2.5 text-center text-cs07 font-medium text-white">
                    ذخیره اطلاعات
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
}
