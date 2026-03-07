# Authentication System Architecture

## Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   NEXT.JS APP ROUTES                      │   │
│  │  /auth/signup                                             │   │
│  │  /auth/signup/otp                                         │   │
│  │  /auth/signin                                             │   │
│  │  /auth/forgot-password                                    │   │
│  │  /auth/forgot-password/otp                                │   │
│  │  /auth/forgot-password/reset                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                            ↓                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            REACT COMPONENTS (Client)                      │   │
│  │                                                             │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │         FORM COMPONENTS                         │    │   │
│  │  │  • SignUpForm                                   │    │   │
│  │  │  • SignInForm                                   │    │   │
│  │  │  • ForgotPasswordForm                           │    │   │
│  │  │  • OTPVerifyForm (reusable)                     │    │   │
│  │  │  • ResetPasswordForm                            │    │   │
│  │  │  • AuthCard (layout wrapper)                    │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  │                      ↓                                      │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │      REACT HOOK FORM + ZOD VALIDATION          │    │   │
│  │  │  • Form state management                        │    │   │
│  │  │  • Client-side validation                       │    │   │
│  │  │  • Real-time error messages                     │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  │                      ↓                                      │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │          API CALLS (callApi function)           │    │   │
│  │  │  • POST to API_ENDPOINTS                        │    │   │
│  │  │  • Error handling                               │    │   │
│  │  │  • Response parsing                             │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  │                      ↓                                      │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │        SONNER TOAST NOTIFICATIONS              │    │   │
│  │  │  • Success messages                             │    │   │
│  │  │  • Error alerts                                 │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                            ↓                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              REACT CONTEXT (AuthContext)                │   │
│  │  • Global user state: { id, email, username }          │   │
│  │  • isSignedIn, isLoading flags                          │   │
│  │  • setUser(), logout() functions                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                            ↓                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            BROWSER STORAGE (Optional)                    │   │
│  │  • sessionStorage: temporary auth data                   │   │
│  │  • localStorage: JWT token (if needed)                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                            ↓                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            HEADER COMPONENT (Auth State)                 │   │
│  │  • Shows username when logged in                         │   │
│  │  • Logout button                                         │   │
│  │  • Sign In link when not logged in                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR BACKEND API                              │
│                  (Replace dummy URLs in                           │
│                  /lib/api-config.ts)                              │
├─────────────────────────────────────────────────────────────────┤
│  • User database                                                  │
│  • Password hashing                                               │
│  • OTP generation & storage                                       │
│  • OTP email sending                                              │
│  • JWT token generation                                           │
│  • Session management                                             │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout
├── AuthProvider (Context wrapper)
│   ├── Header (uses AuthContext)
│   │   └── "Sign In" or "Username + Logout"
│   ├── Main Routes
│   │   ├── /auth/layout (centered background)
│   │   │   ├── /signup
│   │   │   │   └── SignUpForm
│   │   │   │       └── AuthCard
│   │   │   ├── /signup/otp
│   │   │   │   └── OTPVerifyForm (purpose="signup")
│   │   │   │       └── AuthCard
│   │   │   ├── /signin
│   │   │   │   └── SignInForm (uses AuthContext)
│   │   │   │       └── AuthCard
│   │   │   ├── /forgot-password
│   │   │   │   └── ForgotPasswordForm
│   │   │   │       └── AuthCard
│   │   │   ├── /forgot-password/otp
│   │   │   │   └── OTPVerifyForm (purpose="reset")
│   │   │   │       └── AuthCard
│   │   │   └── /forgot-password/reset
│   │   │       └── ResetPasswordForm
│   │   │           └── AuthCard
│   │   └── / (home page with header)
│   └── Toaster (sonner notifications)
```

## Data Flow During Sign Up

```
User Input
    ↓
┌─────────────────────────────┐
│ Zod Validation (client)     │
│ • Check format              │
│ • Check length              │
│ • Check requirements        │
└─────────────────────────────┘
    ↓
Errors? → Display validation messages
    ↓
No → callApi(signup endpoint)
    ↓
┌─────────────────────────────┐
│ fetch() POST request        │
│ • Send form data            │
│ • Set headers               │
│ • Parse response            │
└─────────────────────────────┘
    ↓
Backend Response
    ↓
Success? → Store email in sessionStorage
         → toast.success()
         → Navigate to /auth/signup/otp
    ↓
Error? → toast.error()
       → Display error message
```

## Data Flow During Sign In

```
User Input (email, password)
    ↓
Zod Validation (client)
    ↓
callApi(signin endpoint)
    ↓
Backend Response
    ↓
Success? → setUser(response.data.user)  [AuthContext]
         → localStorage.auth_token = response.data.token  [Optional]
         → toast.success()
         → Navigate to /
    ↓
Error? → toast.error()
```

## Data Flow During OTP Verification

```
User enters 6-digit OTP
    ↓
Zod Validation (client)
│ • Check length = 6
│ • Check numeric only
└─────────────────────────────┘
    ↓
callApi(verifyOtp endpoint, { email, otp })
    ↓
Backend Response
    ↓
Success? → For signup:
         │ • setUser() [AuthContext]
         │ • Navigate to /
         │
         └─ For reset:
           • sessionStorage.otp_verified = true
           • Navigate to /auth/forgot-password/reset
    ↓
