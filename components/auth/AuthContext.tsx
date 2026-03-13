'use client';

import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/store';
import { clearCredentials, type AuthUser } from '@/store/authSlice';
import { notespitaraApi } from '@/store/services/notespitara';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  logout: () => void;
  isAuthLoading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [signoutUser] = notespitaraApi.useSignoutUserMutation();

  const { isLoading, error, isError } = notespitaraApi.useGetUserDetailsQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (!isError || !error) return;

    if ('status' in error) {
      // Logout only if unauthorized
      if (error.status === 401) {
        dispatch(clearCredentials());
        dispatch(notespitaraApi.util.resetApiState());
      }

      // Server/network issues — just log warning
      else {
        console.warn('Auth verification failed due to server/network issue:', error);
      }
    }
  }, [isError, error, dispatch]);

  const logout = useCallback(async () => {
    try {
      await signoutUser().unwrap();
    } catch (err) {
      console.warn('Signout API failed, clearing local session anyway', err);
    }

    dispatch(clearCredentials());
    dispatch(notespitaraApi.util.resetApiState());
  }, [dispatch, signoutUser]);

  const isAdmin = user?.roles?.some(
    (role) => role === 'ROLE_UNIVERSITY_ADMIN' || role === 'ROLE_SUPER_ADMIN'
  ) ?? false;

  const value: AuthContextType = {
    user,
    isAuthenticated,
    logout,
    isAuthLoading: isLoading,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}