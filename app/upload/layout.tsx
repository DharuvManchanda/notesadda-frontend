import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Notes - StudyHub',
  description: 'Upload your study notes to StudyHub and share knowledge with your peers',
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
