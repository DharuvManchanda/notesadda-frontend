'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { notespitaraApi } from '@/store/services/notespitara';
import type { ResetPasswordRequest } from '@/store/services/notespitara';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface ResetPasswordFormData extends ResetPasswordRequest {
  confirmPassword: string;
}

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading: isSubmitting }] =
    notespitaraApi.useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      token: token,
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPasswordValue = watch('newPassword');

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (!token) {
        toast.error('Invalid or missing reset token.');
        return;
      }

      const request: ResetPasswordRequest = {
        token: data.token,
        newPassword: data.newPassword,
      };

      await resetPassword({ resetPasswordRequest: request }).unwrap();

      toast.success('Password reset successfully!');
      router.push('/auth/signin');
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || 'Password reset failed';
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
        <h1 className="text-2xl font-bold text-foreground mb-2">Create New Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below
        </p>
      </div>

      {/* Hidden input for token (just to be safe/part of form) */}
      <input type="hidden" {...register('token')} />

      {/* New Password */}
      <div className="space-y-2">
        <label htmlFor="newPassword" className="block text-sm font-medium text-foreground">
          New Password
        </label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('newPassword', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              validate: {
                hasUpper: (v) => /[A-Z]/.test(v) || 'Must contain an uppercase letter',
                hasLower: (v) => /[a-z]/.test(v) || 'Must contain a lowercase letter',
                hasNumber: (v) => /[0-9]/.test(v) || 'Must contain a number',
              },
            })}
            className={errors.newPassword ? 'border-destructive pr-10' : 'pr-10'}
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
        {errors.newPassword && (
          <p className="text-xs text-destructive">{errors.newPassword.message}</p>
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
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (v) => v === newPasswordValue || 'Passwords do not match',
            })}
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
      <Button type="submit" disabled={isSubmitting || !token} className="w-full">
        {isSubmitting ? 'Resetting password...' : 'Reset Password'}
      </Button>
      {!token && (
        <p className="text-xs text-destructive text-center mt-2">
          Missing reset token. Please use the exact link from your email.
        </p>
      )}
    </form>
  );
}
