import { AuthCard } from '@/components/auth/AuthCard';
import { OTPVerifyForm } from '@/components/auth/OTPVerifyForm';

export const metadata = {
  title: 'Verify Email - NotesPitara',
  description: 'Verify your email address with the code sent to your inbox',
};

export default function SignUpOTPPage() {
  return (
    <AuthCard>
      <OTPVerifyForm purpose="signup" />
    </AuthCard>
  );
}
