import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import { ASSETS } from '@/config/assets';
import { routes } from '@/config/routes';

import { SITE_CONFIG } from '@/config/site';

type Props = {
  className?: string;
  showTitle?: boolean;
  showSubtitle?: boolean;
  imageClassName?: string;
  disabledResponsiveness?: boolean;
};

// ------------------------------

export default function Brand(props: Props) {
  const {
    className,
    imageClassName,
    showSubtitle,
    showTitle,
    disabledResponsiveness,
  } = props;

  return (
    <Link
      href={routes.index}
      className={cn('flex w-fit items-center-safe gap-4', className)}
    >
      <Image
        priority
        src={ASSETS.logo.main}
        alt={SITE_CONFIG.brand.name}
        className={cn(
          'h-auto w-15',
          !disabledResponsiveness && 'md:w-16',
          imageClassName,
        )}
      />

      <div className="text-foreground flex flex-col leading-8 capitalize">
        {showTitle && (
          <h1 className="font-brand text-[1.6rem]">{SITE_CONFIG.brand.name}</h1>
        )}

        {showSubtitle && (
          <h2 className="mt-auto text-sm font-semibold">
            {SITE_CONFIG.brand.slogan}
          </h2>
        )}
      </div>
    </Link>
  );
}
