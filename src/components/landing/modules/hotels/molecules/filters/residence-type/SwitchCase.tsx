import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useQueryState, parseAsArrayOf, parseAsInteger } from 'nuqs';

type Props = { id: number; title: string };

// ----------------------------

export default function SwitchCase(props: Props) {
  const { id, title } = props;

  const [residenceType, setResidenceType] = useQueryState(
    'residence-type',
    parseAsArrayOf(parseAsInteger),
  );

  const checked = residenceType?.includes(id) ?? false;

  const toggle = (value: boolean) => {
    if (value) {
      setResidenceType([...(residenceType ?? []), id]);
    } else {
      setResidenceType(residenceType?.filter((item) => item !== id) ?? []);
    }
  };

  return (
    <div className="flex-between select-none cursor-pointer">
      <Label
        htmlFor={id.toString()}
        className="h-6 text-zinc-700 text-[0.8rem] font-bold flex-1 flex items-center cursor-pointer"
      >
        {title}
      </Label>

      <Switch
        dir="ltr"
        id={id.toString()}
        checked={checked}
        onCheckedChange={toggle}
      />
    </div>
  );
}
