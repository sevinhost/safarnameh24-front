import Image from 'next/image';
import { FaCheck } from 'react-icons/fa6';
import { Label } from '@/components/ui/label';

import { useQueryState, parseAsArrayOf, parseAsInteger } from 'nuqs';

type Props = {
  id: number;
  title: string;
  type: 'hotel' | 'room';
  icon?: { link: string };
};

// ----------------------------

export default function FacilitiesItem(props: Props) {
  const { id, title, icon, type } = props;

  const [facilities, setFacilities] = useQueryState(
    `${type}-facilities`,
    parseAsArrayOf(parseAsInteger),
  );

  const checked = facilities?.includes(id) ?? false;

  const toggle = (value: boolean) => {
    if (value) {
      setFacilities([...(facilities ?? []), id]);
    } else {
      setFacilities(facilities?.filter((item) => item !== id) ?? []);
    }
  };

  return (
    <div
      className="px-5 flex items-center gap-3 select-none cursor-pointer transition-colors hover:bg-cs-blue/5"
      onClick={() => toggle(!checked)}
    >
      <div className="relative bg-zinc-200/50 w-5 h-5 overflow-hidden rounded-[0.3rem]">
        <div
          className={`absolute inset-0 bg-cs-blue flex-center transition-all duration-200 ease-in-out ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        >
          <FaCheck color="#fff" size={12} />
        </div>
      </div>

      <Label
        htmlFor={id.toString()}
        className="h-12 text-zinc-700 text-[0.8rem] font-bold flex-1 flex items-center cursor-pointer"
      >
        {title}
      </Label>

      <div className="w-5 h-5 flex-center">
        {icon && (
          <Image
            width={100}
            height={100}
            className=""
            src={icon.link}
            alt="facilities-icon"
          />
        )}
      </div>
    </div>
  );
}
