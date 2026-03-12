'use client';

import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { BookOpen, Upload, LayoutDashboard, User, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline">Notes Pitara</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
              Explore
            </Link>
            <Link href="/upload" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </Link>
            {/* <Link href="/dashboard/profile" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link> */}
            <Link href="/admin" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will log you out of your account. You will need to sign back in
                        to access your profile and upload or manage notes.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={logout}>Log out</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
