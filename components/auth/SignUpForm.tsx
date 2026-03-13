'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { notespitaraApi } from '@/store/services/notespitara';
import type { SignupRequest } from '@/store/services/notespitara';

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading: isRegistering }] =
    notespitaraApi.useRegisterUserMutation();
  const [activeEmail, setActiveEmail] = useState<string | null>(null);

  useEffect(() => {
    setActiveEmail(localStorage.getItem('signup_email'));
  }, []);

  const { data: signupStatus, isLoading: isStatusLoading } =
    notespitaraApi.useGetSignupStatusQuery(
      { email: activeEmail! },
      { skip: !activeEmail, refetchOnMountOrArgChange: true },
    );

  useEffect(() => {
    if (!activeEmail || !signupStatus) {
      return;
    }

    if (signupStatus.status === 'PENDING_VERIFICATION') {
      toast.info('You have a pending signup. Please verify your email.');
      router.push('/auth/signup/otp');
      return;
    }

    if (signupStatus.status === 'AVAILABLE') {
      localStorage.removeItem('signup_email');
      setActiveEmail(null);
      return;
    }

    if (signupStatus.status === 'ALREADY_REGISTERED') {
      toast.error('This email is already registered.');
      localStorage.removeItem('signup_email');
      setActiveEmail(null);
      router.push('/auth/signin');
    }
  }, [activeEmail, signupStatus, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>();

  const onSubmit = async (data: SignupRequest) => {
    try {
      await registerUser({ signupRequest: data }).unwrap();
      toast.success('Signup successful! Check your email for OTP.');
      localStorage.setItem('signup_email', data.email);
      router.push('/auth/signup/otp');
    } catch (error: any) {
      const message = error?.data?.message || error?.message || 'Signup failed';
      toast.error(message);
    }
  };

  const isLoading = isRegistering || isStatusLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">Create Account</h1>
        <p className="text-sm text-muted-foreground">
          Join NotesPitara to share and discover study materials
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-foreground">
          Username
        </label>
        <Input
          id="username"
          placeholder="john_doe"
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'Username must be at least 3 characters' },
            maxLength: { value: 20, message: 'Username must be at most 20 characters' },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Letters, numbers, and underscores only',
            },
          })}
          className={errors.username ? 'border-destructive' : ''}
        />
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="........"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              validate: {
                hasUpper: (value) =>
                  /[A-Z]/.test(value) || 'Must contain an uppercase letter',
                hasLower: (value) =>
                  /[a-z]/.test(value) || 'Must contain a lowercase letter',
                hasNumber: (value) => /[0-9]/.test(value) || 'Must contain a number',
              },
            })}
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
        <p className="mt-1 text-xs text-muted-foreground">
          Must contain uppercase, lowercase, and number
        </p>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/signin" className="font-medium text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
