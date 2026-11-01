import {
  AddButton,
  PriceGuide,
  RemoveButton,
} from '../../atoms/reservation-form';

import { Input } from './Input';
import { usePaymentInvoiceDispatch } from '@/context';

import { FormSchema, Person } from '../../helpers/type';
import { PassengersNoteBook } from './PassengersNoteBook';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';

type Props = {
  length: number;
  roomIndex: number;
  passengerPrice: number;
  control: Control<FormSchema> | undefined;
};

// ------------------------------

export function ExtraCapacityPassengers(props: Props) {
  const { passengerPrice, control, roomIndex, length } = props;

  const dispatch = usePaymentInvoiceDispatch();
  const { setValue } = useFormContext<FormSchema>();

  const {
    fields: extraFields,
    append: addExtraPassenger,
    remove: removeExtraPassenger,
  } = useFieldArray({
    control: control,
    name: `rooms.${roomIndex}.passengers.extra_capacity_passengers`,
  });

  function addPassenger() {
    addExtraPassenger({
      first_name: '',
      last_name: '',
      national_code: '',
    });
    dispatch({
      actionType: 'add',
      payload: passengerPrice,
      type: 'extra-passengers',
    });
  }

  function fillPassenger(idx: number, passengerData: Person) {
    setValue(
      `rooms.${roomIndex}.passengers.extra_capacity_passengers.${idx}`,
      passengerData,
    );
  }

  function removePassenger(idx: number) {
    removeExtraPassenger(idx);
    dispatch({
      actionType: 'remove',
      payload: passengerPrice,
      type: 'extra-passengers',
    });
  }

  if (!length) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <h4 className="flex gap-2 text-cs08 font-bold">نفرات اضافه :</h4>

          <AddButton
            onClick={addPassenger}
            disabled={extraFields.length >= length}
          />
        </div>

        <PriceGuide price={passengerPrice} />
      </div>

      {extraFields.map((field, idx) => (
        <div
          key={field.id}
          className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-5"
        >
          <Input
            placeholder=" نام مسافر"
            name={`rooms.${roomIndex}.passengers.extra_capacity_passengers.${idx}.first_name`}
          />

          <Input
            placeholder=" نام خانوادگی"
            name={`rooms.${roomIndex}.passengers.extra_capacity_passengers.${idx}.last_name`}
          />

          <Input
            placeholder="کد ملی یا پاسپورت (اختیاری)"
            name={`rooms.${roomIndex}.passengers.extra_capacity_passengers.${idx}.national_code`}
          />

          <div className="flex h-10">
            <PassengersNoteBook idx={idx} fillPassenger={fillPassenger} />
            <RemoveButton onClick={removePassenger} idx={idx} />
          </div>
        </div>
      ))}
    </div>
  );
}
