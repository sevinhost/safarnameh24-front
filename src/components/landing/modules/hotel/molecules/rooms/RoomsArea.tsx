'use client';

import NormalRoom from './NormalRoom';
import PackedRoom from './PackedRoom';

import { Room } from '@/types/landing';
import { Warning2 } from 'iconsax-react';
import { useEffect, useState } from 'react';

type PackedRoomType = {
  room_count: number;
  pack_rooms: Room[];
  night_count: number;
  total_price: number;
};

type Props = {
  data?: Room[] | PackedRoomType[];
  status: 'error' | 'success' | 'pending';
};

// --------------------------------

export default function RoomsArea(props: Props) {
  const { data, status } = props;

  const [visibleCount, setVisibleCount] = useState(0);

  const isNormalRooms =
    Array.isArray(data) && data.every((item) => 'capacity' in item);

  useEffect(() => {
    setVisibleCount(isNormalRooms ? 8 : 4);
  }, [data, isNormalRooms]);

  // چک لاگین دیگر کاربر را در این مرحله بلاک نمی‌کند و مستقیم رد می‌کند
  function handleCheckAuth(): boolean {
    return true;
  }

  if (status === 'pending') {
    return (
      <div className="flex-center h-40 lg:h-60">
        <div className="large-dots-dark" />
      </div>
    );
  }

  if (status === 'error' || !data || !data.length) {
    return (
      <div className="flex flex-col items-center py-12 text-cs08 font-semibold text-zinc-600">
        <Warning2 size={60} color="currentColor" className="text-cs-red" />
        <p className="mb-2 mt-4 text-[clamp(0.85rem,3vw,0.95rem)] font-bold text-zinc-800">
          متاسفانه جستجوی شما در تاریخ مورد نظر نتیجه ای نداشت !
        </p>

        <p>لطفا برای نمایش جدیدترین اطلاعات مجدد جستجو کنید</p>
        <p>از همراهی شما متشکریم</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {data
        .slice(0, visibleCount)
        .map((room, index: number) =>
          'room_count' in room && 'pack_rooms' in room ? (
            <PackedRoom
              key={index}
              packData={room}
              checkAuth={handleCheckAuth}
            />
          ) : (
            <NormalRoom key={index} room={room as Room} checkAuth={handleCheckAuth} />
          ),
        )}

      {visibleCount < data.length && (
        <button
          onClick={() =>
            setVisibleCount((prev) => prev + (isNormalRooms ? 8 : 4))
          }
          className="w-fit rounded-lg bg-zinc-200/80 px-5 py-2.5 text-cs08 font-semibold"
        >
          مشاهده بیشتر
        </button>
      )}
    </div>
  );
}