import { AuthCard } from '@/components/auth/AuthCard';
import { SignInForm } from '@/components/auth/SignInForm';

export const metadata = {
  title: 'Sign In - NotesPitara',
  description: 'Sign in to your NotesPitara account',
};

export default function SignInPage() {
  return (
    <AuthCard>
      <SignInForm />
    </AuthCard>
  );
}
