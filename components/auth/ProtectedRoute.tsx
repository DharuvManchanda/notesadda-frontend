'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { PageLoader } from '@/components/ui/PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isAuthLoading } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isAuthLoading) return;

    // Basic authentication check
    if (!isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    // Role-based authorization check
    if (allowedRoles && allowedRoles.length > 0) {
      const userRoles = user?.roles || [];
      const hasAllowedRole = allowedRoles.some((role) => userRoles.includes(role));

      if (!hasAllowedRole) {
        // Redirect to a specific "unauthorized" page or just home
        router.push('/');
        return;
      }
    }

    // Only set ready if authorized
    setIsReady(true);
  }, [isAuthenticated, user, allowedRoles, router, isAuthLoading]);

  // Optionally render a loading spinner or null while checking
  if (isAuthLoading || !isReady) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
