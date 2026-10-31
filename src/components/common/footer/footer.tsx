import { cn } from 'cn';

import { Contact } from './contact';
import { Licenses } from './licenses';
import SubActions from './sub-actions';
import Description from './description';
import { Copyright } from './copyright';
import { Newsletter } from './newsletter';

import { AccessLinks } from './access-links';
import { SocialMedia } from './social-media';
import Brand from '@/components/common/brand';
import { ScrollToTop } from '../scroll-to-top';

// ------------------------------

export function Footer() {
  return (
    <footer className="bg-sidebar mt-auto border-t">
      <div
        className={cn(
          'mx-auto max-w-7xl',
          'px-4 py-8 xl:py-10',
          'grid items-start gap-8 lg:grid-cols-[24rem_1fr_16rem]',
        )}
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <Brand
              showTitle
              showSubtitle
              disabledResponsiveness
              imageClassName="w-20"
            />
            <ScrollToTop />
          </div>

          <Description />
        </div>

        <AccessLinks />
        <Licenses />

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between lg:col-span-3">
          <SocialMedia />
          <SubActions />
          <Newsletter />
        </div>

        <Contact />
      </div>

      <Copyright />
    </footer>
  );
}
