# Authentication Configuration Reference

## 🔧 API Configuration

### File Location
`/lib/api-config.ts`

### Current Configuration (Dummy URLs)
```typescript
export const API_ENDPOINTS = {
  signup: 'https://api.example.com/auth/signup',
  verifyOtp: 'https://api.example.com/auth/verify-otp',
  signin: 'https://api.example.com/auth/signin',
  forgotPassword: 'https://api.example.com/auth/forgot-password',
  resetPassword: 'https://api.example.com/auth/reset-password',
};
```

### How to Update
1. Open `/lib/api-config.ts`
2. Replace each URL with your backend endpoint
3. Save the file
4. Test in your browser (network tab)

### Example After Update
```typescript
export const API_ENDPOINTS = {
  signup: 'https://notesadda-backend.com/api/v1/auth/register',
  verifyOtp: 'https://notesadda-backend.com/api/v1/auth/verify-otp',
  signin: 'https://notesadda-backend.com/api/v1/auth/login',
  forgotPassword: 'https://notesadda-backend.com/api/v1/auth/forgot-password',
  resetPassword: 'https://notesadda-backend.com/api/v1/auth/reset-password',
};
```

## 📋 Request/Response Specifications

### 1. Sign Up Endpoint

**URL**: `POST /auth/signup`

**Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200-201)**:
```json
{
  "success": true,
  "message": "Account created. OTP sent to email.",
  "data": {
    "userId": "uuid-or-id",
    "email": "john@example.com"
  }
}
```

**Error Response (400, 409, 500)**:
```json
{
  "success": false,
  "error": "Email already registered"
}
```

### 2. Verify OTP Endpoint

**URL**: `POST /auth/verify-otp`

**Request Body**:
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error Response (400, 401)**:
```json
{
  "success": false,
  "error": "Invalid or expired OTP"
}
```

### 3. Sign In Endpoint

**URL**: `POST /auth/signin`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Signed in successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid-or-id",
      "email": "john@example.com",
      "username": "john_doe"
    }
  }
}
```

**Error Response (401, 404)**:
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### 4. Forgot Password Endpoint

**URL**: `POST /auth/forgot-password`

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "error": "Email not found"
}
```

### 5. Reset Password Endpoint

**URL**: `POST /auth/reset-password`

**Request Body**:
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePass456"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Error Response (400, 401)**:
```json
{
  "success": false,
  "error": "Invalid OTP or email"
}
```

## 🎨 Styling Configuration

### File Location
`/app/globals.css`

### Color Variables
```css
:root {
  --primary: oklch(0.72 0.15 280);           /* Purple */
  --secondary: oklch(0.8 0.1 210);           /* Blue */
  --accent: oklch(0.82 0.12 40);             /* Orange */
  --destructive: oklch(0.62 0.22 25);        /* Red for errors */
  --background: #f8f8f8;                     /* Light gray */
  --foreground: oklch(0.25 0.01 260);        /* Dark text */
  --border: oklch(0.93 0.02 280);            /* Light border */
}
```

### Change Primary Color
```css
/* Change from purple to blue */
--primary: oklch(0.6 0.1 210);  /* Blue */
```

### Change Accent Color
```css
/* Change from orange to green */
--accent: oklch(0.7 0.11 150);  /* Green */
```

## ✅ Validation Rules

### File Location
`/lib/auth-schemas.ts`

### Username Validation
- **Length**: 3-20 characters
- **Characters**: Alphanumeric and underscore only
- **Error Message**: "Username can only contain letters, numbers, and underscores"

**To Change**:
```typescript
const signupSchema = z.object({
  username: z
    .string()
    .min(5, 'Username must be at least 5 characters')  // Change min length
    .max(30, 'Username must be at most 30 characters')  // Change max length
    .regex(/^[a-zA-Z0-9_]+$/, 'Custom error message'),
});
```

### Email Validation
- **Format**: Valid email address
- **Error Message**: "Invalid email address"

**To Change**:
```typescript
email: z
  .string()
  .email('Please enter a valid email')  // Change error message
```

### Password Validation
- **Length**: Minimum 8 characters
- **Requirements**: Uppercase, lowercase, and number
- **Error Message**: Individual messages for each requirement

**To Change**:
```typescript
password: z
  .string()
  .min(10, 'Password must be at least 10 characters')  // Change length
  .regex(/[A-Z]/, 'Must include an uppercase letter')
  .regex(/[a-z]/, 'Must include a lowercase letter')
  .regex(/[0-9]/, 'Must include a number')
  .regex(/[!@#$%^&*]/, 'Must include a special character'),  // Add new requirement
```

## 🔒 Authentication Context

### File Location
`/components/auth/AuthContext.tsx`

