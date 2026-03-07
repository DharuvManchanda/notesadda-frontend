'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/auth-schemas';
import { callApi, API_ENDPOINTS } from '@/lib/api-config';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export function ResetPasswordForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch('password');

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const email = sessionStorage.getItem('reset_email');
      const otp = sessionStorage.getItem('reset_otp');

      if (!email) {
        toast.error('Email not found. Please try again.');
        router.push('/auth/forgot-password');
        return;
      }

      const response = await callApi(API_ENDPOINTS.resetPassword, {
        email,
        otp: otp || '000000', // Using dummy OTP if not stored
        newPassword: data.password,
      });

      if (response.success) {
        toast.success('Password reset successfully!');
        sessionStorage.removeItem('reset_email');
        sessionStorage.removeItem('reset_otp');
        router.push('/auth/signin');
      } else {
        toast.error(response.error || 'Password reset failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
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
        <h1 className="text-2xl font-bold text-foreground mb-2">Create New Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below
        </p>
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          New Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Must contain uppercase, lowercase, and number
        </p>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !password}
        className="w-full"
      >
        {isSubmitting ? 'Resetting password...' : 'Reset Password'}
      </Button>
    </form>
  );
}
