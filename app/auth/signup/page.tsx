import { AuthCard } from '@/components/auth/AuthCard';
import { SignUpForm } from '@/components/auth/SignUpForm';

export const metadata = {
  title: 'Sign Up - NotesPitara',
  description: 'Create your NotesPitara account to share and discover study materials',
};

export default function SignUpPage() {
  return (
    <AuthCard>
      <SignUpForm />
    </AuthCard>
  );
}
