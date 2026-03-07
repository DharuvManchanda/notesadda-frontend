'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signinSchema, type SigninFormData } from '@/lib/auth-schemas';
import { callApi, API_ENDPOINTS } from '@/lib/api-config';
import { toast } from 'sonner';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

export function SignInForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      const response = await callApi(API_ENDPOINTS.signin, data);

      if (response.success) {
        toast.success('Signed in successfully!');
        // Store user data if provided
        if (response.data?.user) {
          setUser(response.data.user);
        }
        // Store token if provided
        if (response.data?.token) {
          localStorage.setItem('auth_token', response.data.token);
        }
        router.push('/');
      } else {
        toast.error(response.error || 'Sign in failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your NotesPitara account
        </p>
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
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs text-primary hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>
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
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-primary hover:underline font-medium">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
