'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signupSchema, type SignupFormData } from '@/lib/auth-schemas';
import { callApi, API_ENDPOINTS } from '@/lib/api-config';
import { toast } from 'sonner';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await callApi(API_ENDPOINTS.signup, data);

      if (response.success) {
        toast.success('Signup successful! Check your email for OTP.');
        // Store email for OTP verification page
        sessionStorage.setItem('signup_email', data.email);
        router.push('/auth/signup/otp');
      } else {
        toast.error(response.error || 'Signup failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
        <p className="text-sm text-muted-foreground">
          Join NotesPitara to share and discover study materials
        </p>
      </div>

      {/* Username */}
      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-foreground">
          Username
        </label>
        <Input
          id="username"
          placeholder="john_doe"
          {...register('username')}
          className={errors.username ? 'border-destructive' : ''}
        />
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
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

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>

      {/* Sign In Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-primary hover:underline font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
}
