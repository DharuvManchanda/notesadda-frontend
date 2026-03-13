'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Building2,
  Layers,
  BookOpen,
  FileText,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  adminName?: string;
}

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Universities', href: '/admin/universities', icon: Building2 },
  { label: 'Programs', href: '/admin/programs', icon: Layers },
  { label: 'Branches', href: '/admin/branches', icon: Building2 },
  { label: 'Semesters', href: '/admin/semesters', icon: Layers },
  { label: 'Subjects', href: '/admin/subjects', icon: BookOpen },
  { label: 'Notes', href: '/admin/notes', icon: FileText },
  { label: 'Users', href: '/admin/users', icon: Users },
];

export function AdminLayout({
  children,
  adminName = 'Admin',
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] -translate-x-full flex-col border-r border-border bg-card transition-transform duration-300 lg:static lg:z-auto lg:max-w-none lg:translate-x-0 ${
          mobileNavOpen ? 'translate-x-0' : ''
        } ${sidebarOpen ? 'lg:w-64' : 'lg:w-20'}`}
      >
        <div className="flex items-center justify-between border-b border-border p-4 lg:p-6">
          <Link href="/admin" className="flex items-center gap-3" onClick={() => setMobileNavOpen(false)}>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
              <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
            </div>
            {(sidebarOpen || mobileNavOpen) && <span className="text-lg font-bold">NotesPitara</span>}
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close admin menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4 lg:py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setMobileNavOpen(false)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {(sidebarOpen || mobileNavOpen) && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-border p-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden w-full lg:flex"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" className="w-full gap-2" onClick={logout}>
            <LogOut className="h-4 w-4" />
            {(sidebarOpen || mobileNavOpen) && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open admin menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold sm:text-2xl">Admin Dashboard</h1>
          </div>
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <span className="truncate text-sm text-muted-foreground">
              {(user as any)?.name || adminName}
            </span>
            <Button variant="outline" size="sm" className="gap-2" onClick={logout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
