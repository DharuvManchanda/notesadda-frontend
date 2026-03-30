import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Notes – Share Your Study Resources',
  description: 'Upload your academic notes and help students across universities. Contribute to a growing structured repository of study materials.',
  alternates: {
    canonical: 'https://notespitara.com/upload',
  },
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
