// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import Avatar from '../../../../public/image/avatar/1.jpg';
import Image from 'next/image';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import SettingItem from './settingItem';
import DateSeprator from './dateSeprator';
import SendMessage from './sendMessage';
import { Button } from '@/components/ui/button';
import TicketItem from './ticketItem';
import EmptyImage from '../../../../public/image/empty.png';
import SelectDepartmentDialog from './dialog/selectDepartmentDialog';
import {
  TicketsContextPropsType,
  TicketsContextType,
} from '@/types/dashboard/component';
import { cn, hexToRgba, isColorDark } from '@/utils/utils';
import MessageItem from './messageItem';
import useLocalStorageState from 'use-local-storage-state';
import toast from '../ui/customSonner/toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { AccordionTrigger } from '@radix-ui/react-accordion';
import moment from 'jalali-moment';
import { useMediaQuery } from '@/hooks';
import ExitTicketsDialog from './dialog/exitTicketsDialog';
import TicketsNavBar from './ticketsNavBar';
import CanclationErrorDrawer from '../reservation/canclationErrorDrawer';

// Creating and exporting TicketsContext component as default
export default function TicketsContext({
  tickets,
  className,
}: TicketsContextPropsType): ReactNode {
  // Defining hooks
  const [rightLayoutSize, setRightLayoutSize] = useState<'sm' | 'lg'>('lg');
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [exitModalOpened, setExitModalOpened] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<number | undefined>();
  const [replyTo, setReplyTo] = useState<string>('');
  const [replyMessage, setReplyMessage] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [mobileActiveTab, setMobileActiveTab] = useState<string>('messages');
  const [notificationDrawerOpened, setNotificationDrawerOpened] =
    useState<boolean>(false);

  const [
    mobileTicketAnswererProfileOpened,
    setMobileTicketAnswererProfileOpened,
  ] = useState<boolean>(false);

  // Defining local storage items
  const [walpaper] = useLocalStorageState<string>('ticketWalpaper', {
    defaultValue: '#F7F8F9',
  });

  const theme = useLocalStorageState<string>('ticketTheme', {
    defaultValue: '#548BF6',
  });

  const [ticketNotifications, setTicketNotifications] =
    useLocalStorageState<boolean>('ticketNotifications', {
      defaultValue: false,
    });

  // Defining variables
  const allTickets: TicketsContextType[] = [
    ...tickets.currentTickets,
    ...tickets.previousTickets.flatMap((p) => p.tickets),
  ];

  const foundedTicketItem = allTickets.find(
    (item) => item.id === selectedTicket,
  );

  // Using useEffect to clear reply things
  useEffect(() => {
    setReplyTo('');
    setReplyMessage('');
  }, [foundedTicketItem]);

  // Returning JSX
  if (isMobile) {
    if (foundedTicketItem) {
      return (
        <div
          style={{
            background: walpaper,
          }}
          className="flex h-dvh flex-col justify-between"
        >
          <div
            data-opened={mobileTicketAnswererProfileOpened}
            className="custom-scrollbar absolute left-0 top-0 z-50 h-dvh w-dvw overflow-y-auto overflow-x-hidden bg-white transition-all duration-500 data-[opened=true]:visible data-[opened=false]:invisible data-[opened=false]:translate-x-[100%] data-[opened=true]:translate-x-0 data-[opened=false]:opacity-0 data-[opened=true]:opacity-100"
          >
            <button
              className="absolute left-[24px] top-[30px] text-black"
              onClick={() => setMobileTicketAnswererProfileOpened(false)}
            >
              <IconsaxIcons
                className="size-[20px]"
                name="ArrowLeft"
                color="currentColor"
              />
            </button>
            <div className="border-b border-black/10 p-[24px]">
              <Image
                width={100}
                height={100}
                alt="پروفایل کاریر"
                src={
                  foundedTicketItem?.user?.img
                    ? foundedTicketItem.user.img
                    : Avatar.src
                }
                className="mx-auto mb-4 block aspect-square size-[75px] rounded-full object-cover transition-all duration-500"
              />
              <span className="block truncate text-center text-cs75 font-bold text-black">
                {foundedTicketItem ? foundedTicketItem.user.name : 'نامعلوم'}
              </span>
              <span className="mt-1 block truncate text-center text-cs65 font-medium text-black/70">
                {foundedTicketItem ? foundedTicketItem.user.role : 'نامعلوم'}
              </span>
            </div>
            <div className="p-[24px]">
              <span className="block truncate text-right text-cs75 font-medium text-black/70">
                فایل های ذخیره
              </span>
            </div>
            <div className="flex flex-col">
              <SettingItem
                icon="DocumentText"
                className="px-[24px] py-[12px]"
                subTitle={`${foundedTicketItem?.files.documents.length || 0} فایل`}
                title="داکیومنت"
                type="files"
                files={foundedTicketItem?.files.documents}
                size={'lg'}
                disabled={foundedTicketItem.files.documents.length === 0}
              />
              <SettingItem
                type="files"
                className="px-[24px] py-[12px]"
                files={foundedTicketItem?.files.images}
                icon="Image"
                subTitle={`${foundedTicketItem?.files.images.length || 0} فایل`}
                title="عکس"
                size={'lg'}
                disabled={foundedTicketItem.files.images.length === 0}
              />
              <SettingItem
                icon="Microphone"
                className="px-[24px] py-[12px]"
                subTitle={`${foundedTicketItem?.files.voices.length || 0} فایل`}
                title="صدا"
                type="files"
                files={foundedTicketItem?.files.voices}
                size={'lg'}
                disabled={foundedTicketItem.files.voices.length === 0}
              />
              <SettingItem
                icon="VideoPlay"
                className="px-[24px] py-[12px]"
                subTitle={`${foundedTicketItem?.files.videos.length || 0} فایل`}
                title="ویدیو"
                type="files"
                files={foundedTicketItem?.files.videos}
                size={'lg'}
                disabled={foundedTicketItem.files.videos.length === 0}
              />
            </div>
          </div>
          <CanclationErrorDrawer
            isOpened={notificationDrawerOpened}
            closeFn={() => setNotificationDrawerOpened(false)}
            theme={ticketNotifications ? 'green' : 'theme'}
            description={
              ticketNotifications
                ? 'در صورت پیام به ادمین به شما نوتیفیکشن خواهد امد.'
                : 'در صورت پیام به ادمین به شما نوتیفیکشن نخواهد امد.'
            }
            title={
              ticketNotifications ? 'نوتیفیکشن وصل شد !' : 'نوتیفیکشن قطع شد !'
            }
          />
          <div
            className="flex h-[50px] shrink-0 items-center justify-between gap-3 border-b px-[12px]"
            style={{
              background: hexToRgba('#ffffff', 0.2),
              color: isColorDark(walpaper) ? '#ffffff' : '#000000',
              borderColor: isColorDark(walpaper)
                ? 'rgba(256,256,256,0.2)'
                : 'rgba(0,0,0,0.1)',
            }}
          >
            <button
              onClick={() => setMobileTicketAnswererProfileOpened(true)}
              className="flex w-full flex-1 items-center justify-start gap-3 overflow-hidden"
            >
              {foundedTicketItem.user.img ? (
                <Image
                  width={100}
                  height={100}
                  alt="پروفایل کاریر"
                  src={foundedTicketItem.user.img}
                  className="block aspect-square size-[35px] shrink-0 rounded-full object-cover"
                />
              ) : (
                <div
                  style={{
                    background: theme[0],
                  }}
                  className="aspect-square size-[40px] shrink-0 rounded-full"
                />
              )}
              <div
                className="w-full flex-1 overflow-hidden"
                style={{
                  color: isColorDark(walpaper) ? '#ffffff' : '#000000',
                }}
              >
                <span className="block truncate text-right text-cs75 font-bold text-current">
                  {foundedTicketItem.user.name}
                </span>
                <span className="text-current/70 block truncate text-right text-cs65 font-medium">
                  {foundedTicketItem.user.role}
                </span>
              </div>
            </button>
            <div className="flex shrink-0 items-center justify-between gap-3">
              <button
                data-active={ticketNotifications}
                className="data-[active=false]:text-current/50 relative overflow-hidden transition-all duration-500 data-[active=true]:text-current"
                onClick={() => {
                  setTicketNotifications((prev) => !prev);
                  setNotificationDrawerOpened(true);
                }}
              >
                {!ticketNotifications && (
                  <div className="absolute left-[50%] top-0 h-full w-[2px] -translate-x-[50%] rotate-[45deg] scale-125 bg-current" />
                )}
                <IconsaxIcons
                  name="Notification"
                  className="size-5"
                  color="currentColor"
                />
              </button>
              <button
                className="text-current transition-all duration-500 disabled:opacity-50"
                onClick={() => setSelectedTicket(undefined)}
              >
                <IconsaxIcons
                  className="size-[20px]"
                  name="ArrowLeft"
                  color="currentColor"
                />
              </button>
            </div>
          </div>
          <div
            className="custom-scrollbar relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden p-[24px]"
            style={{
              background: walpaper,
            }}
          >
            {foundedTicketItem.messages.length === 0 ? (
              <div
                className="custom-scrollbar pointer-events-none absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] overflow-auto"
                style={{
                  color: isColorDark(walpaper) ? '#ffffff' : '#000000',
                }}
              >
                <div>
                  <div className="text-current/50">
                    <IconsaxIcons
                      name="EmojiSad"
                      color="currentColor"
                      className="mx-auto mb-5 block size-32"
                    />
                  </div>
                  <p className="text-current/75 block text-center text-cs07 font-normal">
                    مشتری گرامی صفحه چت برای شما قفل میباشد، برای استارت ابتدا
                    دپارتمان خود را انتخاب نمایید
                  </p>
                </div>
              </div>
            ) : (
              foundedTicketItem.messages.map((item, index) => (
                <MessageItem
                  key={index}
                  setReply={(message, name) => {
                    setReplyTo(name);
                    setReplyMessage(message);
                  }}
                  data={item}
                />
              ))
            )}
          </div>
          <div
            className="w-full shrink-0 border-t-2 p-3"
            style={{
              background: 'rgba(256,256,256,0.2)',
              borderColor: isColorDark(walpaper)
                ? 'rgba(256,256,256,0.2)'
                : 'rgba(0,0,0,0.1)',
            }}
          >
            <SendMessage
              className="rounded-0 w-full"
              disabled={!foundedTicketItem}
              isClosed={foundedTicketItem?.status === 'closed'}
              reportTypes={foundedTicketItem?.report}
              clearReply={() => {
                setReplyMessage('');
                setReplyTo('');
              }}
              reply={{
                message: replyMessage,
                name: replyTo,
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <SelectDepartmentDialog
            isOpened={modalOpened}
            closeFn={() => setModalOpened(false)}
          />
          <ExitTicketsDialog
            isOpened={exitModalOpened}
            closeFn={() => setExitModalOpened(false)}
          />
          <div className="flex h-[50px] items-center justify-between gap-3 border-b border-b-black/10 bg-white px-[12px]">
            <span className="block flex-1 truncate text-right text-cs85 font-bold text-black/70">
              {mobileActiveTab === 'closedMessage'
                ? 'تیکت های گذشته '
                : mobileActiveTab === 'settings'
                  ? 'تنظیمات چت'
                  : 'چت تایم سفرنامه 24'}
            </span>
            <div className="flex shrink-0 items-center justify-between gap-3">
              <button
                className="text-cs-blue"
                onClick={() => setModalOpened(true)}
              >
                <IconsaxIcons
                  className="size-[20px]"
                  name="AddSquare"
                  color="currentColor"
                />
              </button>
              <button
                className="text-black transition-all duration-500 disabled:opacity-50"
                onClick={() => setExitModalOpened(true)}
              >
                <IconsaxIcons
                  className="size-[20px]"
                  name="LogoutCurve"
                  color="currentColor"
                />
              </button>
            </div>
          </div>
          <div className="custom-scrollbar relative flex h-[calc(100dvh-125px)] w-full flex-col overflow-y-auto overflow-x-hidden bg-white py-[10px]">
            {mobileActiveTab === 'closedMessage' ? (
              <>
                {tickets.previousTickets.length === 0 ? (
                  <div className="custom-scrollbar flex h-full flex-col items-center justify-center overflow-auto p-[24px]">
                    <Image
                      alt="هیچ لیست رزروی فعلا ندارید!"
                      src={EmptyImage.src}
                      width={500}
                      height={500}
                      className="mx-auto mb-2 block aspect-square w-[40%]"
                    />
                    <span className="mb-2 block w-full truncate text-center text-[12px] font-bold text-black">
                      تیکت های گذشته
                    </span>
                    <span className="block w-full truncate text-center text-[10px] font-normal text-gray-500">
                      مشتری گرامی تیکتی در گذشته ندارید!
                    </span>
                  </div>
                ) : (
                  <Accordion collapsible type="single">
                    {tickets.previousTickets.map((item, index) => (
                      <AccordionItem
                        value={`previus-tickets-${index}`}
                        key={index}
                      >
                        <AccordionTrigger asChild>
                          <button className="group flex w-full items-center justify-between gap-3 bg-white px-[12px] py-[10px] text-black/70 transition-all duration-500 hover:bg-gray-100">
                            <span className="block flex-1 truncate text-right text-cs75 font-medium text-current">
                              تیکت های{' '}
                              {moment(item.date)
                                .locale('fa')
                                .format('jMMMM ماه jYYYY')}
                            </span>
                            <IconsaxIcons
                              name="ArrowLeft2"
                              className="size-4 transition-all duration-500 group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-90"
                              color="currentColor"
                            />
                          </button>
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.tickets.map((innerItem, innerIndex) => (
                            <TicketItem
                              key={innerIndex}
                              onClick={() => setSelectedTicket(innerItem.id)}
                              type="prevois"
                              className={
                                'rounded-none bg-white px-[12px] hover:bg-gray-100'
                              }
                              data={{
                                createdAt: innerItem.user.lastSeen,
                                subTitle: innerItem.user.status,
                                title: innerItem.user.name,
                                img: innerItem.user.img,
                              }}
                            />
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </>
            ) : mobileActiveTab === 'message' ? (
              <>
                {tickets.currentTickets.length === 0 ? (
                  <div className="custom-scrollbar pointer-events-none absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] overflow-auto text-black/50">
                    <div>
                      <IconsaxIcons
                        name="EmojiSad"
                        color="currentColor"
                        className="mx-auto mb-5 block size-32"
                      />
                      <p className="block text-center text-cs07 font-normal text-black/75">
                        مشتری گرامی صفحه چت برای شما قفل میباشد، برای استارت
                        ابتدا دپارتمان خود را انتخاب نمایید
                      </p>
                    </div>
                  </div>
                ) : (
                  tickets.currentTickets.map((item, index) => (
                    <TicketItem
                      key={index}
                      onClick={() => setSelectedTicket(item.id)}
                      className={
                        'rounded-none bg-white px-[12px] hover:bg-gray-100'
                      }
                      newNotifications={2}
                      data={{
                        createdAt: item.user.lastSeen,
                        subTitle: item.user.status,
                        title: item.user.name,
                        img: item.user.img,
                      }}
                    />
                  ))
                )}
              </>
            ) : (
              <>
                <SettingItem
                  setMobileActiveTab={setMobileActiveTab}
                  mobileActiveTab={mobileActiveTab}
                  className="rounded-0 px-[12px]"
                  icon="MessageText"
                  title="والپیپر"
                  type="walpaper"
                  size={'lg'}
                />
                <SettingItem
                  setMobileActiveTab={setMobileActiveTab}
                  mobileActiveTab={mobileActiveTab}
                  className="rounded-0 px-[12px]"
                  icon="Bucket"
                  title="رنگ چت تایم"
                  type="theme"
                  size={'lg'}
                />
              </>
            )}
          </div>
          <TicketsNavBar
            activeTabState={mobileActiveTab}
            setActiveTabState={setMobileActiveTab}
          />
        </div>
      );
    }
  } else {
    return (
      <div>
        <ExitTicketsDialog
          isOpened={exitModalOpened}
          closeFn={() => setExitModalOpened(false)}
        />
        <SelectDepartmentDialog
          isOpened={modalOpened}
          closeFn={() => setModalOpened(false)}
        />
        <div
          data-size={rightLayoutSize}
          className={cn(
            'group flex h-dvh w-full overflow-hidden bg-white',
            className,
          )}
        >
          <div className="custom-scrollbar overflow-auto transition-all duration-500 group-data-[size=lg]:w-[25%] group-data-[size=sm]:w-[10%]">
            <div className="border-b border-black/10 p-[24px]">
              <Image
                width={100}
                height={100}
                alt="پروفایل کاریر"
                src={
                  foundedTicketItem?.user?.img
                    ? foundedTicketItem.user.img
                    : Avatar.src
                }
                className="mx-auto mb-4 block aspect-square rounded-full object-cover transition-all duration-500 group-data-[size=lg]:size-[75px] group-data-[size=sm]:size-[50px]"
              />
              <span className="block truncate text-center text-cs95 font-bold text-black">
                {foundedTicketItem ? foundedTicketItem.user.name : 'نامعلوم'}
              </span>
              {rightLayoutSize === 'lg' && (
                <span className="mt-1 block truncate text-center text-cs85 font-medium text-black/70">
                  {foundedTicketItem ? foundedTicketItem.user.role : 'نامعلوم'}
                </span>
              )}
            </div>
            <div className="border-b border-black/10 pb-[24px]">
              <div className="group-data-[size=lg]:p-[24px] group-data-[size=sm]:p-3">
                <span className="block truncate text-right text-cs75 font-medium text-black/70 group-data-[size=sm]:text-center group-data-[size=lg]:text-right">
                  فایل های ذخیره
                </span>
              </div>
              <div className="flex flex-col group-data-[size=lg]:px-[12px] group-data-[size=sm]:px-0">
                <SettingItem
                  icon="DocumentText"
                  subTitle={`${foundedTicketItem?.files.documents.length || 0} فایل`}
                  title="داکیومنت"
                  type="files"
                  files={foundedTicketItem?.files.documents}
                  size={rightLayoutSize}
                  disabled={
                    !foundedTicketItem ||
                    foundedTicketItem.files.documents.length === 0
                  }
                />
                <SettingItem
                  type="files"
                  files={foundedTicketItem?.files.images}
                  icon="Image"
                  subTitle={`${foundedTicketItem?.files.images.length || 0} فایل`}
                  title="عکس"
                  size={rightLayoutSize}
                  disabled={
                    !foundedTicketItem ||
                    foundedTicketItem.files.images.length === 0
                  }
                />
                <SettingItem
                  icon="Microphone"
                  subTitle={`${foundedTicketItem?.files.voices.length || 0} فایل`}
                  title="صدا"
                  type="files"
                  files={foundedTicketItem?.files.voices}
                  size={rightLayoutSize}
                  disabled={
                    !foundedTicketItem ||
                    foundedTicketItem.files.voices.length === 0
                  }
                />
                <SettingItem
                  icon="VideoPlay"
                  subTitle={`${foundedTicketItem?.files.videos.length || 0} فایل`}
                  title="ویدیو"
                  type="files"
                  files={foundedTicketItem?.files.videos}
                  size={rightLayoutSize}
                  disabled={
                    !foundedTicketItem ||
                    foundedTicketItem.files.videos.length === 0
                  }
                />
              </div>
            </div>
            <div className="group-data-[size=lg]:pb-[24px] group-data-[size=sm]:pb-0">
              <div className="group-data-[size=lg]:p-[24px] group-data-[size=sm]:p-3">
                <span className="block truncate text-right text-cs75 font-medium text-black/70 group-data-[size=sm]:text-center group-data-[size=lg]:text-right">
                  تنظیمات چت
                </span>
              </div>
              <div className="flex flex-col group-data-[size=lg]:px-[12px] group-data-[size=sm]:px-0">
                <SettingItem
                  icon="MessageText"
                  title="والپیپر"
                  type="walpaper"
                  size={rightLayoutSize}
                  disabled={!foundedTicketItem}
                />
                <SettingItem
                  icon="Bucket"
                  title="رنگ چت تایم"
                  type="theme"
                  size={rightLayoutSize}
                  disabled={!foundedTicketItem}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[24px] border-x border-x-black/10 p-[24px] transition-all duration-500 group-data-[size=lg]:w-[50%] group-data-[size=sm]:w-[65%]">
            <div className="flex w-full shrink-0 items-center justify-between gap-3">
              {!foundedTicketItem ? (
                <span className="block flex-1 truncate text-start text-cs95 font-bold text-black">
                  بخش دپارتمان سفرنامه 24
                </span>
              ) : foundedTicketItem && foundedTicketItem.status === 'open' ? (
                <span className="block flex-1 truncate text-start text-cs95 font-bold text-black">
                  {foundedTicketItem.user.name}
                </span>
              ) : (
                <p className="block flex-1 truncate text-start text-cs95 font-bold text-black">
                  {foundedTicketItem.user.name}{' '}
                  <span className="text-cs-red">(تیکت منقضی شده)</span>
                </p>
              )}
              <div className="flex shrink-0 items-center justify-end gap-3">
                <button
                  data-active={ticketNotifications}
                  className="relative overflow-hidden transition-all duration-500 data-[active=false]:text-gray-500 data-[active=true]:text-black"
                  onClick={() => {
                    if (ticketNotifications) {
                      setTicketNotifications(false);
                      toast({
                        description:
                          'در صورت پیام به ادمین به شما نوتیفیکشن نخواهد امد.',
                        title: 'نوتیفیکشن قطع شد !',
                        theme: 'theme',
                      });
                    } else {
                      setTicketNotifications(true);
                      toast({
                        description:
                          'در صورت پیام به ادمین به شما نوتیفیکشن خواهد امد.',
                        title: 'نوتیفیکشن وصل شد !',
                        theme: 'green',
                      });
                    }
                  }}
                >
                  {!ticketNotifications && (
                    <div className="absolute left-[50%] top-0 h-full w-[2px] -translate-x-[50%] rotate-[45deg] scale-125 bg-gray-500" />
                  )}
                  <IconsaxIcons
                    name="Notification"
                    className="size-5"
                    color="currentColor"
                  />
                </button>
                <button
                  onClick={() =>
                    setRightLayoutSize((prev) => (prev === 'sm' ? 'lg' : 'sm'))
                  }
                >
                  <IconsaxIcons
                    name="Grid4"
                    className="size-5 group-data-[size=lg]:rotate-0 group-data-[size=sm]:rotate-180"
                    color="currentColor"
                  />
                </button>
              </div>
            </div>
            <div
              style={{ background: walpaper }}
              className="custom-scrollbar relative flex h-full w-full flex-col gap-4 overflow-y-auto overflow-x-hidden rounded-[12px] p-[24px]"
            >
              <DateSeprator date={new Date().toISOString()} />
              {!foundedTicketItem ? (
                <div className="custom-scrollbar pointer-events-none absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] overflow-auto text-gray-200">
                  <IconsaxIcons
                    name="EmojiSad"
                    color="currentColor"
                    className="size-32"
                  />
                </div>
              ) : (
                foundedTicketItem.messages.map((item, index) => (
                  <MessageItem
                    key={index}
                    setReply={(message, name) => {
                      setReplyTo(name);
                      setReplyMessage(message);
                    }}
                    data={item}
                  />
                ))
              )}
            </div>
            <SendMessage
              className="w-full shrink-0"
              disabled={!foundedTicketItem}
              isClosed={foundedTicketItem?.status === 'closed'}
              reportTypes={foundedTicketItem?.report}
              clearReply={() => {
                setReplyMessage('');
                setReplyTo('');
              }}
              reply={{
                message: replyMessage,
                name: replyTo,
              }}
            />
          </div>
          <div className="flex w-[25%] flex-col">
            <div className="shrink-0 border-b border-b-black/10 px-[20px] py-[24px]">
              <Button
                onClick={() => setModalOpened(true)}
                className="justif-center flex h-[50px] w-full items-center rounded-lg bg-cs-blue/10 px-[12px] !text-cs-blue transition-all duration-500 hover:bg-cs-blue/20"
              >
                <span className="truncate text-center text-cs75 font-semibold">
                  ثبت تیکت جدید
                </span>
              </Button>
            </div>
            <div className="custom-scrollbar h-[200px] shrink-0 overflow-auto border-b border-b-black/10 py-[12px]">
              <div className="px-[20px]">
                <span className="mb-3 block truncate text-right text-cs75 font-medium text-black/70">
                  تیکت های حال حاضر
                </span>
              </div>
              <div>
                {tickets.currentTickets.map((item, index) => (
                  <TicketItem
                    key={index}
                    onClick={() => setSelectedTicket(item.id)}
                    className={cn(
                      'rounded-none',
                      selectedTicket === item.id
                        ? 'bg-[#eaecfd] hover:bg-[#eaecfd]'
                        : '',
                    )}
                    newNotifications={10}
                    data={{
                      createdAt: item.user.lastSeen,
                      subTitle: item.user.status,
                      title: item.user.name,
                      img: item.user.img,
                    }}
                  />
                ))}
              </div>
            </div>
            {tickets.previousTickets.length === 0 ? (
              <div className="custom-scrollbar flex h-full flex-col items-center justify-center overflow-auto p-[24px]">
                <Image
                  alt="هیچ لیست رزروی فعلا ندارید!"
                  src={EmptyImage.src}
                  width={500}
                  height={500}
                  className="mx-auto mb-2 block aspect-square w-[50%]"
                />
                <span className="mb-2 block w-full truncate text-center text-[12px] font-bold text-black">
                  تیکت های گذشته
                </span>
                <span className="block w-full truncate text-center text-[10px] font-normal text-gray-500">
                  مشتری گرامی تیکتی در گذشته ندارید!
                </span>
              </div>
            ) : (
              <div className="custom-scrollbar h-full overflow-auto pt-[24px]">
                <div className="px-[20px]">
                  <span className="mb-3 block truncate text-right text-cs75 font-medium text-black/70">
                    تیکت های گذشته
                  </span>
                </div>
                <Accordion collapsible type="single">
                  {tickets.previousTickets.map((item, index) => (
                    <AccordionItem
                      value={`previus-tickets-${index}`}
                      key={index}
                    >
                      <AccordionTrigger asChild>
                        <button className="group flex w-full items-center justify-between gap-3 bg-white px-[20px] py-[10px] text-black/70 transition-all duration-500 hover:bg-gray-100">
                          <span className="block flex-1 truncate text-right text-cs75 font-medium text-current">
                            تیکت های{' '}
                            {moment(item.date)
                              .locale('fa')
                              .format('jMMMM ماه jYYYY')}
                          </span>
                          <IconsaxIcons
                            name="ArrowLeft2"
                            className="size-4 transition-all duration-500 group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-90"
                            color="currentColor"
                          />
                        </button>
                      </AccordionTrigger>
                      <AccordionContent className="p-[12px]">
                        {item.tickets.map((innerItem, innerIndex) => (
                          <TicketItem
                            key={innerIndex}
                            onClick={() => setSelectedTicket(innerItem.id)}
                            type="prevois"
                            className={cn(
                              'px-[12px]',
                              selectedTicket === innerItem.id
                                ? 'bg-gray-100'
                                : '',
                            )}
                            data={{
                              createdAt: innerItem.user.lastSeen,
                              subTitle: innerItem.user.status,
                              title: innerItem.user.name,
                              img: innerItem.user.img,
                            }}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            <div className="shrink-0 px-[20px] py-[24px]">
              <Button
                onClick={() => setExitModalOpened(true)}
                className="justif-center flex h-[50px] w-full items-center gap-2 rounded-lg bg-cs-red/10 px-[12px] !text-cs-red transition-all duration-500 hover:bg-cs-red/20"
              >
                <IconsaxIcons
                  className="size-[20px] shrink-0"
                  name="LogoutCurve"
                  color="currentColor"
                />
                <span className="truncate text-right text-cs75 font-semibold text-current">
                  خروج از تیکت, بازگشت به صفحه
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
