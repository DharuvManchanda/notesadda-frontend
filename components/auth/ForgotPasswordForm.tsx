'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { notespitaraApi } from '@/store/services/notespitara';
import type { ResendEmailOtpRequest } from '@/store/services/notespitara';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function ForgotPasswordForm() {
  const router = useRouter();
  // Re-using resendEmailOtp since both send an OTP to the email
  const [resendEmailOtp, { isLoading }] =
    notespitaraApi.useResendEmailOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendEmailOtpRequest>();

  const onSubmit = async (data: ResendEmailOtpRequest) => {
    try {
      await resendEmailOtp({ resendEmailOtpRequest: data }).unwrap();

      toast.success('OTP sent to your email!');
      sessionStorage.setItem('reset_email', data.email);
      router.push('/auth/forgot-password/otp');
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || 'Failed to send OTP';
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => router.push('/auth/signin')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </button>
        <h1 className="text-2xl font-bold text-foreground mb-2">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a code to reset your password
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
          })}
          className={errors.email ? 'border-destructive' : ''}
          autoFocus
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Sending code...' : 'Send Reset Code'}
      </Button>

      {/* Sign In Link */}
      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link href="/auth/signin" className="text-primary hover:underline font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
}
