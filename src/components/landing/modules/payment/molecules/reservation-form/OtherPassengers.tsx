import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Input } from './Input';
import { GrClear } from 'react-icons/gr';
import { FormSchema, Person } from '../../helpers/type';

import { PassengersNoteBook } from './PassengersNoteBook';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';

type Props = {
  length: number;
  roomIndex: number;
  control: Control<FormSchema> | undefined;
};

// ------------------------------

export function OtherPassengers(props: Props) {
  const { control, roomIndex, length } = props;

  const { setValue } = useFormContext<FormSchema>();
  const { fields: otherFields } = useFieldArray({
    control: control,
    name: `rooms.${roomIndex}.passengers.other_passengers`,
  });

  function fillPassenger(idx: number, passengerData: Person) {
    setValue(
      `rooms.${roomIndex}.passengers.other_passengers.${idx}`,
      passengerData,
    );
  }

  function clearPassenger(idx: number) {
    setValue(`rooms.${roomIndex}.passengers.other_passengers.${idx}`, {
      first_name: '',
      last_name: '',
      national_code: '',
    });
  }

  if (!length) return null;

  return (
    <div className="space-y-4">
      <h4 className="flex gap-2 text-cs08 font-bold">سایر مسافران :</h4>

      {otherFields.map((field, idx) => (
        <div
          key={field.id}
          className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-5"
        >
          <Input
            placeholder=" نام مسافر"
            name={`rooms.${roomIndex}.passengers.other_passengers.${idx}.first_name`}
          />

          <Input
            placeholder="نام خانوادگی"
            name={`rooms.${roomIndex}.passengers.other_passengers.${idx}.last_name`}
          />

          <Input
            placeholder="کد ملی یا پاسپورت (اختیاری)"
            name={`rooms.${roomIndex}.passengers.other_passengers.${idx}.national_code`}
          />

          <div className="flex h-10 justify-end">
            <PassengersNoteBook idx={idx} fillPassenger={fillPassenger} />

            <Tooltip>
              <TooltipTrigger
                type="button"
                onClick={() => clearPassenger(idx)}
                className="flex-center mr-3.5 w-10 rounded-lg border border-cs-red/10 bg-cs-red/5"
              >
                <GrClear size={20} color="#f30f26" />
              </TooltipTrigger>

              <TooltipContent>حذف اطلاعات مسافر</TooltipContent>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
}
