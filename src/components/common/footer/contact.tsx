import { CONTACT } from '@/lib/constants/general';
import { ThemeTabs } from '@/components/common/theme-switcher';
import { SITE_CONFIG } from '@/config/site';

// ------------------------------

export function Contact() {
  return (
    <div className="flex flex-col justify-between gap-4 border-t pt-8 text-sm/6 lg:col-span-3 lg:flex-row lg:items-end">
      <div className="flex flex-col items-start gap-4">
        <p className="font-semibold">
          <span className="text-muted-foreground">
            با پشتیبانی حرفه ای {SITE_CONFIG.brand.name} ,
          </span>{' '}
          <span>همیشه همراه شما هستیم :)</span>
        </p>

        <ThemeTabs className="hidden lg:block" />
      </div>

      <div className="flex flex-wrap gap-4 lg:w-1/2 lg:justify-end lg:gap-x-8 xl:w-2/3">
        {CONTACT.map((item, i) => (
          <div key={item.type + i} className="flex items-center gap-2">
            {item.icon && (
              <item.icon className="text-muted-foreground size-4.5 shrink-0" />
            )}

            <span className="text-foreground flex-1 font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <ThemeTabs className="w-fit lg:hidden" />
    </div>
  );
}
