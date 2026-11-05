// Importing part
import { ReactNode } from 'react';
import Image from 'next/image';
import logo from '@/assets';
import Link from 'next/link';
import LogoImage from '../../../../public/image/logo/red-gray.png';
import { LogoComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';

// Creating and exporting Logo component as deafult
export default function Logo({
  onlyLogo = false,
  className,
}: LogoComponentPropsType): ReactNode {
  // Conditional rendering
  if (onlyLogo) {
    return (
      <Link href="/" className={cn('shrink-0', className)}>
        <Image
          width={100}
          height={100}
          alt={'سفرنامه 24'}
          src={logo}
          className="w-16"
        />
      </Link>
    );
  } else {
    return (
      <div className={cn('flex items-center justify-start gap-2', className)}>
        <Link href="/" className="shrink-0">
          <Image
            width={100}
            height={100}
            alt={'سفرنامه 24'}
            src={logo}
            className="w-16"
          />
        </Link>
        <div className="text-[#27272A ]">
          <span className="mb-0.5 block truncate text-[13px] font-extrabold">
            سفرنامه 24
          </span>
          <span
            className="block truncate font-inter text-[13px] font-semibold"
            dir="ltr"
          >
            safarnameh24
          </span>
        </div>
      </div>
    );
  }
}
