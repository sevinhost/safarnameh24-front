import { useNumberOfNights } from '@/hooks';
import { useDatePickerContext } from '@/context';

type Props = {
  type?: 'home' | 'else';
};

// -----------------------------------

export default function NumberOfNights(props: Props) {
  const { type } = props;

  const { confirmedValue } = useDatePickerContext();
  const rawNumberOfNights = useNumberOfNights(confirmedValue);

  // اطمینان از اینکه عدد معتبر است و NaN نیست
  const numberOfNights =
    typeof rawNumberOfNights === 'number' && !Number.isNaN(rawNumberOfNights) && rawNumberOfNights > 0
      ? rawNumberOfNights
      : 0;

  return (
    <>
      {!type ? (
        <div
          className={`bg-zinc-200/50 text-zinc-600 text-cs08 font-semibold h-12 pr-5 pl-3 py-2 flex items-center rounded-cs-10 ${numberOfNights > 0 ? 'gap-1.5' : 'gap-2.5'}`}
        >
          <span>تعداد شب اقامت</span>

          <div
            className={`h-full px-4 mr-auto flex-center gap-1 rounded-md ${numberOfNights > 0 ? 'bg-cs-red/10 text-cs-red' : 'bg-zinc-200 text-zinc-600'}`}
          >
            <span>{numberOfNights > 0 ? numberOfNights : '-'}</span>
            <span>شب</span>
          </div>
        </div>
      ) : (
        <>
          {type === 'home' ? (
            <div className="flex flex-col justify-center gap-y-2">
              <span className="text-zinc-800 text-cs85 font-extrabold">
                تعداد شب اقامت
              </span>

              <span className="text-zinc-500 text-cs08 font-semibold flex item-center gap-1">
                {numberOfNights > 0 ? (
                  <>
                    <span>{numberOfNights}</span>
                    <span>شب</span>
                  </>
                ) : (
                  '- - - -'
                )}
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              <span>مدت شب اقامت</span>

              <div className="bg-zinc-200/50 text-zinc-600 font-semibold h-12 px-4 flex items-center gap-1 rounded-lg">
                <span>{numberOfNights > 0 ? numberOfNights : '-'}</span>
                <span>شب</span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}