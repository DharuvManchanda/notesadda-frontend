'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import { notespitaraApi } from '@/store/services/notespitara';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import type { ApiResponse, DownloadLinkPayload } from '@/lib/api-types';
import { getSafeRedirectPath } from '@/lib/auth-redirect';

interface NoteDownloadButtonProps {
  noteId: string;
}

export function NoteDownloadButton({ noteId }: NoteDownloadButtonProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [triggerDownload, { isFetching: isDownloading }] =
    notespitaraApi.useLazyGetDownloadLinkQuery();

  const handleDownload = async () => {
    const query = searchParams.toString();
    const redirect = getSafeRedirectPath(`${pathname}${query ? `?${query}` : ''}`);

    if (!isAuthenticated) {
      router.push(`/auth/signin?redirect=${encodeURIComponent(redirect)}`);
      return;
    }

    try {
      const response =
        (await triggerDownload({ id: noteId }).unwrap()) as ApiResponse<DownloadLinkPayload>;
      const downloadUrl = response.data?.downloadUrl;

      if (response.status && downloadUrl) {
        window.open(downloadUrl, '_blank', 'noopener,noreferrer');
        return;
      }

      toast.error(response.message ?? 'Failed to generate download link');
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        error.status === 401
      ) {
        router.push(`/auth/signin?redirect=${encodeURIComponent(redirect)}`);
        return;
      }

      const message =
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        'message' in error.data &&
        typeof error.data.message === 'string'
          ? error.data.message
          : 'An error occurred while trying to download the note';

      toast.error(message);
    }
  };

  return (
    <Button size="lg" className="gap-2" onClick={handleDownload} disabled={isDownloading}>
      <Download className="h-4 w-4" />
      {isDownloading ? 'Generating Link...' : 'Download Note'}
    </Button>
  );
}
