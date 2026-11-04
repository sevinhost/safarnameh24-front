'use client';

import dynamic from 'next/dynamic';
import Countdown from 'react-countdown';
import { usePathname } from 'next/navigation';

export const DynamicTopBarTimer = dynamic(
  () => import('./TopBarTimer').then(({ TopBarTimer }) => TopBarTimer),
  {
    ssr: false,
  },
);

type Props = {
  timer: string;
};

// -----------------------------------------

export function TopBarTimer(props: Props) {
  const { timer } = props;
  if (!timer || new Date().getTime() > new Date(timer).getTime()) return null;

  return (
    <div className="h-9 flex gap-2 lg:h-10 lg:gap-3">
      <Countdown date={timer} renderer={CountDownRenderer} />
    </div>
  );
}

// -----------------------------------------

type CountDownRendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountDownRenderer = (props: CountDownRendererProps) => {
  const { days, hours, minutes, seconds } = props;

  return (
    <>
      <CountDownItem value={seconds} type="ثانیه" />
      <CountDownItem value={minutes} type="دقیقه" />
      <CountDownItem value={hours} type="ساعت" />
      <CountDownItem value={days} type="روز" />
    </>
  );
};

// -----------------------------------------

type CountDownItemProps = {
  value: number;
  type: string;
};

const CountDownItem = (props: CountDownItemProps) => {
  const { value, type } = props;

  const pathname = usePathname();
  const paddedNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div
      className={`w-9 text-cs75 font-extrabold pt-0.5 flex-center gap-1 rounded-md lg:w-20 lg:font-bold lg:rounded-lg ${
        type === 'روز'
          ? pathname === '/hotel'
            ? 'bg-cs-red/10 text-cs-red border-2 border-cs-red border-dashed lg:border-none'
            : 'bg-cs-red/10 text-cs-red border-2 border-cs-red border-dashed'
          : 'bg-zinc-200/50 text-zinc-800'
      }`}
    >
      <span className="w-4 text-center">{paddedNumber(value)}</span>
      <span
        className={`hidden lg:block ${
          type === 'روز' ? 'text-cs-red' : 'text-zinc-500'
        }`}
      >
        {type}
      </span>
    </div>
  );
};
