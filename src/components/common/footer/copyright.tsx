import { SITE_CONFIG } from '@/config/site';

// ------------------------------

export function Copyright() {
  return (
    <div className="bg-secondary border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center text-sm/6 font-medium lg:flex-row">
        <p className="text-foreground">
          کلیه حقوق این وبسایت محفوظ و متعلق به گروه {SITE_CONFIG.brand.name}{' '}
          میباشد .
        </p>

        <span className="text-muted-foreground hidden lg:block">
          ایران (1398 - 1405)
        </span>

        <p
          dir="ltr"
          className="font-secondary flex items-center gap-1 capitalize lg:mr-auto"
        >
          <span className="text-muted-foreground">designed & developed by</span>
          <span className="text-red-500 underline">sevin team</span>
        </p>
      </div>
    </div>
  );
}
