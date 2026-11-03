'use client';

import NavLink from './NavLink';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

// تعریف دقیق‌تر ساختار داده
type NavItem = {
  page: {
    title: string;
    page: string;
    path: string;
  };
  order: number;
  title: string;
};

export default function NavLinks() {
  const { data, isPending, isError } = useQuery<NavItem[]>({
    queryKey: ['header-menus'],
    queryFn: async () => {
      const response = await generalInstance.get('/config/header-menus/');
      
      // اگر API شما یک آبجکت برمی‌گرداند که دیتای اصلی داخل یک کلید (مثل data) است:
      // const result = response.data.data || response.data;
      
      // در غیر این صورت همان response.data را برمی‌گردانیم
      return response.data;
    },
  });

  // تابع کمکی برای اطمینان از اینکه همیشه با یک آرایه کار می‌کنیم
  const safeData = Array.isArray(data) ? data : [];

  return (
    <nav className="flex-center">
      {isPending ? (
        <div className="flex-center gap-4">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="w-20 h-6" />
            ))}
        </div>
      ) : isError ? null : (
        <div className="flex gap-4">
          {safeData.map((item, index) => (
            <NavLink 
              key={index} 
              href={item.page?.path ?? '#'}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}