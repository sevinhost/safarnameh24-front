import Link from 'next/link';
import Image from 'next/image';

import { content } from '@/lib/constants/footer';

// ------------------------------

export function Licenses() {
  const { enamad, licenses } = content.licenses;

  return (
    <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:max-w-none lg:grid-cols-2">
      {enamad && <div dangerouslySetInnerHTML={{ __html: enamad }} />}

      {licenses.map(
        (license, index) =>
          license.href && (
            <Link
              key={index}
              target="_blank"
              href={license.href}
              className="bg-secondary flex-center aspect-square rounded-2xl p-5"
            >
              <Image alt={license.label} src={license.image} />
            </Link>
          ),
      )}
    </div>
  );
}