Error? → Show "Invalid OTP" message
       → Highlight error field
```

## Storage Strategy

### Session Storage (Temporary)
```javascript
// Cleared when tab closes
sessionStorage.setItem('signup_email', 'john@example.com');
sessionStorage.setItem('reset_email', 'john@example.com');
sessionStorage.setItem('otp_verified', 'true');
```

### Local Storage (Persistent)
```javascript
// Persists across sessions
localStorage.setItem('auth_token', 'jwt_token_here');
localStorage.getItem('auth_token');
localStorage.removeItem('auth_token'); // on logout
```

### AuthContext (Memory)
```javascript
// Lives in React state, cleared on page refresh
user: { id, email, username }
isSignedIn: boolean
isLoading: boolean
```

## Validation Flow

```
Input Change
    ↓
React Hook Form detects change
    ↓
Zod schema validates
    ↓
Error exists?
├─ Yes → Store error in form state
│       → Display inline error message
│       → Disable submit button
└─ No → Clear error
       → Show success state (if all valid)
       → Enable submit button
```

## OTP Timer Logic

```
Page loads
    ↓
setTimeLeft(600)  // 10 minutes = 600 seconds
    ↓
setCanResend(false)
setResendCooldown(30)  // Can resend after 30 seconds
    ↓
useEffect starts countdown
    ├─ timeLeft -= 1 per second
    └─ When timeLeft === 0:
       └─ Show "OTP expired" message
    ↓
Resend button disabled until resendCooldown === 0
    ├─ Shows "Resend in 29s"
    └─ When === 0:
       └─ setCanResend(true)
       └─ Show "Resend Code" link
```

## Error Handling

```
Try-catch wraps API call
    ↓
Response not OK?
├─ Yes → throw new Error(data.error)
└─ No → return data
    ↓
Catch block
├─ Extract error message
├─ Show toast.error(message)
└─ Log to console for debugging
```

## Mobile Responsiveness

```
Mobile (< 640px)
├─ AuthCard: full width with padding
├─ Inputs: full width, large touch targets
├─ Buttons: full width, large padding
├─ Text: breaks nicely on small screens
└─ Logo: hidden to save space

Desktop (≥ 640px)
├─ AuthCard: max-width 448px, centered
├─ Inputs: max width 400px
├─ Buttons: comfortable size
├─ Logo & nav items: all visible
└─ Horizontal layout for nav
```

## API Request/Response Format

```
Request
POST /api/auth/signup
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response (Success)
{
  "success": true,
  "message": "Account created. OTP sent.",
  "data": {
    "userId": "uuid-here",
    "email": "john@example.com"
  }
}

Response (Error)
{
  "success": false,
  "error": "Email already registered"
}
```

## Security Considerations

```
✓ Implemented
├─ Client-side validation with Zod
├─ Password visibility toggle
├─ No passwords logged to console
├─ No credentials in URL
└─ sessionStorage (not localStorage) for temp data

⚠️ TODO (Backend)
├─ HTTPS only (enforced by Next.js in production)
├─ CORS validation
├─ Rate limiting on auth endpoints
├─ Password hashing (bcrypt)
├─ JWT token expiry
├─ OTP expiry (10 minutes)
├─ Refresh token mechanism
├─ HTTP-only cookies for tokens
└─ Input sanitization
```

## Performance Optimization

```
✓ Components
├─ Code splitting (pages lazy loaded)
├─ Client components marked with 'use client'
├─ No unnecessary re-renders
└─ Memoization where needed

✓ Network
├─ Form validation before API call
├─ Loading states prevent double-submit
├─ Error messages cached locally
└─ Toast notifications don't reload page

✓ Build
├─ Zod schemas tree-shaken
├─ Icons (lucide-react) optimized
├─ CSS not duplicated
└─ No bundled dependencies in forms
```

## Customization Points

```
1. Styling
   └─ Edit /app/globals.css (design tokens)

2. Validation
   └─ Edit /lib/auth-schemas.ts (Zod rules)

3. API endpoints
   └─ Edit /lib/api-config.ts (URLs)

4. Form fields
   └─ Edit /components/auth/*Form.tsx

5. Error messages
   └─ Edit callApi() in /lib/api-config.ts
   └─ Edit auth schema messages

6. Navigation
   └─ Edit router.push() calls in forms
   └─ Edit link redirects in components

7. UX flows
   └─ Add/remove steps in forms
   └─ Modify timer logic in OTPVerifyForm
   └─ Change toast messages
```

## Future Enhancements

```
Phase 1: Core (✓ Done)
├─ Form validation
├─ API integration
├─ OTP flow
└─ Auth state management

Phase 2: Security
├─ Refresh token logic
├─ Token expiry checks
├─ HTTP-only cookies
└─ CSRF protection

Phase 3: Features
├─ Social login (Google, GitHub)
├─ Two-factor authentication
├─ Email verification resend
├─ Biometric login
└─ Session management UI

Phase 4: Polish
├─ Error boundary
├─ Loading skeleton screens
├─ Success animations
├─ Accessibility audit
└─ Performance optimization
```

---

This architecture is designed to be:
- **Modular**: Each component has a single responsibility
- **Reusable**: OTPVerifyForm works for both signup and password reset
- **Maintainable**: Clear separation of concerns
- **Scalable**: Easy to add new auth methods
- **Testable**: Components are isolated and mockable
