import { AuthCard } from '@/components/auth/AuthCard';
import { OTPVerifyForm } from '@/components/auth/OTPVerifyForm';

export const metadata = {
  title: 'Verify Email - NotesPitara',
  description: 'Verify your email address to reset your password',
};

export default function ResetOTPPage() {
  return (
    <AuthCard>
      <OTPVerifyForm purpose="reset" />
    </AuthCard>
  );
}
