import Image from 'next/image';
import { Footer } from './Footer';
import logo from '@/assets';

// --------------------------------------

export default function Logo() {
  return (
    <div className="flex-center w-full">
      <Image
        width={200}
        height={200}
        src={logo}
        alt="safarnameh 24-logo"
        className="mt-3 aspect-auto w-24 object-contain xl:mb-4 xl:mt-1"
      />
    </div>
  );
}
