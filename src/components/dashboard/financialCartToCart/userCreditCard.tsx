// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { UserCreditCardPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX, useState } from 'react';
import NormalInput from '../profile/normalInput';
import { getBankFromCard } from '@/utils/string';
import CardShowCase from './cardShowCase';
import { Swiper, SwiperSlide } from 'swiper/react';
import { numberSeparation } from '@/utils';
import AddCardDialog from './dialog/addCardDialog';
import EditCurrentCardDialog from './dialog/editCurrentCardDialog';
import RemoveCurrentCardDialog from './dialog/removeCurrentCard';

// Creating and exporting UserCreditCart component as default
export default function UserCreditCard({
  className,
  data,
  onValueChange,
  title,
  mode,
}: UserCreditCardPropsType): JSX.Element {
  // Defining hooks
  const [addCardDialogOpened, setAddCardDialogOpened] =
    useState<boolean>(false);
  const [editCardDialogOpened, setEditCardDialogOpened] =
    useState<boolean>(false);
  const [deleteCardDialogOpened, setDeleteCardDialogOpened] =
    useState<boolean>(false);
  const [activeSwiperSlideIndex, setActiveSwiperSlideIndex] =
    useState<number>(0);

  // Returning JSX
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-black/10 bg-white',
        className,
      )}
    >
      <div className="justif-start flex items-center gap-3 border-b border-b-black/10 p-[14px] lg:p-4">
        <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[10px] border border-black/10 text-black lg:rounded-md">
          <IconsaxIcons
            name="Cards"
            className="h-[20px] w-[20px]"
            color="currentColor"
          />
        </div>
        <div className="w-full overflow-hidden">
          <span className="mb-1 block truncate text-right text-[12px] font-semibold text-black lg:text-cs75">
            {`حساب بانکی شما (${title})`}
          </span>
          <p className="truncate text-right text-[10px] font-bold text-black/50 lg:text-cs75 lg:font-semibold">
            میتوانید کارت بانکی دلخواه مدنظر خود را اضافه نمایید.
          </p>
        </div>
      </div>
      <div className="p-[14px] lg:p-4">
        <div className="mb-4 h-[190px] overflow-hidden rounded-xl bg-gray-200 px-8 py-4">
          {data.length === 0 ? (
            <CardShowCase
              className="h-[calc(190px-32px)]"
              data={{
                bankIcon: 'unknown',
                holderName: '-',
                bankName: 'safarnameh24',
                iban: '************************',
                number: '****************',
              }}
            />
          ) : (
            <Swiper
              spaceBetween={20}
              className="!overflow-visible"
              onSlideChange={(swiper) => {
                const activeIndex = swiper.activeIndex;
                setActiveSwiperSlideIndex(activeIndex);

                if (onValueChange) {
                  const creditCardInfo = data[activeIndex];
                  onValueChange(creditCardInfo);
                }
              }}
            >
              {data.map((item, index) => (
                <SwiperSlide dir="rtl" key={index}>
                  <CardShowCase
                    className="h-[calc(190px-32px)]"
                    data={{
                      bankIcon:
                        getBankFromCard(item.card_number)?.type || 'unknown',
                      bankName:
                        getBankFromCard(item.card_number)?.name || 'نامعلوم',
                      iban: item.iban || '************************',
                      number: item.card_number || '****************',
                      holderName: item.account_holder_name || '-',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-start gap-4">
            <div className="flex-1 overflow-hidden">
              <span className="mb-1 block truncate text-right text-cs07 font-semibold text-black">
                بانک
              </span>
              <span className="block truncate text-right text-cs07 font-medium text-black/70">
                {data.length === 0
                  ? 'سیستم بانکی ناشناخته است!'
                  : getBankFromCard(data[activeSwiperSlideIndex].card_number)
                      ?.name || 'سیستم بانکی ناشناخته است!'}
              </span>
            </div>
            <div className="flex shrink-0 items-center justify-between gap-2">
              {data.length < 2 && (
                <>
                  <AddCardDialog
                    mode={mode}
                    open={addCardDialogOpened}
                    onOpenChange={setAddCardDialogOpened}
                  />
                  <button
                    className="flex size-[40px] items-center justify-center rounded-[10px] border border-black/10 bg-white text-black transition-all duration-500 hover:bg-gray-100/50 lg:rounded-md"
                    onClick={() => setAddCardDialogOpened(true)}
                  >
                    <IconsaxIcons
                      name="Add"
                      className="size-[18px]"
                      color="currentColor"
                    />
                  </button>
                </>
              )}
              {data.length !== 0 && (
                <>
                  <EditCurrentCardDialog
                    mode={mode}
                    open={editCardDialogOpened}
                    onOpenChange={setEditCardDialogOpened}
                    data={data[activeSwiperSlideIndex]}
                  />
                  <RemoveCurrentCardDialog
                    mode={mode}
                    open={deleteCardDialogOpened}
                    onOpenChange={setDeleteCardDialogOpened}
                    data={data[activeSwiperSlideIndex]}
                  />
                  <button
                    className="flex size-[40px] items-center justify-center rounded-[10px] border border-black/10 bg-white text-black transition-all duration-500 hover:bg-gray-100/50 lg:rounded-md"
                    onClick={() => setEditCardDialogOpened(true)}
                  >
                    <IconsaxIcons
                      name="Edit2"
                      className="size-[18px]"
                      color="currentColor"
                    />
                  </button>
                  <button
                    className="flex size-[40px] items-center justify-center rounded-[10px] bg-cs-red/5 text-cs-red transition-all duration-500 hover:bg-cs-red/10 lg:rounded-md"
                    onClick={() => setDeleteCardDialogOpened(true)}
                  >
                    <IconsaxIcons
                      name="Trash"
                      className="size-[18px]"
                      color="currentColor"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
          <div>
            <span className="mb-2 block truncate text-right text-cs85 font-semibold text-black">
              شماره کارت بانکی
            </span>
            <NormalInput
              type="text"
              className="h-[45px]"
              placeholder="16 رقم شماره کارت را وارد نمایید"
              disabled
              textLTR
              value={
                data.length !== 0
                  ? numberSeparation(
                      data[activeSwiperSlideIndex].card_number,
                      ' - ',
                      4,
                    )
                  : ''
              }
              clearFn={() => {
                alert('X');
              }}
            />
          </div>
          <div>
            <span className="mb-2 block truncate text-right text-cs85 font-semibold text-black">
              شماره شبا کارت بانکی
            </span>
            <NormalInput
              type="text"
              className="h-[45px]"
              placeholder="24 رقم شماره شبا کارت را وارد نمایید"
              textLTR
              disabled
              value={
                data.length !== 0
                  ? numberSeparation(
                      data[activeSwiperSlideIndex].iban,
                      ' - ',
                      4,
                    )
                  : ''
              }
              clearFn={() => {
                alert('X');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
