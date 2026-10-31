import { Button } from '@/components/ui/button';
import { ClipboardCheck, Headphones, PhoneCall } from 'lucide-react';

// ------------------------------

export default function SubActions() {
  return (
    <div className="hidden gap-4 lg:flex">
      <Button variant={'secondary'} className={'px-5 font-semibold'}>
        <PhoneCall className="" />
        <span>تماس با ما</span>
      </Button>

      <Button variant={'secondary'} className={'px-5 font-semibold'}>
        <ClipboardCheck />
        <span>پیگیری رزرو</span>
      </Button>

      <Button variant={'secondary'} className={'px-5'}>
        <Headphones />
        <span> ارتباط با پشتیبانی</span>
      </Button>
    </div>
  );
}
