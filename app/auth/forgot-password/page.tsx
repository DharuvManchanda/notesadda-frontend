import { AuthCard } from '@/components/auth/AuthCard';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata = {
  title: 'Forgot Password - NotesPitara',
  description: 'Reset your NotesPitara password',
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard>
      <ForgotPasswordForm />
    </AuthCard>
  );
}
