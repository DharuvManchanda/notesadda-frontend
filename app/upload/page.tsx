'use client';

import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { UploadNoteWizard } from '@/components/upload/UploadNoteWizard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <main>
        <Section className="pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20">
          <Container>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Upload Notes' }]} />

            <div className="mx-auto mt-6 max-w-2xl sm:mt-8">
              <UploadNoteWizard onSuccessReturn={() => (window.location.href = '/')} />
            </div>
          </Container>
        </Section>
      </main>
    </ProtectedRoute>
  );
}
