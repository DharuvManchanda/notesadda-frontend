'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { otpSchema, type OtpFormData } from '@/lib/auth-schemas';
import { callApi, API_ENDPOINTS } from '@/lib/api-config';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export function OTPVerifyForm({ purpose = 'signup' }: { purpose?: 'signup' | 'reset' }) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const otpValue = watch('otp');

  // OTP expiry timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = async (data: OtpFormData) => {
    try {
      const email = sessionStorage.getItem(
        purpose === 'signup' ? 'signup_email' : 'reset_email',
      );

      if (!email) {
        toast.error('Email not found. Please try again.');
        router.push(purpose === 'signup' ? '/auth/signup' : '/auth/forgot-password');
        return;
      }

      const response = await callApi(API_ENDPOINTS.verifyOtp, {
        email,
        otp: data.otp,
      });

      if (response.success) {
        toast.success('OTP verified successfully!');
        sessionStorage.setItem('otp_verified', 'true');
        if (purpose === 'signup') {
          router.push('/');
        } else {
          router.push('/auth/forgot-password/reset');
        }
      } else {
        toast.error(response.error || 'OTP verification failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleResendOTP = async () => {
    try {
      const email = sessionStorage.getItem(
        purpose === 'signup' ? 'signup_email' : 'reset_email',
      );

      if (!email) {
        toast.error('Email not found. Please try again.');
        return;
      }

      const endpoint = purpose === 'signup' 
        ? API_ENDPOINTS.signup 
        : API_ENDPOINTS.forgotPassword;

      const payload = purpose === 'signup' 
        ? { email }
        : { email };

      await callApi(endpoint, payload);

      toast.success('OTP resent to your email');
      setTimeLeft(600);
      setCanResend(false);
      setResendCooldown(30);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to resend OTP');
    }
  };

  const handleOTPChange = (value: string) => {
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setValue('otp', value);
    }
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
            className={`w-full text-center text-3xl tracking-widest font-mono py-3 px-4 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              errors.otp ? 'border-destructive' : 'border-border'
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
            disabled={isSubmitting}
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

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !otpValue || otpValue.length !== 6}
        className="w-full"
      >
        {isSubmitting ? 'Verifying...' : 'Verify Code'}
      </Button>
    </form>
  );
}
