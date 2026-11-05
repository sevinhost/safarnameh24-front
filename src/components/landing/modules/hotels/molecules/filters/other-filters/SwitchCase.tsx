import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useQueryState, parseAsStringEnum } from 'nuqs';
const parseAsShowToggle = parseAsStringEnum(['show', 'hide']).withDefault(
  'hide',
);

type Props = { id: string; title: string };

// -------------------------

export default function SwitchCase(props: Props) {
  const { id, title } = props;

  const [state, setState] = useQueryState(id, parseAsShowToggle);
  const isActive = state === 'show';

  return (
    <div className="flex-between select-none cursor-pointer">
      <Label
        htmlFor={id}
        className="h-6 text-zinc-700 text-[0.8rem] font-bold flex-1 flex items-center cursor-pointer"
      >
        {title}
      </Label>

      <Switch
        dir="ltr"
        id={id}
        checked={isActive}
        onCheckedChange={() => setState(isActive ? 'hide' : 'show')}
      />
    </div>
  );
}
