'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/store';
import { clearCredentials, type AuthUser } from '@/store/authSlice';
import { notespitaraApi } from '@/store/services/notespitara';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [signoutUser] = notespitaraApi.useSignoutUserMutation();

  const logout = useCallback(async () => {
    try {
      await signoutUser().unwrap();
    } catch {
      // Even if signout API fails, clear local state
    }
    dispatch(clearCredentials());
    dispatch(notespitaraApi.util.resetApiState());
  }, [dispatch, signoutUser]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
