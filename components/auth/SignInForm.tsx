'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { notespitaraApi } from '@/store/services/notespitara';
import type { LoginRequest } from '@/store/services/notespitara';
import { setCredentials } from '@/store/authSlice';
import { getSafeRedirectPath } from '@/lib/auth-redirect';

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [authenticateUser, { isLoading }] =
    notespitaraApi.useAuthenticateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const result = await authenticateUser({
        loginRequest: data,
      }).unwrap();

      if (result && typeof result === 'object') {
        const res = result as Record<string, any>;
        if (res.username || res.email) {
          dispatch(
            setCredentials({
              id: res.id ?? '',
              email: res.email ?? '',
              username: res.username ?? data.username,
              roles: res.roles,
            }),
          );
        }
      }

      toast.success('Signed in successfully!');
      const redirectPath = getSafeRedirectPath(searchParams.get('redirect'));
      router.push(redirectPath);
    } catch (error: any) {
      const message = error?.data?.message || error?.message || 'Sign in failed';
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your NotesPitara account
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-foreground">
          Username or Email
        </label>
        <Input
          id="username"
          type="text"
          placeholder="john or john@gmail.com"
          {...register('username', { required: 'Username or Email is required' })}
          className={errors.username ? 'border-destructive' : ''}
        />
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="........"
            {...register('password', { required: 'Password is required' })}
            className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="font-medium text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
