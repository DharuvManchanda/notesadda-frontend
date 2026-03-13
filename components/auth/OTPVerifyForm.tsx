'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { notespitaraApi } from '@/store/services/notespitara';
import type { VerifyEmailOtpRequest, ResendEmailOtpRequest } from '@/store/services/notespitara';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import {
  clearPersistedAuthRedirectPath,
  getSafeRedirectPath,
  persistAuthRedirectPath,
  readPersistedAuthRedirectPath,
} from '@/lib/auth-redirect';

export function OTPVerifyForm({ purpose = 'signup' }: { purpose?: 'signup' | 'reset' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [verifyEmailOtp, { isLoading: isVerifying }] =
    notespitaraApi.useVerifyEmailOtpMutation();
  const [resendEmailOtp, { isLoading: isResending }] =
    notespitaraApi.useResendEmailOtpMutation();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VerifyEmailOtpRequest>({
    defaultValues: { email: '', otp: '' },
  });

  const otpValue = watch('otp');

  const [activeEmail, setActiveEmail] = useState<string | null>(null);

  // Load email from localStorage
  useEffect(() => {
    persistAuthRedirectPath(searchParams.get('redirect'));
    const emailKey = purpose === 'signup' ? 'signup_email' : 'reset_email';
    const email = localStorage.getItem(emailKey);
    if (email) {
      setValue('email', email);
      setActiveEmail(email);
    } else {
      toast.error('Email not found. Please try again.');
      router.push(purpose === 'signup' ? '/auth/signup' : '/auth/forgot-password');
    }
  }, [purpose, router, setValue, searchParams]);

  // For signup, use API to track status
  const { data: signupStatus, refetch: refetchSignupStatus, isFetching: isStatusFetching } = notespitaraApi.useGetSignupStatusQuery(
    { email: activeEmail! },
    {
      skip: !activeEmail || purpose !== 'signup',
      refetchOnMountOrArgChange: true
    }
  );

  // Init timers based on API status or localStorage (for reset) 
  useEffect(() => {
    if (purpose === 'signup') {
      if (signupStatus && !isStatusFetching) {
        if (signupStatus.status === 'AVAILABLE') {
          toast.error('OTP session expired. Please sign up again.');
          localStorage.removeItem('signup_email');
          router.push(
            `/auth/signup?redirect=${encodeURIComponent(readPersistedAuthRedirectPath())}`,
          );
        } else if (signupStatus.status === 'PENDING_VERIFICATION') {
          setTimeLeft(signupStatus.otpExpiresInSeconds ?? 0);
          setResendCooldown(signupStatus.resendCooldownSeconds ?? 0);
          setCanResend((signupStatus.resendCooldownSeconds ?? 0) <= 0);
        } else if (signupStatus.status === 'ALREADY_REGISTERED') {
          toast.error('This email is already registered.');
          localStorage.removeItem('signup_email');
          router.push(
            `/auth/signin?redirect=${encodeURIComponent(readPersistedAuthRedirectPath())}`,
          );
        }
      }
    } else {
      // Code for purpose === 'reset' remains unchanged conceptually but time retrieval needs handling
      const timeKey = 'reset_time';
      const startTimeStamp = localStorage.getItem(timeKey);
      if (startTimeStamp) {
        const elapsedSeconds = Math.floor((Date.now() - parseInt(startTimeStamp, 10)) / 1000);
        const remaining = Math.max(0, 600 - elapsedSeconds);
        if (remaining === 0) {
          toast.error('OTP session expired. Please try again.');
          localStorage.removeItem('reset_email');
          localStorage.removeItem('reset_time');
          router.push('/auth/forgot-password');
        } else {
          setTimeLeft(remaining);
        }
      }
    }
  }, [purpose, signupStatus, router]);

  // OTP expiry timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = async (data: VerifyEmailOtpRequest) => {
    try {
      await verifyEmailOtp({ verifyEmailOtpRequest: data }).unwrap();

      toast.success('OTP verified successfully!');
      localStorage.removeItem(purpose === 'signup' ? 'signup_email' : 'reset_email');
      if (purpose === 'reset') localStorage.removeItem('reset_time');

      if (purpose === 'signup') {
        router.push(
          `/auth/signin?redirect=${encodeURIComponent(readPersistedAuthRedirectPath())}`,
        );
      } else {
        router.push('/auth/forgot-password/reset');
      }
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || 'OTP verification failed';
      toast.error(message);
    }
  };

  const handleResendOTP = async () => {
    if (!activeEmail) return;

    try {
      const resendEmailOtpRequest: ResendEmailOtpRequest = { email: activeEmail };
      await resendEmailOtp({ resendEmailOtpRequest }).unwrap();

      toast.success('OTP resent to your email');
      if (purpose === 'signup') {
        // Refetch status to get new timers from the backend
        refetchSignupStatus();
      } else {
        localStorage.setItem('reset_time', Date.now().toString());
        setTimeLeft(600);
        setCanResend(false);
        setResendCooldown(60);
      }
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || 'Failed to resend OTP';
      toast.error(message);
    }
  };

  const handleOTPChange = (value: string) => {
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setValue('otp', value);
    }
  };

  const handleCancelSignup = () => {
    localStorage.removeItem(purpose === 'signup' ? 'signup_email' : 'reset_email');
    if (purpose === 'reset') localStorage.removeItem('reset_time');
    clearPersistedAuthRedirectPath();
    toast.info('Verification cancelled.');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          Go back
        </button>
        <h1 className="text-2xl font-bold text-foreground mb-2">Verify Email</h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      {/* OTP Input */}
      <div className="space-y-2">
        <label htmlFor="otp" className="block text-sm font-medium text-foreground">
          Verification Code
        </label>
        <div className="relative">
          <input
            id="otp"
            type="text"
            placeholder="000000"
            value={otpValue || ''}
            onChange={(e) => handleOTPChange(e.target.value)}
            maxLength={6}
            className={`w-full text-center text-3xl tracking-widest font-mono py-3 px-4 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.otp ? 'border-destructive' : 'border-border'
              }`}
            autoFocus
          />
        </div>
        {errors.otp && (
          <p className="text-xs text-destructive text-center">{errors.otp.message}</p>
        )}
      </div>

      {/* Timer and Resend */}
      <div className="flex items-center justify-between text-sm">
        <div className={`${timeLeft < 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
          Code expires in: <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
        </div>
        {canResend ? (
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isVerifying || isResending}
            className="text-primary hover:underline font-medium text-sm"
          >
            Resend Code
          </button>
        ) : (
          <span className="text-muted-foreground text-xs">
            Resend in {resendCooldown}s
          </span>
        )}
      </div>

      {/* Submit / Cancel Buttons */}
      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isVerifying || !otpValue || otpValue.length !== 6}
          className="w-full"
        >
          {isVerifying ? 'Verifying...' : 'Verify Code'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleCancelSignup}
          disabled={isVerifying || isResending}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
