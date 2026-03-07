# Authentication System Setup Guide

## Overview

This authentication system includes Sign Up, Sign In, and Forgot Password flows with OTP email verification. The system is set up with **dummy API endpoints** that you can easily replace with your actual backend URLs.

## Features

✅ **Sign Up Flow**
- Username, email, and password input
- OTP verification via email
- Password strength requirements (uppercase, lowercase, number)
- Auto-redirect to home after verification

✅ **Sign In Flow**
- Email and password login
- Forgot password link
- User state management with AuthContext
- Redirect to home on successful login

✅ **Forgot Password Flow**
- Email-based password reset
- OTP verification
- New password creation
- Redirect to sign in after reset

✅ **UX Features**
- OTP countdown timer (10 minutes)
- Resend OTP button (after 30s cooldown)
- Loading states on all buttons
- Toast notifications for feedback
- Mobile-responsive design
- Password visibility toggle

## File Structure

```
app/
├── auth/
│   ├── layout.tsx                    # Auth pages layout
│   ├── signup/
│   │   ├── page.tsx                  # Sign up form page
│   │   └── otp/
│   │       └── page.tsx              # OTP verification page
│   ├── signin/
│   │   └── page.tsx                  # Sign in form page
│   └── forgot-password/
│       ├── page.tsx                  # Forgot password form page
│       ├── otp/
│       │   └── page.tsx              # OTP verification page
│       └── reset/
│           └── page.tsx              # Reset password page

components/
├── auth/
│   ├── AuthContext.tsx               # Auth state management
│   ├── AuthCard.tsx                  # Centered card layout
│   ├── SignUpForm.tsx                # Sign up form component
│   ├── SignInForm.tsx                # Sign in form component
│   ├── ForgotPasswordForm.tsx         # Forgot password form
│   ├── OTPVerifyForm.tsx             # OTP input component
│   └── ResetPasswordForm.tsx          # Reset password form

lib/
├── auth-schemas.ts                   # Zod validation schemas
└── api-config.ts                     # API endpoint configuration
```

## Updating API Endpoints

All API endpoints are configured in `/lib/api-config.ts`. To connect your backend:

### 1. Open the API Config File

```typescript
// lib/api-config.ts
export const API_ENDPOINTS = {
  signup: 'https://api.example.com/auth/signup',
  verifyOtp: 'https://api.example.com/auth/verify-otp',
  signin: 'https://api.example.com/auth/signin',
  forgotPassword: 'https://api.example.com/auth/forgot-password',
  resetPassword: 'https://api.example.com/auth/reset-password',
};
```

### 2. Replace URLs with Your Backend

Update each endpoint with your actual backend URLs:

```typescript
export const API_ENDPOINTS = {
  signup: 'https://your-backend.com/api/auth/signup',
  verifyOtp: 'https://your-backend.com/api/auth/verify-otp',
  signin: 'https://your-backend.com/api/auth/signin',
  forgotPassword: 'https://your-backend.com/api/auth/forgot-password',
  resetPassword: 'https://your-backend.com/api/auth/reset-password',
};
```

## API Endpoint Specifications

### Sign Up
**Endpoint**: `POST /auth/signup`

**Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Account created. OTP sent to email.",
  "data": {
    "userId": "uuid",
    "email": "john@example.com"
  }
}
```

### Verify OTP
**Endpoint**: `POST /auth/verify-otp`

**Request Body**:
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "token": "jwt_token_here"
  }
}
```

### Sign In
**Endpoint**: `POST /auth/signin`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Signed in successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "username": "john_doe"
    }
  }
}
```

### Forgot Password
**Endpoint**: `POST /auth/forgot-password`

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

### Reset Password
**Endpoint**: `POST /auth/reset-password`

**Request Body**:
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePass456"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

## Using the AuthContext

The authentication state is managed globally through `AuthContext`. You can access it in any client component:

```tsx
'use client';

import { useAuth } from '@/components/auth/AuthContext';

export function MyComponent() {
  const { user, isSignedIn, logout, setUser } = useAuth();

  return (
    <div>
      {isSignedIn && user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}
```

### AuthContext API

- **`user`**: Current logged-in user object (`{ id, email, username }`) or null
- **`isSignedIn`**: Boolean indicating if user is authenticated
- **`isLoading`**: Boolean for loading states
- **`setUser(user)`**: Update user state
- **`setIsLoading(boolean)`**: Update loading state
- **`logout()`**: Clear user session

## Validation Rules

All form validation is handled client-side using Zod schemas in `/lib/auth-schemas.ts`:

### Username
- 3-20 characters
- Alphanumeric and underscores only
- Example: `john_doe`

### Email
- Valid email format
- Example: `john@example.com`

### Password
- Minimum 8 characters
- Must contain uppercase letter (A-Z)
- Must contain lowercase letter (a-z)
- Must contain number (0-9)
- Example: `SecurePass123`

## Session Management

Currently, the system uses:
- **Client-side state**: `AuthContext` for user data
- **Local storage**: `auth_token` for JWT token (optional, set by your signin endpoint)
- **Session storage**: Temporary email storage during auth flows

For production, consider:
- Storing tokens in HTTP-only cookies
- Implementing refresh token logic
- Adding token expiry checks
- Protecting routes with middleware

## Error Handling

All forms include comprehensive error handling:

```typescript
// API calls return error objects
{
  success: false,
  error: "Invalid email or password"
}

// Validation errors are displayed inline
// Toast notifications show success/error messages
```

## Testing the Flow

### Sign Up Test
1. Go to `/auth/signup`
2. Enter username, email, and password
3. See dummy API error (expected)
4. Update API endpoint to test with real backend

### Sign In Test
1. Go to `/auth/signin`
2. Enter email and password
3. Click "Forgot password?" to test reset flow
4. See user state update in Header

### Forgot Password Test
1. Go to `/auth/forgot-password`
2. Enter email
3. Follow OTP and password reset flow
4. Redirect to signin on success

## Browser Storage

- **Session Storage**: Temporary storage of email during auth flows (cleared after completion)
- **Local Storage**: JWT token (optional, set by your backend)
- **No Cookies**: Currently not using cookies (recommend for production)

## Mobile Responsiveness

All auth pages are fully responsive:
- Mobile: Full-width card with padding
- Desktop: Centered max-width card
- Touch-friendly inputs and buttons
- Mobile keyboard support

## Next Steps

1. **Replace API URLs** in `/lib/api-config.ts`
2. **Test with your backend** - use browser DevTools Network tab
3. **Implement session persistence** - add refresh token logic
4. **Add route protection** - middleware for auth-only pages
5. **Customize error messages** - align with your backend responses
6. **Add email templates** - style OTP emails in backend
7. **Implement rate limiting** - prevent brute force attacks

## Customization

### Styling
All components use Tailwind CSS and design tokens from `/app/globals.css`. Update color variables to match your branding.

### Button Labels
Edit button text in component files:
```tsx
// In SignUpForm.tsx
<Button>{isSubmitting ? 'Creating account...' : 'Create Account'}</Button>
```

### Validation Messages
Update Zod schemas in `/lib/auth-schemas.ts` to customize error messages.

### Toast Notifications
Change toast messages in component submit handlers:
```tsx
toast.success('Your custom message here');
```

## Support

For issues or questions:
1. Check browser console for error logs
2. Review Network tab for API failures
3. Verify API endpoint URLs are correct
4. Check response format matches expected schema
5. Test with Postman/curl to isolate backend issues
