'use client';

import { Toaster } from '@/components/ui/toast';
import { ThemeProvider } from './theme-provider';

// import { AuthAlert, AuthProvider } from '@/features/auth';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DirectionProvider } from '@/components/ui/direction';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthModalProvider } from '@/features/auth/model/auth-modal-context';
import { AuthModal } from '@/features/auth/view/auth-modal';
import { DatePickerProvider } from '@/features/date-picker/model/date-picker-context';
import { Suspense } from 'react';

// ------------------------------

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Suspense>
    <DirectionProvider direction="rtl">
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        >
        <TooltipProvider>
          <AuthModalProvider>
            <QueryClientProvider client={queryClient}>
              <DatePickerProvider>
                {children}

                <Toaster />
                <AuthModal />
                {/* <AuthAlert /> */}
              </DatePickerProvider>
            </QueryClientProvider>
          </AuthModalProvider>
        </TooltipProvider>
      </ThemeProvider>
    </DirectionProvider>
        </Suspense>
  );
}
