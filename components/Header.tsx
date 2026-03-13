'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Upload, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LogoutConfirmButton } from '@/components/auth/LogoutConfirmButton';

export function Header() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-3 text-lg font-bold">
            <img
              src="/notespitara.jpg"
              alt="Notes Pitara logo"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="hidden sm:inline">Notes Pitara</span>
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
            <ThemeToggle />
            <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/upload" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Link>
            {isAdmin && (
              <Link href="/admin" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                <LayoutDashboard className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}

            {isAuthenticated && user ? (
              <LogoutConfirmButton
                onConfirm={logout}
                description="This will log you out of your account. You will need to sign back in to access your profile and upload or manage notes."
              >
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </LogoutConfirmButton>
            ) : (
              <Link href="/auth/signin">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t py-3 md:hidden">
            <nav className="flex flex-col gap-2">
              <div className="flex justify-end px-1">
                <ThemeToggle />
              </div>
              <Link
                href="/explore"
                className="rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/about"
                className="rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/upload"
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}

              {isAuthenticated && user ? (
                <LogoutConfirmButton
                  onConfirm={logout}
                  description="This will log you out of your account. You will need to sign back in to access your profile and upload or manage notes."
                >
                  <Button variant="ghost" className="justify-start px-3 py-3">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </LogoutConfirmButton>
              ) : (
                <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="mt-2 w-full">Sign In</Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
