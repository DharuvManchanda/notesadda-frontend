import { AuthCard } from '@/components/auth/AuthCard';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export const metadata = {
  title: 'Reset Password - NotesPitara',
  description: 'Set your new NotesPitara password',
};

export default function ResetPasswordPage() {
  return (
    <AuthCard>
      <ResetPasswordForm />
    </AuthCard>
  );
}
