import { Input } from './Input';

type Props = {
  roomIndex: number;
};

// ------------------------------

export function MainPassenger(props: Props) {
  const { roomIndex } = props;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-5">
      <Input
        placeholder="نام مسافر اصلی"
        name={`rooms.${roomIndex}.passengers.main_passenger.first_name`}
      />

      <Input
        placeholder=" نام خانوادگی"
        name={`rooms.${roomIndex}.passengers.main_passenger.last_name`}
      />

      <Input
        isPhone
        placeholder=" شماره همراه"
        name={`rooms.${roomIndex}.passengers.main_passenger.phone_number`}
      />

      <Input
        placeholder="کد ملی یا پاسپورت (اختیاری)"
        name={`rooms.${roomIndex}.passengers.main_passenger.national_code`}
      />
    </div>
  );
}
