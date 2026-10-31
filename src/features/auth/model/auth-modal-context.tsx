import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { AuthModalContextType, AuthStep } from './types';
import { normalizeDigits } from './utils';

const OTP_INITIAL_TIMER = 60; // 2 minutes

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Modal visibility
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Stepper state
  const [step, setStep] = useState<AuthStep>('phone');

  // Loading indicator
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Smart Cache: Stores the phone number for which the code was successfully requested
  const lastRequestedPhoneRef = useRef<string | null>(null);

  // Simple in-memory countdown timer
  const [timer, setTimer] = useState<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-submit OTP flag (can be toggled)
  const autoSubmitOtp = true;

  // Cleanup interval on unmount
  useEffect(() => {
    if (step === 'otp' && !isOpen) {
      setTimeout(() => {
        setStep('phone');
      }, 300);
    }
  }, [step, isOpen, setStep]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  /**
   * Starts or restarts the countdown timer.
   */
  const startTimer = (seconds: number = OTP_INITIAL_TIMER) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimer(seconds);

    timerIntervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /**
   * Modal control helpers
   */
  const openAuthModal = () => setIsOpen(true);

  const closeAuthModal = () => {
    setIsOpen(false);
    // Note: step and timer are intentionally retained so reopening doesn't wipe state
  };

  /**
   * Step 1 Submission:
   * Checks if the phone matches the last requested phone and the timer is still ticking.
   * If yes -> skips API call and directly navigates to step 2.
   */
  const handlePhoneSubmit = async (phone: string) => {
    const normalizedPhone = normalizeDigits(phone).trim();

    // Check if we can reuse the existing active session
    const isSamePhone = lastRequestedPhoneRef.current === normalizedPhone;
    const isTimerStillActive = timer > 0;

    if (isSamePhone && isTimerStillActive) {
      setStep('otp');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 800));

      lastRequestedPhoneRef.current = normalizedPhone;
      startTimer(OTP_INITIAL_TIMER);
      setStep('otp');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Step 2 Submission:
   * Validates OTP and logs the user in.
   */
  const handleOtpSubmit = async (otp: string) => {
    setIsSubmitting(true);
    try {
      // Simulate API verification call
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log('Login verified successfully with OTP:', otp);
      closeAuthModal();
      // Reset flow after successful login
      lastRequestedPhoneRef.current = null;
      setTimer(0);
    } catch (error) {
      console.error('OTP Verification failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Resend the OTP and resets timer countdown.
   */
  const handleResendOtp = async () => {
    if (!lastRequestedPhoneRef.current || timer > 0) return;

    // setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      startTimer(OTP_INITIAL_TIMER);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    } finally {
      // setIsSubmitting(false);
    }
  };

  /**
   * Navigates back from OTP step to Phone editing step.
   */
  const handleBack = () => {
    setStep('phone');
  };

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        openAuthModal,
        closeAuthModal,
        step,
        goToStep: setStep,
        handleBack,
        isSubmitting,
        handlePhoneSubmit,
        handleOtpSubmit,
        handleResendOtp,
        timer,
        isTimerActive: timer > 0,
        autoSubmitOtp,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};
