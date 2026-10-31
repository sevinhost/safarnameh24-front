import React from 'react';
import { useAuthModal } from '../model/auth-modal-context';
import { useFormContext } from 'react-hook-form';
import { AuthFormValues } from '../model/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info, Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const AuthFooter: React.FC = () => {
  const { step, isSubmitting } = useAuthModal();
  const {
    formState: { isValid },
  } = useFormContext<AuthFormValues>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1.5">
        <Info className="text-muted-foreground size-3.5" />
        <p className="text-muted-foreground text-xs/5 font-medium">
          ورود و استفاده از {SITE_CONFIG.brand.name} 24 به معنای پذیرش قوانین و
          مقررات آن می باشد.
        </p>
      </div>

      {/* Dynamic Master Submit Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? (
          <span>
            <span className="dots inline-block scale-70" />
          </span>
        ) : step === 'phone' ? (
          'دریافت کد تایید'
        ) : (
          'تایید و ورود'
        )}
      </Button>
    </div>
  );
};