### Using AuthContext
```typescript
'use client';

import { useAuth } from '@/components/auth/AuthContext';

export function MyComponent() {
  const { user, isSignedIn, logout, setUser } = useAuth();

  // user: { id, email, username } | null
  // isSignedIn: boolean
  // logout: () => void
  // setUser: (user) => void

  return (
    <div>
      {isSignedIn ? (
        <p>Welcome, {user?.username}</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}
```

## 📱 Form Component Customization

### Sign Up Form
**File**: `/components/auth/SignUpForm.tsx`

**Customization Examples**:
```typescript
// Change submit button text
<Button>{isSubmitting ? 'Creating your account...' : 'Get Started'}</Button>

// Add additional field
<input {...register('phone')} placeholder="Phone number" />

// Change redirect after signup
router.push('/welcome');  // Instead of /auth/signup/otp
```

### Sign In Form
**File**: `/components/auth/SignInForm.tsx`

**Customization Examples**:
```typescript
// Remove "Forgot password?" link
{/* <Link href="/auth/forgot-password">Forgot?</Link> */}

// Add "Remember me" checkbox
<input type="checkbox" {...register('rememberMe')} />

// Change redirect after signin
router.push('/dashboard');  // Instead of /
```

### OTP Form
**File**: `/components/auth/OTPVerifyForm.tsx`

**Customization Examples**:
```typescript
// Change OTP length to 8 digits
maxLength={8}

// Change OTP expiry time
const [timeLeft, setTimeLeft] = useState(300);  // 5 minutes instead of 10

// Change resend cooldown
setResendCooldown(60);  // 1 minute instead of 30 seconds
```

## 🔔 Toast Notifications

### File Location
Components use `import { toast } from 'sonner'`

### Custom Messages
```typescript
// In any form component
toast.success('Welcome aboard!');  // Custom success message
toast.error('Something went wrong');  // Custom error message
toast.loading('Processing...');  // Loading toast
```

### Examples in Code
```typescript
// Sign Up Form
toast.success('Signup successful! Check your email for OTP.');

// Sign In Form
toast.success('Signed in successfully!');

// OTP Form
toast.error('Invalid or expired OTP');
```

## 🌐 Browser Storage Configuration

### Session Storage (Temporary)
```javascript
// Set during auth flow
sessionStorage.setItem('signup_email', 'john@example.com');
sessionStorage.setItem('reset_email', 'john@example.com');

// Read
const email = sessionStorage.getItem('signup_email');

// Clear
sessionStorage.removeItem('signup_email');
```

### Local Storage (Persistent)
```javascript
// Store JWT token after signin
localStorage.setItem('auth_token', response.data.token);

// Retrieve token
const token = localStorage.getItem('auth_token');

// Clear on logout
localStorage.removeItem('auth_token');
```

## 📋 Environment Variables (Optional)

If your backend requires API keys, add them to `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend.com
NEXT_PUBLIC_API_VERSION=v1
```

Then use in api-config.ts:
```typescript
export const API_ENDPOINTS = {
  signup: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/auth/signup`,
  // ...
};
```

## 🎯 Common Customizations

### Change Logo
**File**: `/components/Header.tsx`
```typescript
// Replace BookOpen icon with your logo
<img src="/logo.png" alt="Logo" />
```

### Change Brand Name
**File**: `/components/Header.tsx`
```typescript
<span>Your App Name</span>  // Instead of "Notes Pitara"
```

### Change Page Titles
**File**: Each page's metadata export
```typescript
export const metadata = {
  title: 'Your Custom Title - Your App',
  description: 'Your custom description',
};
```

### Add Additional Fields
**File**: `/lib/auth-schemas.ts` and form components
```typescript
// Add to schema
phone: z.string().min(10, 'Phone required'),

// Add to form
<Input {...register('phone')} placeholder="Phone number" />
```

## 🔗 Related Files to Update

When connecting to backend, also consider:

1. **Headers.tsx** - Add Authorization header to requests
2. **api-config.ts** - Add token to API calls
3. **AuthContext.tsx** - Add token refresh logic
4. **Route Protection** - Add middleware for auth-only routes

## ✨ Quick Reference

| Component | File | Purpose |
|-----------|------|---------|
| Sign Up Form | `/components/auth/SignUpForm.tsx` | User registration |
| Sign In Form | `/components/auth/SignInForm.tsx` | User login |
| OTP Form | `/components/auth/OTPVerifyForm.tsx` | Email verification |
| Forgot Password | `/components/auth/ForgotPasswordForm.tsx` | Password recovery |
| Reset Password | `/components/auth/ResetPasswordForm.tsx` | New password creation |
| Auth Context | `/components/auth/AuthContext.tsx` | Global auth state |

---

**Last Updated**: March 2026
**Status**: Ready for Production (with backend integration)
